"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useReducedMotion } from "motion/react";
import type { MediaAsset } from "@/types/content";
import { cn } from "@/lib/utils";

/** How long each photograph is held before the next one begins to arrive. */
export const SLIDE_MS = 3000;

/** How long one photograph takes to dissolve into the next. */
export const FADE_MS = 1400;

/**
 * Hero background: the photographs dissolve into one another, one every three
 * seconds.
 *
 * The incoming photograph fades in *on top of* the outgoing one, which is held
 * at full opacity underneath until it is covered. Fading one out while fading
 * the other in would let the dark base show through at the halfway point and
 * read as a flicker.
 *
 * The photographs are decoration behind the artwork, so they carry no alt text
 * and are hidden from assistive technology. Reduced motion holds the first one.
 */
export function HeroSlideshow({ slides }: { slides: MediaAsset[] }) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const usable = slides.filter((slide) => slide.src);
  const count = usable.length;

  useEffect(() => {
    if (reduce || count < 2) return;
    let timer = 0;
    const start = () => {
      window.clearInterval(timer);
      timer = window.setInterval(() => setActive((current) => (current + 1) % count), SLIDE_MS);
    };
    // Nothing to animate while the tab is in the background.
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
  }, [reduce, count]);

  if (!count) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-20 bg-maroon-deep">
      {usable.map((slide, i) => {
        // 0 for the photograph showing, 1 for the one it replaced, and so on.
        const age = (active - i + count) % count;
        return (
          <Image
            key={slide.src}
            data-active={age === 0 ? "" : undefined}
            src={slide.src as string}
            alt=""
            fill
            priority={i === 0}
            loading={i === 0 ? undefined : "lazy"}
            sizes="100vw"
            className={cn(
              "[transform:translateZ(0)] object-cover [will-change:opacity] [backface-visibility:hidden] motion-reduce:transition-none",
              age <= 1 ? "opacity-100" : "opacity-0",
            )}
            style={{
              zIndex: count - age,
              transitionProperty: "opacity",
              transitionDuration: `${FADE_MS}ms`,
              transitionTimingFunction: "linear",
            }}
          />
        );
      })}
    </div>
  );
}
