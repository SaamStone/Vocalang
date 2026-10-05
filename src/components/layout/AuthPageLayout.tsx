import type { ReactNode } from "react";
import { ArrowUpRight, Check, MessageCircle, ShieldCheck, Sparkles } from "lucide-react";
import { Logo } from "@/components/layout/Logo";

export function AuthPageLayout({ mode, children }: { mode: "login" | "signup"; children: ReactNode }) {
  const signingUp = mode === "signup";

  return (
    <section className="auth-page relative isolate flex min-h-[calc(100vh-4.5rem)] items-center overflow-hidden px-4 py-10 sm:px-6 lg:px-8">
      <div className="auth-page-glow auth-page-glow--one" aria-hidden="true" />
      <div className="auth-page-glow auth-page-glow--two" aria-hidden="true" />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-8 lg:grid-cols-[1fr_minmax(0,30rem)] lg:gap-14">
        <aside className="auth-story relative hidden min-h-[42rem] flex-col justify-between overflow-hidden rounded-[2rem] border border-white/50 p-10 lg:flex xl:p-12">
          <div className="auth-story-orb auth-story-orb--one" aria-hidden="true" />
          <div className="auth-story-orb auth-story-orb--two" aria-hidden="true" />

          <div className="relative z-10">
            <Logo size="default" />
            <div className="mt-24 max-w-lg">
              <p className="marketing-kicker">Voice conversations, shaped around you</p>
              <h2 className="text-5xl leading-[1.08] text-[rgb(var(--color-foreground))] xl:text-6xl">
                {signingUp ? "Make every first conversation count." : "Good to have you back."}
              </h2>
              <p className="mt-6 max-w-md text-base leading-7 text-[rgb(var(--color-muted-foreground))]">
                {signingUp
                  ? "Set up a workspace for your team and tailor the questions and business context behind each campaign."
                  : "Pick up where your team left off. Your campaigns, call outcomes, and next steps stay together."}
              </p>
            </div>
          </div>

          <div className="auth-preview relative rounded-[1.5rem] border border-white/70 bg-white/60 p-5 shadow-[0_20px_60px_rgba(45,36,28,.08)] backdrop-blur-xl">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-[rgb(var(--color-foreground))] text-white"><MessageCircle className="h-4 w-4" aria-hidden="true" /></span>
                <div><p className="text-sm font-semibold text-[rgb(var(--color-foreground))]">A clearer calling workflow</p><p className="mt-0.5 text-xs text-[rgb(var(--color-muted-foreground))]">Made for your team</p></div>
              </div>
              <Sparkles className="h-5 w-5 text-[rgb(var(--color-accent))]" aria-hidden="true" />
            </div>
            <div className="mt-5 grid grid-cols-2 gap-2 text-xs font-medium text-[rgb(var(--color-foreground))]">
              <span className="flex items-center gap-2 rounded-xl bg-white/75 px-3 py-2.5"><Check className="h-3.5 w-3.5 text-[rgb(var(--color-accent))]" /> Your call questions</span>
              <span className="flex items-center gap-2 rounded-xl bg-white/75 px-3 py-2.5"><ShieldCheck className="h-3.5 w-3.5 text-[rgb(var(--color-accent))]" /> Campaign controls</span>
            </div>
            <ArrowUpRight className="absolute -right-2 -top-2 h-8 w-8 rounded-full bg-white p-2 text-[rgb(var(--color-foreground))] shadow-md" aria-hidden="true" />
          </div>
        </aside>

        <div className="w-full">{children}</div>
      </div>
    </section>
  );
}
