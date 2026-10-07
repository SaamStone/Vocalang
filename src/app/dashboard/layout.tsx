"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { DashboardSidebar, DashboardHeader } from "@/components/dashboard/DashboardShell";
import { Component as DashboardBackground } from "@/components/ui/background-snippets";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [sessionReady, setSessionReady] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    const sessionCheck = window.setTimeout(() => {
      if (!window.sessionStorage.getItem("vocalang-demo-session")) {
        router.replace("/login");
        return;
      }
      setSessionReady(true);
    }, 0);
    return () => window.clearTimeout(sessionCheck);
  }, [router]);

  if (!sessionReady) {
    return (
      <main className="grid min-h-screen place-items-center bg-[rgb(var(--color-background))]">
        <p className="text-sm text-[rgb(var(--color-muted-foreground))]">Checking demo session…</p>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-[rgb(var(--color-background))]">
      <DashboardSidebar onCollapsedChange={setSidebarCollapsed} />

      {/* Main content area — offset by sidebar width */}
      <div className={`relative isolate flex min-h-screen flex-col ${sidebarCollapsed ? "lg:pl-[68px]" : "lg:pl-64"}`}>
        <DashboardBackground />
        <div className="relative z-10 flex min-h-screen flex-col">
          <DashboardHeader />
          <main className="flex-1 p-4 sm:p-6 lg:p-8">
            <div key={pathname} className="dashboard-page-transition">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
