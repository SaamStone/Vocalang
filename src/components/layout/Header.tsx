"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ArrowLeft, Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { siteConfig } from "@/lib/config/site";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleBack = () => {
    setMobileOpen(false);
    if (Number(window.history.state?.idx) > 0) {
      router.back();
    } else {
      router.push("/");
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-[var(--z-sticky)] bg-[rgb(var(--color-background))/0.8] backdrop-blur-xl border-b border-[rgb(var(--color-border))]">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 h-[4.5rem]"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <div className="flex flex-shrink-0 items-center gap-3">
          <Link href="/" aria-label="Vocalang Home">
            <Logo size="default" />
          </Link>
          {pathname !== "/" && (
            <button
              type="button"
              onClick={handleBack}
              className="inline-flex items-center gap-1.5 rounded-full border border-[rgb(var(--color-border))] px-3 py-2 text-sm font-medium text-[rgb(var(--color-muted-foreground))] transition-colors hover:bg-[rgb(var(--color-muted))] hover:text-[rgb(var(--color-foreground))]"
              aria-label="Go back"
              title="Go back"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              <span>Back</span>
            </button>
          )}
        </div>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-1">
          {siteConfig.nav.main.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-4 py-2 text-sm font-medium text-[rgb(var(--color-muted-foreground))] hover:text-[rgb(var(--color-foreground))] transition-colors duration-[var(--duration-fast)]"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Desktop right section */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Theme toggle */}
          <ThemeToggle />

          {/* Login */}
          <Link
            href="/login"
            className="px-4 py-2 text-sm font-medium text-[rgb(var(--color-muted-foreground))] hover:text-[rgb(var(--color-foreground))] transition-colors"
          >
            {siteConfig.nav.login.label}
          </Link>

          {/* CTA */}
          <Link
            href="/demo"
            className="inline-flex items-center px-5 py-2.5 text-sm font-semibold text-white bg-[rgb(var(--color-primary))] hover:bg-[rgb(var(--color-primary-hover))] rounded-full transition-all duration-[var(--duration-fast)] shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)]"
          >
            {siteConfig.nav.cta.label}
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="inline-flex items-center justify-center p-2 rounded-[var(--radius-md)] text-[rgb(var(--color-muted-foreground))] hover:text-[rgb(var(--color-foreground))] hover:bg-[rgb(var(--color-muted))] transition-colors"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-[rgb(var(--color-border))] bg-[rgb(var(--color-background))]">
          <div className="px-4 py-4 space-y-1">
            {siteConfig.nav.main.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-4 py-3 text-base font-medium text-[rgb(var(--color-foreground))] hover:bg-[rgb(var(--color-muted))] rounded-[var(--radius-md)] transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}

            <div className="pt-4 space-y-3">
              <Link
                href="/login"
                className="block w-full text-center px-4 py-3 text-base font-medium text-[rgb(var(--color-foreground))] border border-[rgb(var(--color-border))] rounded-[var(--radius-lg)] hover:bg-[rgb(var(--color-muted))] transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                Log in
              </Link>
              <Link
                href="/demo"
                className="block w-full text-center px-4 py-3 text-base font-semibold text-white bg-[rgb(var(--color-primary))] hover:bg-[rgb(var(--color-primary-hover))] rounded-[var(--radius-lg)] transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                Try free demo
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
