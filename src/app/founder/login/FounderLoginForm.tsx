"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

export function FounderLoginForm() {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError("");
    const data = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/founder/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.get("email"), password: data.get("password") }),
      });
      const result = await response.json() as { error?: string };
      if (!response.ok) throw new Error(result.error || "Could not sign in.");
      router.replace("/founder");
      router.refresh();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not sign in.");
    } finally {
      setPending(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[rgb(var(--color-background))] px-4 py-12">
      <section className="w-full max-w-md rounded-3xl border border-[rgb(var(--color-border))] bg-[rgb(var(--color-card))] p-7 shadow-xl sm:p-9">
        <p className="marketing-kicker">Private access</p>
        <h1 className="mt-2 text-3xl text-[rgb(var(--color-foreground))]">Founder sign in</h1>
        <p className="mt-3 text-sm leading-6 text-[rgb(var(--color-muted-foreground))]">Sign in to review website demo and contact requests.</p>
        <form onSubmit={submit} className="mt-7 space-y-5">
          <label className="block text-sm font-medium" htmlFor="founder-email">Founder email
            <input id="founder-email" name="email" type="email" autoComplete="username" required className="mt-1.5 w-full rounded-xl border bg-[rgb(var(--color-input))] px-3.5 py-3 font-normal" />
          </label>
          <label className="block text-sm font-medium" htmlFor="founder-password">Password
            <input id="founder-password" name="password" type="password" autoComplete="current-password" required className="mt-1.5 w-full rounded-xl border bg-[rgb(var(--color-input))] px-3.5 py-3 font-normal" />
          </label>
          {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
          <button disabled={pending} className="w-full rounded-full bg-[rgb(var(--color-primary))] px-6 py-3.5 text-sm font-semibold text-white hover:bg-[rgb(var(--color-primary-hover))] disabled:opacity-60">
            {pending ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </section>
    </main>
  );
}
