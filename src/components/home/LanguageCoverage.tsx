"use client";

import { AudioLines, Languages } from "lucide-react";
import { cn } from "@/lib/utils";

const supportedLanguages = [
  { name: "English", native: "English", code: "en-IN" },
  { name: "Hindi", native: "हिन्दी", code: "hi-IN" },
  { name: "Telugu", native: "తెలుగు", code: "te-IN" },
];

const languageTints = [
  "border-violet-200/80 bg-violet-50/80 dark:border-violet-300/15 dark:bg-violet-950/25",
  "border-rose-200/80 bg-rose-50/75 dark:border-rose-300/15 dark:bg-rose-950/20",
  "border-amber-200/80 bg-amber-50/75 dark:border-amber-300/15 dark:bg-amber-950/20",
  "border-sky-200/80 bg-sky-50/75 dark:border-sky-300/15 dark:bg-sky-950/20",
  "border-emerald-200/80 bg-emerald-50/75 dark:border-emerald-300/15 dark:bg-emerald-950/20",
  "border-indigo-200/80 bg-indigo-50/75 dark:border-indigo-300/15 dark:bg-indigo-950/20",
  "border-fuchsia-200/80 bg-fuchsia-50/75 dark:border-fuchsia-300/15 dark:bg-fuchsia-950/20",
  "border-orange-200/80 bg-orange-50/75 dark:border-orange-300/15 dark:bg-orange-950/20",
  "border-cyan-200/80 bg-cyan-50/75 dark:border-cyan-300/15 dark:bg-cyan-950/20",
  "border-teal-200/80 bg-teal-50/75 dark:border-teal-300/15 dark:bg-teal-950/20",
  "border-purple-200/80 bg-purple-50/75 dark:border-purple-300/15 dark:bg-purple-950/20",
  "border-lime-200/80 bg-lime-50/75 dark:border-lime-300/15 dark:bg-lime-950/20",
];

export function LanguageCoverage() {
  return (
    <div className="overflow-hidden rounded-[1.75rem] border border-[rgb(var(--color-border))] bg-[rgb(var(--color-card))] shadow-[var(--shadow-lg)]">
      <div className="flex flex-col gap-6 border-b border-[rgb(var(--color-border))] p-5 sm:p-7 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[.14em] text-[rgb(var(--color-accent))]">
            <Languages className="h-4 w-4" aria-hidden="true" /> Languages
          </div>
          <h3 className="text-2xl font-semibold tracking-tight text-[rgb(var(--color-foreground))] sm:text-3xl">
            Conversations in three languages
          </h3>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[rgb(var(--color-muted-foreground))]">
            Sample scripts cover English, Hindi, and Telugu. This page does not connect to a live voice agent.
          </p>
        </div>

        <span className="inline-flex shrink-0 items-center gap-2 rounded-full border border-[rgb(var(--color-border))] bg-[rgb(var(--color-muted))] px-4 py-2.5 text-sm font-medium text-[rgb(var(--color-muted-foreground))]">
          <AudioLines className="h-4 w-4" aria-hidden="true" /> Voice agent languages
        </span>
      </div>

      <div className="px-5 pb-6 pt-5 sm:px-7 sm:pb-7">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <p className="text-sm font-medium text-[rgb(var(--color-foreground))]" aria-live="polite">
            Sample conversation languages
          </p>
          <span className="rounded-full bg-[rgb(var(--color-accent-soft))] px-3 py-1.5 text-xs font-semibold text-[rgb(var(--color-accent))]">
            {supportedLanguages.length} languages
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4">
          {supportedLanguages.map((language, index) => (
            <article key={language.code} className={cn("group flex min-h-[86px] items-center gap-3 rounded-2xl border p-3.5 transition duration-200 hover:-translate-y-0.5 hover:shadow-sm sm:p-4", languageTints[index % languageTints.length])}>
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/70 bg-white/75 text-lg font-semibold text-[rgb(var(--color-foreground))] shadow-sm dark:border-white/10 dark:bg-white/5" lang={language.code.split("-")[0]}>
                {language.native}
              </span>
              <span className="min-w-0">
                <span className="block truncate text-sm font-semibold text-[rgb(var(--color-foreground))]">{language.name}</span>
                <span className="mt-1 block font-mono text-[10px] tracking-wide text-[rgb(var(--color-muted-foreground))]">{language.code}</span>
              </span>
            </article>
          ))}
        </div>

      </div>
    </div>
  );
}
