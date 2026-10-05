"use client";

import { useState } from "react";
import { AudioLines, Captions, Languages } from "lucide-react";
import { cn } from "@/lib/utils";

const voiceAgentLanguages = [
  { name: "English", native: "English", code: "en-IN" },
  { name: "Hindi", native: "हिन्दी", code: "hi-IN" },
  { name: "Assamese", native: "অসমীয়া", code: "as-IN" },
  { name: "Bengali", native: "বাংলা", code: "bn-IN" },
  { name: "Gujarati", native: "ગુજરાતી", code: "gu-IN" },
  { name: "Kannada", native: "ಕನ್ನಡ", code: "kn-IN" },
  { name: "Malayalam", native: "മലയാളം", code: "ml-IN" },
  { name: "Marathi", native: "मराठी", code: "mr-IN" },
  { name: "Odia", native: "ଓଡ଼ିଆ", code: "od-IN" },
  { name: "Punjabi", native: "ਪੰਜਾਬੀ", code: "pa-IN" },
  { name: "Tamil", native: "தமிழ்", code: "ta-IN" },
  { name: "Telugu", native: "తెలుగు", code: "te-IN" },
];

const speechToTextLanguages = [
  ...voiceAgentLanguages,
  { name: "Bodo", native: "बड़ो", code: "brx-IN" },
  { name: "Dogri", native: "डोगरी", code: "doi-IN" },
  { name: "Kashmiri", native: "कॉशुर", code: "ks-IN" },
  { name: "Konkani", native: "कोंकणी", code: "kok-IN" },
  { name: "Maithili", native: "मैथिली", code: "mai-IN" },
  { name: "Manipuri", native: "মৈতৈলোন্", code: "mni-IN" },
  { name: "Nepali", native: "नेपाली", code: "ne-IN" },
  { name: "Sanskrit", native: "संस्कृतम्", code: "sa-IN" },
  { name: "Santali", native: "ᱥᱟᱱᱛᱟᱲᱤ", code: "sat-IN" },
  { name: "Sindhi", native: "سنڌي", code: "sd-IN" },
  { name: "Urdu", native: "اردو", code: "ur-IN" },
];

type Capability = "voice" | "speech";

export function SarvamLanguageCoverage() {
  const [capability, setCapability] = useState<Capability>("voice");
  const languages = capability === "voice" ? voiceAgentLanguages : speechToTextLanguages;

  return (
    <div className="overflow-hidden rounded-[1.75rem] border border-[rgb(var(--color-border))] bg-[rgb(var(--color-card))] shadow-[var(--shadow-lg)]">
      <div className="flex flex-col gap-6 border-b border-[rgb(var(--color-border))] p-5 sm:p-7 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[.14em] text-[rgb(var(--color-accent))]">
            <Languages className="h-4 w-4" aria-hidden="true" /> Sarvam language coverage
          </div>
          <h3 className="text-2xl font-semibold tracking-tight text-[rgb(var(--color-foreground))] sm:text-3xl">
            One platform, different language reach
          </h3>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[rgb(var(--color-muted-foreground))]">
            Language coverage depends on the Sarvam capability. Choose a view to see which languages its current documentation lists.
          </p>
        </div>

        <div className="inline-flex shrink-0 rounded-full border border-[rgb(var(--color-border))] bg-[rgb(var(--color-muted))] p-1" aria-label="Choose a Sarvam capability">
          <button
            type="button"
            aria-pressed={capability === "voice"}
            onClick={() => setCapability("voice")}
            className={cn("inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition-colors", capability === "voice" ? "bg-[rgb(var(--color-foreground))] text-[rgb(var(--color-background))] shadow-sm" : "text-[rgb(var(--color-muted-foreground))] hover:text-[rgb(var(--color-foreground))]")}
          >
            <AudioLines className="h-4 w-4" aria-hidden="true" /> Voice agents
          </button>
          <button
            type="button"
            aria-pressed={capability === "speech"}
            onClick={() => setCapability("speech")}
            className={cn("inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition-colors", capability === "speech" ? "bg-[rgb(var(--color-foreground))] text-[rgb(var(--color-background))] shadow-sm" : "text-[rgb(var(--color-muted-foreground))] hover:text-[rgb(var(--color-foreground))]")}
          >
            <Captions className="h-4 w-4" aria-hidden="true" /> Speech to text
          </button>
        </div>
      </div>

      <div className="px-5 pb-6 pt-5 sm:px-7 sm:pb-7">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <p className="text-sm font-medium text-[rgb(var(--color-foreground))]" aria-live="polite">
            {capability === "voice" ? "11 Indian languages + English" : "22 Indian languages + English"}
          </p>
          <span className="rounded-full bg-[rgb(var(--color-accent-soft))] px-3 py-1.5 text-xs font-semibold text-[rgb(var(--color-accent))]">
            {languages.length} languages
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4">
          {languages.map((language) => (
            <article key={language.code} className="group flex min-h-[86px] items-center gap-3 rounded-2xl border border-[rgb(var(--color-border))] bg-[rgb(var(--color-background))] p-3.5 transition-colors hover:border-[rgb(var(--color-accent))/0.45] sm:p-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[rgb(var(--color-muted))] text-lg font-semibold text-[rgb(var(--color-foreground))]" lang={language.code.split("-")[0]}>
                {language.native}
              </span>
              <span className="min-w-0">
                <span className="block truncate text-sm font-semibold text-[rgb(var(--color-foreground))]">{language.name}</span>
                <span className="mt-1 block font-mono text-[10px] tracking-wide text-[rgb(var(--color-muted-foreground))]">{language.code}</span>
              </span>
            </article>
          ))}
        </div>

        <div className="mt-5 rounded-2xl bg-[rgb(var(--color-muted))] p-4 sm:flex sm:items-start sm:justify-between sm:gap-5">
          <p className="text-xs leading-5 text-[rgb(var(--color-muted-foreground))]">
            Vocalang&apos;s current demo focus is Telugu, Hindi, and English. Sarvam&apos;s broader model coverage does not mean every language is enabled in Vocalang today; the connected agent configuration determines what clients can use.
          </p>
          <div className="mt-3 flex shrink-0 gap-3 text-xs font-semibold sm:mt-0">
            <a className="text-[rgb(var(--color-foreground))] underline decoration-[rgb(var(--color-border))] underline-offset-4 hover:decoration-current" href="https://docs.sarvam.ai/conversations/overview" target="_blank" rel="noreferrer">Voice agent source</a>
            <a className="text-[rgb(var(--color-foreground))] underline decoration-[rgb(var(--color-border))] underline-offset-4 hover:decoration-current" href="https://docs.sarvam.ai/api-reference/speech-to-text/transcribe" target="_blank" rel="noreferrer">Speech source</a>
          </div>
        </div>
      </div>
    </div>
  );
}
