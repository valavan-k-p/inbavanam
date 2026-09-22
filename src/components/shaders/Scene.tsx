"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useReducedMotion } from "motion/react";
import { KoiStudies } from "@designcodeio/threeui";
import "@designcodeio/threeui/style.css";

type NetworkInformation = { saveData?: boolean; effectiveType?: string };

function prefersLightData() {
  const connection = (navigator as Navigator & { connection?: NetworkInformation }).connection;
  return Boolean(connection?.saveData) || /(^|-)2g$/.test(connection?.effectiveType ?? "");
}

const noopSubscribe = () => () => {};

/**
 * ThreeUI's KoiStudies is an iframe over a 16 MB document with three embedded
 * films, so the component itself is only mounted when the section comes close
 * to the viewport. On Save-Data or 2G connections, and under reduced motion,
 * nothing loads until the visitor asks for it.
 *
 * The registered component is used unchanged; all of this lives in the wrapper.
 */
export function Scene() {
  const frameRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const reduce = useReducedMotion();
  const lightData = useSyncExternalStore(noopSubscribe, () => prefersLightData(), () => false);
  const loadsOnScroll = !reduce && !lightData;

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame || mounted || !loadsOnScroll) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setMounted(true);
        io.disconnect();
      },
      // Start fetching a screen early so the stack is ready on arrival.
      { rootMargin: "600px 0px" },
    );
    io.observe(frame);
    return () => io.disconnect();
  }, [mounted, loadsOnScroll]);

  return (
    <div ref={frameRef} className="shader-frame">
      {mounted ? (
        <KoiStudies />
      ) : (
        <div className="shader-frame__placeholder">
          <p className="label">Koi studies</p>
          <p className="shader-frame__note">
            An interactive stack of three Japanese koi studies. Drag, or use the arrow keys, to
            move through them.
          </p>
          <button type="button" className="shader-frame__load" onClick={() => setMounted(true)}>
            {loadsOnScroll ? "Load now" : "Load interactive stack (16 MB)"}
          </button>
        </div>
      )}
    </div>
  );
}
