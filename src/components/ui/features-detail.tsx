"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Activity, ArrowDownRight, ArrowUpRight, BarChart3, CheckCircle2,
  ChevronLeft, ChevronRight, Clock3, CreditCard, ShieldCheck, Users,
} from "lucide-react";
import {
  dailyCalls, founderClients, initialAuditEvents, integrationProviders,
  type FounderSection,
} from "@/lib/mock-data/founder";
import { formatINR, formatNumber } from "@/lib/utils";

const dashboardTabs = [
  { title: "Analytics", eyebrow: "PLATFORM HEALTH", icon: BarChart3, note: "Call volume and service health at a glance.", section: "Overview" },
  { title: "Users Management", eyebrow: "CLIENT OPERATIONS", icon: Users, note: "Account activity, balances and active campaigns.", section: "Clients" },
  { title: "Insights & Reports", eyebrow: "BUSINESS PERFORMANCE", icon: CreditCard, note: "Revenue, provider costs and conversion signals.", section: "Overview" },
  { title: "Activity", eyebrow: "RECENT EVENTS", icon: Activity, note: "A readable trail of platform and founder actions.", section: "Audit log" },
  { title: "Trends", eyebrow: "USAGE TRENDS", icon: ArrowUpRight, note: "Compare daily call activity across the last two weeks.", section: "Overview" },
] as const;

function Stat({ label, value, footnote }: { label: string; value: string; footnote: string }) {
  return <div className="rounded-xl border border-slate-100 bg-white p-3"><p className="text-[10px] text-slate-500">{label}</p><p className="mt-1 text-lg font-semibold tracking-tight text-slate-900">{value}</p><p className="mt-1 flex items-center gap-1 text-[9px] text-slate-500"><ArrowUpRight size={11} className="text-emerald-600"/>{footnote}</p></div>;
}

function SlideContent({ index }: { index: number }) {
  if (index === 1) return <div className="space-y-2">{founderClients.slice(0, 3).map((client) => <div key={client.id} className="grid grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-3 rounded-xl border border-slate-100 bg-white px-3 py-2.5"><div className="min-w-0"><p className="truncate text-xs font-semibold text-slate-800">{client.business}</p><p className="mt-0.5 text-[10px] text-slate-500">{client.name} · {client.id}</p></div><span className="hidden text-[10px] text-slate-500 sm:block">{formatNumber(client.requestedCalls)} calls · {formatINR(client.walletBalance)}</span><span className={`rounded-full px-2 py-1 text-[9px] font-medium ${client.campaignStatus === "Running" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>{client.campaignStatus}</span></div>)}</div>;

  if (index === 2) return <div className="grid gap-3 sm:grid-cols-3"><Stat label="Client revenue" value="₹3.62L" footnote="Illustrative total"/><Stat label="Provider cost" value="₹78.4K" footnote="Sample estimate"/><Stat label="Gross margin" value="78.3%" footnote="Preview calculation"/><div className="rounded-xl border border-slate-100 bg-white p-3 sm:col-span-3"><div className="flex items-center justify-between text-[10px]"><span className="font-medium text-slate-700">Trial to paid</span><span className="text-slate-500">18.6% · sample</span></div><div className="mt-2 h-2 rounded-full bg-slate-100"><div className="h-full w-[19%] rounded-full bg-indigo-500"/></div></div></div>;

  if (index === 3) return <div className="space-y-2">{initialAuditEvents.slice(0, 3).map((event, i) => <div key={event.id} className="flex items-center gap-3 rounded-xl border border-slate-100 bg-white px-3 py-2.5"><span className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg ${i === 0 ? "bg-indigo-50 text-indigo-600" : i === 1 ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"}`}>{i === 0 ? <ShieldCheck size={15}/> : i === 1 ? <CheckCircle2 size={15}/> : <Clock3 size={15}/>}</span><div className="min-w-0 flex-1"><p className="truncate text-xs font-medium text-slate-800">{event.action}</p><p className="mt-0.5 text-[10px] text-slate-500">{event.actor} · {event.target}</p></div><span className="hidden whitespace-nowrap text-[10px] text-slate-400 sm:block">{event.time}</span></div>)}</div>;

  const calls = dailyCalls.slice(-12);
  if (index === 4) return <div className="rounded-xl border border-slate-100 bg-white p-4"><div className="mb-4 flex items-center justify-between"><div><p className="text-xs font-semibold text-slate-800">Daily call volume</p><p className="mt-1 text-[10px] text-slate-500">Last 12 days · sample values</p></div><span className="rounded-full bg-emerald-50 px-2 py-1 text-[9px] font-medium text-emerald-700">+12.8%</span></div><div className="flex h-32 items-end gap-1.5 border-b border-l border-slate-100 px-2 pb-0 pt-2 sm:gap-2">{calls.map(({ day, calls: count }, i) => <div key={day} className="group relative flex h-full flex-1 items-end"><div title={`${formatNumber(count)} calls`} className={`w-full rounded-t-sm ${i === calls.length - 1 ? "bg-indigo-600" : "bg-indigo-200"}`} style={{ height: `${Math.max(12, count / 10000 * 100)}%` }}/></div>)}</div><div className="mt-2 flex justify-between text-[9px] text-slate-400"><span>{calls[0].day}</span><span>{calls[calls.length - 1].day}</span></div></div>;

  return <div className="grid gap-3 sm:grid-cols-[1.1fr_.9fr]"><div className="rounded-xl border border-slate-100 bg-white p-4"><div className="flex items-center justify-between"><div><p className="text-xs font-semibold text-slate-800">Call activity</p><p className="mt-1 text-[10px] text-slate-500">Today · sample data</p></div><span className="flex items-center gap-1 text-[10px] font-medium text-emerald-700"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500"/>Healthy</span></div><div className="mt-4 flex h-24 items-end gap-1">{dailyCalls.slice(-10).map(({ day, calls }, i) => <div key={day} className={`flex-1 rounded-t-sm ${i === 9 ? "bg-indigo-600" : "bg-indigo-200"}`} style={{ height: `${Math.max(12, calls / 10000 * 100)}%` }}/>)}</div><div className="mt-2 flex justify-between text-[9px] text-slate-400"><span>Earlier</span><span>Now</span></div></div><div className="grid grid-cols-2 gap-2 sm:grid-cols-1"><Stat label="Calls today" value="8,420" footnote="vs previous day"/><div className="rounded-xl border border-slate-100 bg-white p-3"><p className="text-[10px] text-slate-500">Connected providers</p><p className="mt-1 text-lg font-semibold text-slate-900">{integrationProviders.filter((item) => item.state === "Mock").length} <span className="text-xs font-normal text-slate-500">mock adapters</span></p></div></div></div>;
}

