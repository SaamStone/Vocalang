import {
  clearFounderSessionCookie,
  founderAuthIsConfigured,
  hasFounderSession,
  isFounderPasswordValid,
  makeFounderSessionCookie,
  requestHasValidOrigin,
} from "@/lib/founder-session";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  if (!founderAuthIsConfigured()) {
    return Response.json({ configured: false, authenticated: false }, { status: 503, headers: { "Cache-Control": "no-store" } });
  }
  return Response.json({ configured: true, authenticated: hasFounderSession(request) }, { headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: Request) {
  if (!requestHasValidOrigin(request)) {
    return Response.json({ error: "Invalid request origin." }, { status: 403 });
  }
  if (!founderAuthIsConfigured()) {
    return Response.json({ error: "Founder dashboard access is not configured." }, { status: 503 });
  }

  let password = "";
  try {
    const raw = await request.text();
    if (raw.length > 2_000) return Response.json({ error: "Invalid sign-in request." }, { status: 400 });
    const payload = JSON.parse(raw) as { password?: unknown };
    if (typeof payload.password === "string") password = payload.password;
  } catch {
    return Response.json({ error: "Invalid sign-in request." }, { status: 400 });
  }

  if (!isFounderPasswordValid(password)) {
    return Response.json({ error: "The password is incorrect." }, { status: 401 });
  }

  return Response.json(
    { authenticated: true },
    { headers: { "Set-Cookie": makeFounderSessionCookie(), "Cache-Control": "no-store" } },
  );
}

export async function DELETE(request: Request) {
  if (!requestHasValidOrigin(request)) {
    return Response.json({ error: "Invalid request origin." }, { status: 403 });
  }
  return Response.json(
    { authenticated: false },
    { headers: { "Set-Cookie": clearFounderSessionCookie(), "Cache-Control": "no-store" } },
  );
}
