import type { Metadata } from "next";
import FounderDashboard from "@/components/founder/FounderDashboard";

export const metadata: Metadata = {
  title: "Founder console preview",
  robots: { index: false, follow: false, noarchive: true },
};

export default function FounderPreviewPage() {
  return <FounderDashboard />;
}
