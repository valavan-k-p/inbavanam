"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { kolamChain, kolamKnot } from "./kolam-paths";

const ease = [0.22, 1, 0.36, 1] as const;

type KolamDividerProps = {
  count?: number;
  className?: string;
};

/** Pulli kolam border that draws itself once when it scrolls into view. */
export function KolamDivider({ count = 9, className }: KolamDividerProps) {
  const reduce = useReducedMotion();
  const { width, height, dots, strands } = kolamChain(count);

  return (
    <div className={cn("flex justify-center text-terracotta", className)} aria-hidden="true">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        height={height}
        className="h-auto max-w-full"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.1}
        strokeLinecap="round"
      >
        {strands.map((d, i) =>
          reduce ? (
            <path key={d} d={d} />
          ) : (
            <motion.path
              key={d}
              d={d}
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 1.6, ease, delay: i * 0.2 }}
            />
          ),
        )}
        {dots.map((p) => (
          <circle key={p.x} cx={p.x} cy={p.y} r={1.6} fill="currentColor" stroke="none" />
        ))}
      </svg>
    </div>
  );
}

type KolamKnotProps = {
  className?: string;
  /** Draw the knot on mount (used by the radial menu). */
  draw?: boolean;
  strokeWidth?: number;
};

export function KolamKnot({ className, draw = false, strokeWidth = 1 }: KolamKnotProps) {
  const reduce = useReducedMotion();
  const animate = draw && !reduce;
  return (
    <svg
      viewBox={`0 0 ${kolamKnot.size} ${kolamKnot.size}`}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      aria-hidden="true"
    >
      {kolamKnot.paths.map((d, i) =>
        animate ? (
          <motion.path
            key={d}
            d={d}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.1, ease, delay: 0.05 * i }}
          />
        ) : (
          <path key={d} d={d} />
        ),
      )}
      {kolamKnot.dots.map((p) => (
        <circle key={`${p.x}-${p.y}`} cx={p.x} cy={p.y} r={1.6} fill="currentColor" stroke="none" />
      ))}
    </svg>
  );
}
