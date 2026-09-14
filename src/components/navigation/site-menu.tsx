"use client";

import { useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dialog } from "@base-ui/react/dialog";
import { motion, useReducedMotion } from "motion/react";
import { X } from "lucide-react";
import { enquireLink, primaryNav, site, supportLink } from "@/data/site";
import { Logo } from "@/components/brand/logo";
import { KolamKnot } from "@/components/illustrations/kolam";
import { cn } from "@/lib/utils";
import { alongRay, nextIndex, radialPositions } from "./radial-geometry";

const ease = [0.22, 1, 0.36, 1] as const;

function useIsCurrent() {
  const pathname = usePathname();
  return (href: string) => pathname === href || pathname.startsWith(`${href}/`);
}

/**
 * Signature navigation: a full-screen overlay with the logo at the centre
 * and the sections arranged around it (desktop), or a stacked list with a
 * dotted kolam spine (below 1024px). Built on Base UI Dialog for focus
 * trapping, Escape to close, scroll lock and correct dialog semantics.
 */
export function SiteMenu() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger className="inline-flex min-h-11 cursor-pointer items-center gap-3 px-1 label">
        <MenuGlyph />
        <span>Menu</span>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-maroon-deep/70 transition-opacity duration-300 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0" />
        <Dialog.Popup className="surface-maroon grain fixed inset-0 z-50 overflow-y-auto transition-opacity duration-300 ease-[var(--ease-out-soft)] outline-none data-[ending-style]:opacity-0 data-[starting-style]:opacity-0">
          <Dialog.Title className="sr-only">Site navigation</Dialog.Title>
          <nav aria-label="Primary">
            <RadialLayout onNavigate={close} />
            <StackedLayout onNavigate={close} />
          </nav>
          <Dialog.Close className="fixed top-3 right-[var(--gutter)] inline-flex min-h-11 cursor-pointer items-center gap-3 px-1 label">
            <span>Close</span>
            <X aria-hidden="true" className="size-5" strokeWidth={1.25} />
          </Dialog.Close>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
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
    <div className="hidden min-h-svh flex-col items-center justify-center gap-6 py-16 lg:flex">
      <div className="relative aspect-square w-[min(78vh,64vw,50rem)]">
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 size-full text-stone/60"
          fill="none"
          stroke="currentColor"
          aria-hidden="true"
        >
          <motion.circle
            cx={50}
            cy={50}
            r={40}
            strokeWidth={0.35}
            strokeDasharray="0.01 1.6"
            strokeLinecap="round"
            initial={reduce ? false : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease }}
            style={{ transformOrigin: "50% 50%" }}
          />
          {points.map((p, i) => {
            const from = alongRay(p, 18);
            const to = alongRay(p, 33);
            return (
              <g key={p.angle}>
                <motion.path
                  d={`M${from.x} ${from.y}L${to.x} ${to.y}`}
                  strokeWidth={0.16}
                  initial={reduce ? false : { pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.7, ease, delay: 0.2 + i * 0.05 }}
                />
                <circle cx={from.x} cy={from.y} r={0.45} fill="currentColor" stroke="none" />
              </g>
            );
          })}
        </svg>

        <div className="absolute top-1/2 left-1/2 flex w-[30%] -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-5 text-center">
          <KolamKnot
            draw
            className="absolute top-[42%] left-1/2 w-[118%] -translate-x-1/2 -translate-y-1/2 text-stone/25"
          />
          <Link
            href="/"
            onClick={onNavigate}
            aria-label={`${site.name} home`}
            aria-current={isCurrent("/") ? "page" : undefined}
            className="relative rounded-full"
          >
            <Logo size={136} onDark priority />
          </Link>
          <p
            aria-hidden="true"
            className="relative min-h-[4.5em] text-sm leading-relaxed text-muted-foreground"
          >
            {shown ? shown.description : site.proposition}
          </p>
        </div>

        <ul>
          {primaryNav.map((item, i) => {
            const p = points[i];
            const current = isCurrent(item.href);
            return (
              <motion.li
                key={item.href}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${p.x}%`, top: `${p.y}%` }}
                initial={reduce ? false : { opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease, delay: 0.15 + i * 0.05 }}
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
                  className="group flex flex-col items-center gap-3 px-3 py-2 text-center"
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      "size-2.5 rounded-full border transition-colors duration-[var(--dur-fast)]",
                      current
                        ? "border-terracotta bg-terracotta"
                        : "border-cream group-hover:bg-cream group-focus-visible:bg-cream",
                    )}
                  />
                  <span className="font-display text-[clamp(1.5rem,0.9rem+1.1vw,2.25rem)] leading-none whitespace-nowrap transition-colors group-hover:text-cream">
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

      <SecondaryLinks onNavigate={onNavigate} className="justify-center" />
    </div>
  );
}

function StackedLayout({ onNavigate }: { onNavigate: () => void }) {
  const isCurrent = useIsCurrent();
  const reduce = useReducedMotion();
  const idBase = useId();

  return (
    <div className="container-page flex min-h-svh flex-col gap-10 pt-4 pb-12 lg:hidden">
      <Link
        href="/"
        onClick={onNavigate}
        aria-label={`${site.name} home`}
        className="self-start rounded-full"
      >
        <Logo size={72} onDark />
      </Link>
      <ol className="relative flex flex-col">
        <span
          aria-hidden="true"
          className="absolute top-5 bottom-5 left-[5px] border-l border-dotted border-stone/60"
        />
        {primaryNav.map((item, i) => {
          const current = isCurrent(item.href);
          return (
            <motion.li
              key={item.href}
              initial={reduce ? false : { opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45, ease, delay: 0.08 + i * 0.04 }}
            >
              <Link
                href={item.href}
                onClick={onNavigate}
                aria-current={current ? "page" : undefined}
                aria-labelledby={`${idBase}-${i}-label`}
                aria-describedby={`${idBase}-${i}-desc`}
                data-nav-link="stacked"
                className="group relative flex flex-col py-3 pl-9"
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute top-[1.35rem] left-0 size-[11px] rounded-full border",
                    current
                      ? "border-terracotta bg-terracotta"
                      : "border-cream bg-maroon group-hover:bg-cream",
                  )}
                />
                <span
                  id={`${idBase}-${i}-label`}
                  className="font-display text-[2rem] leading-tight"
                >
                  {item.label}
                </span>
                <span id={`${idBase}-${i}-desc`} className="text-sm text-muted-foreground">
                  {item.description}
                </span>
              </Link>
            </motion.li>
          );
        })}
      </ol>
      <SecondaryLinks onNavigate={onNavigate} className="flex-col items-start gap-4" />
    </div>
  );
}

function SecondaryLinks({ onNavigate, className }: { onNavigate: () => void; className?: string }) {
  return (
    <div className={cn("flex flex-wrap gap-8", className)}>
      <Link
        href={supportLink.href}
        onClick={onNavigate}
        className="min-h-11 content-center label underline-offset-8 hover:underline"
      >
        {supportLink.label}
      </Link>
      <Link
        href={enquireLink.href}
        onClick={onNavigate}
        className="min-h-11 content-center label underline-offset-8 hover:underline"
      >
        {enquireLink.label}
      </Link>
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
