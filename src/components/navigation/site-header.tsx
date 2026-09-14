"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSyncExternalStore } from "react";
import { enquireLink, site, supportLink } from "@/data/site";
import { cn } from "@/lib/utils";
import { SiteMenu } from "./site-menu";

const subscribe = (onChange: () => void) => {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
};

function useScrolledPast(offset: number) {
  return useSyncExternalStore(
    subscribe,
    () => window.scrollY > offset,
    () => false,
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const scrolled = useScrolledPast(48);
  const overHero = pathname === "/" && !scrolled;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-colors duration-[var(--dur-base)]",
        overHero ? "on-dark bg-transparent" : "border-b border-rule bg-cream text-ink",
      )}
    >
      <div className="container-page flex h-[var(--header-h)] items-center justify-between gap-6">
        <Link href="/" className="min-h-11 content-center label text-[0.8125rem] tracking-[0.32em]">
          {site.name}
        </Link>
        <div className="flex items-center gap-3 sm:gap-7">
          <Link
            href={supportLink.href}
            className="hidden min-h-11 content-center label underline-offset-8 hover:underline md:block"
          >
            {supportLink.label}
          </Link>
          <Link
            href={enquireLink.href}
            className="hidden min-h-11 items-center border border-current px-4 label transition-colors hover:bg-foreground/10 lg:inline-flex"
          >
            {enquireLink.label}
          </Link>
          <SiteMenu />
        </div>
      </div>
    </header>
  );
}
