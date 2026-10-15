import { createHmac, createHash, timingSafeEqual } from "node:crypto";

export const FOUNDER_SESSION_COOKIE = "vocalang_founder_session";
const SESSION_LIFETIME_SECONDS = 60 * 60 * 8;

function safeEqual(left: string, right: string) {
  const leftHash = createHash("sha256").update(left).digest();
  const rightHash = createHash("sha256").update(right).digest();
  return timingSafeEqual(leftHash, rightHash);
}

export function founderAuthConfigured() {
  return Boolean(
    process.env.FOUNDER_EMAIL?.trim() &&
    process.env.FOUNDER_PASSWORD &&
    (process.env.FOUNDER_SESSION_SECRET?.length ?? 0) >= 32,
  );
}

export function validateFounderCredentials(email: string, password: string) {
  const expectedEmail = process.env.FOUNDER_EMAIL?.trim().toLowerCase();
  const expectedPassword = process.env.FOUNDER_PASSWORD;
  if (!expectedEmail || !expectedPassword || !founderAuthConfigured()) return false;
  return safeEqual(email.trim().toLowerCase(), expectedEmail) && safeEqual(password, expectedPassword);
}

function signature(payload: string) {
  const secret = process.env.FOUNDER_SESSION_SECRET;
  if (!secret || secret.length < 32) throw new Error("Founder session secret is not configured.");
  return createHmac("sha256", secret).update(payload).digest("base64url");
}

export function createFounderSession(email: string) {
  const expiresAt = Math.floor(Date.now() / 1000) + SESSION_LIFETIME_SECONDS;
  const payload = Buffer.from(JSON.stringify({ email: email.trim().toLowerCase(), expiresAt })).toString("base64url");
  return { token: `${payload}.${signature(payload)}`, maxAge: SESSION_LIFETIME_SECONDS };
}

export function isFounderSessionValid(token?: string) {
  if (!token || !founderAuthConfigured()) return false;
  const [payload, suppliedSignature, ...extra] = token.split(".");
  if (!payload || !suppliedSignature || extra.length) return false;

  let expectedSignature: string;
  try {
    expectedSignature = signature(payload);
  } catch {
    return false;
  }
  if (!safeEqual(suppliedSignature, expectedSignature)) return false;

  try {
    const session = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as { email?: unknown; expiresAt?: unknown };
    return typeof session.email === "string" &&
      session.email === process.env.FOUNDER_EMAIL?.trim().toLowerCase() &&
      typeof session.expiresAt === "number" && session.expiresAt > Math.floor(Date.now() / 1000);
  } catch {
    return false;
  }
}

export function hasSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  try {
    const originHost = new URL(origin).host.toLowerCase();
    const allowedHosts = [request.headers.get("host"), request.headers.get("x-forwarded-host"), new URL(request.url).host]
      .flatMap((value) => value?.split(",") ?? [])
      .map((value) => value.trim().toLowerCase())
      .filter(Boolean);
    return allowedHosts.includes(originHost);
  } catch {
    return false;
  }
}
