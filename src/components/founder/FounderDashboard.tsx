"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Activity, ArrowDownRight, ArrowUpRight, Bell, Check, CheckCircle2,
  ChevronDown, CircleHelp, Clock3, CreditCard, Database, FileText, Filter,
  Headphones, LayoutDashboard, Link2, LogOut, Menu, MoreHorizontal,
  PhoneCall, PhoneIncoming, PhoneOutgoing, Search, ShieldCheck, ShieldAlert, Sparkles, Users, Wallet,
  X,
} from "lucide-react";
import { CallActivityPanel } from "@/components/dashboard/CallActivityPanel";
import {
  dailyCalls, founderApprovalRequest, founderClients, founderSections,
  initialAuditEvents, integrationProviders,
  type FounderClient, type FounderSection,
} from "@/lib/mock-data/founder";
import { cn, formatINR, formatNumber } from "@/lib/utils";

type AuditEvent = { id: string; action: string; actor: string; target: string; time: string; tone: string };
type WebsiteRequest = {
  id?: string;
  submittedAt: string;
  name: string;
  phone: string;
  email: string;
  organization: string;
  callVolume: string;
  industry: string;
  language: string;
  notes: string;
};
type WebsiteDataPayload = { requests: WebsiteRequest[]; storage: "cloudflare-d1" | "development-file" };

const navIcons = [LayoutDashboard, Users, PhoneIncoming, PhoneOutgoing, Database, Link2, Activity, ShieldCheck];
const tones: Record<string, string> = {
  Running: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  Paused: "bg-amber-50 text-amber-700 ring-amber-200",
  Completed: "bg-slate-100 text-slate-600 ring-slate-200",
  Queued: "bg-blue-50 text-blue-700 ring-blue-200",
};

function Panel({ children, className }: { children: React.ReactNode; className?: string }) {
  return <section className={cn("rounded-2xl border border-slate-200 bg-white shadow-[0_2px_12px_rgba(15,23,42,.035)]", className)}>{children}</section>;
}

function SectionHeading({ title, detail, action }: { title: string; detail: string; action?: React.ReactNode }) {
  return <div className="mb-5 flex flex-wrap items-end justify-between gap-3"><div><h2 className="text-lg font-semibold tracking-tight text-slate-900">{title}</h2><p className="mt-1 text-sm text-slate-500">{detail}</p></div>{action}</div>;
}

