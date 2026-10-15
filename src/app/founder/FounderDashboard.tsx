import type { StoredDemoRequest } from "@/lib/demo-request-store";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { FOUNDER_SESSION_COOKIE } from "@/lib/founder-auth";

function formatDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "—" : new Intl.DateTimeFormat("en-IN", { dateStyle: "medium", timeStyle: "short" }).format(date);
}

async function signOut() {
  "use server";
  (await cookies()).delete(FOUNDER_SESSION_COOKIE);
  redirect("/founder/login");
}

export function FounderDashboard({ requests, storageError }: { requests: StoredDemoRequest[]; storageError: boolean }) {
  return (
    <main className="min-h-screen bg-[rgb(var(--color-background))] px-4 py-8 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-wrap items-center justify-between gap-4 border-b pb-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[.16em] text-[rgb(var(--color-muted-foreground))]">Private founder area</p>
            <h1 className="mt-2 text-3xl text-[rgb(var(--color-foreground))]">Website requests</h1>
            <p className="mt-2 text-sm text-[rgb(var(--color-muted-foreground))]">Requests submitted through the public demo and contact forms.</p>
          </div>
          <form action={signOut}>
            <button className="rounded-full border px-4 py-2 text-sm font-medium hover:bg-[rgb(var(--color-muted))]">Sign out</button>
          </form>
        </header>

        {storageError ? (
          <section role="alert" className="mt-8 rounded-2xl border border-amber-300 bg-amber-50 p-5 text-sm leading-6 text-amber-950">
            <h2 className="font-semibold">D1 storage is not available</h2>
            <p className="mt-1">Check the Cloudflare D1 environment variables in the hosting project, then redeploy. This page only reads production submissions from D1.</p>
          </section>
        ) : (
          <>
            <section className="mt-7 rounded-2xl border bg-[rgb(var(--color-card))] p-5">
              <p className="text-sm text-[rgb(var(--color-muted-foreground))]">Total requests shown</p>
              <p className="mt-1 text-3xl font-semibold">{requests.length}</p>
              {requests.length === 500 && <p className="mt-2 text-xs text-[rgb(var(--color-muted-foreground))]">Showing the latest 500 submissions.</p>}
            </section>
            <section className="mt-6 overflow-hidden rounded-2xl border bg-[rgb(var(--color-card))]">
              <div className="border-b px-5 py-4"><h2 className="font-semibold">Submitted details</h2></div>
              {requests.length === 0 ? (
                <p className="px-5 py-10 text-center text-sm text-[rgb(var(--color-muted-foreground))]">No website requests have been submitted yet.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-[1050px] w-full text-left text-sm">
                    <thead className="bg-[rgb(var(--color-muted))] text-xs uppercase tracking-wide text-[rgb(var(--color-muted-foreground))]">
                      <tr>{["Submitted", "Name", "Phone", "Email", "Organization", "Industry", "Call volume", "Language", "Notes"].map((label) => <th key={label} className="px-4 py-3 font-semibold">{label}</th>)}</tr>
                    </thead>
                    <tbody className="divide-y">
                      {requests.map((request) => (
                        <tr key={request.id} className="align-top">
                          <td className="whitespace-nowrap px-4 py-4">{formatDate(request.submittedAt)}</td>
                          <td className="px-4 py-4 font-medium">{request.name || "—"}</td>
                          <td className="whitespace-nowrap px-4 py-4">{request.phone || "—"}</td>
                          <td className="px-4 py-4">{request.email || "—"}</td>
                          <td className="px-4 py-4">{request.organization || "—"}</td>
                          <td className="px-4 py-4">{request.industry || "—"}</td>
                          <td className="px-4 py-4">{request.callVolume || "—"}</td>
                          <td className="px-4 py-4">{request.language || "—"}</td>
                          <td className="max-w-xs whitespace-pre-wrap px-4 py-4">{request.notes || "—"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          </>
        )}
      </div>
    </main>
  );
}
