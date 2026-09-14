"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { GalleryItem } from "@/types/content";
import { cn } from "@/lib/utils";
import { GalleryLightbox } from "./gallery-lightbox";
import { WallTileMedia } from "./wall-tile-media";
import {
  MIN_FACING,
  WALL_COLS,
  WALL_ROWS,
  measureWall,
  projectTile,
  pseudoRandom,
  tileItemIndex,
  wrapCentered,
  type WallGeometry,
} from "./wall-geometry";

const TILE_COUNT = WALL_COLS * WALL_ROWS;
const INTRO_MS = 1300;
const INTRO_SPREAD_MS = 900;
const DRAG_THRESHOLD = 6;
const ease = [0.22, 1, 0.36, 1] as const;

type GalleryWallProps = {
  items: GalleryItem[];
  /** Accessible name of the wall region. */
  label: string;
  className?: string;
  /** Overlay content pinned to the top (for the heading). */
  top?: React.ReactNode;
  /** Overlay content under the caption (for filters). */
  footer?: React.ReactNode;
  /** Overlay content in the bottom-right corner. */
  corner?: React.ReactNode;
};

/**
 * Immersive gallery: photographs on the face of a sphere that the visitor
 * drags to explore, with momentum and endless wrapping. Tiles fly in from
 * depth when the wall first comes into view, are greyscale until pointed
 * at, and zoom out of the wall into the lightbox when opened.
 *
 * Built with CSS 3D transforms updated from one animation loop that only
 * runs while something is moving. Arrow keys move the wall and Enter opens
 * the centred photograph; the grid view is the non-spatial alternative.
 */
