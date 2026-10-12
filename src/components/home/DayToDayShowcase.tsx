"use client";

import { useState } from "react";
import {
  Activity, ArrowUpRight, AudioLines, Check, CheckCircle2, Clock3,
  Download, FileAudio, FileText, ListChecks, Phone, Plus, ShieldCheck,
  Sparkles, Upload, Users,
} from "lucide-react";
import { cn } from "@/lib/utils";

const workflows = [
  { id: "contacts", number: "01", label: "Prepare contacts", hint: "Clean lists, ready to call", icon: Users, title: "A clear list before launch", description: "Review contact details and validation status before a campaign starts." },
  { id: "agent", number: "02", label: "Shape the conversation", hint: "Language, voice and questions", icon: AudioLines, title: "Make every call feel considered", description: "Set the language, opening, and questions that guide each conversation." },
  { id: "campaign", number: "03", label: "Follow campaign progress", hint: "See every call at a glance", icon: Activity, title: "Know what is happening", description: "Follow campaign activity and spot answered, missed, and pending calls." },
  { id: "results", number: "04", label: "Review outcomes", hint: "Responses, transcripts and exports", icon: FileText, title: "Turn conversations into next steps", description: "Review response summaries, recordings, and transcripts in one place." },
] as const;

type WorkflowId = (typeof workflows)[number]["id"];

