import type { MediaAsset } from "@/types/content";
import { cn } from "@/lib/utils";
import { MediaFrame } from "./media-frame";

type VideoFrameProps = {
  media: MediaAsset;
  ratio?: string;
  className?: string;
};

/**
 * In-page video with native controls (keyboard and screen reader friendly).
 * Nothing is downloaded until the visitor presses play.
 */
export function VideoFrame({ media, ratio = "16 / 9", className }: VideoFrameProps) {
  // A photograph standing in for a film that has not been supplied yet is
  // shown as a photograph, not fed to <video>.
  if (media.kind !== "video" || !media.src)
    return <MediaFrame media={media} ratio={ratio} className={className} />;

  return (
    <figure className={cn(className)}>
      <div className="relative overflow-hidden bg-maroon-deep" style={{ aspectRatio: ratio }}>
        <video
          className="size-full object-cover"
          controls
          preload="none"
          playsInline
          poster={media.poster ?? undefined}
          aria-label={media.alt}
        >
          <source src={media.src} type="video/mp4" />
          {media.captions ? (
            <track src={media.captions} kind="captions" srcLang="en" label="English" default />
          ) : null}
        </video>
      </div>
      {media.caption ? (
        <figcaption className="mt-3 text-sm text-muted-foreground">{media.caption}</figcaption>
      ) : null}
    </figure>
  );
}
