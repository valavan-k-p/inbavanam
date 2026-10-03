"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useReducedMotion } from "motion/react";
import type { MediaAsset } from "@/types/content";
import { cn } from "@/lib/utils";

/** How long each photograph is held before the next one fades in. */
export const SLIDE_MS = 4000;

/**
 * Hero background: the photographs cross-fade, one every four seconds. They
 * are decoration behind the artwork, so they carry no alt text and are hidden
 * from assistive technology. Reduced motion holds the first photograph.
 */
export function HeroSlideshow({ slides }: { slides: MediaAsset[] }) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const usable = slides.filter((slide) => slide.src);

  useEffect(() => {
    if (reduce || usable.length < 2) return;
    // Nothing to animate while the tab is in the background.
    let timer = 0;
    const tick = () => setActive((current) => (current + 1) % usable.length);
    const start = () => {
      window.clearInterval(timer);
      timer = window.setInterval(tick, SLIDE_MS);
    };
    const onVisibility = () => {
      if (document.hidden) window.clearInterval(timer);
      else start();
    };
    start();
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [reduce, usable.length]);

  if (!usable.length) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-20 bg-maroon-deep">
      {usable.map((slide, i) => (
        <Image
          key={slide.src}
          src={slide.src as string}
          alt=""
          fill
          priority={i === 0}
          loading={i === 0 ? undefined : "lazy"}
          sizes="100vw"
          className={cn(
            "object-cover transition-opacity duration-[1400ms] ease-[var(--ease-out-soft)] motion-reduce:transition-none",
            i === active ? "opacity-100" : "opacity-0",
          )}
        />
      ))}
    </div>
  );
}
