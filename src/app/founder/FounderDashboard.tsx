import type { StoredDemoRequest } from "@/lib/demo-request-store";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { CalendarDays, Database, Inbox } from "lucide-react";
import { FOUNDER_SESSION_COOKIE } from "@/lib/founder-auth";
import { RequestsTable } from "./RequestsTable";

async function signOut() {
  "use server";
  (await cookies()).delete(FOUNDER_SESSION_COOKIE);
  redirect("/founder/login");
}

function startOfCurrentMonth() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), 1).getTime();
}

function dateLabel(value?: string) {
  if (!value) return "No submissions yet";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "—" : new Intl.DateTimeFormat("en-IN", { dateStyle: "medium", timeStyle: "short" }).format(date);
}

export function FounderDashboard({ requests, storageError }: { requests: StoredDemoRequest[]; storageError: boolean }) {
  const latestMonthStart = startOfCurrentMonth();
  const monthlyCount = requests.filter((request) => new Date(request.submittedAt).getTime() >= latestMonthStart).length;
  const latestRequest = requests[0]?.submittedAt;

  return (
    <div className="min-h-screen bg-[#f6f5f2] text-[#292724] dark:bg-[#171615] dark:text-[#f2f0ec]">
      <aside className="fixed inset-y-0 left-0 hidden w-[248px] flex-col border-r border-[#e7e4de] bg-[#fbfaf8] px-5 py-6 dark:border-[#34322f] dark:bg-[#1e1d1b] lg:flex">
        <a href="/" className="flex items-center gap-3 px-2" aria-label="Vocalang home">
          <span className="grid size-9 place-items-center rounded-xl bg-[#2c2925] text-sm font-bold text-white dark:bg-[#e9e3da] dark:text-[#26231f]">V</span>
          <span className="text-lg font-semibold tracking-tight">Vocalang</span>
        </a>
        <div className="mt-11 px-3 text-[10px] font-semibold uppercase tracking-[.18em] text-[#8a857d]">Workspace</div>
        <nav className="mt-3" aria-label="Founder dashboard">
          <a href="/founder" aria-current="page" className="flex items-center gap-3 rounded-xl bg-[#eeeae3] px-3 py-3 text-sm font-semibold text-[#342f29] dark:bg-[#35312c] dark:text-[#f4eee6]">
            <span className="grid size-7 place-items-center rounded-lg bg-white/80 text-[#8e452c] dark:bg-black/15 dark:text-[#f1a17f]" aria-hidden="true"><Inbox size={16} strokeWidth={1.8} /></span>
            Website requests
            <span className="ml-auto rounded-full bg-white px-2 py-0.5 text-xs text-[#66615a] dark:bg-[#242220] dark:text-[#d4cec5]">{requests.length}</span>
          </a>
        </nav>
        <div className="mt-auto rounded-2xl border border-[#e7e4de] bg-white/80 p-4 dark:border-[#393633] dark:bg-[#242321]">
          <p className="text-xs font-semibold">Private founder area</p>
          <p className="mt-1.5 text-xs leading-5 text-[#777169] dark:text-[#b3ada4]">Website requests are stored in Cloudflare D1.</p>
        </div>
      </aside>

      <div className="lg:pl-[248px]">
        <header className="sticky top-0 z-10 border-b border-[#e7e4de] bg-[#fbfaf8]/95 backdrop-blur dark:border-[#34322f] dark:bg-[#1e1d1b]/95">
          <div className="mx-auto flex h-[68px] max-w-[1500px] items-center justify-between px-4 sm:px-7 lg:px-10">
            <div className="flex items-center gap-3 lg:hidden">
              <span className="grid size-8 place-items-center rounded-lg bg-[#2c2925] text-xs font-bold text-white dark:bg-[#e9e3da] dark:text-[#26231f]">V</span>
              <span className="text-sm font-semibold">Vocalang</span>
            </div>
            <p className="hidden text-sm text-[#817b73] dark:text-[#aaa49b] lg:block">Founder workspace <span className="mx-2 text-[#c6c1b9]">/</span><span className="font-medium text-[#393630] dark:text-[#e7e2da]">Website requests</span></p>
            <div className="ml-auto flex items-center gap-3">
              <span className="hidden items-center gap-2 rounded-full border border-[#e4e0d9] bg-white px-3 py-1.5 text-xs text-[#6e695f] dark:border-[#393633] dark:bg-[#252422] dark:text-[#c3bdb4] sm:inline-flex">
                <Database size={14} className="text-emerald-600 dark:text-emerald-400" /> D1 connected
              </span>
              <form action={signOut}>
                <button className="rounded-lg border border-[#e1ddd5] bg-white px-3.5 py-2 text-sm font-medium text-[#444039] transition hover:bg-[#f3f0eb] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8e452c] dark:border-[#393633] dark:bg-[#252422] dark:text-[#e3ded6] dark:hover:bg-[#302e2b]">Sign out</button>
              </form>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-[1500px] px-4 py-8 sm:px-7 sm:py-10 lg:px-10">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[.16em] text-[#8a857d]">Overview</p>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-[2.1rem]">Website requests</h1>
              <p className="mt-2 text-sm text-[#777169] dark:text-[#b3ada4]">Review demo bookings and contact enquiries submitted on Vocalang.</p>
            </div>
            <p className="text-xs text-[#8a857d]">Latest submission: <span className="font-medium text-[#5d584f] dark:text-[#ded8cf]">{dateLabel(latestRequest)}</span></p>
          </div>

          {storageError ? (
            <section role="alert" className="mt-8 rounded-2xl border border-amber-300 bg-amber-50 p-5 text-sm leading-6 text-amber-950 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-100">
              <h2 className="font-semibold">D1 storage is not available</h2>
              <p className="mt-1">Check the Cloudflare D1 environment variables in Vercel, then redeploy. Requests are loaded from D1.</p>
            </section>
          ) : (
            <>
              <section aria-label="Request summary" className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                <SummaryCard label="Requests loaded" value={String(requests.length)} detail={requests.length === 500 ? "Latest 500 records from D1" : "All available requests from D1"} icon="inbox" accent="bg-[#e6ede5] text-[#4e7559] dark:bg-[#25352a] dark:text-[#9cccaa]" />
                <SummaryCard label="Received this month" value={String(monthlyCount)} detail="Based on the submissions shown" icon="calendar" accent="bg-[#f3e9df] text-[#966144] dark:bg-[#3a2c23] dark:text-[#e5ad86]" />
                <SummaryCard label="Storage" value="Connected" detail="Website submissions sync to D1" icon="database" accent="bg-[#e6ebf1] text-[#58708e] dark:bg-[#242f3b] dark:text-[#a9c4e2]" />
              </section>

              <section className="mt-8 overflow-hidden rounded-2xl border border-[#e7e4de] bg-white shadow-[0_8px_28px_rgba(40,34,26,.035)] dark:border-[#34322f] dark:bg-[#201f1d]">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#ece9e3] px-5 py-5 sm:px-6 dark:border-[#34322f]">
                  <div>
                    <h2 className="font-semibold">Submissions</h2>
                    <p className="mt-1 text-xs text-[#817b73] dark:text-[#aaa49b]">Contact details submitted through the public forms.</p>
                  </div>
                  <span className="rounded-full bg-[#f2f0ec] px-3 py-1.5 text-xs font-medium text-[#686258] dark:bg-[#302e2b] dark:text-[#d2ccc3]">{requests.length} total</span>
                </div>
                <RequestsTable requests={requests} />
              </section>
              <p className="mt-5 text-center text-xs text-[#8a857d]">Private founder workspace · Data loaded directly from Cloudflare D1</p>
            </>
          )}
        </main>
      </div>
    </div>
  );
}

function SummaryCard({ label, value, detail, accent, icon }: { label: string; value: string; detail: string; accent: string; icon: "inbox" | "calendar" | "database" }) {
  const Icon = icon === "inbox" ? Inbox : icon === "calendar" ? CalendarDays : Database;
  return (
    <article className="rounded-2xl border border-[#e7e4de] bg-white p-5 shadow-[0_5px_20px_rgba(40,34,26,.025)] dark:border-[#34322f] dark:bg-[#201f1d] sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-[#706b63] dark:text-[#b7b1a8]">{label}</p>
          <p className="mt-3 text-3xl font-semibold tracking-tight">{value}</p>
        </div>
        <span aria-hidden="true" className={`grid size-10 place-items-center rounded-xl ${accent}`}><Icon size={19} strokeWidth={1.8} /></span>
      </div>
      <p className="mt-3 text-xs text-[#89837a] dark:text-[#a8a197]">{detail}</p>
    </article>
  );
}
