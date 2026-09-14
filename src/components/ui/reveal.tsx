import type { CSSProperties, ReactNode } from "react";

export type RevealVariant = "up" | "fade" | "left" | "right" | "scale" | "clip" | "rise";

/** Inline style that staggers a reveal by `seconds`. */
export function revealDelay(seconds: number): CSSProperties | undefined {
  return seconds
    ? ({ "--reveal-delay": `${Math.round(seconds * 1000)}ms` } as CSSProperties)
    : undefined;
}

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Delay in seconds, for staggering siblings. */
  delay?: number;
  variant?: RevealVariant;
  as?: "div" | "li" | "span" | "p" | "figure" | "section";
  id?: string;
};

/**
 * Scroll reveal driven by CSS and RevealObserver. Works for text too: the
 * hidden state only applies after JavaScript has run, and reduced motion
 * shows everything immediately.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  variant = "up",
  as: Tag = "div",
  id,
}: RevealProps) {
  return (
    <Tag id={id} data-reveal={variant} className={className} style={revealDelay(delay)}>
      {children}
    </Tag>
  );
}
