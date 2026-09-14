"use client";

import { useId, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dialog } from "@base-ui/react/dialog";
import { motion, useReducedMotion } from "motion/react";
import { X } from "lucide-react";
import type { NavItem } from "@/types/content";
import { enquireLink, primaryNav, site, supportLink } from "@/data/site";
import { Logo } from "@/components/brand/logo";
import { KolamKnot } from "@/components/illustrations/kolam";
import { LineArt } from "@/components/illustrations/line-art";
import { ButtonLink } from "@/components/ui/button-link";
import { cn } from "@/lib/utils";
import { nextIndex, radialPositions } from "./radial-geometry";

const ease = [0.22, 1, 0.36, 1] as const;

function useIsCurrent() {
  const pathname = usePathname();
  return (href: string) => pathname === href || pathname.startsWith(`${href}/`);
}

/**
 * Signature navigation: a full-screen overlay with the logo at the centre
 * and the sections as circular medallions on a ring (desktop), or a stacked
 * list below 1024px. Built on Base UI Dialog for focus trapping, Escape to
 * close, scroll lock and correct dialog semantics.
 */
export function SiteMenu() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger
        aria-label="Open menu"
        className="inline-flex min-h-11 cursor-pointer items-center gap-3 px-1 label"
      >
        <MenuGlyph />
        <span aria-hidden="true" className="min-[1360px]:hidden">
          Menu
        </span>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-maroon-deep/70 transition-opacity duration-500 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0" />
        <Dialog.Popup className="surface-maroon grain fixed inset-0 z-50 overflow-x-hidden overflow-y-auto transition-opacity duration-500 ease-[var(--ease-out-soft)] outline-none data-[ending-style]:opacity-0 data-[starting-style]:opacity-0">
          <KolamKnot className="pointer-events-none absolute -top-12 -left-12 w-44 text-stone/15 md:w-60" />
          <KolamKnot className="pointer-events-none absolute -right-12 -bottom-12 w-44 text-stone/15 md:w-60" />
          <Dialog.Title className="sr-only">Site navigation</Dialog.Title>
          <nav aria-label="Primary">
            <RadialLayout onNavigate={close} />
            <StackedLayout onNavigate={close} />
          </nav>
          <Dialog.Close
            aria-label="Close menu"
            className="fixed top-4 right-[var(--gutter)] grid size-12 cursor-pointer place-items-center rounded-full border border-rule transition-[transform,border-color] duration-500 ease-[var(--ease-out-soft)] hover:rotate-90 hover:border-cream"
          >
            <X aria-hidden="true" className="size-5" strokeWidth={1.25} />
          </Dialog.Close>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function Medallion({
  item,
  current,
  className,
}: {
  item: NavItem;
  current: boolean;
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "relative grid shrink-0 place-items-center overflow-hidden rounded-full border bg-walnut text-cream shadow-[0_14px_32px_-16px_rgb(0_0_0/0.8)] transition-[transform,border-color,box-shadow] duration-500 ease-[var(--ease-out-soft)] group-hover:scale-[1.08] group-focus-visible:scale-[1.08]",
        current
          ? "border-terracotta ring-2 ring-terracotta/60"
          : "border-cream/50 group-hover:border-cream",
        className,
      )}
    >
      {item.image ? (
        <Image
          src={item.image}
          alt=""
          fill
          sizes="112px"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
      ) : (
        <LineArt
          name={item.art}
          className="size-1/2 transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:-rotate-6"
        />
      )}
    </span>
  );
}

