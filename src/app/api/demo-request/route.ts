import { saveDemoRequest } from "@/lib/demo-request-store";

export const runtime = "nodejs";

type DemoRequest = {
  formType?: unknown;
  name?: unknown;
  phone?: unknown;
  email?: unknown;
  organization?: unknown;
  callVolume?: unknown;
  industry?: unknown;
  language?: unknown;
  website?: unknown;
  notes?: unknown;
};

const clean = (value: unknown, max = 200) => typeof value === "string" ? value.trim().slice(0, max) : "";

function hasValidOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return false;

  let originUrl: URL;
  try {
    originUrl = new URL(origin);
  } catch {
    return false;
  }

  const requestUrl = new URL(request.url);
  const hosts = [request.headers.get("host"), request.headers.get("x-forwarded-host"), requestUrl.host]
    .flatMap((value) => value?.split(",") ?? [])
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);
  const protocols = [request.headers.get("x-forwarded-proto"), requestUrl.protocol.replace(":", "")]
    .flatMap((value) => value?.split(",") ?? [])
    .map((value) => value.trim().toLowerCase().replace(/:$/, ""))
    .filter(Boolean);
  const loopbacks = ["localhost", "127.0.0.1", "[::1]"];
  const localAlias = process.env.NODE_ENV !== "production" && hosts.some((host) => {
    try {
      const parsedHost = new URL(`http://${host}`);
      return loopbacks.includes(parsedHost.hostname) && loopbacks.includes(originUrl.hostname) && parsedHost.port === originUrl.port;
    } catch {
      return false;
    }
  });

  return (hosts.includes(originUrl.host.toLowerCase()) || localAlias) &&
    protocols.includes(originUrl.protocol.replace(":", "").toLowerCase());
}

export async function POST(request: Request) {
  if (!hasValidOrigin(request)) {
    return Response.json({ error: "Invalid request origin." }, { status: 403 });
  }

  let payload: DemoRequest;
  try {
    const raw = await request.text();
    if (raw.length > 8_000) return Response.json({ error: "The request is too large." }, { status: 413 });
    payload = JSON.parse(raw) as DemoRequest;
  } catch {
    return Response.json({ error: "Invalid form submission." }, { status: 400 });
  }

  if (clean(payload.website)) return Response.json({ ok: true });

  const formType = clean(payload.formType, 20);
  const name = clean(payload.name, 120);
  const phone = clean(payload.phone, 40);
  const email = clean(payload.email, 254);
  const organization = clean(payload.organization, 160);
  const callVolume = clean(payload.callVolume, 80);
  const industry = clean(payload.industry, 100);
  const language = clean(payload.language, 80);
  const notes = clean(payload.notes, 2_000);
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (!name || !isValidEmail || (formType !== "contact" && (!phone || !organization))) {
    return Response.json({ error: "Please check your name, email, phone, and organization." }, { status: 400 });
  }

  try {
    await saveDemoRequest({
      submittedAt: new Date().toISOString(),
      name,
      phone,
      email,
      organization,
      callVolume,
      industry: formType === "contact" ? "Contact inquiry" : industry,
      language,
      notes,
    });
    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "We couldn’t save your request right now. Please try again shortly." }, { status: 500 });
  }
}
