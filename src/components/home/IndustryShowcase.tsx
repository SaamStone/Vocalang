import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowUpRight, BarChart3, Building2, GraduationCap, Plane, Users } from "lucide-react";
import { siteConfig } from "@/lib/config/site";

const industryArt = {
  "real-estate": { icon: Building2, tone: "peach", label: "LEAD QUALIFICATION", stat: "01", detail: "Site visits · Buyer follow-up" },
  education: { icon: GraduationCap, tone: "lavender", label: "ADMISSIONS", stat: "02", detail: "Enquiries · Deadline reminders" },
  "study-abroad": { icon: Plane, tone: "blue", label: "STUDENT ENQUIRIES", stat: "03", detail: "Consultations · Application updates" },
  recruiting: { icon: Users, tone: "mint", label: "CANDIDATE SCREENING", stat: "04", detail: "Availability · Interview scheduling" },
} as const;

function IndustryCard({ industry, duplicate = false }: { industry: (typeof siteConfig.industries)[number]; duplicate?: boolean }) {
  const art = industryArt[industry.slug];
  const Icon = art.icon;

  return (
    <Link
      href={`/industries/${industry.slug}`}
      aria-hidden={duplicate || undefined}
      tabIndex={duplicate ? -1 : undefined}
      className={`industry-showcase-card industry-showcase-card--${art.tone} group block w-[min(80vw,21rem)] shrink-0 overflow-hidden rounded-[1.65rem] border border-[rgb(var(--color-border))] bg-[rgb(var(--color-card))] p-3 shadow-[var(--shadow-md)] transition duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-xl)] sm:w-[22rem]`}
    >
      <div className="industry-showcase-art relative flex h-48 items-center justify-center overflow-hidden rounded-[1.2rem] p-6 sm:h-52">
        <span className="industry-showcase-orbit absolute h-36 w-36 rounded-full border sm:h-44 sm:w-44" aria-hidden="true" />
        <span className="absolute left-5 top-5 rounded-full border border-white/50 bg-white/50 px-3 py-1.5 text-[.62rem] font-semibold tracking-[.14em] text-[rgb(var(--color-foreground))] backdrop-blur-sm">{art.label}</span>
        <span className="absolute right-5 top-5 font-mono text-xs text-[rgb(var(--color-foreground))/0.55]">{art.stat} / 04</span>
        <span className="industry-showcase-icon relative z-10 grid h-24 w-24 place-items-center rounded-[1.8rem] border border-white/70 bg-white/65 text-[rgb(var(--color-foreground))] shadow-[0_18px_50px_rgba(60,45,35,.12)] backdrop-blur-sm transition duration-300 group-hover:scale-105 sm:h-28 sm:w-28">
          <Icon className="h-10 w-10 stroke-[1.35]" aria-hidden="true" />
        </span>
        <span className="absolute bottom-5 right-5 flex items-end gap-1" aria-hidden="true">
          {[18, 30, 23, 38, 27, 44, 33].map((height, index) => <i key={index} className="industry-showcase-bar block w-1.5 rounded-full" style={{ "--bar-height": `${height}px`, "--bar-delay": `${index * 55}ms` } as CSSProperties} />)}
        </span>
      </div>
      <div className="flex items-start justify-between gap-4 px-3 pb-3 pt-5">
        <div>
          <h3 className="text-lg font-semibold text-[rgb(var(--color-foreground))]">{industry.name}</h3>
          <p className="mt-1.5 text-sm leading-6 text-[rgb(var(--color-muted-foreground))]">{industry.shortDescription}</p>
          <p className="mt-3 text-xs font-medium text-[rgb(var(--color-muted-foreground))]">{art.detail}</p>
        </div>
        <span className="mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[rgb(var(--color-border))] text-[rgb(var(--color-foreground))] transition group-hover:border-[rgb(var(--color-foreground))] group-hover:bg-[rgb(var(--color-foreground))] group-hover:text-[rgb(var(--color-card))]">
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}

/** Auto-moving industry showcase inspired by image sliders, using Vocalang-specific artwork. */
export function IndustryShowcase() {
  return (
    <div className="industry-showcase relative">
      <div className="industry-showcase-mask overflow-hidden py-3" role="region" aria-label="Industries Vocalang supports" tabIndex={0}>
        <div className="industry-showcase-track flex w-max">
          {[false, true].map((duplicate) => (
            <div key={String(duplicate)} className="flex shrink-0 gap-4 pr-4" aria-hidden={duplicate || undefined}>
              {siteConfig.industries.map((industry) => <IndustryCard key={industry.slug} industry={industry} duplicate={duplicate} />)}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-5 flex items-center justify-between gap-4 px-1">
        <p className="text-xs text-[rgb(var(--color-muted-foreground))]">A few ways Vocalang can support your team</p>
        <span className="hidden items-center gap-2 text-xs font-medium text-[rgb(var(--color-muted-foreground))] sm:inline-flex"><BarChart3 className="h-4 w-4" aria-hidden="true" /> Hover to pause</span>
      </div>
    </div>
  );
}
