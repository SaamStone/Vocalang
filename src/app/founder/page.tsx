import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { FounderDashboard } from "./FounderDashboard";
import { FOUNDER_SESSION_COOKIE, founderAuthConfigured, isFounderSessionValid } from "@/lib/founder-auth";
import { listDemoRequests } from "@/lib/demo-request-store";

export const metadata: Metadata = { title: "Founder requests", robots: { index: false, follow: false } };

export default async function FounderPage() {
  if (!founderAuthConfigured()) redirect("/founder/login");

  const cookieStore = await cookies();
  if (!isFounderSessionValid(cookieStore.get(FOUNDER_SESSION_COOKIE)?.value)) redirect("/founder/login");

  try {
    const requests = await listDemoRequests();
    return <FounderDashboard requests={requests} storageError={false} />;
  } catch {
    return <FounderDashboard requests={[]} storageError />;
  }
}
