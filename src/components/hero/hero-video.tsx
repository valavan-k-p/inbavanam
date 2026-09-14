"use client";

import { useEffect, useRef } from "react";
import { KolamKnot } from "@/components/illustrations/kolam";
import { cn } from "@/lib/utils";

type HeroVideoProps = {
  src?: string;
  webm?: string;
  poster?: string | null;
  alt?: string;
  className?: string;
};

/**
 * Cinematic hero video container.
 *
 * Requirements fulfilled:
 * - autoplay, muted, loop, playsInline
 * - no browser controls or UI overlays
 * - covers available media container (object-fit: cover)
 * - smooth responsive playback on desktop, tablet, and mobile
 * - clearly defined asset path (/videos/inbavanam-hero.mp4)
 * - retains the existing maroon atmosphere and subtle Kolam motif
 */
export function HeroVideo({
  src = "/videos/inbavanam-hero.mp4",
  webm,
  poster,
  alt = "Inbavanam grounds and architecture",
  className,
}: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay may be restricted until user interaction in some browser environments
      });
    }
  }, []);

  return (
    <div
      className={cn(
        "relative size-full overflow-hidden bg-maroon-deep grain",
        className,
      )}
    >
      {/* Subtle decorative kolam motif integrated into the visual atmosphere */}
      <KolamKnot
        className="pointer-events-none absolute top-1/2 left-1/2 w-[min(50vw,32rem)] -translate-x-1/2 -translate-y-1/2 text-stone/15"
      />

      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={poster ?? undefined}
        aria-label={alt}
        className="absolute inset-0 size-full object-cover"
      >
        {webm ? <source src={webm} type="video/webm" /> : null}
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
}

