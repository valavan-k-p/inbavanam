"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion, useSpring, type PanInfo } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Experience } from "@/types/content";
import { MediaFrame } from "@/components/ui/media-frame";
import { LineArt } from "@/components/illustrations/line-art";
import { cn } from "@/lib/utils";
import { cardPose, dragOutcome, stackOffset, stepIndex, tiltFromPointer } from "./stack-geometry";

const settle = { type: "spring", stiffness: 260, damping: 30 } as const;
const pad = (n: number) => String(n).padStart(2, "0");

/**
 * A tactile stack of the experiences: cards sit in CSS 3D depth, the stack
 * tilts towards the pointer, and the top card is dragged, tapped or moved
 * with the arrow keys. Buttons and a live region carry the same moves for
 * keyboard and screen reader use; reduced motion drops the tilt and drag
 * while every card stays reachable.
 */
export function ExperienceStack({ items, className }: { items: Experience[]; className?: string }) {
  const reduce = useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);
  const draggedFar = useRef(false);
  const [active, setActive] = useState(0);
  const count = items.length;

  const rotateX = useSpring(0, { stiffness: 150, damping: 20 });
  const rotateY = useSpring(0, { stiffness: 150, damping: 20 });

  const move = (delta: number) => setActive((current) => stepIndex(current, delta, count));

  const levelTilt = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  const onPointerMove = (event: React.PointerEvent) => {
    const stage = stageRef.current;
    if (reduce || !stage) return;
    const rect = stage.getBoundingClientRect();
    const tilt = tiltFromPointer(
      (event.clientX - rect.left) / rect.width,
      (event.clientY - rect.top) / rect.height,
    );
    rotateX.set(tilt.rotateX);
    rotateY.set(tilt.rotateY);
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      move(1);
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      move(-1);
    }
  };

  const onDragEnd = (_event: unknown, info: PanInfo) => {
    draggedFar.current = Math.abs(info.offset.x) > 4;
    const outcome = dragOutcome(info.offset.x, info.velocity.x);
    if (outcome) move(outcome);
  };

  // A drag finishes with a click event, so only a real tap should advance.
  const onTopCardClick = () => {
    if (draggedFar.current) {
      draggedFar.current = false;
      return;
    }
    move(1);
  };

  if (!count) return null;
  const current = items[active];

  return (
    <div
      className={cn(
        "water-panel on-dark grain relative isolate overflow-hidden rounded-[var(--radius)]",
        className,
      )}
    >
      <span aria-hidden="true" className="liquid-water" />

      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 size-[min(70vw,26rem)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cream/10"
      />

      <div
        ref={stageRef}
        role="group"
        aria-roledescription="card stack"
        aria-label="Experiences at Inbavanam. Drag or tap the card, or use the arrow keys, to move through them."
        tabIndex={0}
        onKeyDown={onKeyDown}
        onPointerMove={onPointerMove}
        onPointerLeave={levelTilt}
        onBlur={levelTilt}
        className="grid h-[clamp(26rem,54vh,32rem)] place-items-center px-4 pt-10 pb-4 outline-none focus-visible:outline-2 focus-visible:-outline-offset-8 focus-visible:outline-cream md:pt-14"
        style={{ perspective: "1200px" }}
      >
        <motion.div
          className="relative grid size-full place-items-center [transform-style:preserve-3d]"
          style={{ rotateX, rotateY }}
        >
          {items.map((item, index) => {
            const offset = stackOffset(index, active, count);
            const pose = cardPose(offset, count);
            const isTop = offset === 0;
            return (
              <motion.article
                key={item.slug}
                inert={!isTop}
                className={cn(
                  "absolute flex h-[min(100%,26rem)] w-[min(62vw,14.5rem)] flex-col overflow-hidden rounded-[12px] bg-cream shadow-[0_26px_50px_-28px_rgb(0_0_0/0.75)]",
                  isTop && !reduce && "cursor-grab active:cursor-grabbing",
                )}
                style={{ zIndex: pose.zIndex }}
                animate={{
                  y: pose.y,
                  scale: pose.scale,
                  rotate: pose.rotate,
                  opacity: pose.opacity,
                }}
                transition={reduce ? { duration: 0 } : settle}
                drag={isTop && !reduce ? "x" : false}
                dragSnapToOrigin
                dragElastic={0.18}
                dragMomentum={false}
                onDragEnd={isTop ? onDragEnd : undefined}
                onClick={isTop ? onTopCardClick : undefined}
              >
                <div className="relative min-h-0 w-full flex-1 select-none">
                  <MediaFrame
                    media={item.media}
                    fill
                    zoom={false}
                    sizes="(min-width: 640px) 15rem, 62vw"
                    priority={index === 0}
                  />
                  <span aria-hidden="true" className="halftone absolute inset-0" />
                </div>
                <div className="flex flex-col gap-1.5 bg-maroon-deep p-4 text-ivory">
                  <h3 className="font-display text-[1.15rem] leading-tight">{item.title}</h3>
                  <p className="line-clamp-2 text-[0.8rem] leading-snug text-stone">
                    {item.summary}
                  </p>
                  <div className="mt-1 flex items-center justify-between">
                    <Link
                      href={`/experiences#${item.slug}`}
                      onClick={(event) => event.stopPropagation()}
                      className="link-underline py-1 label text-[0.62rem]"
                    >
                      Explore
                    </Link>
                    <LineArt name={item.illustration} className="size-6 text-cream/70" />
                  </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>

      <div className="container-page flex items-center justify-between gap-4 pb-6">
        <button
          type="button"
          onClick={() => move(-1)}
          aria-label="Previous experience"
          className="grid size-11 cursor-pointer place-items-center rounded-full border border-rule transition-colors hover:border-cream"
        >
          <ArrowLeft aria-hidden="true" className="size-4" strokeWidth={1.5} />
        </button>
        <p className="text-center label text-[0.62rem] text-muted-foreground">
          <span className="tabular">
            {pad(active + 1)} / {pad(count)}
          </span>
          <span className="mx-3 hidden sm:inline">&middot;</span>
          <span className="hidden sm:inline">Drag, tap or use the arrow keys</span>
        </p>
        <button
          type="button"
          onClick={() => move(1)}
          aria-label="Next experience"
          className="grid size-11 cursor-pointer place-items-center rounded-full border border-rule transition-colors hover:border-cream"
        >
          <ArrowRight aria-hidden="true" className="size-4" strokeWidth={1.5} />
        </button>
      </div>

      <p className="sr-only" aria-live="polite">
        {current.title}, {active + 1} of {count}
      </p>
    </div>
  );
}