export default function FeaturesDetail({ onNavigate }: { onNavigate?: (section: FounderSection) => void }) {
  const sectionRef = useRef<HTMLElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const reducedMotion = useRef(false);
  const activeTab = dashboardTabs[currentSlide];
  const ActiveIcon = activeTab.icon;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    reducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const context = gsap.context(() => {
      if (reducedMotion.current) return;
      gsap.fromTo(sectionRef.current, { opacity: 0, y: 12 }, {
        opacity: 1,
        y: 0,
        duration: 0.45,
        ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 92%", once: true },
      });
    }, sectionRef);
    return () => context.revert();
  }, []);

  useEffect(() => {
    if (!previewRef.current || reducedMotion.current) return;
    gsap.fromTo(previewRef.current, { opacity: 0.35, y: 8 }, { opacity: 1, y: 0, duration: 0.28, ease: "power2.out" });
  }, [currentSlide]);

  useEffect(() => {
    if (paused || reducedMotion.current) return;
    const interval = window.setInterval(() => setCurrentSlide((current) => (current + 1) % dashboardTabs.length), 5000);
    return () => window.clearInterval(interval);
  }, [paused]);

  function goToSlide(index: number) {
    setCurrentSlide((index + dashboardTabs.length) % dashboardTabs.length);
  }

  return <section ref={sectionRef} aria-label="Founder dashboard overview" className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_2px_12px_rgba(15,23,42,.035)] sm:p-5" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocusCapture={() => setPaused(true)} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setPaused(false); }}>
    <div className="flex flex-wrap items-start justify-between gap-4"><div><p className="text-[10px] font-semibold uppercase tracking-[.14em] text-indigo-600">Founder workspace · sample data</p><h2 className="mt-1.5 text-lg font-semibold tracking-tight text-slate-900">Your platform at a glance</h2><p className="mt-1 text-xs text-slate-500">Switch between the signals that need your attention.</p></div><div className="flex items-center gap-2"><button onClick={() => goToSlide(currentSlide - 1)} aria-label="Previous dashboard view" className="grid h-8 w-8 place-items-center rounded-lg border border-slate-200 text-slate-500 transition hover:border-indigo-200 hover:text-indigo-700"><ChevronLeft size={16}/></button><button onClick={() => goToSlide(currentSlide + 1)} aria-label="Next dashboard view" className="grid h-8 w-8 place-items-center rounded-lg border border-slate-200 text-slate-500 transition hover:border-indigo-200 hover:text-indigo-700"><ChevronRight size={16}/></button><span className="ml-1 text-[10px] tabular-nums text-slate-400">{currentSlide + 1} / {dashboardTabs.length}</span></div></div>
    <div className="mt-4 flex gap-1 overflow-x-auto border-b border-slate-100" role="tablist" aria-label="Founder dashboard views">{dashboardTabs.map((tab, index) => <button key={tab.title} id={`founder-tab-${index}`} type="button" role="tab" aria-selected={currentSlide === index} aria-controls="founder-preview-panel" onClick={() => goToSlide(index)} className={`inline-flex shrink-0 items-center gap-2 border-b-2 px-3 py-2.5 text-xs font-medium transition-colors ${currentSlide === index ? "border-indigo-600 text-indigo-700" : "border-transparent text-slate-500 hover:text-slate-800"}`}><tab.icon size={14}/>{tab.title}</button>)}</div>
    <div id="founder-preview-panel" role="tabpanel" aria-labelledby={`founder-tab-${currentSlide}`} aria-live="off" className="grid gap-4 pt-4 md:grid-cols-[minmax(0,1fr)_220px] md:items-center"><div ref={previewRef} className="min-h-[172px]"> <SlideContent index={currentSlide}/></div><aside className="flex items-start gap-3 rounded-xl bg-slate-50 p-3 md:block md:p-4"><span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white text-indigo-600 shadow-sm"><ActiveIcon size={16}/></span><div className="min-w-0 flex-1"><p className="text-[10px] font-semibold uppercase tracking-[.12em] text-indigo-600">{activeTab.eyebrow}</p><p className="mt-1 text-xs leading-5 text-slate-600">{activeTab.note}</p>{onNavigate && <button onClick={() => onNavigate(activeTab.section)} className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-indigo-700 hover:text-indigo-900">Open section <ArrowDownRight size={13}/></button>}</div></aside></div>
  </section>;
}
