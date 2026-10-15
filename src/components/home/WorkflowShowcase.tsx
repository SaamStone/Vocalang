import { AudioLines } from "lucide-react";
import { DemoPlayer } from "@/components/home/DemoPlayer";

export function WorkflowShowcase() {
  return (
    <div className="mx-auto max-w-6xl">
      <div className="mx-auto mb-5 flex w-fit items-center gap-3 rounded-2xl border border-violet-300 bg-[rgb(var(--color-card))] px-5 py-3 text-[rgb(var(--color-foreground))] shadow-[0_10px_28px_-18px_rgba(76,55,140,0.45)] ring-2 ring-violet-200/60 dark:border-violet-400/30 dark:ring-violet-900/60">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[rgb(var(--color-accent-soft))] text-[rgb(var(--color-accent))]">
          <AudioLines className="h-5 w-5" aria-hidden="true" />
        </span>
        <span>
          <span className="block text-sm font-semibold sm:text-base">Voice Agents</span>
          <span className="mt-0.5 block text-xs text-[rgb(var(--color-muted-foreground))]">Calls and conversations</span>
        </span>
      </div>
      <DemoPlayer />
    </div>
  );
}
