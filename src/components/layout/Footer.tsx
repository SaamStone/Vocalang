import Link from "next/link";
import { Logo } from "./Logo";
import { siteConfig } from "@/lib/config/site";
import { t } from "@/lib/i18n";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[rgb(var(--color-border))] bg-[rgb(var(--color-muted))]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main footer grid */}
        <div className="py-12 sm:py-16 grid grid-cols-2 sm:grid-cols-4 gap-8">
          {/* Brand column */}
          <div className="col-span-2 sm:col-span-1">
            <Logo size="default" />
            <p className="mt-4 text-sm text-[rgb(var(--color-muted-foreground))] max-w-xs leading-relaxed">
              {siteConfig.description}
            </p>
          </div>

          {/* Product links */}
          <div>
            <h3 className="text-sm font-semibold text-[rgb(var(--color-foreground))] tracking-wide">
              {t("footer.product")}
            </h3>
            <ul className="mt-4 space-y-3">
              {siteConfig.footer.product.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-[rgb(var(--color-muted-foreground))] hover:text-[rgb(var(--color-foreground))] transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company links */}
          <div>
            <h3 className="text-sm font-semibold text-[rgb(var(--color-foreground))] tracking-wide">
              {t("footer.company")}
            </h3>
            <ul className="mt-4 space-y-3">
              {siteConfig.footer.company.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-[rgb(var(--color-muted-foreground))] hover:text-[rgb(var(--color-foreground))] transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal links */}
          <div>
            <h3 className="text-sm font-semibold text-[rgb(var(--color-foreground))] tracking-wide">
              {t("footer.legal")}
            </h3>
            <ul className="mt-4 space-y-3">
              {siteConfig.footer.legal.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-[rgb(var(--color-muted-foreground))] hover:text-[rgb(var(--color-foreground))] transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[rgb(var(--color-border))] py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[rgb(var(--color-muted-foreground))]">
            &copy; {currentYear} {siteConfig.name}. {t("footer.rights")}
          </p>
          <p className="text-sm text-[rgb(var(--color-muted-foreground))]">
            {t("footer.madeIn")}
          </p>
        </div>
      </div>
    </footer>
  );
}
