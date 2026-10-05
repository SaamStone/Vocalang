"use client";

import { usePathname } from "next/navigation";
import { DashboardSidebar, DashboardHeader } from "@/components/dashboard/DashboardShell";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[rgb(var(--color-background))]">
      <DashboardSidebar />

      {/* Main content area — offset by sidebar width */}
      <div className="lg:pl-64 flex flex-col min-h-screen">
        <DashboardHeader />
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div key={pathname} className="dashboard-page-transition">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
