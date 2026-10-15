"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Inbox, RefreshCw, Search } from "lucide-react";
import type { StoredDemoRequest } from "@/lib/demo-request-store";

type RequestFilter = "all" | "demo" | "contact";

function requestType(request: StoredDemoRequest): "Demo request" | "Contact enquiry" {
  return request.industry.trim().toLowerCase() === "contact inquiry" ? "Contact enquiry" : "Demo request";
}

function formatDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "—" : new Intl.DateTimeFormat("en-IN", { dateStyle: "medium", timeStyle: "short" }).format(date);
}

export function RequestsTable({ requests }: { requests: StoredDemoRequest[] }) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<RequestFilter>("all");
  const [refreshing, setRefreshing] = useState(false);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return requests.filter((request) => {
      const type = requestType(request);
      const matchesFilter = filter === "all" || (filter === "demo" ? type === "Demo request" : type === "Contact enquiry");
      const searchable = [request.name, request.phone, request.email, request.organization, request.industry, request.callVolume, request.language, request.notes].join(" ").toLowerCase();
      return matchesFilter && (!query || searchable.includes(query));
    });
  }, [filter, requests, search]);

  function refresh() {
    setRefreshing(true);
    router.refresh();
    window.setTimeout(() => setRefreshing(false), 700);
  }

  return (
    <>
      <div className="flex flex-col gap-3 border-b border-[#ece9e3] px-5 py-4 sm:flex-row sm:items-center sm:px-6 dark:border-[#34322f]">
        <label className="relative block flex-1">
          <span className="sr-only">Search submissions</span>
          <Search aria-hidden="true" size={17} strokeWidth={1.7} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#8a857d]" />
          <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search name, email, organization…" className="h-10 w-full rounded-lg border border-[#e4e0d9] bg-[#fcfbf9] pl-9 pr-3 text-sm outline-none transition placeholder:text-[#9a958d] focus:border-[#9b5c42] focus:ring-2 focus:ring-[#9b5c42]/15 dark:border-[#393633] dark:bg-[#252422] dark:placeholder:text-[#7e786f]" />
        </label>
        <div className="flex items-center gap-2">
          <label className="sr-only" htmlFor="request-filter">Filter requests</label>
          <select id="request-filter" value={filter} onChange={(event) => setFilter(event.target.value as RequestFilter)} className="h-10 rounded-lg border border-[#e4e0d9] bg-[#fcfbf9] px-3 text-sm text-[#45413a] outline-none focus:border-[#9b5c42] dark:border-[#393633] dark:bg-[#252422] dark:text-[#e3ded6]">
            <option value="all">All requests</option>
            <option value="demo">Demo requests</option>
            <option value="contact">Contact enquiries</option>
          </select>
          <button type="button" onClick={refresh} className="inline-flex h-10 items-center gap-2 rounded-lg border border-[#e4e0d9] bg-white px-3 text-sm font-medium text-[#504b44] transition hover:bg-[#f5f3ef] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9b5c42] dark:border-[#393633] dark:bg-[#252422] dark:text-[#e3ded6] dark:hover:bg-[#302e2b]">
            <RefreshCw aria-hidden="true" size={15} strokeWidth={1.8} className={refreshing ? "animate-spin" : ""} />
            Refresh
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between px-5 py-3 text-xs text-[#817b73] sm:px-6 dark:text-[#aaa49b]">
        <span>Showing {filtered.length} of {requests.length} requests</span>
        <span className="hidden sm:inline">Newest first</span>
      </div>

      {filtered.length === 0 ? (
        <div className="px-6 py-14 text-center">
          <span className="mx-auto grid size-11 place-items-center rounded-xl bg-[#f2f0ec] text-[#8e452c] dark:bg-[#302e2b] dark:text-[#e4a184]" aria-hidden="true"><Inbox size={20} strokeWidth={1.7} /></span>
          <h3 className="mt-4 text-sm font-semibold">{requests.length ? "No matching requests" : "No requests yet"}</h3>
          <p className="mt-1 text-sm text-[#817b73] dark:text-[#aaa49b]">{requests.length ? "Try a different search or filter." : "New website submissions will appear here."}</p>
        </div>
      ) : (
        <>
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full min-w-[1060px] text-left text-sm">
              <thead className="bg-[#f8f7f4] text-[11px] font-semibold uppercase tracking-[.08em] text-[#837d74] dark:bg-[#252422] dark:text-[#aba59b]">
                <tr>
                  <th scope="col" className="px-5 py-3.5 pl-6">Submitted</th>
                  <th scope="col" className="px-4 py-3.5">Contact</th>
                  <th scope="col" className="px-4 py-3.5">Contact details</th>
                  <th scope="col" className="px-4 py-3.5">Request type</th>
                  <th scope="col" className="px-4 py-3.5">Call volume</th>
                  <th scope="col" className="px-4 py-3.5">Language</th>
                  <th scope="col" className="px-5 py-3.5 pr-6">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#efede8] dark:divide-[#34322f]">
                {filtered.map((request) => <RequestRow key={request.id} request={request} />)}
              </tbody>
            </table>
          </div>
          <div className="grid gap-3 p-4 md:hidden">
            {filtered.map((request) => <RequestCard key={request.id} request={request} />)}
          </div>
        </>
      )}
    </>
  );
}

function RequestRow({ request }: { request: StoredDemoRequest }) {
  const kind = requestType(request);
  return (
    <tr className="align-top transition hover:bg-[#fcfbf9] dark:hover:bg-[#242321]">
      <td className="whitespace-nowrap px-5 py-4 pl-6 text-xs text-[#6f6a62] dark:text-[#b3ada4]">{formatDate(request.submittedAt)}</td>
      <td className="px-4 py-4">
        <p className="font-semibold text-[#302d28] dark:text-[#f0ece5]">{request.name || "—"}</p>
        <p className="mt-1 max-w-[170px] truncate text-xs text-[#817b73] dark:text-[#aaa49b]" title={request.organization}>{request.organization || "No organization"}</p>
      </td>
      <td className="px-4 py-4">
        <p className="max-w-[205px] truncate text-[#514d46] dark:text-[#ded8cf]" title={request.email}>{request.email || "—"}</p>
        <p className="mt-1 text-xs text-[#817b73] dark:text-[#aaa49b]">{request.phone || "No phone"}</p>
      </td>
      <td className="px-4 py-4"><RequestTypeBadge type={kind} /><p className="mt-1.5 text-xs text-[#817b73] dark:text-[#aaa49b]">{kind === "Demo request" ? (request.industry || "Industry not specified") : "General enquiry"}</p></td>
      <td className="whitespace-nowrap px-4 py-4 text-[#514d46] dark:text-[#ded8cf]">{request.callVolume || "—"}</td>
      <td className="whitespace-nowrap px-4 py-4 text-[#514d46] dark:text-[#ded8cf]">{request.language || "—"}</td>
      <td className="max-w-[220px] px-5 py-4 pr-6 text-xs leading-5 text-[#706b63] dark:text-[#b7b1a8]">{request.notes ? <span className="line-clamp-3" title={request.notes}>{request.notes}</span> : "—"}</td>
    </tr>
  );
}

function RequestCard({ request }: { request: StoredDemoRequest }) {
  const kind = requestType(request);
  return (
    <article className="rounded-xl border border-[#e9e6e0] bg-[#fcfbf9] p-4 dark:border-[#393633] dark:bg-[#252422]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-semibold">{request.name || "Unnamed request"}</p>
          <p className="mt-1 text-xs text-[#817b73] dark:text-[#aaa49b]">{request.organization || "No organization"}</p>
        </div>
        <RequestTypeBadge type={kind} />
      </div>
      <p className="mt-3 break-all text-sm text-[#504b44] dark:text-[#ded8cf]">{request.email || "—"}</p>
      <p className="mt-1 text-sm text-[#706b63] dark:text-[#b7b1a8]">{request.phone || "No phone provided"}</p>
      <div className="mt-4 grid grid-cols-2 gap-3 border-t border-[#e9e6e0] pt-3 text-xs dark:border-[#393633]">
        <div><p className="text-[#8a857d]">Submitted</p><p className="mt-1 font-medium">{formatDate(request.submittedAt)}</p></div>
        <div><p className="text-[#8a857d]">Language</p><p className="mt-1 font-medium">{request.language || "—"}</p></div>
        <div><p className="text-[#8a857d]">Call volume</p><p className="mt-1 font-medium">{request.callVolume || "—"}</p></div>
        <div><p className="text-[#8a857d]">Industry</p><p className="mt-1 font-medium">{kind === "Contact enquiry" ? "General enquiry" : request.industry || "—"}</p></div>
      </div>
      {request.notes && <p className="mt-3 border-t border-[#e9e6e0] pt-3 text-sm leading-5 text-[#706b63] dark:border-[#393633] dark:text-[#b7b1a8]">{request.notes}</p>}
    </article>
  );
}

function RequestTypeBadge({ type }: { type: "Demo request" | "Contact enquiry" }) {
  const isDemo = type === "Demo request";
  return <span className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold ${isDemo ? "bg-[#f2e8dd] text-[#885536] dark:bg-[#3a2c23] dark:text-[#e4b28f]" : "bg-[#e8edf2] text-[#526982] dark:bg-[#28313a] dark:text-[#b0c8df]"}`}>{type}</span>;
}
