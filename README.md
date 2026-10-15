# Vocalang

Vocalang is a multilingual AI voice platform website prototype built with Next.js, React, and TypeScript.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project notes

The current experience includes the public marketing site, demo request forms, and pricing. Client and founder dashboards are not included. Provider integrations remain prototypes; do not put API keys in client-side code. Configure secrets through server-side environment variables.

## Demo request storage

The `/demo` and `/contact` forms submit to the server-side `/api/demo-request` route. In production, configure Cloudflare D1 before accepting submissions:

- `CLOUDFLARE_ACCOUNT_ID`
- `CLOUDFLARE_D1_DATABASE_ID`
- `CLOUDFLARE_API_TOKEN` (server-side secret with D1 Write permission)

For local development, copy `.env.example` to `.env.local` and fill in these values. The D1 table is created automatically when the first form is submitted. Production submissions fail with a friendly error if D1 is not configured; they are not written to ephemeral serverless disk.

Website demo and contact submissions are stored in the `demo_requests` D1 table. There is currently no dashboard UI for viewing them. In local development, submissions use the local JSONL fallback unless Cloudflare D1 environment variables are configured.
