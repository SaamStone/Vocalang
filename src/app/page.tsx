import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Mic2,
  ShieldCheck,
  Upload,
} from "lucide-react";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { Button } from "@/components/shared/Button";
import { WorkflowShowcase } from "@/components/home/WorkflowShowcase";
import { DayToDayShowcase } from "@/components/home/DayToDayShowcase";
import { LanguageCoverage } from "@/components/home/LanguageCoverage";
import { IndustryShowcase } from "@/components/home/IndustryShowcase";
import { PricingPlans } from "@/components/shared/PricingPlans";
import { FAQAccordion } from "@/app/faq/FAQAccordion";
import { siteConfig } from "@/lib/config/site";
import { t } from "@/lib/i18n";
import { faqItems, pricingPlans } from "@/lib/mock-data";

const trustPoints = [
  "Demo and contact requests are stored in Cloudflare D1",
  "Founder sign-in protects the submissions dashboard",
  "Contact-list uploads are not enabled yet",
  "Voice calling is still in development",
];

const steps = [
  { icon: Upload, number: "01", title: "Tell us about your workflow", body: "Share your business details and the type of conversations you want to support." },
  { icon: Mic2, number: "02", title: "Meet with our team", body: "We will review your request and arrange a product demonstration around your needs." },
  { icon: BarChart3, number: "03", title: "Review the next steps", body: "Discuss language needs, pricing, and product availability before deciding whether to proceed." },
];

