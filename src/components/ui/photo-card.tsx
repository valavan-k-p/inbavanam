import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { MediaAsset } from "@/types/content";
import { cn } from "@/lib/utils";
import { MediaFrame } from "./media-frame";

type PhotoCardProps = {
  media: MediaAsset;
  title: string;
  subtitle?: string;
  href?: string;
  ratio?: string;
  headingLevel?: "h2" | "h3";
  className?: string;
};

/** Photograph with a serif title and short line, lifting slightly on hover. */
export function PhotoCard({
  media,
  title,
  subtitle,
  href,
  ratio = "4 / 3",
  headingLevel = "h3",
  className,
}: PhotoCardProps) {
  const Heading = headingLevel;
  const body = (
    <>
      <MediaFrame
        media={media}
        ratio={ratio}
        showCaption={false}
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
      />
      <span className="flex items-start justify-between gap-4 pt-4">
        <span>
          <Heading className="text-[1.5rem] leading-tight">{title}</Heading>
          {subtitle ? (
            <span className="mt-1.5 block text-sm text-muted-foreground">{subtitle}</span>
          ) : null}
        </span>
        {href ? (
          <ArrowRight
            aria-hidden="true"
            className="mt-2 size-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1"
            strokeWidth={1.5}
          />
        ) : null}
      </span>
    </>
  );

  const classes = cn(
    "group block transition-transform duration-500 ease-[var(--ease-out-soft)] hover:-translate-y-1",
    className,
  );

  return href ? (
    <Link href={href} className={classes}>
      {body}
    </Link>
  ) : (
    <div className={classes}>{body}</div>
  );
}
