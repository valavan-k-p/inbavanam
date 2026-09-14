"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Pause, Play } from "lucide-react";
import type { MediaAsset } from "@/types/content";
import { KolamKnot } from "@/components/illustrations/kolam";
import { cn } from "@/lib/utils";

const INTERVAL = 7000;
const tones = ["bg-maroon", "bg-olive-deep", "bg-walnut"];
const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Crossfading hero slideshow with a slow zoom on each slide. Auto-advances
 * every seven seconds, pauses on demand, and does not move at all under
 * reduced motion.
 */
export function HeroSlideshow({ slides }: { slides: MediaAsset[] }) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const autoplay = !reduce && !paused && slides.length > 1;
  const slide = slides[index];

  useEffect(() => {
    if (!autoplay) return;
    const timer = window.setTimeout(() => setIndex((i) => (i + 1) % slides.length), INTERVAL);
    return () => window.clearTimeout(timer);
  }, [autoplay, index, slides.length]);

  return (
    <>
      <div
        className="absolute inset-0 -z-20"
        role="group"
        aria-roledescription="carousel"
        aria-label="Photographs of Inbavanam"
      >
        <AnimatePresence initial={false}>
          <motion.div
            key={index}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${slides.length}`}
          >
            <div
              className={cn("absolute inset-0", !reduce && "animate-[kenburns_9s_ease-out_both]")}
            >
              {slide.src ? (
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  priority={index === 0}
                  sizes="100vw"
                  className="object-cover"
                />
              ) : (
                <SlidePlaceholder slide={slide} index={index} total={slides.length} />
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {slides.length > 1 ? (
        <div className="on-dark absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3 md:bottom-12">
          {slides.map((s, i) => {
            const current = i === index;
            return (
              <button
                key={s.alt}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Show slide ${i + 1} of ${slides.length}`}
                aria-current={current ? "true" : undefined}
                className={cn(
                  "flex min-h-11 cursor-pointer items-center gap-3 px-1 label text-[0.62rem] tabular transition-opacity",
                  current ? "opacity-100" : "opacity-60 hover:opacity-100",
                )}
              >
                {pad(i + 1)}
                {current ? (
                  <span
                    aria-hidden="true"
                    className="relative h-px w-12 overflow-hidden bg-ivory/30"
                  >
                    <span
                      key={`${index}-${autoplay}`}
                      className="absolute inset-0 origin-left bg-ivory"
                      style={
                        autoplay ? { animation: `progress ${INTERVAL}ms linear both` } : undefined
                      }
                    />
                  </span>
                ) : null}
              </button>
            );
          })}
          {reduce ? null : (
            <button
              type="button"
              onClick={() => setPaused((p) => !p)}
              aria-label={paused ? "Play slideshow" : "Pause slideshow"}
              className="ml-2 grid size-10 cursor-pointer place-items-center rounded-full border border-ivory/40 transition-colors hover:bg-ivory/10"
            >
              {paused ? (
                <Play aria-hidden="true" className="size-3.5" strokeWidth={1.5} />
              ) : (
                <Pause aria-hidden="true" className="size-3.5" strokeWidth={1.5} />
              )}
            </button>
          )}
        </div>
      ) : null}
    </>
  );
}

function SlidePlaceholder({
  slide,
  index,
  total,
}: {
  slide: MediaAsset;
  index: number;
  total: number;
}) {
  return (
    <div
      role="img"
      aria-label={`${slide.alt} (photograph to be supplied)`}
      data-placeholder="media"
      className={cn("grain absolute inset-0", tones[index % tones.length])}
    >
      <KolamKnot className="absolute top-1/2 right-[6%] w-[min(60vw,32rem)] -translate-y-1/2 text-stone/15" />
      <div className="absolute top-[calc(var(--header-h)+1.5rem)] right-[var(--gutter)] max-w-[32ch] text-right text-stone/80">
        <p className="label">
          Hero photograph {index + 1} of {total} to be supplied
        </p>
        {slide.brief ? <p className="mt-2 hidden text-sm sm:block">{slide.brief}</p> : null}
      </div>
    </div>
  );
}
