import { randomUUID } from "node:crypto";
import { appendFile, mkdir, readFile } from "node:fs/promises";
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

const storeDirectory = path.join(process.cwd(), ".data");
const storePath = path.join(storeDirectory, "demo-requests.jsonl");
const d1AccountId = process.env.CLOUDFLARE_ACCOUNT_ID;
const d1DatabaseId = process.env.CLOUDFLARE_D1_DATABASE_ID;
const d1ApiToken = process.env.CLOUDFLARE_API_TOKEN;

export const demoRequestStorage = d1AccountId && d1DatabaseId && d1ApiToken ? "cloudflare-d1" : "local";

function d1IsConfigured() {
  return demoRequestStorage === "cloudflare-d1";
}

function removeExactDuplicates(records: DemoRequestRecord[]) {
  const seen = new Set<string>();
  return records.filter((record) => {
    const key = [record.name, record.email, record.phone, record.organization, record.callVolume, record.industry, record.language, record.notes]
      .map((value) => value.trim().toLowerCase())
      .join("\u0000");
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
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

export async function saveDemoRequest(record: DemoRequestRecord) {
  if (d1IsConfigured()) {
    await ensureD1Table();
    await d1Query(
      `INSERT INTO demo_requests (id, submitted_at, name, phone, email, organization, call_volume, industry, language, notes)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
      [
        randomUUID(),
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

export async function listDemoRequests(limit = 200): Promise<DemoRequestRecord[]> {
  if (d1IsConfigured()) {
    await ensureD1Table();
    const rows = await d1Query(
      `SELECT id, submitted_at, name, phone, email, organization, call_volume, industry, language, notes
       FROM demo_requests ORDER BY submitted_at DESC LIMIT ?;`,
      [String(Math.max(1, Math.min(500, Math.floor(limit))))],
    ) as Array<{
      id: string;
      submitted_at: string;
      name: string;
      phone: string;
      email: string;
      organization: string;
      call_volume: string;
      industry: string;
      language: string;
      notes: string;
    }>;

    return removeExactDuplicates(rows.map((row) => ({
      id: row.id,
      submittedAt: row.submitted_at,
      name: row.name,
      phone: row.phone,
      email: row.email,
      organization: row.organization,
      callVolume: row.call_volume,
      industry: row.industry,
      language: row.language,
      notes: row.notes,
    })));
  }

  if (process.env.NODE_ENV === "production") {
    throw new Error("Cloudflare D1 must be configured before reading production demo requests.");
  }

  const contents = await readFile(storePath, "utf8").catch((error: NodeJS.ErrnoException) => {
    if (error.code === "ENOENT") return "";
    throw error;
  });

  const records = contents
    .split(/\r?\n/)
    .filter(Boolean)
    .slice(-Math.max(1, Math.min(500, Math.floor(limit))))
    .reverse()
    .map((line) => JSON.parse(line) as DemoRequestRecord);
  return removeExactDuplicates(records);
}
