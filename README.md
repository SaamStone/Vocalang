# Vocalang

Vocalang is a multilingual AI voice platform website prototype built with Next.js, React, and TypeScript.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project notes

The current experience includes the public marketing site, demo request forms, pricing, and a private founder requests dashboard. The founder area is available directly at `/founder` and is not linked from the public site. Provider integrations remain prototypes; do not put API keys in client-side code. Configure secrets through server-side environment variables.

## Demo request storage

The `/demo` and `/contact` forms submit to the server-side `/api/demo-request` route. In production, configure Cloudflare D1 before accepting submissions:

- `CLOUDFLARE_ACCOUNT_ID`
- `CLOUDFLARE_D1_DATABASE_ID`
- `CLOUDFLARE_API_TOKEN` (server-side secret with D1 Write permission)
- `FOUNDER_EMAIL` (the founder's sign-in email)
- `FOUNDER_PASSWORD` (a unique, strong founder password)
- `FOUNDER_SESSION_SECRET` (random secret, at least 32 characters)

For local development, copy `.env.example` to `.env.local` and fill in these values. The D1 table is created automatically when the first form is submitted. Production submissions fail with a friendly error if D1 is not configured; they are not written to ephemeral serverless disk.

Website demo and contact submissions are stored in the `demo_requests` D1 table. Sign in at `/founder/login` to view them; the dashboard page and D1 access are server-side and require a signed, HTTP-only session cookie. Set all three founder variables in Vercel's Project Settings → Environment Variables, then redeploy. Keep them out of `NEXT_PUBLIC_` variables and source control. The dashboard is deliberately omitted from public navigation. In local development, submissions use the local JSONL fallback unless Cloudflare D1 environment variables are configured; the dashboard reads D1 only.