export function GalleryWall({ items, label, className, top, footer, corner }: GalleryWallProps) {
  const reduce = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const tiles = useRef<(HTMLDivElement | null)[]>([]);
  const geoRef = useRef<WallGeometry | null>(null);
  const offset = useRef({ x: 0, y: 0 });
  const velocity = useRef({ x: 0, y: 0 });
  const target = useRef<{ x: number; y: number } | null>(null);
  const drag = useRef<{ id: number; x: number; y: number; t: number; moved: number } | null>(null);
  const introStart = useRef<number | null>(null);
  const centerTile = useRef(-1);
  const hovered = useRef<HTMLDivElement | null>(null);
  const frame = useRef(0);
  const kick = useRef<() => void>(() => {});

  const [geo, setGeo] = useState<WallGeometry | null>(null);
  const [dragging, setDragging] = useState(false);
  const [caption, setCaption] = useState<GalleryItem | null>(null);
  const [announce, setAnnounce] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [zoom, setZoom] = useState<{ index: number; rect: DOMRect } | null>(null);

  const itemFor = useMemo(
    () => Array.from({ length: TILE_COUNT }, (_, k) => tileItemIndex(k, items.length)),
    [items.length],
  );
  const delays = useMemo(
    () => Array.from({ length: TILE_COUNT }, (_, k) => pseudoRandom(k) * INTRO_SPREAD_MS),
    [],
  );

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    let last = performance.now();

    const render = (now: number) => {
      const g = geoRef.current;
      if (!g) return false;
      const width = WALL_COLS * g.cellW;
      const height = WALL_ROWS * g.cellH;
      const elapsed = introStart.current === null ? -1 : now - introStart.current;
      let introRunning = false;
      let nearest = Infinity;

      for (let k = 0; k < TILE_COUNT; k++) {
        const el = tiles.current[k];
        if (!el) continue;
        const x = wrapCentered((k % WALL_COLS) * g.cellW + offset.current.x, width);
        const y = wrapCentered(Math.floor(k / WALL_COLS) * g.cellH + offset.current.y, height);
        const { yaw, pitch, facing } = projectTile(x, y, g.radius);
        if (facing < MIN_FACING) {
          el.style.visibility = "hidden";
          continue;
        }

        let depth = 0;
        let opacity = 1;
        if (elapsed < 0) {
          opacity = 0;
        } else if (!reduce) {
          const p = Math.min(1, Math.max(0, (elapsed - delays[k]) / INTRO_MS));
          if (p < 1) introRunning = true;
          const eased = 1 - Math.pow(1 - p, 3);
          depth = (1 - eased) * g.radius * 0.85;
          opacity = eased;
        }

        el.style.visibility = "visible";
        el.style.opacity = String(opacity * (0.35 + 0.65 * facing));
        el.style.transform = `rotateY(${yaw}rad) rotateX(${-pitch}rad) translateZ(${g.radius - depth}px)`;

        const d = x * x + y * y;
        if (d < nearest) {
          nearest = d;
          centerTile.current = k;
        }
      }
      return introRunning;
    };

    const tick = (now: number) => {
      const dt = Math.min(48, now - last);
      last = now;
      let moving = false;
      const o = offset.current;

      if (target.current) {
        const t = target.current;
        o.x += (t.x - o.x) * 0.16;
        o.y += (t.y - o.y) * 0.16;
        if (Math.abs(t.x - o.x) < 0.5 && Math.abs(t.y - o.y) < 0.5) {
          o.x = t.x;
          o.y = t.y;
          target.current = null;
        } else {
          moving = true;
        }
      } else if (!drag.current) {
        const v = velocity.current;
        if (Math.abs(v.x) > 0.01 || Math.abs(v.y) > 0.01) {
          o.x += v.x * dt;
          o.y += v.y * dt;
          const friction = Math.pow(0.94, dt / 16.7);
          v.x *= friction;
          v.y *= friction;
          moving = true;
        }
      }

      const introRunning = render(now);
      frame.current = moving || introRunning || drag.current ? requestAnimationFrame(tick) : 0;
    };

    kick.current = () => {
      if (frame.current) return;
      last = performance.now();
      frame.current = requestAnimationFrame(tick);
    };

    const applySize = (width: number, height: number) => {
      if (!width || !height) return;
      const g = measureWall(width, height);
      geoRef.current = g;
      setGeo(g);
    };
    const ro = new ResizeObserver(([entry]) =>
      applySize(entry.contentRect.width, entry.contentRect.height),
    );
    ro.observe(root);
    // Measure directly as well, in case the first resize notification is delayed.
    const initial = window.setTimeout(() => {
      if (geoRef.current) return;
      const rect = root.getBoundingClientRect();
      applySize(rect.width, rect.height);
    }, 0);

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || introStart.current !== null) return;
        introStart.current = performance.now();
        kick.current();
        io.disconnect();
      },
      { threshold: 0.2 },
    );
    io.observe(root);

    return () => {
      window.clearTimeout(initial);
      ro.disconnect();
      io.disconnect();
      cancelAnimationFrame(frame.current);
      frame.current = 0;
    };
  }, [delays, reduce]);

  // Position the tiles once they exist in the DOM (and again after a resize).
  useEffect(() => {
    if (geo) kick.current();
  }, [geo]);

  const highlight = (el: HTMLDivElement | null) => {
    if (el === hovered.current) return;
    hovered.current?.removeAttribute("data-hover");
    el?.setAttribute("data-hover", "");
    hovered.current = el;
    const index = el ? itemFor[Number(el.dataset.tile)] : -1;
    setCaption(index >= 0 ? items[index] : null);
  };

  const openTile = (tile: number) => {
    const el = tiles.current[tile];
    const index = itemFor[tile];
    if (!el || index < 0) return;
    if (reduce) setOpenIndex(index);
    else setZoom({ index, rect: el.getBoundingClientRect() });
  };

  const onPointerDown = (event: React.PointerEvent) => {
    if (event.button !== 0) return;
    drag.current = {
      id: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      t: performance.now(),
      moved: 0,
    };
    velocity.current = { x: 0, y: 0 };
    target.current = null;
    kick.current();
  };

  const onPointerMove = (event: React.PointerEvent) => {
    const d = drag.current;
    if (!d || d.id !== event.pointerId) {
      highlight((event.target as HTMLElement).closest<HTMLDivElement>("[data-tile]"));
      return;
    }
    const dx = event.clientX - d.x;
    // On touch, vertical movement belongs to page scrolling.
    const dy = event.pointerType === "touch" ? 0 : event.clientY - d.y;
    const now = performance.now();
    const dt = Math.max(1, now - d.t);
    offset.current.x += dx;
    offset.current.y += dy;
    velocity.current = reduce ? { x: 0, y: 0 } : { x: dx / dt, y: dy / dt };
    d.x = event.clientX;
    d.y = event.clientY;
    d.t = now;
    d.moved += Math.abs(dx) + Math.abs(dy);
    if (d.moved > DRAG_THRESHOLD && !dragging) {
      rootRef.current?.setPointerCapture?.(event.pointerId);
      setDragging(true);
    }
  };

  const endDrag = (event: React.PointerEvent, cancelled = false) => {
    const d = drag.current;
    if (!d || d.id !== event.pointerId) return;
    drag.current = null;
    setDragging(false);
    if (performance.now() - d.t > 90) velocity.current = { x: 0, y: 0 };
    if (!cancelled && d.moved <= DRAG_THRESHOLD) {
      const tile = (event.target as HTMLElement).closest<HTMLElement>("[data-tile]");
      if (tile) openTile(Number(tile.dataset.tile));
    }
    kick.current();
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    const g = geoRef.current;
    if (!g) return;
    const steps: Record<string, [number, number]> = {
      ArrowLeft: [1, 0],
      ArrowRight: [-1, 0],
      ArrowUp: [0, 1],
      ArrowDown: [0, -1],
    };
    const step = steps[event.key];
    if (step) {
      event.preventDefault();
      const base = target.current ?? offset.current;
      const next = { x: base.x + step[0] * g.cellW, y: base.y + step[1] * g.cellH };
      velocity.current = { x: 0, y: 0 };
      if (reduce) offset.current = next;
      else target.current = next;
      kick.current();
      window.setTimeout(
        () => {
          const k = centerTile.current;
          highlight(tiles.current[k] ?? null);
          const item = items[itemFor[k]];
          if (item) setAnnounce(`${item.alt}, ${item.category}`);
        },
        reduce ? 30 : 450,
      );
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (centerTile.current >= 0) openTile(centerTile.current);
    }
  };

  const zoomTarget = () => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const w = Math.min(vw * 0.9, 1024);
    const h = Math.min(vh * 0.72, w * 0.625);
    return { left: (vw - w) / 2, top: (vh - h) / 2, width: w, height: h };
  };

  return (
    <div className={cn("on-dark relative isolate overflow-hidden bg-ink select-none", className)}>
      <div
        ref={rootRef}
        role="group"
        aria-roledescription="gallery wall"
        aria-label={`${label}. Drag, or focus here and use the arrow keys, to explore. Press Enter to open the photograph in the centre.`}
        tabIndex={0}
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={(e) => endDrag(e)}
        onPointerCancel={(e) => endDrag(e, true)}
        onPointerLeave={() => {
          if (!drag.current) highlight(null);
        }}
        className={cn(
          "absolute inset-0 touch-pan-y outline-none focus-visible:outline-2 focus-visible:-outline-offset-8 focus-visible:outline-cream",
          dragging ? "cursor-grabbing" : "cursor-grab",
        )}
        style={{ perspective: geo ? `${Math.round(geo.radius * 0.85)}px` : undefined }}
      >
        <div
          className="absolute inset-0 [transform-style:preserve-3d]"
          style={{ transform: geo ? `translateZ(${-geo.radius}px)` : undefined }}
        >
          {geo
            ? Array.from({ length: TILE_COUNT }, (_, k) => {
                const item = items[itemFor[k]];
                if (!item) return null;
                return (
                  <div
                    key={k}
                    ref={(el) => {
                      tiles.current[k] = el;
                    }}
                    data-tile={k}
                    aria-hidden="true"
                    className="wall-tile absolute overflow-hidden rounded-[3px] opacity-0 [backface-visibility:hidden]"
                    style={{
                      width: geo.tileW,
                      height: geo.tileH,
                      left: `calc(50% - ${geo.tileW / 2}px)`,
                      top: `calc(50% - ${geo.tileH / 2}px)`,
                    }}
                  >
                    <WallTileMedia item={item} className="wall-tile-media" />
                  </div>
                );
              })
            : null}
        </div>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgb(24_12_10/0.9)_100%)]"
      />

      {top ? (
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 [&_a]:pointer-events-auto [&_button]:pointer-events-auto">
          {top}
        </div>
      ) : null}

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-linear-to-t from-ink/80 to-transparent pt-16 pb-5">
        <div className="container-page grid items-end gap-4 md:grid-cols-[1fr_auto_1fr]">
          <p className="hidden label text-muted-foreground md:block">Drag to explore</p>
          <div className="flex flex-col items-center gap-3 text-center">
            <p aria-hidden="true" className="min-h-[1.6em] font-display text-lg leading-snug">
              <AnimatePresence mode="wait" initial={false}>
                {caption ? (
                  <motion.span
                    key={caption.id}
                    className="inline-block"
                    initial={reduce ? false : { opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? undefined : { opacity: 0, y: -6 }}
                    transition={{ duration: 0.25 }}
                  >
                    {caption.caption ?? caption.alt}
                    <span className="ml-3 label text-[0.6rem] text-muted-foreground">
                      {caption.category}
                    </span>
                  </motion.span>
                ) : null}
              </AnimatePresence>
            </p>
            {footer ? <div className="pointer-events-auto">{footer}</div> : null}
          </div>
          <div className="pointer-events-auto flex justify-center md:justify-end">{corner}</div>
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        {announce}
      </p>

      <AnimatePresence>
        {zoom ? (
          <>
            <motion.div
              key="zoom-backdrop"
              aria-hidden="true"
              className="fixed inset-0 z-50 bg-ink/90"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            />
            <motion.div
              key="zoom-tile"
              aria-hidden="true"
              className="fixed z-50 overflow-hidden"
              initial={{
                left: zoom.rect.left,
                top: zoom.rect.top,
                width: zoom.rect.width,
                height: zoom.rect.height,
                borderRadius: 3,
              }}
              animate={{ ...zoomTarget(), borderRadius: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.75, ease }}
              onAnimationComplete={() => {
                setOpenIndex(zoom.index);
                setZoom(null);
              }}
            >
              <WallTileMedia item={items[zoom.index]} />
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>

      <GalleryLightbox items={items} index={openIndex} onIndexChange={setOpenIndex} />
    </div>
  );
}
