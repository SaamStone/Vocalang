# Vocalang

Vocalang is a multilingual AI voice platform website prototype built with Next.js, React, and TypeScript.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project notes

The current experience includes the public marketing site, demo player UI, pricing, authentication screens, and dashboard prototypes. Provider integrations and several form flows are placeholders; do not put API keys in client-side code. Configure secrets through environment variables when backend integrations are added.

## Demo request storage

The `/demo` and `/contact` forms submit to the server-side `/api/demo-request` route. In production, configure Cloudflare D1 before accepting submissions:

- `CLOUDFLARE_ACCOUNT_ID`
- `CLOUDFLARE_D1_DATABASE_ID`
- `CLOUDFLARE_API_TOKEN` (server-side secret with D1 Read and D1 Write permissions)

For local development, copy `.env.example` to `.env.local` and fill in these values. The D1 table is created automatically when the first form is submitted. Production submissions fail with a friendly error if D1 is not configured; they are not written to ephemeral serverless disk.

The private Founder Dashboard at `/founder-preview` reads recent website submissions from the same D1 table. Set `FOUNDER_DASHBOARD_PASSWORD` and `FOUNDER_SESSION_SECRET` in the deployment environment to enable founder sign-in; the session secret must be at least 32 characters. Keep all five values server-side and redeploy after changing them. In local development, the dashboard reads D1 when configured or the local JSONL fallback otherwise. The Website data page shows the storage source, and the Integrations page reports D1 as connected only after a successful data read.
