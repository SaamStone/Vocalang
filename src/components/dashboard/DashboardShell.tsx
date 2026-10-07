"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Megaphone,
  Wallet,
  Phone,
  PhoneIncoming,
  PhoneOutgoing,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Zap,
  Bell,
  User,
} from "lucide-react";
import { LogoIcon, Logo } from "@/components/layout/Logo";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { cn, formatINR } from "@/lib/utils";

interface SidebarItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string | number;
}

const sidebarItems: SidebarItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Campaigns", href: "/dashboard/campaigns", icon: Megaphone },
  { label: "Outbound Calls", href: "/dashboard/calls/outbound", icon: PhoneOutgoing },
  { label: "Inbound Calls", href: "/dashboard/calls/inbound", icon: PhoneIncoming },
  { label: "Wallet", href: "/dashboard/wallet", icon: Wallet },
  { label: "Numbers", href: "/dashboard/numbers", icon: Phone },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function DashboardSidebar({ onCollapsedChange }: { onCollapsedChange?: (collapsed: boolean) => void }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    window.sessionStorage.removeItem('vocalang-demo-session');
    router.push('/login');
  };
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(href);
  };

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center justify-between px-4 h-16 border-b border-[rgb(var(--color-border))]">
        {collapsed ? (
          <LogoIcon size={28} />
        ) : (
          <Logo size="small" />
        )}
        <button
          onClick={() => setCollapsed((current) => {
            const next = !current;
            onCollapsedChange?.(next);
            return next;
          })}
          className="hidden lg:flex items-center justify-center w-7 h-7 rounded-[var(--radius-md)] text-[rgb(var(--color-muted-foreground))] hover:text-[rgb(var(--color-foreground))] hover:bg-[rgb(var(--color-muted))] transition-colors"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>

      {/* New Campaign button */}
      <div className="px-3 pt-4 pb-2">
        <Link
          href="/dashboard/campaigns/new"
          className={cn(
            "flex items-center gap-2 w-full px-3 py-2.5 rounded-[var(--radius-lg)] bg-[rgb(var(--color-primary))] text-white font-semibold text-sm hover:bg-[rgb(var(--color-primary-hover))] transition-colors shadow-[var(--shadow-sm)]",
            collapsed && "justify-center px-2"
          )}
        >
          <Zap className="h-4 w-4 flex-shrink-0" />
          {!collapsed && <span>New Campaign</span>}
        </Link>
      </div>

      {/* Nav items */}
      <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-[var(--radius-lg)] text-sm font-medium transition-all duration-[var(--duration-fast)]",
                active
                  ? "bg-[rgb(var(--color-primary-light))] text-[rgb(var(--color-primary))]"
                  : "text-[rgb(var(--color-muted-foreground))] hover:text-[rgb(var(--color-foreground))] hover:bg-[rgb(var(--color-muted))]",
                collapsed && "justify-center px-2"
              )}
              title={collapsed ? item.label : undefined}
            >
              <Icon className={cn("h-5 w-5 flex-shrink-0", active && "text-[rgb(var(--color-primary))]")} />
              {!collapsed && (
                <>
                  <span className="flex-1">{item.label}</span>
                  {item.badge && (
                    <span className="px-2 py-0.5 text-xs font-semibold bg-[rgb(var(--color-primary))] text-white rounded-[var(--radius-full)]">
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className="px-3 pb-4 space-y-1 border-t border-[rgb(var(--color-border))] pt-3">
        {!collapsed && (
          <div className="px-3 py-2 mb-2 rounded-[var(--radius-lg)] bg-[rgb(var(--color-muted))]">
            <p className="text-xs text-[rgb(var(--color-muted-foreground))]">Wallet Balance</p>
            <p className="text-lg font-bold text-[rgb(var(--color-foreground))]">{formatINR(4250)}</p>
          </div>
        )}
        <button
          onClick={handleLogout}
          className={cn(
            "flex items-center gap-3 w-full px-3 py-2.5 rounded-[var(--radius-lg)] text-sm font-medium text-[rgb(var(--color-muted-foreground))] hover:text-[rgb(var(--color-error))] hover:bg-[rgb(var(--color-error-light))] transition-colors",
            collapsed && "justify-center px-2"
          )}
        >
          <LogOut className="h-5 w-5 flex-shrink-0" />
          {!collapsed && <span>Log out</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile hamburger */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-[var(--z-sticky)] p-2 rounded-[var(--radius-md)] bg-[rgb(var(--color-card))] border border-[rgb(var(--color-border))] shadow-[var(--shadow-md)]"
        aria-label="Open menu"
      >
        <LayoutDashboard className="h-5 w-5 text-[rgb(var(--color-foreground))]" />
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-[var(--z-modal)]"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <aside
        className={cn(
          "lg:hidden fixed inset-y-0 left-0 z-[var(--z-modal)] w-64 bg-[rgb(var(--color-card))] border-r border-[rgb(var(--color-border))] transform transition-transform duration-[var(--duration-normal)] ease-[var(--ease-out)]",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {sidebarContent}
      </aside>

      {/* Desktop sidebar */}
      <aside
        className={cn(
          "hidden lg:flex flex-col fixed inset-y-0 left-0 z-[var(--z-sticky)] bg-[rgb(var(--color-card))] border-r border-[rgb(var(--color-border))] transition-all duration-[var(--duration-normal)]",
          collapsed ? "w-[68px]" : "w-64"
        )}
      >
        {sidebarContent}
      </aside>
    </>
  );
}

export function DashboardHeader() {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const router = useRouter();

  const logout = () => {
    window.sessionStorage.removeItem("vocalang-demo-session");
    router.push("/login");
  };

  return (
    <header className="sticky top-0 z-[var(--z-sticky)] h-16 bg-[rgb(var(--color-background))/0.8] backdrop-blur-xl border-b border-[rgb(var(--color-border))] flex items-center justify-end px-4 sm:px-6 gap-3">
      <ThemeToggle />

      <button
        type="button"
        onClick={() => { setNotificationsOpen((open) => !open); setProfileOpen(false); }}
        aria-expanded={notificationsOpen}
        className="relative p-2 rounded-[var(--radius-md)] text-[rgb(var(--color-muted-foreground))] hover:text-[rgb(var(--color-foreground))] hover:bg-[rgb(var(--color-muted))] transition-colors"
        aria-label="Notifications"
      >
        <Bell className="h-5 w-5" />
        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[rgb(var(--color-error))] rounded-full" />
      </button>

      {notificationsOpen && (
        <div role="status" className="absolute right-20 top-14 z-[var(--z-dropdown)] w-72 rounded-[var(--radius-lg)] border border-[rgb(var(--color-border))] bg-[rgb(var(--color-card))] p-4 shadow-[var(--shadow-lg)]">
          <p className="font-semibold text-[rgb(var(--color-foreground))]">Notifications</p>
          <p className="mt-2 text-sm text-[rgb(var(--color-muted-foreground))]">You’re all caught up. New campaign updates will appear here.</p>
        </div>
      )}

      <button type="button" aria-label="Account menu" aria-expanded={profileOpen} onClick={() => { setProfileOpen((open) => !open); setNotificationsOpen(false); }} className="flex items-center gap-2 p-1.5 pr-3 rounded-[var(--radius-full)] hover:bg-[rgb(var(--color-muted))] transition-colors">
        <div className="w-8 h-8 rounded-full bg-[rgb(var(--color-primary))] flex items-center justify-center">
          <User className="h-4 w-4 text-white" />
        </div>
        <span className="hidden sm:block text-sm font-medium text-[rgb(var(--color-foreground))]">
          Ravi Kumar
        </span>
      </button>
      {profileOpen && (
        <div className="absolute right-3 top-14 z-[var(--z-dropdown)] w-48 rounded-[var(--radius-lg)] border border-[rgb(var(--color-border))] bg-[rgb(var(--color-card))] p-2 shadow-[var(--shadow-lg)]">
          <Link href="/dashboard/settings" onClick={() => setProfileOpen(false)} className="block rounded-[var(--radius-md)] px-3 py-2 text-sm text-[rgb(var(--color-foreground))] hover:bg-[rgb(var(--color-muted))]">Account settings</Link>
          <button type="button" onClick={logout} className="w-full rounded-[var(--radius-md)] px-3 py-2 text-left text-sm text-[rgb(var(--color-error))] hover:bg-[rgb(var(--color-muted))]">Log out</button>
        </div>
      )}
    </header>
  );
}




