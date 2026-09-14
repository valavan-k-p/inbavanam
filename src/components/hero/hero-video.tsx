"use client";

import Image from "next/image";
import { useRef, useState, useSyncExternalStore } from "react";
import { useReducedMotion } from "motion/react";
import { Pause, Play } from "lucide-react";

type NetworkInformation = { saveData?: boolean; effectiveType?: string };

function prefersLightData() {
  const connection = (navigator as Navigator & { connection?: NetworkInformation }).connection;
  return Boolean(connection?.saveData) || /(^|-)2g$/.test(connection?.effectiveType ?? "");
}

const noopSubscribe = () => () => {};

type HeroVideoProps = {
  src: string;
  webm?: string;
  poster: string | null;
  alt: string;
};

/**
 * Background hero video. Muted, looping and inline; never autoplays under
 * reduced motion; not downloaded at all on Save-Data or 2G connections,
 * where the poster frame is shown instead.
 */
export function HeroVideo({ src, webm, poster, alt }: HeroVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();
  const loadVideo = useSyncExternalStore(
    noopSubscribe,
    () => !prefersLightData(),
    () => false,
  );
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    const video = ref.current;
    if (!video) return;
    if (video.paused) void video.play();
    else video.pause();
  };

  return (
    <>
      {poster ? (
        <Image src={poster} alt="" fill priority sizes="100vw" className="object-cover" />
      ) : null}
      {loadVideo ? (
        <video
          ref={ref}
          className="absolute inset-0 size-full object-cover"
          autoPlay={!reduce}
          muted
          loop
          playsInline
          preload={reduce ? "none" : "auto"}
          poster={poster ?? undefined}
          aria-label={alt}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        >
          {webm ? <source src={webm} type="video/webm" /> : null}
          <source src={src} type="video/mp4" />
        </video>
      ) : null}
      {loadVideo ? (
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? "Pause background video" : "Play background video"}
          className="pointer-events-auto absolute right-[var(--gutter)] bottom-6 z-20 grid size-11 cursor-pointer place-items-center rounded-full border border-ivory/50 bg-maroon-deep/40 text-ivory transition-colors hover:bg-maroon-deep/70"
        >
          {playing ? (
            <Pause aria-hidden="true" className="size-4" strokeWidth={1.5} />
          ) : (
            <Play aria-hidden="true" className="size-4" strokeWidth={1.5} />
          )}
        </button>
      ) : null}
    </>
  );
}
