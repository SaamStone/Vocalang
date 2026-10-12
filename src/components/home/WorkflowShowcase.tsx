"use client";

import { useEffect, useState } from "react";
import { AudioLines, Captions, Play, Volume2 } from "lucide-react";
import { DemoPlayer } from "@/components/home/DemoPlayer";
import { cn } from "@/lib/utils";

type Capability = "voice" | "tts" | "stt";
const capabilities: { id: Capability; label: string; description: string; icon: typeof AudioLines }[] = [
  { id: "voice", label: "Voice Agents", description: "Calls and conversations", icon: AudioLines },
  { id: "tts", label: "Text to Speech", description: "Turn scripts into speech", icon: Volume2 },
  { id: "stt", label: "Speech to Text", description: "Capture spoken responses", icon: Captions },
];

export function WorkflowShowcase() {
  const [active, setActive] = useState<Capability>("voice");

  return (
    <div className="mx-auto max-w-6xl">
      <div role="tablist" aria-label="Vocalang voice capabilities" className="grid grid-cols-1 gap-2 sm:grid-cols-3">
        {capabilities.map(({ id, label, description, icon: Icon }) => (
          <button
            key={id}
            type="button"
            role="tab"
            id={`workflow-tab-${id}`}
            aria-selected={active === id}
            aria-controls={`workflow-panel-${id}`}
            onMouseEnter={() => setActive(id)}
            onFocus={() => setActive(id)}
            onClick={() => setActive(id)}
            className={cn(
              "flex min-h-[4.5rem] items-center gap-3 rounded-2xl border px-4 py-3 text-left transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgb(var(--color-ring))] sm:min-h-[5.25rem] sm:px-5",
              active === id
                ? "border-violet-300 bg-[rgb(var(--color-card))] text-[rgb(var(--color-foreground))] shadow-[0_10px_28px_-18px_rgba(76,55,140,0.45)] ring-2 ring-violet-200/60 dark:border-violet-400/30 dark:ring-violet-900/60"
                : "border-[rgb(var(--color-border))] bg-[rgb(var(--color-card))]/70 text-[rgb(var(--color-muted-foreground))] hover:bg-[rgb(var(--color-card))] hover:text-[rgb(var(--color-foreground))]"
            )}
          >
            <span className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-xl", active === id ? "bg-[rgb(var(--color-accent-soft))] text-[rgb(var(--color-accent))]" : "bg-[rgb(var(--color-muted))]")}>
              <Icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-semibold sm:text-base">{label}</span>
              <span className="mt-0.5 block text-xs text-[rgb(var(--color-muted-foreground))]">{description}</span>
            </span>
          </button>
        ))}
      </div>

      <div className="mt-5" role="tabpanel" id={`workflow-panel-${active}`} aria-labelledby={`workflow-tab-${active}`}>
        {active === "voice" && <DemoPlayer />}
        {active === "tts" && <TextToSpeechPreview />}
        {active === "stt" && <SpeechToTextPreview />}
      </div>
    </div>
  );
}

const sampleTranscript: Record<string, string> = {
  "en-IN": "Hello, I’m interested in the offer. Could you call me tomorrow afternoon?",
  "hi-IN": "नमस्ते, मुझे इस प्रस्ताव में रुचि है। क्या आप मुझे कल दोपहर कॉल कर सकते हैं?",
  "te-IN": "నమస్కారం, ఈ ఆఫర్‌పై నాకు ఆసక్తి ఉంది. రేపు మధ్యాహ్నం నాకు కాల్ చేయగలరా?",
};

const sampleSpeech: Record<string, string> = {
  "en-IN": "Hello! Thank you for your interest. I would be happy to help you with the next steps.",
  "hi-IN": "नमस्ते! आपकी रुचि के लिए धन्यवाद। मैं आगे की प्रक्रिया में आपकी मदद कर सकता हूँ।",
  "te-IN": "నమస్కారం! మీ ఆసక్తికి ధన్యవాదాలు. తదుపరి దశల్లో మీకు సహాయం చేయడానికి నేను సిద్ధంగా ఉన్నాను.",
};

