import Image from "next/image";
import type { MediaAsset } from "@/types/content";
import { kolamKnot } from "@/components/illustrations/kolam-paths";
import { cn } from "@/lib/utils";

type MediaFrameProps = {
  media: MediaAsset;
  /** CSS aspect ratio, e.g. "4 / 5". Reserves space so nothing shifts on load. */
  ratio?: string;
  sizes?: string;
  priority?: boolean;
  showCaption?: boolean;
  className?: string;
};

/**
 * Frames a photograph or video poster. When the real asset has not been
 * supplied, renders a clearly labelled placeholder instead of stock imagery.
 */
export function MediaFrame({
  media,
  ratio = "4 / 3",
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority = false,
  showCaption = true,
  className,
}: MediaFrameProps) {
  const src = media.kind === "video" ? media.poster : media.src;

  return (
    <figure className={cn("group/media", className)}>
      <div className="relative overflow-hidden bg-walnut/15" style={{ aspectRatio: ratio }}>
        {src ? (
          <Image
            src={src}
            alt={media.alt}
            fill
            sizes={sizes}
            priority={priority}
            className="object-cover transition-transform duration-[var(--dur-slow)] ease-[var(--ease-out-soft)] group-hover/media:scale-[1.02]"
          />
        ) : (
          <MediaPlaceholder media={media} />
        )}
      </div>
      {showCaption && media.caption ? (
        <figcaption className="mt-3 text-sm text-muted-foreground">{media.caption}</figcaption>
      ) : null}
    </figure>
  );
}

export function MediaPlaceholder({ media }: { media: MediaAsset }) {
  const noun = media.kind === "video" ? "Video" : "Photograph";
  return (
    <div
      role="img"
      aria-label={`${media.alt} (${noun.toLowerCase()} to be supplied)`}
      data-placeholder="media"
      className="grain absolute inset-0 flex flex-col justify-between bg-[color-mix(in_oklab,var(--brand-cream)_55%,var(--brand-stone))] p-5 text-walnut sm:p-6"
    >
      <svg
        viewBox={`0 0 ${kolamKnot.size} ${kolamKnot.size}`}
        className="pointer-events-none absolute top-1/2 left-1/2 w-2/5 max-w-48 -translate-x-1/2 -translate-y-1/2 opacity-25"
        fill="none"
        stroke="currentColor"
        strokeWidth={1}
        aria-hidden="true"
      >
        {kolamKnot.paths.map((d) => (
          <path key={d} d={d} />
        ))}
        {kolamKnot.dots.map((p) => (
          <circle
            key={`${p.x}-${p.y}`}
            cx={p.x}
            cy={p.y}
            r={1.6}
            fill="currentColor"
            stroke="none"
          />
        ))}
      </svg>
      <span className="relative label">{noun} to be supplied</span>
      {media.brief ? (
        <span className="relative max-w-[32ch] text-sm leading-snug">{media.brief}</span>
      ) : null}
    </div>
  );
}
