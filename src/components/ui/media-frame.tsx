import Image from "next/image";
import type { MediaAsset } from "@/types/content";
import { kolamKnot } from "@/components/illustrations/kolam-paths";
import { cn } from "@/lib/utils";

type MediaFrameProps = {
  media: MediaAsset;
  /** CSS aspect ratio, e.g. "4 / 5". Reserves space so nothing shifts on load. */
  ratio?: string;
  /** Fill the nearest positioned ancestor instead of using an aspect ratio. */
  fill?: boolean;
  sizes?: string;
  priority?: boolean;
  showCaption?: boolean;
  /** Zoom slightly when an ancestor with the `group` class is hovered. */
  zoom?: boolean;
  tone?: "light" | "dark";
  className?: string;
};

/**
 * Frames a photograph or video poster. When the real asset has not been
 * supplied, renders a clearly labelled placeholder instead of stock imagery.
 */
export function MediaFrame({
  media,
  ratio = "4 / 3",
  fill = false,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority = false,
  showCaption = true,
  zoom = true,
  tone = "light",
  className,
}: MediaFrameProps) {
  const src = media.kind === "video" ? media.poster : media.src;

  const frame = (
    <div
      className={cn(
        "relative overflow-hidden bg-walnut/15",
        fill && "absolute inset-0",
        fill && className,
      )}
      style={fill ? undefined : { aspectRatio: ratio }}
    >
      <div
        data-media-layer
        className={cn(
          "absolute inset-0 transition-transform duration-[1100ms] ease-[var(--ease-out-soft)]",
          zoom && "group-hover:scale-[1.05]",
        )}
      >
        {src ? (
          <Image
            src={src}
            alt={media.alt}
            fill
            sizes={sizes}
            priority={priority}
            className={cn(
              "object-cover",
              (media as { span?: string }).span === "tall"
                ? "object-[center_20%]"
                : "object-center",
            )}
          />
        ) : (
          <MediaPlaceholder media={media} tone={tone} corner={fill} />
        )}
      </div>
    </div>
  );

  if (fill) return frame;

  return (
    <figure className={className}>
      {frame}
      {showCaption && media.caption ? (
        <figcaption className="mt-3 text-sm text-muted-foreground">{media.caption}</figcaption>
      ) : null}
    </figure>
  );
}

type PlaceholderProps = {
  media: MediaAsset;
  tone?: "light" | "dark";
  /** Tuck the label into the top-right corner (used behind overlaid text). */
  corner?: boolean;
};

export function MediaPlaceholder({ media, tone = "light", corner = false }: PlaceholderProps) {
  const noun = media.kind === "video" ? "Video" : "Photograph";
  return (
    <div
      role="img"
      aria-label={`${media.alt} (${noun.toLowerCase()} to be supplied)`}
      data-placeholder="media"
      className={cn(
        "grain absolute inset-0 flex flex-col gap-3 p-5 sm:p-6",
        corner ? "items-end pt-[calc(var(--header-h)+1.5rem)] text-right" : "justify-between",
        tone === "dark"
          ? "bg-[linear-gradient(155deg,#4a2a22,#2b1515)] text-stone"
          : "bg-[linear-gradient(155deg,#e2d3c2,#c4ab93)] text-walnut",
      )}
    >
      <svg
        viewBox={`0 0 ${kolamKnot.size} ${kolamKnot.size}`}
        className="pointer-events-none absolute top-1/2 left-1/2 w-2/5 max-w-56 -translate-x-1/2 -translate-y-1/2 opacity-20"
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
        <span className="relative line-clamp-3 max-w-[30ch] text-sm leading-snug">
          {media.brief}
        </span>
      ) : null}
    </div>
  );
}
