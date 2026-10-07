import type { Metadata } from "next";
import { notFound } from "next/navigation";
import FounderDashboard from "@/components/founder/FounderDashboard";

export const metadata: Metadata = {
  title: "Founder console preview",
  robots: { index: false, follow: false, noarchive: true },
};

export default function FounderPreviewPage() {
  // This dashboard is a local UI prototype. Never serve it in production
  // until server-side founder authentication and authorization are implemented.
  if (process.env.NODE_ENV === "production") notFound();
  return <FounderDashboard />;
}
