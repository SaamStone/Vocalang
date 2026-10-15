"use client";

import type { ReactNode } from "react";

export function ConditionalChrome({
  children,
  header,
  footer,
}: {
  children: ReactNode;
  header: ReactNode;
  footer: ReactNode;
}) {
  return (
    <>
      {header}
      <div id="main-content" className="flex-1 pt-[4.5rem]">{children}</div>
      {footer}
    </>
  );
}
