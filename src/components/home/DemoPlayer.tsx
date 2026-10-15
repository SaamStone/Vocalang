"use client";

import { useEffect, useState } from "react";
import {
  AudioLines,
  Check,
  Headphones,
  Mic2,
  Pause,
  Play,
  RotateCcw,
  UserRound,
  Volume2,
} from "lucide-react";
import { siteConfig } from "@/lib/config/site";
import { cn } from "@/lib/utils";

const SAMPLE_SECONDS = 20;

function formatTime(seconds: number) {
  const mins = Math.floor(seconds / 60).toString().padStart(2, "0");
  const secs = (seconds % 60).toString().padStart(2, "0");
  return `${mins}:${secs}`;
}

/** Interactive, visual-only call preview with industry-specific sample conversations. */
export function DemoPlayer() {
  const [activeTab, setActiveTab] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(0);

  const industry = siteConfig.industries[activeTab] ?? siteConfig.industries[0]!;

  const transcript = industry.sampleTranscript;
  const visibleMessages = !isPlaying && elapsed === 0
    ? 0
    : Math.min(transcript.length, Math.floor(elapsed / 4) + 1);
  const progress = Math.min(1, elapsed / SAMPLE_SECONDS);

  useEffect(() => {
    if (!isPlaying) return;

    const timer = window.setTimeout(() => {
      const nextElapsed = elapsed + 1;
      setElapsed(nextElapsed);
      if (nextElapsed >= SAMPLE_SECONDS) setIsPlaying(false);
    }, 1000);
    return () => window.clearTimeout(timer);
  }, [elapsed, isPlaying]);

  const handlePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
      return;
    }
    if (elapsed >= SAMPLE_SECONDS) setElapsed(0);
    setIsPlaying(true);
  };

  const handleTabChange = (index: number) => {
    setActiveTab(index);
    setIsPlaying(false);
    setElapsed(0);
  };

  return (
    <div className="mx-auto max-w-6xl">
      <section className="overflow-hidden rounded-[2rem] border border-violet-200/70 bg-[rgb(var(--color-card))] p-2 shadow-[0_28px_90px_-38px_rgba(55,42,32,0.32)] ring-4 ring-violet-200/35 dark:border-violet-400/15 dark:ring-violet-950/50">
        <div className="flex flex-col gap-3 p-2 sm:p-3">
        <p className="px-1 text-[10px] font-semibold uppercase tracking-[.17em] text-[rgb(var(--color-muted-foreground))] sm:text-xs">Choose a sample scenario</p>
        <div className="grid grid-cols-2 gap-1 rounded-2xl border border-[rgb(var(--color-border))] bg-[rgb(var(--color-muted))] p-1 sm:grid-cols-4" role="group" aria-label="Choose a sample industry">
          {siteConfig.industries.map((item, index) => (
            <button
              key={item.slug}
              type="button"
              onClick={() => handleTabChange(index)}
              aria-pressed={index === activeTab}
              className={cn(
                "flex min-h-12 items-center justify-center gap-2 rounded-xl px-3 py-2 text-center text-[11px] font-semibold leading-tight transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgb(var(--color-ring))] sm:min-h-14 sm:text-sm",
                index === activeTab
                  ? "bg-[rgb(var(--color-card))] text-[rgb(var(--color-foreground))] shadow-[0_2px_10px_rgba(28,27,25,0.08)] ring-1 ring-[rgb(var(--color-border))] dark:bg-[rgb(var(--color-background))] dark:ring-white/10"
                  : "text-[rgb(var(--color-muted-foreground))] hover:bg-[rgb(var(--color-card))/0.65] hover:text-[rgb(var(--color-foreground))]"
              )}
            >
              <span className="font-mono text-[10px] opacity-55">0{index + 1}</span>
              {item.name}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-hidden rounded-[1.55rem] border border-[rgb(var(--color-border))] bg-[rgb(var(--color-card))]">
        <div className="grid lg:grid-cols-[0.82fr_1.18fr]">
          <div className="relative isolate flex min-h-[330px] flex-col overflow-hidden bg-[#201f1d] p-6 text-white sm:p-8 lg:min-h-[400px]">
            <div className="pointer-events-none absolute -right-20 -top-20 -z-10 h-64 w-64 rounded-full bg-[rgb(var(--color-accent))] opacity-20 blur-[90px]" />
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[.16em] text-white/65">
                <AudioLines className="h-4 w-4 text-[#ff9a69]" aria-hidden="true" /> Vocalang call preview
              </div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[11px] font-medium text-white/80">
                <span className="h-1.5 w-1.5 rounded-full bg-[#8fdaa3]" /> Sample
              </span>
            </div>

            <div className="my-auto py-10 text-center">
              <div className="relative mx-auto flex h-24 w-24 items-center justify-center rounded-full border border-white/15 bg-white/[.07] shadow-[0_0_0_12px_rgba(255,255,255,.025)]">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#f07845] text-white shadow-lg">
                  <Mic2 className="h-7 w-7" aria-hidden="true" />
                </div>
              </div>
              <p className="mt-7 text-xs font-medium uppercase tracking-[.16em] text-white/55">Your AI voice agent</p>
              <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white">Vocalang assistant</h3>
              <p className="mt-2 text-sm text-white/65">A sample call for {industry.name.toLowerCase()}</p>
            </div>

            <div className="flex items-center justify-between border-t border-white/10 pt-4 text-xs text-white/60">
              <span className="inline-flex items-center gap-2"><Volume2 className="h-4 w-4" aria-hidden="true" /> Conversation preview</span>
              <span className="inline-flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-[#8fdaa3]" aria-hidden="true" /> AI identified</span>
            </div>
          </div>

          <div className="flex min-h-[400px] flex-col p-5 sm:p-8">
            <div className="flex items-start justify-between gap-4 border-b border-[rgb(var(--color-border))] pb-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[.15em] text-[rgb(var(--color-muted-foreground))]">Conversation preview</p>
                <h3 className="mt-2 text-xl font-semibold text-[rgb(var(--color-foreground))]">A natural first conversation</h3>
              </div>
              <span className="hidden rounded-full bg-[rgb(var(--color-accent-soft))] px-3 py-1.5 text-xs font-medium text-[rgb(var(--color-accent))] sm:inline-flex">{industry.name}</span>
            </div>

            <div className="flex flex-1 flex-col justify-center gap-3 py-5" aria-live="polite" aria-label="Sample call transcript">
              {transcript.slice(0, visibleMessages).map((message, index) => {
                const isAgent = message.role === "agent";

                return (
                  <div
                    key={`${industry.slug}-${index}`}
                    className={cn(
                      "flex items-end gap-2.5",
                      isAgent ? "justify-start" : "justify-end",

                    )}

                  >
                    {isAgent && (
                      <span className="mb-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[rgb(var(--color-accent-soft))] text-[rgb(var(--color-accent))]">
                        <AudioLines className="h-3.5 w-3.5" aria-hidden="true" />
                      </span>
                    )}
                    <div className={cn(
                      "max-w-[86%] rounded-2xl px-4 py-3 text-sm leading-6",
                      isAgent
                        ? "rounded-bl-md bg-[rgb(var(--color-muted))] text-[rgb(var(--color-foreground))]"
                        : "rounded-br-md bg-[rgb(var(--color-foreground))] text-[rgb(var(--color-background))]"
                    )}>
                      <span className="mb-1 block text-[10px] font-semibold uppercase tracking-[.12em] opacity-60">
                        {isAgent ? "Vocalang assistant" : "Customer"}
                      </span>
                      {message.text}
                    </div>
                    {!isAgent && (
                      <span className="mb-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[rgb(var(--color-border))] text-[rgb(var(--color-muted-foreground))]">
                        <UserRound className="h-3.5 w-3.5" aria-hidden="true" />
                      </span>
                    )}
                  </div>
                );
              })}

              {visibleMessages === 0 && (
                <div className="flex min-h-40 flex-col items-center justify-center text-center">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border border-[rgb(var(--color-border))] text-[rgb(var(--color-muted-foreground))]">
                    <Headphones className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <p className="mt-3 text-sm font-medium text-[rgb(var(--color-foreground))]">Ready when you are</p>
                  <p className="mt-1 text-xs text-[rgb(var(--color-muted-foreground))]">Play the sample to reveal the conversation</p>
                </div>
              )}
            </div>

            <div className="border-t border-[rgb(var(--color-border))] pt-4">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handlePlay}
                  aria-label={isPlaying ? "Pause sample conversation" : elapsed >= SAMPLE_SECONDS ? "Replay sample conversation" : "Play sample conversation"}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[rgb(var(--color-primary))] text-white transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgb(var(--color-ring))]"
                >
                  {isPlaying ? <Pause className="h-4 w-4 fill-current" aria-hidden="true" /> : elapsed >= SAMPLE_SECONDS ? <RotateCcw className="h-4 w-4" aria-hidden="true" /> : <Play className="ml-0.5 h-4 w-4 fill-current" aria-hidden="true" />}
                </button>

                <div className="min-w-0 flex-1">
                  <div className="mb-2 flex items-center justify-between text-[11px] font-medium tabular-nums text-[rgb(var(--color-muted-foreground))]">
                    <span>{isPlaying ? "Playing sample" : elapsed >= SAMPLE_SECONDS ? "Sample complete" : "Sample call"}</span>
                    <span>{formatTime(elapsed)} <span className="opacity-50">/ {formatTime(SAMPLE_SECONDS)}</span></span>
                  </div>
                  <div className="flex h-8 items-center gap-[3px]" role="progressbar" aria-label="Sample playback progress" aria-valuemin={0} aria-valuemax={SAMPLE_SECONDS} aria-valuenow={elapsed}>
                    {Array.from({ length: 48 }, (_, index) => {
                      const height = Math.round(18 + (Math.sin(index * 0.57) + 1) * 16);
                      const hasPlayed = index < Math.round(progress * 48);
                      return <span key={index} className={cn("flex-1 rounded-full transition-colors duration-200", hasPlayed ? "bg-[rgb(var(--color-accent))]" : "bg-[rgb(var(--color-border))]")} style={{ height: `${height}%` }} />;
                    })}
                  </div>
                </div>
              </div>
              <p className="mt-3 text-center text-[11px] text-[rgb(var(--color-muted-foreground))]">Visual sample only · No call is placed and no audio is played</p>
            </div>
          </div>
        </div>
      </div>
      </section>

    </div>
  );
}
