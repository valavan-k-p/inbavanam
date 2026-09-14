"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

type PillGroupProps<T extends string> = {
  label: string;
  options: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
  /** Unique per page; the active highlight slides between pills. */
  layoutId: string;
};

/** Filter pills with a highlight that glides to the selected option. */
export function PillGroup<T extends string>({
  label,
  options,
  value,
  onChange,
  layoutId,
}: PillGroupProps<T>) {
  const reduce = useReducedMotion();
  return (
    <div role="group" aria-label={label} className="flex flex-wrap gap-2">
      {options.map((option) => {
        const active = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(option.value)}
            className={cn(
              "relative isolate min-h-10 cursor-pointer rounded-full border px-4 label text-[0.66rem] transition-colors duration-300",
              active
                ? "border-maroon text-ivory"
                : "border-rule text-foreground hover:border-foreground",
            )}
          >
            {active ? (
              <motion.span
                layoutId={layoutId}
                aria-hidden="true"
                className="absolute inset-0 -z-10 rounded-full bg-maroon"
                transition={
                  reduce ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 32 }
                }
              />
            ) : null}
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
