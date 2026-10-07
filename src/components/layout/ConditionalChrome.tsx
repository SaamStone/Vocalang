"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

export function ConditionalChrome({
  children,
  header,
  footer,
}: {
  children: ReactNode;
  header: ReactNode;
  footer: ReactNode;
}) {
  const pathname = usePathname();
  const isClientDashboard = pathname.startsWith("/dashboard");

  return (
    <>
      {!isClientDashboard && header}
      <div
        id="main-content"
        className={isClientDashboard ? "flex-1" : "flex-1 pt-[4.5rem]"}
      >
        {children}
      </div>
      {!isClientDashboard && footer}
    </>
  );
}
