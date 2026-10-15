import { cookies } from "next/headers";
import { createFounderSession, FOUNDER_SESSION_COOKIE, hasSameOrigin, validateFounderCredentials } from "@/lib/founder-auth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!hasSameOrigin(request)) return Response.json({ error: "Invalid request origin." }, { status: 403 });
  if (!process.env.FOUNDER_EMAIL || !process.env.FOUNDER_PASSWORD || (process.env.FOUNDER_SESSION_SECRET?.length ?? 0) < 32) {
    return Response.json({ error: "Founder access has not been configured yet." }, { status: 503 });
  }

  let body: { email?: unknown; password?: unknown };
  try {
    const raw = await request.text();
    if (raw.length > 4_000) return Response.json({ error: "Invalid sign-in request." }, { status: 400 });
    body = JSON.parse(raw) as typeof body;
  } catch {
    return Response.json({ error: "Invalid sign-in request." }, { status: 400 });
  }

  if (typeof body.email !== "string" || typeof body.password !== "string" || !validateFounderCredentials(body.email, body.password)) {
    return Response.json({ error: "Email or password is incorrect." }, { status: 401 });
  }

  const { token, maxAge } = createFounderSession(body.email);
  const cookieStore = await cookies();
  cookieStore.set(FOUNDER_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge,
  });
  return Response.json({ ok: true });
}
