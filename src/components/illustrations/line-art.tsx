import type { IllustrationName } from "@/types/content";
import { cn } from "@/lib/utils";

/**
 * Thin-line illustration family (farming, land, learning, gathering).
 * Drawn on a 64 unit grid with one stroke weight so the set stays
 * consistent. People are shown abstractly, never as caricature.
 */
const art: Record<IllustrationName, React.ReactNode> = {
  sprout: (
    <>
      <path d="M32 52V30" />
      <path d="M32 36c-8 0-14-6-14-14 8 0 14 6 14 14Z" />
      <path d="M32 32c0-8 6-14 14-14 0 8-6 14-14 14Z" />
      <path d="M14 52h36M20 57h24" />
    </>
  ),
  sesame: (
    <>
      <path d="M32 58V8" />
      <path d="M32 18c-5-2-7-7-6-11 4 1 7 5 6 11ZM32 26c5-2 7-7 6-11-4 1-7 5-6 11Z" />
      <path d="M32 36c-6-2-8-8-7-12 5 1 8 6 7 12ZM32 44c6-2 8-8 7-12-5 1-8 6-7 12Z" />
      <path d="M32 54c-6-1-12-4-14-9 6 0 11 3 14 9ZM32 54c6-1 12-4 14-9-6 0-11 3-14 9Z" />
    </>
  ),
  gathering: (
    <>
      <circle cx="32" cy="32" r="4" />
      <circle cx="32" cy="32" r="12" strokeDasharray="1.5 3.5" />
      {Array.from({ length: 7 }, (_, i) => {
        const a = (i / 7) * Math.PI * 2 - Math.PI / 2;
        return <circle key={i} cx={32 + Math.cos(a) * 21} cy={32 + Math.sin(a) * 21} r="3.5" />;
      })}
    </>
  ),
  book: (
    <>
      <path d="M32 18c-6-4-14-5-22-4v32c8-1 16 0 22 4 6-4 14-5 22-4V14c-8-1-16 0-22 4Z" />
      <path d="M32 18v32M16 22c4 0 8 1 11 2M16 29c4 0 8 1 11 2M37 24c3-1 7-2 11-2M37 31c3-1 7-2 11-2" />
    </>
  ),
  hands: (
    <>
      <path d="M10 40c6 0 10 3 14 7h16c4-4 8-7 14-7" />
      <path d="M14 47c4 5 9 9 18 9s14-4 18-9" />
      <path d="M32 40V26" />
      <path d="M32 31c-5 0-8-3-8-8 5 0 8 3 8 8ZM32 29c0-5 3-8 8-8 0 5-3 8-8 8Z" />
    </>
  ),
  stone: (
    <>
      <path d="M8 51h48" />
      <rect x="11" y="38" width="19" height="12" rx="3" />
      <rect x="32" y="38" width="21" height="12" rx="3" />
      <rect x="17" y="25" width="21" height="12" rx="3" />
      <rect x="40" y="25" width="12" height="12" rx="3" />
      <rect x="25" y="12" width="16" height="12" rx="3" />
    </>
  ),
  leaf: (
    <>
      <path d="M14 50C14 28 28 14 50 14c0 22-14 36-36 36Z" />
      <path d="M14 50 40 24M25 39l-1-8M31 33l-1-8M25 39l8 1M31 33l8 1" />
    </>
  ),
  sun: (
    <>
      <circle cx="32" cy="30" r="9" />
      {Array.from({ length: 8 }, (_, i) => {
        const a = (i / 8) * Math.PI * 2;
        const x1 = 32 + Math.cos(a) * 14;
        const y1 = 30 + Math.sin(a) * 14;
        const x2 = 32 + Math.cos(a) * 19;
        const y2 = 30 + Math.sin(a) * 19;
        return (
          <path
            key={i}
            d={`M${x1.toFixed(2)} ${y1.toFixed(2)}L${x2.toFixed(2)} ${y2.toFixed(2)}`}
          />
        );
      })}
      <path d="M8 56h48" />
    </>
  ),
  path: (
    <>
      <path d="M6 54c10-2 18-6 22-12s10-10 28-12" />
      <path d="M12 60c14-2 22-6 26-12s8-10 22-12" />
      <path d="M48 24V12" />
      <path d="M48 16c-4 0-7-3-7-7 4 0 7 3 7 7ZM48 14c0-4 3-7 7-7 0 4-3 7-7 7Z" />
    </>
  ),
  lamp: (
    <>
      <path d="M16 38h32c-2 8-8 12-16 12s-14-4-16-12Z" />
      <path d="M44 38c2-2 6-3 9-2-2 2-6 2-9 2Z" />
      <path d="M32 34c-4-4-4-9 0-14 4 5 4 10 0 14Z" />
      <path d="M26 55h12" />
    </>
  ),
};

type LineArtProps = {
  name: IllustrationName;
  className?: string;
  /** Pass a label only when the drawing carries meaning on its own. */
  label?: string;
};

export function LineArt({ name, className, label }: LineArtProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.25}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("size-16", className)}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
    >
      {art[name]}
    </svg>
  );
}