function TextToSpeechPreview() {
  const [language, setLanguage] = useState("en-IN");
  const [text, setText] = useState(sampleSpeech["en-IN"]);
  const [voiceStyle, setVoiceStyle] = useState("Conversational · warm");
  const [isPreviewing, setIsPreviewing] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isPreviewing) return;
    const startedAt = Date.now();
    const timer = window.setInterval(() => {
      const nextProgress = Math.min(100, Math.round(((Date.now() - startedAt) / 1800) * 100));
      setProgress(nextProgress);
      if (nextProgress >= 100) setIsPreviewing(false);
    }, 60);
    return () => window.clearInterval(timer);
  }, [isPreviewing]);

  const onLanguageChange = (value: string) => {
    setLanguage(value);
    setText(sampleSpeech[value] ?? sampleSpeech["en-IN"]);
    setIsPreviewing(false);
    setProgress(0);
  };

  return (
    <section className="overflow-hidden rounded-[2rem] border border-violet-200/70 bg-[rgb(var(--color-card))] shadow-[0_28px_90px_-38px_rgba(55,42,32,0.32)] ring-4 ring-violet-200/35 dark:border-violet-400/15 dark:ring-violet-950/50">
      <div className="grid lg:grid-cols-[0.72fr_1.28fr]">
        <aside className="relative isolate flex min-h-[300px] flex-col justify-between overflow-hidden bg-[#201f1d] p-6 text-white sm:p-8">
          <div className="pointer-events-none absolute -right-14 -top-14 -z-10 h-64 w-64 rounded-full bg-[#f07845] opacity-20 blur-[90px]" />
          <p className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[.16em] text-white/65"><Volume2 className="h-4 w-4 text-[#ff9a69]" aria-hidden="true" /> Text to Speech</p>
          <div className="py-8">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-[#ff9a69]"><AudioLines className="h-7 w-7" aria-hidden="true" /></span>
            <h3 className="mt-6 max-w-sm text-3xl font-medium tracking-tight text-white">Give your script a voice.</h3>
            <p className="mt-3 max-w-sm text-sm leading-6 text-white/65">Choose a language, adjust the sample, and preview the playback experience.</p>
          </div>
          <p className="border-t border-white/10 pt-4 text-xs leading-5 text-white/55">Interface preview only. Sarvam audio generation will be connected later.</p>
        </aside>
        <div className="p-5 sm:p-8">
          <div className="flex flex-wrap gap-4">
            <label className="min-w-[9rem] flex-1 text-xs font-semibold text-[rgb(var(--color-foreground))]">Language
              <select value={language} onChange={(event) => onLanguageChange(event.target.value)} className="mt-2 block w-full rounded-xl border border-[rgb(var(--color-border))] bg-[rgb(var(--color-background))] px-3 py-2.5 text-sm font-normal text-[rgb(var(--color-foreground))]">
                <option value="en-IN">English</option><option value="hi-IN">Hindi</option><option value="te-IN">Telugu</option>
              </select>
            </label>
            <label className="min-w-[9rem] flex-1 text-xs font-semibold text-[rgb(var(--color-foreground))]">Voice style
              <select value={voiceStyle} onChange={(event) => setVoiceStyle(event.target.value)} className="mt-2 block w-full rounded-xl border border-[rgb(var(--color-border))] bg-[rgb(var(--color-background))] px-3 py-2.5 text-sm font-normal text-[rgb(var(--color-foreground))]">
                <option>Conversational · warm</option><option>Professional · clear</option><option>Friendly · upbeat</option>
              </select>
            </label>
          </div>
          <label className="mt-5 block text-xs font-semibold text-[rgb(var(--color-foreground))]">Sample text
            <textarea value={text} onChange={(event) => setText(event.target.value)} maxLength={500} rows={5} className="mt-2 block w-full resize-y rounded-2xl border border-[rgb(var(--color-border))] bg-[rgb(var(--color-background))] p-4 text-sm font-normal leading-6 text-[rgb(var(--color-foreground))] outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--color-ring))]" />
          </label>
          <div className="mt-5 rounded-2xl border border-[rgb(var(--color-border))] bg-[rgb(var(--color-background))] p-4">
            <div className="flex items-center justify-between text-[11px] font-medium text-[rgb(var(--color-muted-foreground))]"><span>{isPreviewing ? "Preparing sample preview" : progress === 100 ? "Sample preview complete" : "Sample playback preview"}</span><span>{progress}%</span></div>
            <div className="mt-3 flex h-7 items-center gap-1" aria-hidden="true">{Array.from({ length: 32 }, (_, i) => <span key={i} className={cn("flex-1 rounded-full transition-colors", i < Math.round(progress / 100 * 32) ? "bg-[rgb(var(--color-accent))]" : "bg-[rgb(var(--color-border))]")} style={{ height: `${28 + ((i * 17) % 67)}%` }} />)}</div>
          </div>
          <div className="mt-4 rounded-2xl border border-dashed border-[rgb(var(--color-border))] bg-[rgb(var(--color-background))] p-4" aria-label="Generated audio response placeholder">
            <div className="flex items-center gap-2 text-xs font-semibold text-[rgb(var(--color-foreground))]"><Volume2 className="h-4 w-4 text-[rgb(var(--color-accent))]" aria-hidden="true" />Generated audio response</div>
            <div className="mt-3 flex min-h-14 items-center justify-center rounded-xl bg-[rgb(var(--color-muted))] px-3 text-center text-xs text-[rgb(var(--color-muted-foreground))]">Generated audio and playback controls will appear here after API connection.</div>
          </div>
          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs text-[rgb(var(--color-muted-foreground))]">{text.length} / 500 characters</p>
            <button type="button" onClick={() => { setProgress(0); setIsPreviewing(true); }} disabled={!text.trim() || isPreviewing} className="inline-flex items-center gap-2 rounded-full bg-[rgb(var(--color-primary))] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-45">
              <Play className="h-4 w-4" aria-hidden="true" />{isPreviewing ? "Previewing..." : "Preview playback"}
            </button>
          </div>
          <p className="mt-3 text-right text-[11px] text-[rgb(var(--color-muted-foreground))]">No audio is generated in this preview.</p>
        </div>
      </div>
    </section>
  );
}

function SpeechToTextPreview() {
  const [language, setLanguage] = useState("en-IN");
  const [isPreviewing, setIsPreviewing] = useState(false);
  const [transcript, setTranscript] = useState("");

  useEffect(() => {
    if (!isPreviewing) return;
    const timer = window.setTimeout(() => {
      setTranscript(sampleTranscript[language] ?? sampleTranscript["en-IN"]);
      setIsPreviewing(false);
    }, 1100);
    return () => window.clearTimeout(timer);
  }, [isPreviewing, language]);

  return (
    <section className="overflow-hidden rounded-[2rem] border border-violet-200/70 bg-[rgb(var(--color-card))] shadow-[0_28px_90px_-38px_rgba(55,42,32,0.32)] ring-4 ring-violet-200/35 dark:border-violet-400/15 dark:ring-violet-950/50">
      <div className="grid lg:grid-cols-[0.72fr_1.28fr]">
        <aside className="relative isolate flex min-h-[300px] flex-col justify-between overflow-hidden bg-[#201f1d] p-6 text-white sm:p-8">
          <div className="pointer-events-none absolute -right-14 -top-14 -z-10 h-64 w-64 rounded-full bg-[#8b82d8] opacity-25 blur-[90px]" />
          <p className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[.16em] text-white/65"><Captions className="h-4 w-4 text-[#b9b2ff]" aria-hidden="true" /> Speech to Text</p>
          <div className="py-8">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-[#c6c0ff]"><AudioLines className="h-7 w-7" aria-hidden="true" /></span>
            <h3 className="mt-6 max-w-sm text-3xl font-medium tracking-tight text-white">Turn spoken replies into clear text.</h3>
            <p className="mt-3 max-w-sm text-sm leading-6 text-white/65">Preview how a caller’s response can appear as a readable transcript.</p>
          </div>
          <p className="border-t border-white/10 pt-4 text-xs leading-5 text-white/55">Interface preview only. No microphone is used; Sarvam transcription will be connected later.</p>
        </aside>
        <div className="flex min-h-[400px] flex-col p-5 sm:p-8">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[rgb(var(--color-border))] pb-5">
            <label className="text-xs font-semibold text-[rgb(var(--color-foreground))]">Recognition language
              <select value={language} onChange={(event) => { setLanguage(event.target.value); setTranscript(""); }} disabled={isPreviewing} className="mt-2 block min-w-44 rounded-xl border border-[rgb(var(--color-border))] bg-[rgb(var(--color-background))] px-3 py-2.5 text-sm font-normal text-[rgb(var(--color-foreground))] disabled:opacity-60">
                <option value="en-IN">English</option><option value="hi-IN">Hindi</option><option value="te-IN">Telugu</option>
              </select>
            </label>
            <button type="button" onClick={() => { setTranscript(""); setIsPreviewing(true); }} disabled={isPreviewing} className="inline-flex items-center gap-2 rounded-full bg-[rgb(var(--color-primary))] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-45">
              <Play className="h-4 w-4" aria-hidden="true" />{isPreviewing ? "Preparing sample..." : "Preview sample transcript"}
            </button>
          </div>
          <div className="my-5 flex flex-1 flex-col rounded-2xl border border-[rgb(var(--color-border))] bg-[rgb(var(--color-background))] p-5 sm:p-6" aria-live="polite">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[.13em] text-[rgb(var(--color-muted-foreground))]">
              <span className={cn("h-2 w-2 rounded-full", isPreviewing ? "animate-pulse bg-violet-500" : transcript ? "bg-emerald-500" : "bg-[rgb(var(--color-border))]")} />
              {isPreviewing ? "Preparing sample" : transcript ? "Sample transcript" : "Transcription response"}
            </div>
            <p className="mt-5 whitespace-pre-wrap text-base leading-8 text-[rgb(var(--color-foreground))]">{transcript || (isPreviewing ? "Converting a sample response to text…" : "Recognized speech will appear here after API connection." )}</p>
          </div>
          <p className="text-[11px] leading-5 text-[rgb(var(--color-muted-foreground))]">Sample transcript only. Live speech capture and transcription will be added after API setup.</p>
        </div>
      </div>
    </section>
  );
}
