"use client";

import { useState } from "react";
import Link, { useLinkStatus } from "next/link";
import { usePathname } from "next/navigation";
import {
  CalendarDays,
  FileText,
  Image as ImageIcon,
  Inbox,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings as SettingsIcon,
  Sparkles,
  Users,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface NavItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
}

interface AdminNavProps {
  staff: {
    name: string;
    role: string;
  };
  unreadEnquiries?: number;
  signOutAction: () => Promise<void>;
}

export function AdminNav({ staff, unreadEnquiries = 0, signOutAction }: AdminNavProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems: NavItem[] = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/events", label: "Events / Calendar", icon: CalendarDays },
    { href: "/admin/content", label: "Website Content", icon: FileText },
    { href: "/admin/media", label: "Images / Media", icon: ImageIcon },
    { href: "/admin/programmes", label: "Programmes", icon: Sparkles },
    { href: "/admin/profile", label: "About / Organisation", icon: Users },
    { href: "/admin/enquiries", label: "Enquiries", icon: Inbox, badge: unreadEnquiries },
    { href: "/admin/settings", label: "Settings", icon: SettingsIcon },
  ];

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  const navContent = (
    <div className="flex h-full flex-col justify-between">
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <Link
            href="/admin"
            onClick={() => setMobileOpen(false)}
            className="flex flex-col gap-0.5"
          >
            <span className="font-display text-xl font-semibold tracking-wider text-ivory">
              INBAVANAM
            </span>
            <span className="label text-[0.65rem] tracking-[0.25em] text-cream/70">
              CMS DASHBOARD
            </span>
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
            className="grid size-9 place-items-center rounded border border-ivory/20 text-ivory md:hidden"
          >
            <X className="size-5" />
          </button>
        </div>

        <nav aria-label="Admin Navigation">
          <ul className="flex flex-col gap-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "flex min-h-11 items-center gap-3 rounded-[var(--radius)] px-3.5 py-2.5 text-sm font-medium transition-colors",
                      active
                        ? "bg-ivory text-maroon shadow-xs"
                        : "text-ivory/85 hover:bg-ivory/10 hover:text-ivory",
                    )}
                  >
                    <Icon
                      className={cn("size-4 shrink-0", active ? "text-maroon" : "text-ivory/70")}
                    />
                    <span className="flex-1">{item.label}</span>
                    <NavPending />
                    {item.badge && item.badge > 0 ? (
                      <span
                        className={cn(
                          "grid min-w-5 place-items-center rounded-full px-1.5 text-[0.7rem] font-bold",
                          active ? "bg-terracotta text-ivory" : "bg-ivory text-maroon",
                        )}
                      >
                        {item.badge}
                      </span>
                    ) : null}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      <div className="mt-8 flex flex-col gap-4 border-t border-ivory/15 pt-6 text-sm text-ivory">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate font-semibold text-ivory">{staff.name}</p>
            <p className="text-xs text-cream/70 capitalize">{staff.role}</p>
          </div>
          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-cream/70 underline underline-offset-4 hover:text-ivory"
          >
            View site ↗
          </Link>
        </div>

        <form action={signOutAction}>
          <button
            type="submit"
            className="flex min-h-10 w-full cursor-pointer items-center justify-center gap-2 rounded-[var(--radius)] border border-ivory/20 px-3 py-2 label text-xs text-ivory transition-colors hover:bg-ivory/10"
          >
            <LogOut className="size-3.5" />
            <span>Sign out</span>
          </button>
        </form>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Top Bar */}
      <header className="surface-maroon sticky top-0 z-30 flex items-center justify-between border-b border-ivory/10 px-5 py-3 md:hidden">
        <Link href="/admin" className="flex flex-col">
          <span className="font-display text-lg font-semibold tracking-wider text-ivory">
            INBAVANAM
          </span>
          <span className="label text-[0.6rem] tracking-[0.2em] text-cream/70">CMS DASHBOARD</span>
        </Link>
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          aria-label="Open navigation menu"
          className="grid size-10 cursor-pointer place-items-center rounded border border-ivory/25 text-ivory"
        >
          <Menu className="size-5" />
        </button>
      </header>

      {/* Mobile Backdrop & Drawer */}
      {mobileOpen && (
        <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 flex md:hidden">
          <div
            className="fixed inset-0 bg-maroon-deep/80 backdrop-blur-xs"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="surface-maroon relative z-10 flex w-72 max-w-[85vw] flex-col p-6 shadow-2xl">
            {navContent}
          </aside>
        </div>
      )}

      {/* Desktop Sticky Sidebar */}
      <aside className="surface-maroon sticky top-0 hidden h-dvh w-64 shrink-0 flex-col border-r border-ivory/10 p-6 md:flex">
        {navContent}
      </aside>
    </>
  );
}

/**
 * A spinner on the link being opened. The panel beside it shows a skeleton
 * (loading.tsx), but the click itself needs an answer too: these pages are
 * built per request, so there is nothing to show instantly.
 */
function NavPending() {
  const { pending } = useLinkStatus();
  if (!pending) return null;
  return (
    <span
      aria-hidden="true"
      className="size-3.5 shrink-0 animate-spin rounded-full border-2 border-current border-t-transparent opacity-70 motion-reduce:animate-none"
    />
  );
}
