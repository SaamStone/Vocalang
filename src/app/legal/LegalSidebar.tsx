'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { t } from '@/lib/i18n';

const legalLinks = [
  { href: '/legal/terms', label: 'Terms & Conditions' },
  { href: '/legal/privacy', label: 'Privacy Policy' },
  { href: '/legal/acceptable-use', label: 'Acceptable Use Policy' },
  { href: '/legal/refund', label: 'Refund Policy' },
];

export function LegalSidebar() {
  const pathname = usePathname();

  return (
    <nav className="flex md:flex-col gap-2 overflow-x-auto pb-4 md:pb-0 hide-scrollbar">
      {legalLinks.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              'whitespace-nowrap px-4 py-2 rounded-md text-sm font-medium transition-colors',
              isActive
                ? 'bg-[rgb(var(--color-primary))] text-white'
                : 'text-[rgb(var(--color-foreground))] hover:bg-[rgb(var(--color-muted))]'
            )}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}