export function DayToDayShowcase() {
  const [active, setActive] = useState<WorkflowId>("contacts");
  const selected = workflows.find((item) => item.id === active) ?? workflows[0];

  return (
    <div className="mx-auto max-w-7xl">
      <div role="tablist" aria-label="Explore the Vocalang workflow" className="grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
        {workflows.map(({ id, number, label, hint, icon: Icon }) => (
          <button key={id} type="button" role="tab" aria-selected={active === id} aria-controls={`day-preview-${id}`} id={`day-tab-${id}`} onMouseEnter={() => setActive(id)} onFocus={() => setActive(id)} onClick={() => setActive(id)} className={cn("group flex min-h-[5.5rem] items-center gap-3 rounded-2xl border px-4 py-3 text-left transition duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgb(var(--color-ring))]", active === id ? "border-[rgb(var(--color-accent))/0.5] bg-[rgb(var(--color-card))] shadow-[0_12px_36px_-22px_rgba(45,31,99,.45)] ring-1 ring-[rgb(var(--color-accent))/0.15]" : "border-[rgb(var(--color-border))] bg-[rgb(var(--color-card))/0.55] hover:bg-[rgb(var(--color-card))]")}>
            <span className={cn("flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors", active === id ? "bg-[rgb(var(--color-accent-soft))] text-[rgb(var(--color-accent))]" : "bg-[rgb(var(--color-muted))] text-[rgb(var(--color-muted-foreground))]")}><Icon className="h-5 w-5" aria-hidden="true" /></span>
            <span className="min-w-0"><span className="block text-sm font-semibold text-[rgb(var(--color-foreground))]">{label}</span><span className="mt-1 block text-xs text-[rgb(var(--color-muted-foreground))]">{hint}</span></span>
            <span className="ml-auto self-start font-mono text-[10px] text-[rgb(var(--color-muted-foreground))]">{number}</span>
          </button>
        ))}
      </div>

      <section role="tabpanel" id={`day-preview-${active}`} aria-labelledby={`day-tab-${active}`} className="relative isolate mt-5 overflow-hidden rounded-[2rem] border border-violet-200/60 bg-[rgb(var(--color-card))] p-2 shadow-[0_30px_90px_-42px_rgba(44,34,80,.38)] ring-4 ring-violet-200/25 dark:border-violet-300/10 dark:ring-violet-950/50">
        <div className="pointer-events-none absolute -left-24 -top-28 -z-10 h-72 w-72 rounded-full bg-violet-400/15 blur-[90px]" />
        <div className="grid overflow-hidden rounded-[1.55rem] lg:grid-cols-[.78fr_1.22fr]">
          <aside className="relative isolate flex min-h-[310px] flex-col justify-between overflow-hidden bg-[#201f1d] p-6 text-white sm:p-9">
            <div className="pointer-events-none absolute -bottom-24 -right-10 -z-10 h-72 w-72 rounded-full bg-[#c276ff]/20 blur-[95px]" />
            <div className="flex items-center justify-between gap-3"><span className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[.18em] text-white/60"><Sparkles className="h-3.5 w-3.5 text-violet-300" aria-hidden="true" /> The Vocalang workflow</span><span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] text-white/55">Preview</span></div>
            <div className="py-10" key={selected.id}>
              <p className="font-mono text-xs text-violet-300">STEP {selected.number} / 04</p>
              <h3 className="mt-4 max-w-md text-3xl font-medium leading-tight tracking-tight text-white sm:text-[2.6rem]">{selected.title}</h3>
              <p className="mt-4 max-w-md text-sm leading-6 text-white/65">{selected.description}</p>
            </div>
            <p className="max-w-md border-t border-white/10 pt-4 text-xs leading-5 text-white/60">Vocalang’s current demo focus is Telugu, Hindi, and English. Sarvam’s broader model coverage does not mean every language is enabled in Vocalang today; the connected agent configuration determines what clients can use.</p>
          </aside>
          <div className="min-w-0 bg-[rgb(var(--color-background))] p-4 sm:p-7 lg:p-8" key={`${selected.id}-preview`}>
            <div className="flex items-center justify-between gap-4 border-b border-[rgb(var(--color-border))] pb-4"><div><p className="text-[10px] font-semibold uppercase tracking-[.16em] text-[rgb(var(--color-muted-foreground))]">Workspace preview</p><h4 className="mt-1 text-sm font-semibold text-[rgb(var(--color-foreground))]">{selected.label}</h4></div><span className="inline-flex items-center gap-1.5 rounded-full border border-[rgb(var(--color-border))] bg-[rgb(var(--color-card))] px-2.5 py-1.5 text-[10px] text-[rgb(var(--color-muted-foreground))]"><span className="h-1.5 w-1.5 rounded-full bg-violet-400" /> Example data</span></div>
            <PreviewCanvas active={active} />
            <p className="mt-4 text-center text-[10px] leading-4 text-[rgb(var(--color-muted-foreground))]">Illustrative interface · Features and data connections will be completed as the platform is built.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

function PreviewCanvas({ active }: { active: WorkflowId }) {
  if (active === "contacts") return <div className="mt-5 rounded-2xl border border-[rgb(var(--color-border))] bg-[rgb(var(--color-card))] p-4 sm:p-5"><div className="flex flex-wrap items-center justify-between gap-3"><div><p className="text-sm font-semibold text-[rgb(var(--color-foreground))]">Summer launch · contact list</p><p className="mt-1 text-xs text-[rgb(var(--color-muted-foreground))]">Imported just now · 248 contacts</p></div><span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[rgb(var(--color-accent-soft))] text-[rgb(var(--color-accent))]"><Upload className="h-4 w-4" aria-hidden="true" /></span></div><div className="mt-5 grid grid-cols-3 gap-2"><MiniStat value="248" label="Contacts" /><MiniStat value="241" label="Ready" /><MiniStat value="7" label="Review" /></div><div className="mt-4 space-y-2"><ContactRow name="Ananya Rao" detail="+91 98••• 2481" status="Ready" /><ContactRow name="Rahul Mehta" detail="+91 97••• 6314" status="Ready" /><ContactRow name="Priya Nair" detail="Email needs review" status="Review" /></div></div>;
  if (active === "agent") return <div className="mt-5 grid gap-3 sm:grid-cols-2"><div className="rounded-2xl border border-[rgb(var(--color-border))] bg-[rgb(var(--color-card))] p-4 sm:p-5"><p className="text-xs font-semibold text-[rgb(var(--color-foreground))]">Conversation setup</p><div className="mt-4 space-y-3"><SetupRow icon={AudioLines} label="Voice style" value="Warm and conversational" /><SetupRow icon={Users} label="Language" value="Telugu · English" /><SetupRow icon={ListChecks} label="Questions" value="3 prompts added" /></div></div><div className="flex flex-col justify-between rounded-2xl bg-[#23211f] p-5 text-white"><div><span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-violet-200"><AudioLines className="h-4 w-4" aria-hidden="true" /></span><p className="mt-5 text-xs font-medium text-white/55">OPENING LINE</p><p className="mt-2 text-sm leading-6">“Hello, am I speaking with {"{{first_name}}"}? I’m calling from {"{{business}}"}...”</p></div><span className="mt-5 inline-flex items-center gap-2 text-[10px] text-white/50"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-300" aria-hidden="true" /> Your call flow at a glance</span></div></div>;
  if (active === "campaign") return <div className="mt-5 rounded-2xl border border-[rgb(var(--color-border))] bg-[rgb(var(--color-card))] p-4 sm:p-5"><div className="flex flex-wrap items-center justify-between gap-3"><div><p className="text-sm font-semibold text-[rgb(var(--color-foreground))]">Summer launch</p><p className="mt-1 text-xs text-[rgb(var(--color-muted-foreground))]">Campaign activity · Example</p></div><span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[10px] font-semibold text-emerald-700 dark:text-emerald-300"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> In progress</span></div><div className="mt-5 flex items-end gap-1.5" aria-hidden="true">{Array.from({ length: 42 }, (_, i) => <span key={i} className="flex-1 rounded-t-sm bg-gradient-to-t from-violet-500/70 to-fuchsia-300/90" style={{ height: `${16 + ((i * 29 + 17) % 72)}px`, opacity: i > 29 ? 0.35 : 1 }} />)}</div><div className="mt-3 flex justify-between text-[10px] text-[rgb(var(--color-muted-foreground))]"><span>09:00 · Started</span><span>Now · Updating</span></div><div className="mt-5 grid grid-cols-3 gap-2"><MiniStat value="186" label="Completed" /><MiniStat value="42" label="In queue" /><MiniStat value="76%" label="Reached" /></div></div>;
  return <div className="mt-5 rounded-2xl border border-[rgb(var(--color-border))] bg-[rgb(var(--color-card))] p-4 sm:p-5"><div className="flex flex-wrap items-center justify-between gap-3"><div><p className="text-sm font-semibold text-[rgb(var(--color-foreground))]">Call outcomes</p><p className="mt-1 text-xs text-[rgb(var(--color-muted-foreground))]">Example campaign results</p></div><span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[rgb(var(--color-accent-soft))] text-[rgb(var(--color-accent))]"><Download className="h-4 w-4" aria-hidden="true" /></span></div><div className="mt-4 space-y-2"><OutcomeRow icon={CheckCircle2} title="Interested" detail="Asked for a follow-up" count="64" color="text-emerald-600 dark:text-emerald-300" /><OutcomeRow icon={Phone} title="Call back later" detail="Preferred another time" count="38" color="text-amber-600 dark:text-amber-300" /><OutcomeRow icon={FileAudio} title="Recording & transcript" detail="Review the conversation" count="186" color="text-violet-600 dark:text-violet-300" /></div><div className="mt-4 flex items-center gap-2 rounded-xl bg-[rgb(var(--color-muted))] p-3 text-[10px] leading-4 text-[rgb(var(--color-muted-foreground))]"><ShieldCheck className="h-4 w-4 shrink-0 text-[rgb(var(--color-accent))]" aria-hidden="true" /> Outcome records and exports will be managed from your workspace.</div></div>;
}

function MiniStat({ value, label }: { value: string; label: string }) { return <div className="rounded-xl bg-[rgb(var(--color-muted))] px-3 py-3"><p className="text-base font-semibold tabular-nums text-[rgb(var(--color-foreground))]">{value}</p><p className="mt-1 text-[10px] text-[rgb(var(--color-muted-foreground))]">{label}</p></div>; }

function ContactRow({ name, detail, status }: { name: string; detail: string; status: string }) { return <div className="flex items-center justify-between gap-2 rounded-xl border border-[rgb(var(--color-border))] px-3 py-2.5"><div className="flex min-w-0 items-center gap-2.5"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[rgb(var(--color-muted))] text-[10px] font-semibold text-[rgb(var(--color-muted-foreground))]">{name.split(" ").map((part) => part[0]).join("")}</span><div className="min-w-0"><p className="truncate text-[11px] font-medium text-[rgb(var(--color-foreground))]">{name}</p><p className="truncate text-[10px] text-[rgb(var(--color-muted-foreground))]">{detail}</p></div></div><span className="shrink-0 rounded-full bg-[rgb(var(--color-muted))] px-2 py-1 text-[9px] text-[rgb(var(--color-muted-foreground))]">{status}</span></div>; }

function SetupRow({ icon: Icon, label, value }: { icon: typeof AudioLines; label: string; value: string }) { return <div className="flex items-center gap-2.5"><Icon className="h-4 w-4 text-[rgb(var(--color-accent))]" aria-hidden="true" /><div><p className="text-[10px] text-[rgb(var(--color-muted-foreground))]">{label}</p><p className="text-xs font-medium text-[rgb(var(--color-foreground))]">{value}</p></div></div>; }

function OutcomeRow({ icon: Icon, title, detail, count, color }: { icon: typeof Check; title: string; detail: string; count: string; color: string }) { return <div className="flex items-center gap-3 rounded-xl border border-[rgb(var(--color-border))] px-3 py-2.5"><Icon className={cn("h-4 w-4 shrink-0", color)} aria-hidden="true" /><div className="min-w-0 flex-1"><p className="text-[11px] font-medium text-[rgb(var(--color-foreground))]">{title}</p><p className="text-[10px] text-[rgb(var(--color-muted-foreground))]">{detail}</p></div><span className="text-xs font-semibold tabular-nums text-[rgb(var(--color-foreground))]">{count}</span></div>; }
