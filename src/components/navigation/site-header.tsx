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

/**
 * Tracks whether the page has scrolled past the hero, which is what turns the
 * header's background on. The header itself stays put: it never hides.
 */
function useScrolled(): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const next = window.scrollY > 40;
      setScrolled((prev) => (prev === next ? prev : next));
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

  return scrolled;
}

export function SiteHeader() {
  const pathname = usePathname();
  const scrolled = useScrolled();
  const overHero = pathname === "/" && !scrolled;
  const isCurrent = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={cn(
        "on-dark fixed inset-x-0 top-0 z-40 transition-[background-color,box-shadow] duration-500 ease-[var(--ease-out-soft)]",
        overHero ? "bg-transparent" : "bg-maroon shadow-[0_10px_30px_-20px_rgb(0_0_0/0.6)]",
      )}
    >
      <div className="container-page flex h-[var(--header-h)] items-center justify-between gap-6">
        <Link href="/" aria-label={`${site.name} home`} className="flex items-center gap-3">
          <Logo size={42} onDark priority />
          <Wordmark className="hidden sm:flex" />
        </Link>

        <nav aria-label="Main" className="hidden min-[1440px]:block">
          <ul className="flex items-center gap-5">
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
