import { createHash, createHmac, randomUUID, timingSafeEqual } from "node:crypto";

const COOKIE_NAME = "vocalang_founder_session";
const SESSION_TTL_SECONDS = 60 * 60 * 12;

export function founderAuthIsConfigured() {
  return Boolean(process.env.FOUNDER_DASHBOARD_PASSWORD && (process.env.FOUNDER_SESSION_SECRET?.length ?? 0) >= 32);
}

function safeEqual(left: string, right: string) {
  const leftHash = createHash("sha256").update(left).digest();
  const rightHash = createHash("sha256").update(right).digest();
  return timingSafeEqual(leftHash, rightHash);
}

export function isFounderPasswordValid(password: string) {
  const expected = process.env.FOUNDER_DASHBOARD_PASSWORD;
  return Boolean(expected && founderAuthIsConfigured() && safeEqual(password, expected));
}

function signature(payload: string) {
  return createHmac("sha256", process.env.FOUNDER_SESSION_SECRET!).update(payload).digest("base64url");
}

function readCookie(request: Request) {
  const value = request.headers.get("cookie")?.split(";").map((part) => part.trim()).find((part) => part.startsWith(`${COOKIE_NAME}=`));
  return value?.slice(COOKIE_NAME.length + 1) ?? "";
}

export function hasFounderSession(request: Request) {
  if (!founderAuthIsConfigured()) return false;
  const [encodedPayload, receivedSignature] = readCookie(request).split(".");
  if (!encodedPayload || !receivedSignature) return false;

  let payload: string;
  try {
    payload = Buffer.from(encodedPayload, "base64url").toString("utf8");
  } catch {
    return false;
  }

  const [expiresAt] = payload.split(".");
  if (!expiresAt || Number(expiresAt) < Date.now()) return false;
  return safeEqual(receivedSignature, signature(payload));
}

export function makeFounderSessionCookie() {
  const expiresAt = Date.now() + SESSION_TTL_SECONDS * 1000;
  const payload = `${expiresAt}.${randomUUID()}`;
  const value = `${Buffer.from(payload).toString("base64url")}.${signature(payload)}`;
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  return `${COOKIE_NAME}=${value}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${SESSION_TTL_SECONDS}${secure}`;
}

export function clearFounderSessionCookie() {
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  return `${COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0${secure}`;
}

export function requestHasValidOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  try {
    const originUrl = new URL(origin);
    const requestUrl = new URL(request.url);
    return originUrl.origin === requestUrl.origin ||
      (process.env.NODE_ENV !== "production" && ["localhost", "127.0.0.1"].includes(originUrl.hostname) && ["localhost", "127.0.0.1"].includes(requestUrl.hostname) && originUrl.port === requestUrl.port);
  } catch {
    return false;
  }
}