function SectionIntro({ eyebrow, title, body }: { eyebrow: string; title: string; body: string }) {
  return (
    <div className="mx-auto mb-12 max-w-2xl text-center sm:mb-16">
      <p className="marketing-kicker justify-center">{eyebrow}</p>
      <h2 className="text-4xl leading-tight text-[rgb(var(--color-foreground))] sm:text-5xl">{title}</h2>
      <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-[rgb(var(--color-muted-foreground))] sm:text-lg">{body}</p>
    </div>
  );
}
export default function HomePage() {
  return (
    <>
      <section className="marketing-hero relative overflow-hidden">
        <div className="marketing-hero-wash absolute inset-0" aria-hidden="true" />
        <div className="marketing-hero-orb absolute right-0 top-0 h-96 w-96 rounded-full blur-[128px]" aria-hidden="true" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 pb-20 pt-20 text-center sm:px-6 sm:pb-28 sm:pt-28 lg:px-8 lg:pt-36">
          <ScrollReveal className="mx-auto max-w-4xl">
            <p className="marketing-kicker justify-center">AI voice agents, built for India</p>
            <h1 className="marketing-display text-5xl leading-[1.02] text-[rgb(var(--color-foreground))] sm:text-6xl lg:text-7xl">
              {t("hero.title")}
            </h1>
            <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-[rgb(var(--color-muted-foreground))] sm:text-xl">
              Explore how multilingual AI calling could support your team. Request a demo to discuss your workflow.
            </p>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <Button href="/demo" size="lg">
                Book a demo <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button href="/contact" variant="outline" size="lg">Contact us</Button>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={150} className="mt-12 flex flex-wrap items-center justify-center gap-2.5">
            <span className="mr-1 text-xs font-medium uppercase tracking-[.16em] text-[rgb(var(--color-muted-foreground))]">Speaks</span>
            {siteConfig.supportedVoiceLanguages.map((language) => (
              <span key={language} className="rounded-full border border-[rgb(var(--color-border))] bg-[rgb(var(--color-card))/0.8] px-4 py-2 text-sm text-[rgb(var(--color-foreground))]">{language}</span>
            ))}
          </ScrollReveal>
        </div>
      </section>

      <section id="demo-preview" className="relative isolate scroll-mt-24 overflow-hidden bg-[rgb(var(--color-muted))] px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="pointer-events-none absolute -left-32 top-24 -z-10 h-80 w-80 rounded-full bg-[rgb(var(--color-accent))] opacity-[0.07] blur-[100px]" aria-hidden="true" />
        <div className="pointer-events-none absolute -right-24 bottom-0 -z-10 h-96 w-96 rounded-full bg-violet-400 opacity-[0.06] blur-[110px]" aria-hidden="true" />
        <div className="mx-auto max-w-7xl">
          <SectionIntro eyebrow="Vocalang workflow preview" title={t("demo.title")} body={t("demo.subtitle")} />
          <ScrollReveal>
            <WorkflowShowcase />
          </ScrollReveal>
        </div>
      </section>

      <section id="how-it-works" className="scroll-mt-24 bg-[rgb(var(--color-muted))] px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionIntro eyebrow="A simpler calling workflow" title={t("how.title")} body={t("how.subtitle")} />
          <div className="grid gap-4 md:grid-cols-3">
            {steps.map(({ icon: Icon, number, title, body }) => (
              <ScrollReveal key={number}>
                <article className="h-full rounded-[1.5rem] border border-[rgb(var(--color-border))] bg-[rgb(var(--color-card))] p-7 sm:p-8">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium tracking-[.16em] text-[rgb(var(--color-muted-foreground))]">{number}</span>
                    <Icon className="h-5 w-5 text-[rgb(var(--color-accent))]" aria-hidden="true" />
                  </div>
                  <h3 className="mt-12 text-xl font-semibold text-[rgb(var(--color-foreground))]">{title}</h3>
                  <p className="mt-3 leading-7 text-[rgb(var(--color-muted-foreground))]">{body}</p>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section id="industries" className="scroll-mt-24 bg-[rgb(var(--color-background))] px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionIntro eyebrow="Made for your work" title={t("industries.title")} body={t("industries.subtitle")} />
          <ScrollReveal><IndustryShowcase /></ScrollReveal>
        </div>
      </section>

      <section id="features" className="scroll-mt-24 bg-[rgb(var(--color-muted))] px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionIntro eyebrow="Designed for the day-to-day" title="Everything around the call matters" body="A campaign is easier to run when setup, timing, and follow-up are clear." />
          <ScrollReveal><DayToDayShowcase /></ScrollReveal>
        </div>
      </section>

      <section id="languages" className="scroll-mt-24 bg-[rgb(var(--color-background))] px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionIntro
            eyebrow="Made for India's many voices"
            title="Language support, shown clearly"
            body="Explore the languages available in the current Vocalang demo."
          />
          <ScrollReveal>
            <LanguageCoverage />
          </ScrollReveal>
        </div>
      </section>

      <section id="why-vocalang" className="scroll-mt-24 bg-[rgb(var(--color-background))] px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 rounded-[2rem] border border-[rgb(var(--color-border))] bg-[rgb(var(--color-card))] p-7 sm:p-10 lg:grid-cols-[.85fr_1.15fr] lg:items-center lg:p-14">
          <div>
            <p className="marketing-kicker">Trust by design</p>
            <h2 className="text-4xl leading-tight text-[rgb(var(--color-foreground))] sm:text-5xl">Clear, careful calling from the start</h2>
            <p className="mt-5 leading-7 text-[rgb(var(--color-muted-foreground))]">Vocalang is being built around transparent AI conversations and practical controls for contact data.</p>
            <Link href="/trust" className="mt-6 inline-flex items-center font-semibold text-[rgb(var(--color-foreground))]">How we approach trust <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {trustPoints.map((point) => <li key={point} className="flex gap-3 rounded-2xl bg-[rgb(var(--color-muted))] p-4 text-sm leading-6 text-[rgb(var(--color-foreground))]"><ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[rgb(var(--color-accent))]" aria-hidden="true" />{point}</li>)}
          </ul>
        </div>
      </section>

      <section id="pricing" className="scroll-mt-24 bg-[rgb(var(--color-muted))] px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionIntro eyebrow="Simple to understand" title={t("pricing.title")} body="Choose a voice tier and pay its listed rate per minute." />
          <PricingPlans plans={pricingPlans} />
        </div>
      </section>

      <section id="faq" className="scroll-mt-24 bg-[rgb(var(--color-background))] px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <SectionIntro eyebrow="Good to know" title={t("faq.title")} body="A few answers before you try Vocalang." />
          <FAQAccordion items={faqItems.slice(0, 6)} />
          <div className="mt-8 text-center"><Link href="/faq" className="inline-flex items-center font-semibold text-[rgb(var(--color-foreground))]">Read all FAQs <ArrowRight className="ml-2 h-4 w-4" /></Link></div>
        </div>
      </section>

      <section className="px-4 pb-20 sm:px-6 sm:pb-28 lg:px-8">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-slate-900 px-6 py-14 text-center text-white sm:px-12 sm:py-20">
          <p className="marketing-kicker justify-center !text-white/70">Make the next conversation count</p>
          <h2 className="text-4xl leading-tight text-white sm:text-5xl">See what a voice agent can do for your team</h2>
          <p className="mx-auto mt-4 max-w-xl leading-7 text-white/70">Try a sample call, then explore how Vocalang can fit your workflow.</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button href="/demo" className="bg-white text-slate-900 hover:bg-white/90">Book a demo <ArrowRight className="ml-2 h-4 w-4" /></Button>
            <Button href="/contact" variant="outline" className="border-white/30 text-white hover:bg-white/10">Contact us</Button>
          </div>
        </div>
      </section>
    </>
  );
}