function RadialLayout({ onNavigate }: { onNavigate: () => void }) {
  const isCurrent = useIsCurrent();
  const reduce = useReducedMotion();
  const descId = useId();
  const [active, setActive] = useState<number | null>(null);
  const links = useRef<(HTMLAnchorElement | null)[]>([]);
  const points = radialPositions(primaryNav.length, 40);
  const shown = active === null ? null : primaryNav[active];

  const handleKeyDown = (i: number) => (event: React.KeyboardEvent) => {
    const next = nextIndex(i, event.key, primaryNav.length);
    if (next === null) return;
    event.preventDefault();
    links.current[next]?.focus();
  };

  return (
    <div className="hidden min-h-svh flex-col items-center justify-center gap-14 py-20 lg:flex">
      <div className="relative aspect-square w-[min(70vh,54vw,44rem)]">
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 size-full overflow-visible text-stone/45"
          fill="none"
          stroke="currentColor"
          aria-hidden="true"
        >
          <motion.circle
            cx={50}
            cy={50}
            r={40}
            strokeWidth={0.18}
            initial={reduce ? false : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.4, ease }}
          />
          <circle
            cx={50}
            cy={50}
            r={26}
            strokeWidth={0.35}
            strokeDasharray="0.01 1.5"
            strokeLinecap="round"
            opacity={0.7}
          />
        </svg>

        <motion.div
          className="absolute top-1/2 left-1/2 flex w-[44%] -translate-x-1/2 -translate-y-1/2 flex-col items-center text-center"
          initial={reduce ? false : { opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease, delay: 0.05 }}
        >
          <KolamKnot
            draw
            className="pointer-events-none absolute top-1/2 left-1/2 w-[120%] -translate-x-1/2 -translate-y-1/2 text-stone/15"
          />
          <Link
            href="/"
            onClick={onNavigate}
            aria-label={`${site.name} home`}
            aria-current={isCurrent("/") ? "page" : undefined}
            className="relative rounded-full"
          >
            <Logo size={92} onDark priority />
          </Link>
          <p
            aria-hidden="true"
            className="relative mt-5 font-display text-[clamp(1.9rem,1.1rem+1.6vw,2.9rem)] leading-none tracking-[0.12em] uppercase"
          >
            {site.name}
          </p>
          <p
            aria-hidden="true"
            className="relative mt-3 min-h-[2.8em] max-w-[24ch] label text-muted-foreground"
          >
            {shown ? shown.description : site.tagline}
          </p>
        </motion.div>

        <ul>
          {primaryNav.map((item, i) => {
            const p = points[i];
            const current = isCurrent(item.href);
            return (
              <motion.li
                key={item.href}
                className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${p.x}%`, top: `${p.y}%` }}
                initial={reduce ? false : { left: "50%", top: "50%", opacity: 0, scale: 0.4 }}
                animate={{ left: `${p.x}%`, top: `${p.y}%`, opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 110, damping: 17, delay: 0.15 + i * 0.05 }}
              >
                <Link
                  ref={(el) => {
                    links.current[i] = el;
                  }}
                  href={item.href}
                  onClick={onNavigate}
                  onKeyDown={handleKeyDown(i)}
                  onMouseEnter={() => setActive(i)}
                  onMouseLeave={() => setActive(null)}
                  onFocus={() => setActive(i)}
                  onBlur={() => setActive(null)}
                  aria-current={current ? "page" : undefined}
                  aria-describedby={`${descId}-${i}`}
                  data-nav-link="radial"
                  className="group relative flex rounded-full"
                >
                  <Medallion
                    item={item}
                    current={current}
                    className="size-[clamp(4.75rem,2.4rem+3.4vw,7rem)]"
                  />
                  <span className="absolute top-full left-1/2 mt-3 -translate-x-1/2 label whitespace-nowrap transition-colors duration-300 group-hover:text-cream">
                    {item.label}
                  </span>
                </Link>
                <span id={`${descId}-${i}`} className="sr-only">
                  {item.description}
                </span>
              </motion.li>
            );
          })}
        </ul>
      </div>

      <motion.div
        className="flex flex-col items-center gap-4"
        initial={reduce ? false : { opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease, delay: 0.6 }}
      >
        <ButtonLink href={enquireLink.href} onClick={onNavigate} variant="khaki" arrow>
          {enquireLink.label}
        </ButtonLink>
        <Link href={supportLink.href} onClick={onNavigate} className="link-underline py-2 label">
          {supportLink.label}
        </Link>
      </motion.div>
    </div>
  );
}

function StackedLayout({ onNavigate }: { onNavigate: () => void }) {
  const isCurrent = useIsCurrent();
  const reduce = useReducedMotion();
  const idBase = useId();

  return (
    <div className="container-page flex min-h-svh flex-col gap-8 pt-5 pb-12 lg:hidden">
      <Link
        href="/"
        onClick={onNavigate}
        aria-label={`${site.name} home`}
        className="flex items-center gap-3 self-start"
      >
        <Logo size={48} onDark />
        <span aria-hidden="true" className="font-display text-xl tracking-[0.14em] uppercase">
          {site.name}
        </span>
      </Link>
      <ol className="relative flex flex-col gap-1">
        <span
          aria-hidden="true"
          className="absolute top-8 bottom-8 left-6 border-l border-dotted border-stone/50"
        />
        {primaryNav.map((item, i) => {
          const current = isCurrent(item.href);
          return (
            <motion.li
              key={item.href}
              initial={reduce ? false : { opacity: 0, x: -18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease, delay: 0.08 + i * 0.045 }}
            >
              <Link
                href={item.href}
                onClick={onNavigate}
                aria-current={current ? "page" : undefined}
                aria-labelledby={`${idBase}-${i}-label`}
                aria-describedby={`${idBase}-${i}-desc`}
                data-nav-link="stacked"
                className="group relative flex items-center gap-5 py-2"
              >
                <Medallion item={item} current={current} className="size-12" />
                <span className="flex flex-col">
                  <span
                    id={`${idBase}-${i}-label`}
                    className="font-display text-[1.75rem] leading-tight"
                  >
                    {item.label}
                  </span>
                  <span id={`${idBase}-${i}-desc`} className="text-sm text-muted-foreground">
                    {item.description}
                  </span>
                </span>
              </Link>
            </motion.li>
          );
        })}
      </ol>
      <div className="flex flex-col items-start gap-4">
        <ButtonLink href={enquireLink.href} onClick={onNavigate} variant="khaki" arrow>
          {enquireLink.label}
        </ButtonLink>
        <Link href={supportLink.href} onClick={onNavigate} className="link-underline py-2 label">
          {supportLink.label}
        </Link>
      </div>
    </div>
  );
}

/** A 3 x 3 pulli grid, echoing the kolam dots, as the menu icon. */
function MenuGlyph() {
  return (
    <svg viewBox="0 0 18 18" className="size-[18px]" fill="currentColor" aria-hidden="true">
      {[3, 9, 15].flatMap((y) =>
        [3, 9, 15].map((x) => <circle key={`${x}-${y}`} cx={x} cy={y} r={1.4} />),
      )}
    </svg>
  );
}
