import { createHmac, randomUUID } from "node:crypto";
import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";

export type DemoRequestRecord = {
  id?: string;
  submittedAt: string;
  name: string;
  phone: string;
  email: string;
  organization: string;
  callVolume: string;
  industry: string;
  language: string;
  notes: string;
};

export type StoredDemoRequest = DemoRequestRecord & { id: string };

const storeDirectory = path.join(process.cwd(), ".data");
const storePath = path.join(storeDirectory, "demo-requests.jsonl");
const d1AccountId = process.env.CLOUDFLARE_ACCOUNT_ID;
const d1DatabaseId = process.env.CLOUDFLARE_D1_DATABASE_ID;
const d1ApiToken = process.env.CLOUDFLARE_API_TOKEN;

export const demoRequestStorage = d1AccountId && d1DatabaseId && d1ApiToken ? "cloudflare-d1" : "local";

function d1IsConfigured() {
  return demoRequestStorage === "cloudflare-d1";
}

async function d1Query(sql: string, params: string[] = []) {
  if (!d1IsConfigured()) throw new Error("Cloudflare D1 is not configured.");

  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${d1AccountId}/d1/database/${d1DatabaseId}/query`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${d1ApiToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sql, params }),
      cache: "no-store",
    },
  );

  const payload = await response.json() as {
    success?: boolean;
    result?: Array<{ success?: boolean; results?: unknown[] }>;
  };

  if (!response.ok || !payload.success || payload.result?.some((item) => item.success === false)) {
    throw new Error("Cloudflare D1 request failed.");
  }

  return payload.result?.flatMap((result) => result.results ?? []) ?? [];
}

async function ensureD1Table() {
  await d1Query(
    `CREATE TABLE IF NOT EXISTS demo_requests (
      id TEXT PRIMARY KEY,
      submitted_at TEXT NOT NULL,
      name TEXT NOT NULL,
      phone TEXT NOT NULL DEFAULT '',
      email TEXT NOT NULL,
      organization TEXT NOT NULL DEFAULT '',
      call_volume TEXT NOT NULL DEFAULT '',
      industry TEXT NOT NULL DEFAULT '',
      language TEXT NOT NULL DEFAULT '',
      notes TEXT NOT NULL DEFAULT ''
    );`,
  );
  await d1Query("CREATE INDEX IF NOT EXISTS demo_requests_submitted_at ON demo_requests(submitted_at);");
}

async function ensureFounderLoginAttemptTable() {
  await d1Query(
    `CREATE TABLE IF NOT EXISTS founder_login_attempts (
      email_hash TEXT PRIMARY KEY,
      window_started INTEGER NOT NULL,
      attempts INTEGER NOT NULL
    );`,
  );
}

function founderEmailHash(email: string) {
  const secret = process.env.FOUNDER_SESSION_SECRET;
  if (!secret || secret.length < 32) throw new Error("Founder session secret is not configured.");
  return createHmac("sha256", secret).update(email.trim().toLowerCase()).digest("hex");
}

export async function recordFounderLoginFailure(email: string) {
  if (!d1IsConfigured()) throw new Error("Cloudflare D1 is not configured.");
  await ensureFounderLoginAttemptTable();
  const now = Math.floor(Date.now() / 1000);
  const expiredBefore = now - 15 * 60;
  const rows = await d1Query(
    `INSERT INTO founder_login_attempts (email_hash, window_started, attempts)
     VALUES (?, ?, 1)
     ON CONFLICT(email_hash) DO UPDATE SET
       attempts = CASE WHEN window_started <= ? THEN 1 ELSE attempts + 1 END,
       window_started = CASE WHEN window_started <= ? THEN ? ELSE window_started END
     RETURNING attempts;`,
    [founderEmailHash(email), String(now), String(expiredBefore), String(expiredBefore), String(now)],
  );
  return Number((rows[0] as { attempts?: unknown } | undefined)?.attempts ?? 1);
}

export async function clearFounderLoginFailures(email: string) {
  if (!d1IsConfigured()) return;
  await ensureFounderLoginAttemptTable();
  await d1Query("DELETE FROM founder_login_attempts WHERE email_hash = ?;", [founderEmailHash(email)]);
}

export async function listDemoRequests(): Promise<StoredDemoRequest[]> {
  if (!d1IsConfigured()) {
    throw new Error("Cloudflare D1 is not configured.");
  }

  await ensureD1Table();
  const rows = await d1Query(
    `SELECT id, submitted_at, name, phone, email, organization, call_volume, industry, language, notes
     FROM demo_requests ORDER BY submitted_at DESC LIMIT 500;`,
  );

  return rows.map((row) => {
    const item = row as Record<string, unknown>;
    return {
      id: String(item.id ?? ""),
      submittedAt: String(item.submitted_at ?? ""),
      name: String(item.name ?? ""),
      phone: String(item.phone ?? ""),
      email: String(item.email ?? ""),
      organization: String(item.organization ?? ""),
      callVolume: String(item.call_volume ?? ""),
      industry: String(item.industry ?? ""),
      language: String(item.language ?? ""),
      notes: String(item.notes ?? ""),
    };
  });
}

export async function saveDemoRequest(record: DemoRequestRecord) {
  if (d1IsConfigured()) {
    await ensureD1Table();
    const id = randomUUID();
    await d1Query(
      `INSERT INTO demo_requests (id, submitted_at, name, phone, email, organization, call_volume, industry, language, notes)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
      [
        id,
        record.submittedAt,
        record.name,
        record.phone,
        record.email,
        record.organization,
        record.callVolume,
        record.industry,
        record.language,
        record.notes,
      ],
    );
    return;
  }

  if (process.env.NODE_ENV === "production") {
    throw new Error("Cloudflare D1 must be configured before storing production demo requests.");
  }

  await mkdir(storeDirectory, { recursive: true });
  await appendFile(storePath, `${JSON.stringify(record)}\n`, { encoding: "utf8", flag: "a" });
}
