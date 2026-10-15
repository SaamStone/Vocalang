import { cookies } from "next/headers";
import { createFounderSession, FOUNDER_SESSION_COOKIE, hasSameOrigin, validateFounderCredentials } from "@/lib/founder-auth";
import { clearFounderLoginFailures, recordFounderLoginFailure } from "@/lib/demo-request-store";

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

  if (typeof body.email !== "string" || typeof body.password !== "string") {
    return Response.json({ error: "Email or password is incorrect." }, { status: 401 });
  }

  if (!validateFounderCredentials(body.email, body.password)) {
    try {
      const attempts = await recordFounderLoginFailure(body.email);
      if (attempts >= 5) {
        return Response.json(
          { error: "Too many sign-in attempts. Please wait 15 minutes before trying again." },
          { status: 429, headers: { "Retry-After": "900" } },
        );
      }
    } catch {
      return Response.json({ error: "Sign-in is temporarily unavailable. Please try again shortly." }, { status: 503 });
    }
    return Response.json({ error: "Email or password is incorrect." }, { status: 401 });
  }

  try {
    await clearFounderLoginFailures(body.email);
  } catch {
    // A correct password remains usable during a D1 issue; the failure window expires on its own.
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
