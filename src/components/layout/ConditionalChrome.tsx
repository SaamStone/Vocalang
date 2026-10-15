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
  const isFounderArea = pathname.startsWith("/founder");

  return (
    <>
      {!isFounderArea && header}
      <div id="main-content" className={`flex-1 ${isFounderArea ? "" : "pt-[4.5rem]"}`}>{children}</div>
      {!isFounderArea && footer}
    </>
  );
}
