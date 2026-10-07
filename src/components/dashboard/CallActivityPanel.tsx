"use client";

import { useEffect, useMemo, useState } from "react";
import { mockCampaignApi } from "@/lib/mock-api/campaigns";
import { Button } from "@/components/shared/Button";
import { DownloadDoneIcon } from "@/components/ui/animated-state-icons";
import { ChevronLeft, ChevronRight, Eye } from "lucide-react";
import type { CallResult } from "@/types";

const ITEMS_PER_PAGE = 50;

const filters = [
  { id: "all", label: "All calls" },
  { id: "positive", label: "Positive" },
  { id: "other", label: "Other members" },
  { id: "whatsapp", label: "WhatsApp sent" },
  { id: "incoming", label: "Incoming" },
  { id: "follow_up", label: "Think / call back" },
  { id: "disconnected", label: "Disconnected" },
  { id: "abusive", label: "Abusive / review" },
] as const;

type CallFilter = (typeof filters)[number]["id"];
type CallDirection = "all" | "incoming" | "outgoing";

function matchesFilter(call: CallResult, filter: CallFilter) {
  switch (filter) {
    case "positive": return isPositiveCall(call);
    case "other": return !isPositiveCall(call);
    case "whatsapp": return call.whatsappStatus === "sent";
    case "incoming": return call.direction === "incoming";
    case "follow_up": return call.sentiment === "follow_up" || call.outcome === "callback";
    case "disconnected": return Boolean(call.disconnectReason);
    case "abusive": return Boolean(call.abusive);
    default: return true;
  }
}

function formatTalkTime(seconds: number) {
  return `${(seconds / 60).toFixed(1)} min`;
}

function formatTranscriptTime(seconds: number) {
  const safeSeconds = Math.max(0, Math.floor(seconds));
  return `${Math.floor(safeSeconds / 60)}:${String(safeSeconds % 60).padStart(2, "0")}`;
}

function isPositiveCall(call: CallResult) {
  return call.sentiment === "positive" || call.outcome === "interested";
}

type MemberCallGroup = { phone: string; name: string; calls: CallResult[] };

