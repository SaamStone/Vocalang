import type { Metadata } from "next";
import { FounderLoginForm } from "./FounderLoginForm";
import { founderAuthConfigured } from "@/lib/founder-auth";

export const metadata: Metadata = { title: "Founder sign in", robots: { index: false, follow: false } };

export default function FounderLoginPage() {
  if (!founderAuthConfigured()) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[rgb(var(--color-background))] px-4 py-12">
        <section className="w-full max-w-md rounded-3xl border border-[rgb(var(--color-border))] bg-[rgb(var(--color-card))] p-7 shadow-xl sm:p-9">
          <p className="marketing-kicker">Private access</p>
          <h1 className="mt-2 text-3xl text-[rgb(var(--color-foreground))]">Founder access setup</h1>
          <p className="mt-3 text-sm leading-6 text-[rgb(var(--color-muted-foreground))]">Add the founder login and session secret environment variables in Vercel, then redeploy to enable sign in.</p>
        </section>
      </main>
    );
  }
  return <FounderLoginForm />;
}
