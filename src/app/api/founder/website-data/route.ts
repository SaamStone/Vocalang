import { listDemoRequests } from "@/lib/demo-request-store";
import { hasFounderSession } from "@/lib/founder-session";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  if (process.env.NODE_ENV === "production" && !hasFounderSession(request)) {
    return Response.json({ error: "Founder sign-in is required." }, { status: 401, headers: { "Cache-Control": "no-store" } });
  }

  try {
    const requests = await listDemoRequests(200);
    return Response.json(
      { requests, storage: process.env.CLOUDFLARE_ACCOUNT_ID && process.env.CLOUDFLARE_D1_DATABASE_ID && process.env.CLOUDFLARE_API_TOKEN ? "cloudflare-d1" : "development-file" },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return Response.json({ error: "Website submissions could not be loaded." }, { status: 503, headers: { "Cache-Control": "no-store" } });
  }
}