function downloadMemberRecords(members: MemberCallGroup[], filename: string) {
  const headers = ["Client name", "Phone number", "Number of calls", "Call direction", "Topics", "Outcomes", "WhatsApp status", "Total talk time (minutes)", "Most recent call", "Call details", "Conversation transcripts", "Disconnect details", "Flagged for review"];
  const rows = members.map((member) => {
    const latestCall = member.calls[0]!;
    const distinct = (values: string[]) => [...new Set(values.filter(Boolean))].join("; ");
    const messageStatus = member.calls.some((call) => call.whatsappStatus === "sent")
      ? "sent"
      : member.calls.some((call) => call.whatsappStatus === "failed") ? "failed" : "not sent";
    return [
      member.name,
      member.phone,
      member.calls.length,
      distinct(member.calls.map((call) => call.direction === "incoming" ? "Incoming" : "Outbound")),
      distinct(member.calls.map((call) => call.topic ?? "")),
      distinct(member.calls.map((call) => call.sentiment?.replaceAll("_", " ") ?? call.outcome.replaceAll("_", " "))),
      messageStatus,
      (member.calls.reduce((total, call) => total + call.duration, 0) / 60).toFixed(1),
      new Date(latestCall.callStartedAt).toLocaleString(),
      distinct(member.calls.map((call) => call.summary ?? "")),
      member.calls.map((call) => call.transcript.map((message) => `${message.role}: ${message.text}`).join(" / ")).join(" | "),
      distinct(member.calls.map((call) => call.disconnectReason ?? "")),
      member.calls.some((call) => call.abusive) ? "Yes" : "No",
    ];
  });
  const csv = [headers, ...rows]
    .map((row) => row.map((value) => `"${String(value ?? "").replaceAll('"', '""')}"`).join(","))
    .join("\r\n");
  const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function CallActivityPanel({ direction = "all" }: { direction?: CallDirection }) {
  const [calls, setCalls] = useState<CallResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeFilter, setActiveFilter] = useState<CallFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCall, setSelectedCall] = useState<CallResult | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    let cancelled = false;
    mockCampaignApi.getRecentCallResults(undefined, direction === "all" ? undefined : direction)
      .then((items) => { if (!cancelled) setCalls(items); })
      .catch((loadError: unknown) => {
        console.error("Could not load call activity", loadError);
        if (!cancelled) setError("Call activity could not be loaded. Please refresh and try again.");
      })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [direction]);

  const visibleFilters = direction === "all" ? filters : filters.filter((filter) => filter.id !== "incoming");
  const title = direction === "outgoing" ? "Outbound calls" : direction === "incoming" ? "Inbound calls" : "Call activity";

  const filteredCalls = useMemo(() => calls.filter((call) => {
    const matchesText = `${call.contactName} ${call.contactPhone} ${call.summary ?? ""} ${call.topic ?? ""}`.toLowerCase().includes(searchQuery.toLowerCase().trim());
    return matchesFilter(call, activeFilter) && matchesText;
  }), [calls, activeFilter, searchQuery]);
  const pageCount = Math.max(1, Math.ceil(filteredCalls.length / ITEMS_PER_PAGE));
  const visiblePage = Math.min(currentPage, pageCount);
  const currentPageCalls = filteredCalls.slice((visiblePage - 1) * ITEMS_PER_PAGE, visiblePage * ITEMS_PER_PAGE);
  const exportMembers = useMemo(() => {
    const groups = new Map<string, MemberCallGroup>();
    for (const call of filteredCalls) {
      const phone = call.contactPhone.trim();
      const key = phone.replace(/\D/g, "") || call.id;
      const group = groups.get(key);
      if (group) group.calls.push(call);
      else groups.set(key, { phone, name: call.contactName, calls: [call] });
    }
    return [...groups.values()];
  }, [filteredCalls]);
  const exportFilterLabel = filters.find((filter) => filter.id === activeFilter)?.label ?? "All calls";
  const exportButtonLabel = `Download ${exportFilterLabel.toLowerCase()} CSV (${exportMembers.length} members)`;

  const counts = useMemo(() => ({
    positive: calls.filter(isPositiveCall).length,
    whatsapp: calls.filter((call) => call.whatsappStatus === "sent").length,
    incoming: calls.filter((call) => call.direction === "incoming").length,
    followUp: calls.filter((call) => call.sentiment === "follow_up" || call.outcome === "callback").length,
    disconnected: calls.filter((call) => Boolean(call.disconnectReason)).length,
    abusive: calls.filter((call) => Boolean(call.abusive)).length,
  }), [calls]);
  return (
    <section aria-labelledby="call-activity-heading" className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 id="call-activity-heading" className="text-2xl font-semibold text-[rgb(var(--color-foreground))] sm:text-3xl">{title}</h1>
          <p className="mt-1 text-sm text-[rgb(var(--color-muted-foreground))]">{direction === "outgoing" ? "AI calls placed to your clients." : direction === "incoming" ? "Calls your clients made to your business." : "One clear view of inbound and outbound calls."} Review caller details, outcomes, follow-ups, and transcripts.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button size="sm" variant="outline" disabled={loading || exportMembers.length === 0} aria-label={exportButtonLabel} title={exportButtonLabel} className="h-10 w-10 !p-0" onClick={() => downloadMemberRecords(exportMembers, `${direction}-${activeFilter}-members.csv`)}>
            <span aria-hidden="true"><DownloadDoneIcon size={22} duration={60_000} /></span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-6">
        {[
          { label: "Positive", value: counts.positive, tone: "positive" as const },
          { label: "WhatsApp sent", value: counts.whatsapp, tone: "info" as const },
          { label: "Incoming", value: counts.incoming, tone: "neutral" as const },
          { label: "Call back requested", value: counts.followUp, tone: "warning" as const },
          { label: "Disconnected", value: counts.disconnected, tone: "neutral" as const },
          { label: "Flagged for review", value: counts.abusive, tone: "danger" as const },
        ].map((item) => (
          <div key={item.label} className="rounded-[var(--radius-md)] border border-[rgb(var(--color-border))] bg-[rgb(var(--color-card))] p-4">
            <p className="text-sm text-[rgb(var(--color-muted-foreground))]">{item.label}</p>
            <p className="mt-1 text-2xl font-semibold text-[rgb(var(--color-foreground))]">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="overflow-hidden rounded-[var(--radius-lg)] border border-[rgb(var(--color-border))] bg-[rgb(var(--color-card))] shadow-[var(--shadow-sm)]">
        <div className="flex flex-col gap-3 border-b border-[rgb(var(--color-border))] p-4 lg:flex-row lg:items-center lg:justify-between">
          <label className="sr-only" htmlFor="call-search">Search calls by client or phone</label>
          <input id="call-search" value={searchQuery} onChange={(event) => { setSearchQuery(event.target.value); setCurrentPage(1); }} placeholder="Search client or phone number" className="w-full rounded-[var(--radius-md)] border border-[rgb(var(--color-border))] bg-[rgb(var(--color-background))] px-3 py-2 text-sm text-[rgb(var(--color-foreground))] lg:max-w-xs" />
          <div className="flex gap-2 overflow-x-auto pb-1">
          {visibleFilters.map((filter) => (
            <button key={filter.id} type="button" aria-pressed={activeFilter === filter.id} onClick={() => { setActiveFilter(filter.id); setCurrentPage(1); }} className={`whitespace-nowrap rounded-[var(--radius-md)] px-3 py-2 text-sm font-medium transition-colors ${activeFilter === filter.id ? "bg-[rgb(var(--color-primary))] text-white" : "bg-[rgb(var(--color-muted))] text-[rgb(var(--color-muted-foreground))] hover:text-[rgb(var(--color-foreground))]"}`}>
              {filter.label}
            </button>
          ))}
          </div>
        </div>

        {loading ? (
          <div className="space-y-3 p-5" aria-label="Loading call records">
            {[1, 2, 3].map((item) => <div key={item} className="h-20 animate-pulse rounded-[var(--radius-md)] bg-[rgb(var(--color-muted))]" />)}
          </div>
        ) : error ? (
          <p role="alert" className="p-6 text-sm text-red-600">{error}</p>
        ) : filteredCalls.length === 0 ? (
          <p className="p-8 text-center text-sm text-[rgb(var(--color-muted-foreground))]">No calls match this filter.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[840px] text-left text-sm">
              <thead className="bg-[rgb(var(--color-muted))] text-xs uppercase tracking-wide text-[rgb(var(--color-muted-foreground))]">
                <tr>
                  <th className="px-4 py-3 font-semibold">Client / phone</th>
                  <th className="px-4 py-3 font-semibold">Call type / topic</th>
                  <th className="px-4 py-3 font-semibold">Outcome / WhatsApp</th>
                  <th className="px-4 py-3 text-right font-semibold">Talk time</th>
                  <th className="px-4 py-3 font-semibold">Date and time</th>
                  <th className="px-4 py-3"><span className="sr-only">Details</span></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[rgb(var(--color-border))]">
                {currentPageCalls.map((call) => (
                  <tr key={call.id} className="align-top hover:bg-[rgb(var(--color-muted))]/40">
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <span aria-hidden="true" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[rgb(var(--color-primary-light))] text-sm font-semibold text-[rgb(var(--color-primary))]">{call.contactName.split(/\s+/).map((part) => part[0]).join("").slice(0, 2).toUpperCase()}</span>
                        <div>
                          <p className="font-semibold text-[rgb(var(--color-foreground))]">{call.contactName}</p>
                          <p className="mt-1 whitespace-nowrap text-[rgb(var(--color-muted-foreground))]">{call.contactPhone}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <p className="font-medium text-[rgb(var(--color-foreground))]">{call.direction === "incoming" ? "Incoming" : "AI outbound"}</p>
                      <p className="mt-1 text-[rgb(var(--color-muted-foreground))]">{call.topic ?? "General call"}</p>
                    </td>
                    <td className="px-4 py-4">
                      <p className={`font-medium capitalize ${call.sentiment === "positive" ? "text-green-700" : call.sentiment === "abusive" ? "text-red-700" : "text-[rgb(var(--color-foreground))]"}`}>{call.sentiment?.replaceAll("_", " ") ?? call.outcome.replaceAll("_", " ")}</p>
                      {call.whatsappStatus && call.whatsappStatus !== "not_sent" && <p className="mt-1 text-xs text-[rgb(var(--color-muted-foreground))]">WhatsApp: <span className="capitalize">{call.whatsappStatus.replaceAll("_", " ")}</span></p>}
                      {call.disconnectReason && <p className="mt-1 max-w-xs text-xs text-amber-700">Disconnected: {call.disconnectReason}</p>}
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 text-right font-medium tabular-nums text-[rgb(var(--color-foreground))]" title={`${call.duration} seconds`}>{formatTalkTime(call.duration)}</td>
                    <td className="whitespace-nowrap px-4 py-4 text-[rgb(var(--color-muted-foreground))]">{new Date(call.callStartedAt).toLocaleString()}</td>
                    <td className="px-4 py-4"><button type="button" aria-label={`View call details for ${call.contactName}`} title="View details" onClick={() => setSelectedCall(call)} className="inline-flex h-9 w-9 items-center justify-center rounded-[var(--radius-md)] text-[rgb(var(--color-primary))] hover:bg-[rgb(var(--color-primary-light))]"><Eye className="h-4 w-4" aria-hidden="true" /></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {!loading && !error && filteredCalls.length > 0 && (
          <div className="flex flex-col gap-3 border-t border-[rgb(var(--color-border))] px-4 py-3 text-sm text-[rgb(var(--color-muted-foreground))] sm:flex-row sm:items-center sm:justify-between">
            <p>Showing {(visiblePage - 1) * ITEMS_PER_PAGE + 1}–{Math.min(visiblePage * ITEMS_PER_PAGE, filteredCalls.length)} of {filteredCalls.length} calls</p>
            <nav aria-label="Call activity pages" className="flex items-center gap-2">
              <button type="button" aria-label="Previous page" disabled={visiblePage <= 1} onClick={() => setCurrentPage((page) => Math.max(1, page - 1))} className="inline-flex h-9 w-9 items-center justify-center rounded-[var(--radius-md)] border border-[rgb(var(--color-border))] disabled:cursor-not-allowed disabled:opacity-40"><ChevronLeft className="h-4 w-4" /></button>
              <span aria-live="polite" className="min-w-20 text-center">Page {visiblePage} of {pageCount}</span>
              <button type="button" aria-label="Next page" disabled={visiblePage >= pageCount} onClick={() => setCurrentPage((page) => Math.min(pageCount, page + 1))} className="inline-flex h-9 w-9 items-center justify-center rounded-[var(--radius-md)] border border-[rgb(var(--color-border))] disabled:cursor-not-allowed disabled:opacity-40"><ChevronRight className="h-4 w-4" /></button>
            </nav>
          </div>
        )}
      </div>

      {selectedCall && (
        <div className="fixed inset-0 z-[var(--z-modal)] flex justify-end bg-black/50" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelectedCall(null); }}>
          <aside role="dialog" aria-modal="true" aria-labelledby="call-detail-title" className="h-full w-full max-w-xl overflow-y-auto border-l border-[rgb(var(--color-border))] bg-[rgb(var(--color-background))] p-5 shadow-[var(--shadow-xl)] sm:p-7">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <h3 id="call-detail-title" className="text-xl font-semibold text-[rgb(var(--color-foreground))]">Conversation with {selectedCall.contactName}</h3>
                <p className="mt-1 text-sm text-[rgb(var(--color-muted-foreground))]">{selectedCall.contactPhone} · {selectedCall.direction === "incoming" ? "Incoming call" : "AI outbound call"}</p>
              </div>
              <button type="button" autoFocus onClick={() => setSelectedCall(null)} className="rounded-[var(--radius-md)] px-3 py-2 text-sm text-[rgb(var(--color-muted-foreground))] hover:bg-[rgb(var(--color-muted))]">Close</button>
            </div>

            <div className="mb-6 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-[var(--radius-md)] bg-[rgb(var(--color-card))] p-3"><p className="text-[rgb(var(--color-muted-foreground))]">Topic</p><p className="mt-1 font-medium">{selectedCall.topic ?? "General conversation"}</p></div>
              <div className="rounded-[var(--radius-md)] bg-[rgb(var(--color-card))] p-3"><p className="text-[rgb(var(--color-muted-foreground))]">Outcome</p><p className="mt-1 font-medium capitalize">{selectedCall.sentiment?.replace("_", " ") ?? selectedCall.outcome.replaceAll("_", " ")}</p></div>
              <div className="rounded-[var(--radius-md)] bg-[rgb(var(--color-card))] p-3"><p className="text-[rgb(var(--color-muted-foreground))]">WhatsApp follow-up</p><p className="mt-1 font-medium capitalize">{selectedCall.whatsappStatus?.replaceAll("_", " ") ?? "not sent"}</p></div>
              <div className="rounded-[var(--radius-md)] bg-[rgb(var(--color-card))] p-3"><p className="text-[rgb(var(--color-muted-foreground))]">Talk time</p><p className="mt-1 font-medium">{formatTalkTime(selectedCall.duration)} ({selectedCall.duration} sec)</p></div>
            </div>

            {selectedCall.disconnectReason && <p className="mb-4 rounded-[var(--radius-md)] border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900">Disconnect detail: {selectedCall.disconnectReason}</p>}
            {selectedCall.abusive && <p className="mb-4 rounded-[var(--radius-md)] border border-red-300 bg-red-50 p-3 text-sm text-red-900">This conversation was flagged for human review. Please review the transcript and recording when available.</p>}

            <h4 className="mb-3 font-semibold text-[rgb(var(--color-foreground))]">Conversation transcript</h4>
            <div className="space-y-3">
              {selectedCall.transcript.map((message, index) => (
                <div key={`${selectedCall.id}-${index}`} className={`max-w-[88%] rounded-[var(--radius-md)] p-3 text-sm ${message.role === "customer" ? "ml-auto bg-[rgb(var(--color-primary))] text-white" : "bg-[rgb(var(--color-card))] text-[rgb(var(--color-foreground))]"}`}>
                  <p className="mb-1 text-xs font-semibold uppercase opacity-70">{message.role} · {formatTranscriptTime(message.timestamp)}</p>
                  {message.text}
                </div>
              ))}
            </div>

            <div className="mt-7 border-t border-[rgb(var(--color-border))] pt-5">
              <h4 className="mb-2 font-semibold text-[rgb(var(--color-foreground))]">Call recording</h4>
              {selectedCall.recordingUrl && selectedCall.recordingUrl !== "#mock-recording" ? (
                <audio controls className="w-full" src={selectedCall.recordingUrl}>Your browser does not support audio playback.</audio>
              ) : (
                <p className="text-sm text-[rgb(var(--color-muted-foreground))]">No audio recording is attached to this demo call. A real recording player will appear when the calling provider supplies an audio URL.</p>
              )}
            </div>
          </aside>
        </div>
      )}
    </section>
  );
}