function ClientsTable({ clients, onSelect }: { clients: FounderClient[]; onSelect: (client: FounderClient) => void }) {
  return <div className="overflow-x-auto"><table className="w-full min-w-[850px] text-left text-sm"><thead><tr className="border-y border-slate-100 text-[11px] uppercase tracking-[.12em] text-slate-400"><th className="px-5 py-3 font-medium">Client</th><th className="px-4 py-3 font-medium">Activity</th><th className="px-4 py-3 font-medium">Calls</th><th className="px-4 py-3 font-medium">Wallet</th><th className="px-4 py-3 font-medium">Campaign</th><th className="px-5 py-3 font-medium">ETA</th></tr></thead><tbody>{clients.map((client) => <tr key={client.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/80"><td className="px-5 py-4"><button onClick={() => onSelect(client)} className="text-left"><span className="block font-medium text-slate-800 hover:text-indigo-700">{client.business}</span><span className="mt-1 block text-xs text-slate-500">{client.name} · {client.id}</span></button></td><td className="px-4 py-4"><span className="block text-xs text-slate-600">In {client.lastLogin.replace("Today, ", "")}</span><span className="mt-1 block text-xs text-slate-400">Out {client.lastLogout.replace("Yesterday, ", "")}</span></td><td className="px-4 py-4 font-medium text-slate-700">{formatNumber(client.requestedCalls)}</td><td className="px-4 py-4 font-medium text-slate-700">{formatINR(client.walletBalance)}</td><td className="px-4 py-4"><span className={cn("rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset", tones[client.campaignStatus])}>{client.campaignStatus}</span></td><td className="px-5 py-4 text-xs text-slate-500">{client.eta}</td></tr>)}</tbody></table></div>;
}

export default function FounderDashboard() {
  const [section, setSection] = useState<FounderSection>("Overview");
  const [mobileNav, setMobileNav] = useState(false);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All clients");
  const clients = founderClients;
  const [requests, setRequests] = useState<WebsiteRequest[]>([]);
  const [websiteDataState, setWebsiteDataState] = useState<"loading" | "ready" | "error">("loading");
  const [websiteDataError, setWebsiteDataError] = useState("");
  const [websiteDataStorage, setWebsiteDataStorage] = useState<WebsiteDataPayload["storage"] | "unknown">("unknown");
  const [authState, setAuthState] = useState<"checking" | "signed-in" | "signed-out" | "unconfigured">(process.env.NODE_ENV === "production" ? "checking" : "signed-in");
  const [founderPassword, setFounderPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [authSubmitting, setAuthSubmitting] = useState(false);
  const [audit, setAudit] = useState<AuditEvent[]>(initialAuditEvents);
  const [selected, setSelected] = useState<FounderClient | null>(null);
  const [approvals, setApprovals] = useState<string[]>([]);
  const [toast, setToast] = useState("");
  const [callRange, setCallRange] = useState<7 | 14>(14);
  const chartCalls = dailyCalls.slice(-callRange);
  const filteredClients = useMemo(() => clients.filter((client) => {
    const matchesQuery = `${client.name} ${client.business} ${client.email} ${client.id}`.toLowerCase().includes(query.toLowerCase());
    return matchesQuery && (status === "All clients" || client.campaignStatus === status);
  }), [clients, query, status]);
  const providersForDisplay = integrationProviders.map((provider) => provider.name === "Database"
    ? {
        ...provider,
        provider: websiteDataStorage === "cloudflare-d1" ? "Cloudflare D1" : websiteDataStorage === "development-file" ? "Local JSONL" : "Cloudflare D1",
        state: websiteDataStorage === "cloudflare-d1" ? "Connected" : websiteDataStorage === "development-file" ? "Local only" : "Not verified",
        detail: websiteDataStorage === "cloudflare-d1"
          ? "Website form submissions are stored in Cloudflare D1 and shown in Website data."
          : websiteDataStorage === "development-file"
            ? "Local preview submissions are read from a development file."
            : "Storage status will be confirmed after website data loads.",
      }
    : provider);

  const loadWebsiteData = useCallback(async () => {
    setWebsiteDataState("loading");
    setWebsiteDataError("");
    try {
      const response = await fetch("/api/founder/website-data", { cache: "no-store" });
      if (response.status === 401) {
        setAuthState("signed-out");
        return;
      }
      const payload = await response.json() as WebsiteDataPayload | { error?: string };
      if (!response.ok || !("requests" in payload)) {
        throw new Error(("error" in payload && payload.error) || "Could not load website requests.");
      }
      setRequests(payload.requests);
      setWebsiteDataStorage(payload.storage);
      setWebsiteDataState("ready");
    } catch (error) {
      setWebsiteDataError(error instanceof Error ? error.message : "Could not load website requests.");
      setWebsiteDataState("error");
    }
  }, []);

  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    let active = true;
    fetch("/api/founder/session", { cache: "no-store" })
      .then(async (response) => ({ ok: response.ok, payload: await response.json() as { configured?: boolean; authenticated?: boolean } }))
      .then(({ ok, payload }) => {
        if (!active) return;
        if (!ok || !payload.configured) setAuthState("unconfigured");
        else setAuthState(payload.authenticated ? "signed-in" : "signed-out");
      })
      .catch(() => { if (active) setAuthState("unconfigured"); });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (authState === "signed-in") void loadWebsiteData();
  }, [authState, loadWebsiteData]);

  function notify(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(""), 2600);
  }
  function log(action: string, target: string) {
    setAudit((events) => [{ id: `AUD-${8042 + events.length}`, action, actor: "Founder 1 · preview", target, time: "Just now", tone: "neutral" }, ...events]);
  }
  function toggleApproval(founder: string) {
    setApprovals((list) => list.includes(founder) ? list.filter((item) => item !== founder) : [...list, founder]);
    log("Founder approval updated", founderApprovalRequest.id);
  }

  async function signInFounder(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAuthSubmitting(true);
    setAuthError("");
    try {
      const response = await fetch("/api/founder/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: founderPassword }),
      });
      const payload = await response.json() as { error?: string; authenticated?: boolean };
      if (!response.ok || !payload.authenticated) throw new Error(payload.error || "Could not sign in.");
      setFounderPassword("");
      setAuthState("signed-in");
    } catch (error) {
      setAuthError(error instanceof Error ? error.message : "Could not sign in.");
    } finally {
      setAuthSubmitting(false);
    }
  }

  async function signOutFounder() {
    if (process.env.NODE_ENV === "production") {
      await fetch("/api/founder/session", { method: "DELETE" }).catch(() => undefined);
      setAuthState("signed-out");
    }
  }

  if (authState === "checking") {
    return <div className="grid min-h-screen place-items-center bg-slate-50 text-sm text-slate-600">Checking founder access…</div>;
  }

  if (authState === "unconfigured") {
    return <div className="grid min-h-screen place-items-center bg-slate-50 px-4"><section className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-7 shadow-sm"><h1 className="text-xl font-semibold text-slate-900">Founder dashboard setup required</h1><p className="mt-3 text-sm leading-6 text-slate-600">Set <code>FOUNDER_DASHBOARD_PASSWORD</code> and a 32-character-or-longer <code>FOUNDER_SESSION_SECRET</code> in the production environment. The dashboard stays locked until founder access is configured.</p></section></div>;
  }

  if (authState === "signed-out") {
    return <div className="grid min-h-screen place-items-center bg-slate-50 px-4"><form onSubmit={signInFounder} className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-7 shadow-sm"><div className="grid h-11 w-11 place-items-center rounded-xl bg-indigo-600 text-white"><Headphones size={20}/></div><h1 className="mt-5 text-xl font-semibold text-slate-900">Founder sign in</h1><p className="mt-2 text-sm leading-6 text-slate-500">Use the private founder access password to view website submissions.</p><label className="mt-6 block text-sm font-medium text-slate-700" htmlFor="founder-password">Founder password</label><input id="founder-password" type="password" autoComplete="current-password" required value={founderPassword} onChange={(event) => setFounderPassword(event.target.value)} className="mt-2 h-11 w-full rounded-lg border border-slate-300 px-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"/>{authError && <p role="alert" className="mt-3 text-sm text-rose-600">{authError}</p>}<button disabled={authSubmitting} className="mt-5 h-11 w-full rounded-lg bg-indigo-600 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-60">{authSubmitting ? "Signing in…" : "Sign in"}</button></form></div>;
  }

  return <div className="fixed inset-0 z-[100] flex bg-[#f7f8fb] text-slate-800">
    <aside className={cn("fixed inset-y-0 left-0 z-30 flex w-[254px] flex-col border-r border-slate-200 bg-white transition-transform lg:static lg:translate-x-0", mobileNav ? "translate-x-0" : "-translate-x-full")}>
      <div className="flex h-[72px] items-center justify-between border-b border-slate-100 px-5"><Link href="/" className="flex items-center gap-2.5"><span className="grid h-9 w-9 place-items-center rounded-xl bg-indigo-600 text-white"><Headphones size={19}/></span><span className="text-[15px] font-semibold tracking-tight text-slate-900">Vocalang<span className="ml-2 rounded-md bg-indigo-50 px-1.5 py-1 text-[9px] font-semibold uppercase tracking-[.12em] text-indigo-600">Founder</span></span></Link><button className="lg:hidden" onClick={() => setMobileNav(false)} aria-label="Close menu"><X size={18}/></button></div>
      <div className="mx-4 mt-5 rounded-xl border border-indigo-100 bg-indigo-50/70 p-3"><div className="flex items-center gap-2"><span className={cn("h-2 w-2 rounded-full", websiteDataStorage === "cloudflare-d1" ? "bg-emerald-500" : "bg-amber-500")}/><span className="text-xs font-semibold text-indigo-950">Platform overview</span></div><p className="mt-1.5 pl-4 text-[11px] text-slate-500">{websiteDataStorage === "cloudflare-d1" ? "Website data · Cloudflare D1" : websiteDataStorage === "development-file" ? "Local preview · website data" : "Other dashboard metrics are sample data"}</p></div>
      <nav className="mt-6 flex-1 space-y-1 px-3">{founderSections.map((item, index) => { const Icon = navIcons[index]; return <button key={item} onClick={() => { setSection(item); setMobileNav(false); }} className={cn("flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[13px] font-medium transition", section === item ? "bg-indigo-50 text-indigo-700" : "text-slate-500 hover:bg-slate-50 hover:text-slate-800")}><Icon size={17}/>{item}{item === "Website data" && requests.length > 0 && <span className="ml-auto rounded-full bg-rose-100 px-2 py-0.5 text-[10px] font-semibold text-rose-700">{requests.length}</span>}</button>; })}</nav>
      <div className="border-t border-slate-100 p-4"><div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3"><div className="grid h-9 w-9 place-items-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-700">MS</div><div className="min-w-0 flex-1"><p className="truncate text-xs font-semibold text-slate-800">Founder</p><p className="text-[10px] text-slate-500">Private dashboard</p></div>{process.env.NODE_ENV === "production" && <button onClick={signOutFounder} aria-label="Sign out" className="rounded-md p-1 text-slate-400 hover:bg-white hover:text-slate-700"><LogOut size={15}/></button>}</div><p className="mt-3 text-center text-[10px] text-slate-400">{process.env.NODE_ENV === "production" ? "Founder access protected" : "Local preview"}</p></div>
    </aside>
    {mobileNav && <button aria-label="Close navigation" className="fixed inset-0 z-20 bg-slate-950/30 lg:hidden" onClick={() => setMobileNav(false)}/>}
    <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
      <header className="flex h-[72px] shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-7"><div className="flex items-center gap-3"><button className="lg:hidden" onClick={() => setMobileNav(true)} aria-label="Open menu"><Menu size={20}/></button><div><p className="text-xs text-slate-400">Vocalang / Founder console</p><p className="mt-0.5 text-sm font-semibold text-slate-800">{section}</p></div></div><div className="flex items-center gap-2"><span className="hidden rounded-lg border border-amber-200 bg-amber-50 px-2.5 py-1.5 text-[11px] font-medium text-amber-800 sm:inline-flex">Preview data</span><button onClick={() => notify("No new notifications: live updates will be connected later")} className="relative rounded-lg p-2 text-slate-500 hover:bg-slate-100" aria-label="Notifications"><Bell size={17}/><span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-rose-500"/></button><button onClick={() => notify("Founder profile is a preview placeholder")} className="ml-1 grid h-8 w-8 place-items-center rounded-full bg-indigo-600 text-[11px] font-bold text-white">MS</button></div></header>
      <main className="flex-1 overflow-y-auto"><div className="mx-auto max-w-[1440px] px-4 py-6 sm:px-7 sm:py-8">
        {section === "Overview" && <>
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3"><div><p className="text-xs font-medium uppercase tracking-[.16em] text-indigo-600">Tuesday, October 6, 2026</p><h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950 sm:text-[28px]">Good morning, Maya <span aria-hidden="true">✦</span></h1><p className="mt-1.5 text-sm text-slate-500">Here’s what’s happening across your platform today.</p></div><button onClick={() => notify("Report export will be connected with the backend")} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-50"><FileText size={15}/> Export report</button></div>
          <div className="mb-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">{[
            { label: "Lifetime calls", value: "184,260", delta: "+12.8%", icon: PhoneCall, color: "indigo" },
            { label: "Calls today", value: "8,420", delta: "+8.2%", icon: Activity, color: "emerald" },
            { label: "Active campaigns", value: "24", delta: "3 queued", icon: Headphones, color: "violet" },
            { label: "Net revenue · mock", value: "₹2.84L", delta: "+6.4%", icon: Wallet, color: "amber" },
            { label: "Trial → paid", value: "18.6%", delta: "+2.1 pts", icon: Users, color: "rose" },
          ].map(({ label, value, delta, icon: Icon, color }) => <Panel key={label} className="p-4"><div className="flex items-center justify-between"><span className="text-xs text-slate-500">{label}</span><span className={cn("grid h-8 w-8 place-items-center rounded-lg", color === "indigo" && "bg-indigo-50 text-indigo-600", color === "emerald" && "bg-emerald-50 text-emerald-600", color === "violet" && "bg-violet-50 text-violet-600", color === "amber" && "bg-amber-50 text-amber-600", color === "rose" && "bg-rose-50 text-rose-600")}><Icon size={16}/></span></div><p className="mt-3 text-[22px] font-semibold tracking-tight text-slate-900">{value}</p><p className="mt-1 flex items-center gap-1 text-[11px] text-emerald-700"><ArrowUpRight size={13}/>{delta}<span className="ml-1 text-slate-400">vs prior period</span></p></Panel>)}</div>
          <div className="mb-6 grid gap-5 xl:grid-cols-[1.55fr_1fr]"><Panel className="p-5"><div className="flex items-start justify-between"><div><h2 className="text-sm font-semibold text-slate-900">Call volume</h2><p className="mt-1 text-xs text-slate-500">Daily completed calls · last {callRange} days</p></div><select value={callRange} onChange={(event) => setCallRange(Number(event.target.value) as 7 | 14)} aria-label="Call volume date range" className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-[11px] text-slate-600"><option value={7}>Last 7 days</option><option value={14}>Last 14 days</option></select></div><div className="mt-5 flex h-[156px] items-end gap-2 border-b border-l border-slate-100 px-2 pb-0 pt-3 sm:gap-3">{chartCalls.map(({day,calls},i) => <div key={day} className="group relative flex h-full flex-1 items-end"><div title={`${formatNumber(calls)} calls`} className={cn("w-full rounded-t-md transition-colors group-hover:bg-indigo-500", i === chartCalls.length-1 ? "bg-indigo-600" : "bg-indigo-200")} style={{height:`${Math.max(12,(calls/10000)*100)}%`}}/><span className="absolute -bottom-6 left-1/2 hidden -translate-x-1/2 whitespace-nowrap text-[9px] text-slate-400 sm:block">{day.replace("Sep ", "").replace("Oct ", "")}</span></div>)}</div><div className="mt-8 flex items-center gap-2 text-[11px] text-slate-500"><span className="h-2 w-2 rounded-sm bg-indigo-500"/>Completed calls<span className="ml-auto font-medium text-slate-700">Total · {formatNumber(chartCalls.reduce((sum, item) => sum + item.calls, 0))}</span></div></Panel>
            <Panel className="p-5"><div className="flex items-start justify-between"><div><h2 className="text-sm font-semibold text-slate-900">Needs attention</h2><p className="mt-1 text-xs text-slate-500">A few items to keep an eye on</p></div><span className="rounded-full bg-rose-50 px-2 py-1 text-[10px] font-semibold text-rose-700">{requests.length + 2} open</span></div><div className="mt-4 space-y-3">{[{icon:ShieldAlert,tone:"rose",title:"Low wallet balance",body:"2 clients may run out of funds",target:"Clients"},{icon:Clock3,tone:"amber",title:"Website requests",body:`${requests.length} new requests need attention`,target:"Website data"},{icon:Link2,tone:"indigo",title:"Provider setup",body:"Telephony and email not configured",target:"Integrations"}].map(({icon:Icon,tone,title,body,target})=><button key={title} onClick={()=>setSection(target as FounderSection)} className="flex w-full items-center gap-3 rounded-xl border border-slate-100 p-3 text-left hover:bg-slate-50"><span className={cn("grid h-9 w-9 shrink-0 place-items-center rounded-lg",tone === "rose" ? "bg-rose-50 text-rose-600" : tone === "amber" ? "bg-amber-50 text-amber-600" : "bg-indigo-50 text-indigo-600")}><Icon size={16}/></span><span className="min-w-0 flex-1"><span className="block text-xs font-semibold text-slate-800">{title}</span><span className="mt-1 block text-[11px] text-slate-500">{body}</span></span><ArrowDownRight size={14} className="text-slate-400"/></button>)}</div></Panel></div>
          <Panel className="mb-6 overflow-hidden"><div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4"><div><h2 className="text-sm font-semibold text-slate-900">Client activity</h2><p className="mt-1 text-xs text-slate-500">Recent usage, payment, wallet and campaign status</p></div><button onClick={()=>setSection("Clients")} className="text-xs font-semibold text-indigo-600 hover:text-indigo-800">View all clients →</button></div><ClientsTable clients={clients.slice(0,4)} onSelect={setSelected}/></Panel>
          <div className="grid gap-5 lg:grid-cols-2"><Panel className="p-5"><div className="flex items-center justify-between"><div><h2 className="text-sm font-semibold text-slate-900">Unit economics · mock</h2><p className="mt-1 text-xs text-slate-500">Aggregated platform estimate</p></div><CircleHelp size={16} className="text-slate-400"/></div><div className="mt-5 grid grid-cols-3 gap-3">{[{k:"Client revenue",v:"₹3.62L"},{k:"Provider cost",v:"₹78.4K"},{k:"Gross margin",v:"78.3%"}].map(x=><div key={x.k} className="rounded-xl bg-slate-50 p-3"><p className="text-[10px] text-slate-500">{x.k}</p><p className="mt-2 text-base font-semibold text-slate-900">{x.v}</p></div>)}</div><p className="mt-3 text-[10px] text-slate-400">Illustrative values only; actual provider costs and client payments are not connected.</p></Panel><Panel className="p-5"><div className="flex items-center justify-between"><div><h2 className="text-sm font-semibold text-slate-900">Free demo funnel</h2><p className="mt-1 text-xs text-slate-500">Demo usage and conversion · sample values</p></div><Sparkles size={17} className="text-indigo-500"/></div><div className="mt-5 space-y-3">{[{k:"Demo requests",v:100,width:"100%"},{k:"Started a demo",v:72,width:"72%"},{k:"Created an account",v:31,width:"31%"}].map(x=><div key={x.k}><div className="mb-1.5 flex justify-between text-[11px]"><span className="text-slate-500">{x.k}</span><span className="font-medium text-slate-700">{x.v}</span></div><div className="h-1.5 rounded-full bg-slate-100"><div className="h-full rounded-full bg-indigo-500" style={{width:x.width}}/></div></div>)}</div></Panel></div>
        </>}

        {section === "Clients" && <><SectionHeading title="Clients" detail="Account activity, usage, payments and per-client margin."/><Panel className="mb-5 p-4"><div className="flex flex-wrap gap-3"><div className="relative min-w-[220px] flex-1"><Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/><input value={query} onChange={(event)=>setQuery(event.target.value)} placeholder="Search client, business or ID…" className="h-10 w-full rounded-lg border border-slate-200 pl-9 pr-3 text-sm outline-none focus:border-indigo-400"/></div><label className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 text-xs text-slate-500"><Filter size={14}/><select value={status} onChange={(event)=>setStatus(event.target.value)} className="h-10 bg-transparent outline-none"><option>All clients</option>{["Running","Paused","Completed","Queued"].map((s)=><option key={s}>{s}</option>)}</select></label></div></Panel><Panel className="overflow-hidden"><ClientsTable clients={filteredClients} onSelect={setSelected}/><div className="grid gap-3 border-t border-slate-100 p-4 sm:grid-cols-3">{clients.slice(0,3).map(c=><div key={c.id} className="rounded-xl bg-slate-50 p-3"><p className="text-xs font-medium text-slate-700">{c.business}</p><div className="mt-2 flex justify-between text-[11px]"><span className="text-slate-500">Revenue / cost</span><span>{formatINR(c.revenue)} / {formatINR(c.cost)}</span></div><div className="mt-1 flex justify-between text-[11px]"><span className="text-slate-500">Gross margin</span><span className="font-semibold text-emerald-700">{Math.round((c.revenue-c.cost)/c.revenue*100)}%</span></div></div>)}</div></Panel></>}

        {section === "Inbound Calls" && <CallActivityPanel direction="incoming" />}
        {section === "Outbound Calls" && <CallActivityPanel direction="outgoing" />}

        {section === "Website data" && <>
          <SectionHeading title="Website data" detail="Submissions from the demo and contact forms." action={<button onClick={() => void loadWebsiteData()} disabled={websiteDataState === "loading"} className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50">{websiteDataState === "loading" ? "Refreshing…" : "Refresh"}</button>} />
          <Panel className="overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 px-5 py-4">
              <div><h3 className="text-sm font-semibold text-slate-800">Form submissions</h3><p className="mt-1 text-xs text-slate-500">{requests.length} request{requests.length === 1 ? "" : "s"}</p></div>
              <span className={cn("rounded-full px-2.5 py-1 text-[10px] font-semibold", websiteDataStorage === "cloudflare-d1" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700")}>{websiteDataStorage === "cloudflare-d1" ? "Cloudflare D1" : websiteDataStorage === "development-file" ? "Local development data" : "Checking storage"}</span>
            </div>
            {websiteDataState === "loading" ? <p className="p-8 text-center text-sm text-slate-500">Loading website submissions…</p> : websiteDataState === "error" ? <div className="p-8 text-center"><p role="alert" className="text-sm text-rose-600">{websiteDataError}</p><button onClick={() => void loadWebsiteData()} className="mt-3 rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-700">Try again</button></div> : requests.length === 0 ? <p className="p-10 text-center text-sm text-slate-500">No website submissions yet.</p> : <div className="overflow-x-auto"><table className="w-full min-w-[900px] text-left text-sm"><thead><tr className="border-b border-slate-100 text-[10px] uppercase tracking-[.12em] text-slate-400"><th className="px-5 py-3 font-medium">Submitted</th><th className="px-4 py-3 font-medium">Contact</th><th className="px-4 py-3 font-medium">Organization</th><th className="px-4 py-3 font-medium">Request details</th><th className="px-5 py-3 font-medium">Notes</th></tr></thead><tbody>{requests.map((request, index) => <tr key={request.id ?? `${request.email}-${request.submittedAt}-${index}`} className="border-b border-slate-50 last:border-0"><td className="whitespace-nowrap px-5 py-4 text-xs text-slate-500">{new Date(request.submittedAt).toLocaleString()}</td><td className="px-4 py-4"><p className="font-medium text-slate-800">{request.name}</p><p className="mt-1 text-xs text-slate-500">{request.email}</p><p className="mt-1 text-xs text-slate-500">{request.phone || "No phone provided"}</p></td><td className="px-4 py-4 text-xs text-slate-700">{request.organization || "—"}</td><td className="px-4 py-4 text-xs text-slate-600"><p>{request.industry || "Contact inquiry"}</p><p className="mt-1">{request.language || "Language not specified"}</p><p className="mt-1">{request.callVolume || "Call volume not specified"}</p></td><td className="max-w-[240px] whitespace-normal px-5 py-4 text-xs text-slate-600">{request.notes || "—"}</td></tr>)}</tbody></table></div>}
          </Panel>
        </>}

        {section === "Integrations" && <><SectionHeading title="Integrations" detail="Cloudflare D1 status comes from the live website data connection. Other providers are preview placeholders."/><div className="mb-5 flex gap-3 rounded-xl border border-indigo-100 bg-indigo-50 p-4 text-xs text-indigo-900"><ShieldCheck size={17} className="shrink-0"/><p>Integration secrets stay server-side. The dashboard only shows connection status and never displays secret values.</p></div><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{providersForDisplay.map((provider,index)=>{const Icon=[Sparkles,PhoneCall,CreditCard,Database,Database,FileText][index];const connected=provider.state === "Connected";const local=provider.state === "Local only" || provider.state === "Mock";return <Panel key={provider.name} className="p-5"><div className="flex items-start justify-between"><span className="grid h-10 w-10 place-items-center rounded-xl bg-indigo-50 text-indigo-600"><Icon size={18}/></span><span className={cn("rounded-full px-2.5 py-1 text-[10px] font-semibold",connected ? "bg-emerald-50 text-emerald-700" : local ? "bg-amber-50 text-amber-700" : "bg-slate-100 text-slate-600")}>{provider.state}</span></div><h3 className="mt-4 text-sm font-semibold text-slate-900">{provider.name}</h3><p className="mt-1 text-xs text-slate-500">{provider.provider}</p><p className="mt-3 min-h-8 text-[11px] leading-5 text-slate-500">{provider.detail}</p><button onClick={() => provider.name === "Database" ? void loadWebsiteData() : notify(`${provider.name}: preview status checked · no connection attempted`)} className="mt-4 w-full rounded-lg border border-slate-200 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50">{provider.name === "Database" ? "Refresh connection" : "Check preview status"}</button></Panel>})}</div></>}

        {section === "Audit log" && <><SectionHeading title="Audit log" detail="Append-only preview activity. Real immutable storage is not connected."/><Panel className="overflow-hidden"><div className="grid grid-cols-[1fr_auto] border-b border-slate-100 px-5 py-3 text-[10px] font-semibold uppercase tracking-[.12em] text-slate-400"><span>Event</span><span>When</span></div>{audit.map(event=><div key={event.id} className="grid grid-cols-[1fr_auto] items-center border-b border-slate-50 px-5 py-4 last:border-0"><div className="flex min-w-0 items-start gap-3"><span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-slate-100 text-slate-500"><Activity size={15}/></span><span className="min-w-0"><span className="block text-xs font-semibold text-slate-800">{event.action}</span><span className="mt-1 block truncate text-[11px] text-slate-500">{event.actor} · {event.target} · {event.id}</span></span></div><span className="pl-3 text-[11px] text-slate-400">{event.time}</span></div>)}</Panel></>}

        {section === "Founder approvals" && <><SectionHeading title="Founder approvals" detail="Sensitive founder-account changes need two distinct approvals per the master prompt."/><div className="mb-5 flex gap-3 rounded-xl border border-rose-200 bg-rose-50 p-4 text-xs text-rose-900"><ShieldAlert size={17} className="shrink-0"/><p>Approval controls are demonstration-only. No account, role or security setting can be changed here.</p></div><Panel className="max-w-3xl p-5 sm:p-6"><div className="flex flex-wrap items-start justify-between gap-3"><div><span className="rounded-md bg-amber-50 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-amber-800">Pending · preview</span><h2 className="mt-3 text-base font-semibold text-slate-900">{founderApprovalRequest.title}</h2><p className="mt-1 text-xs text-slate-500">Request {founderApprovalRequest.id} · {founderApprovalRequest.expiresAt}</p></div><MoreHorizontal size={18} className="text-slate-400"/></div><div className="mt-5 rounded-xl bg-slate-50 p-4"><p className="text-xs font-medium text-slate-700">Requested by {founderApprovalRequest.requester}</p><p className="mt-2 text-xs text-slate-500">{founderApprovalRequest.detail}</p></div><div className="mt-5 space-y-2">{founderApprovalRequest.eligibleApprovers.map(founder=><button key={founder} onClick={()=>toggleApproval(founder)} className="flex w-full items-center justify-between rounded-xl border border-slate-200 px-4 py-3 text-left hover:bg-slate-50"><span><span className="block text-xs font-semibold text-slate-700">{founder}</span><span className="mt-1 block text-[10px] text-slate-500">{approvals.includes(founder)?"Approved in this preview":"Awaiting approval"}</span></span><span className={cn("grid h-7 w-7 place-items-center rounded-full",approvals.includes(founder)?"bg-emerald-100 text-emerald-700":"bg-slate-100 text-slate-400")}>{approvals.includes(founder)?<CheckCircle2 size={16}/>:<Clock3 size={15}/>}</span></button>)}</div><div className="mt-4 flex items-center justify-between rounded-xl border border-indigo-100 bg-indigo-50/60 p-3 text-xs"><span className="text-indigo-900">Distinct approvals</span><span className="font-semibold text-indigo-700">{approvals.length} / {founderApprovalRequest.requiredApprovals}</span></div><button onClick={()=>notify("This preview cannot apply founder account changes")} className="mt-4 rounded-lg bg-slate-200 px-4 py-2.5 text-xs font-semibold text-slate-500">Apply change (disabled)</button></Panel></>}
        <footer className="mt-8 flex flex-wrap items-center justify-between gap-2 border-t border-slate-200 pt-4 text-[10px] text-slate-400"><span>Vocalang Founder Console · Internal preview</span><span className="flex items-center gap-1"><ShieldCheck size={12}/> Website submissions: {websiteDataStorage === "cloudflare-d1" ? "Cloudflare D1" : websiteDataStorage === "development-file" ? "local preview" : "not verified"} · Other dashboard metrics are sample data</span></footer>
      </div></main>
    </div>
    {selected && <div className="fixed inset-0 z-40 flex justify-end bg-slate-950/25" onClick={()=>setSelected(null)}><aside onClick={(event)=>event.stopPropagation()} className="h-full w-full max-w-md overflow-y-auto bg-white p-6 shadow-2xl"><div className="flex items-start justify-between"><div><p className="text-[10px] uppercase tracking-widest text-indigo-600">{selected.id}</p><h2 className="mt-2 text-xl font-semibold text-slate-900">{selected.business}</h2><p className="mt-1 text-sm text-slate-500">{selected.name}</p></div><button onClick={()=>setSelected(null)} aria-label="Close client details" className="rounded-lg p-2 hover:bg-slate-100"><X size={18}/></button></div><div className="mt-6 rounded-xl bg-slate-50 p-4"><p className="text-xs text-slate-500">{selected.email}</p><p className="mt-3 text-xs text-slate-500">Last login <span className="float-right text-slate-700">{selected.lastLogin}</span></p><p className="mt-2 text-xs text-slate-500">Last logout <span className="float-right text-slate-700">{selected.lastLogout}</span></p><p className="mt-2 text-xs text-slate-500">Trial demo <span className="float-right text-slate-700">{selected.trialUsed?"Used":"Not used"}</span></p></div><h3 className="mb-3 mt-6 text-sm font-semibold">Usage & finances · mock</h3><div className="grid grid-cols-2 gap-3">{[{k:"Calls requested",v:formatNumber(selected.requestedCalls)},{k:"Payments",v:String(selected.payments)},{k:"Wallet",v:formatINR(selected.walletBalance)},{k:"Revenue",v:formatINR(selected.revenue)},{k:"Provider cost",v:formatINR(selected.cost)},{k:"Gross margin",v:`${Math.round((selected.revenue-selected.cost)/selected.revenue*100)}%`}].map(x=><div key={x.k} className="rounded-xl border border-slate-100 p-3"><p className="text-[10px] text-slate-500">{x.k}</p><p className="mt-1 text-sm font-semibold text-slate-800">{x.v}</p></div>)}</div><div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-3 text-[11px] leading-5 text-amber-900">Client sign-in, call records and payment data are illustrative sample values only.</div></aside></div>}
    {toast && <div role="status" className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-xl bg-slate-900 px-4 py-3 text-xs font-medium text-white shadow-lg">{toast}</div>}
  </div>;
}
