"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { primaryNav, site, supportLink } from "@/data/site";
import { Logo } from "@/components/brand/logo";
import { Wordmark } from "@/components/brand/wordmark";
import { ButtonLink } from "@/components/ui/button-link";
import { cn } from "@/lib/utils";
import { SiteMenu } from "./site-menu";

type ScrollState = { scrolled: boolean; hidden: boolean };

/** Tracks whether the page has scrolled, and hides the header while scrolling down. */
function useScrollState(): ScrollState {
  const [state, setState] = useState<ScrollState>({ scrolled: false, hidden: false });

  useEffect(() => {
    let lastY = window.scrollY;
    let frame = 0;
    const update = () => {
      const y = window.scrollY;
      const next = { scrolled: y > 40, hidden: y > 520 && y > lastY + 2 };
      if (Math.abs(y - lastY) > 2) lastY = y;
      frame = 0;
      setState((prev) =>
        prev.scrolled === next.scrolled && prev.hidden === next.hidden ? prev : next,
      );
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    frame = requestAnimationFrame(update);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return state;
}

export function SiteHeader() {
  const pathname = usePathname();
  const { scrolled, hidden } = useScrollState();
  const overHero = pathname === "/" && !scrolled;
  const isCurrent = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={cn(
        "on-dark fixed inset-x-0 top-0 z-40 transition-[background-color,translate,box-shadow] duration-500 ease-[var(--ease-out-soft)] focus-within:translate-y-0",
        overHero ? "bg-transparent" : "bg-maroon shadow-[0_10px_30px_-20px_rgb(0_0_0/0.6)]",
        hidden && "-translate-y-full",
      )}
    >
      <div className="container-page flex h-[var(--header-h)] items-center justify-between gap-6">
        <Link href="/" aria-label={`${site.name} home`} className="flex items-center gap-3">
          <Logo size={42} onDark priority />
          <Wordmark className="hidden sm:flex" />
        </Link>

        <nav aria-label="Main" className="hidden min-[1360px]:block">
          <ul className="flex items-center gap-6">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isCurrent(item.href) ? "page" : undefined}
                  className="link-underline py-2 label text-[0.66rem] tracking-[0.18em]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3 sm:gap-5">
          <ButtonLink
            href={supportLink.href}
            variant="khaki"
            size="sm"
            className="hidden md:inline-flex"
          >
            {supportLink.label}
          </ButtonLink>
          <SiteMenu />
        </div>
      </div>
    </header>
  );
}
