"use client";

import { useRef } from "react";
import Image from "next/image";
import { Dialog } from "@base-ui/react/dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { GalleryItem } from "@/types/content";
import { MediaPlaceholder } from "@/components/ui/media-frame";

type GalleryLightboxProps = {
  items: GalleryItem[];
  index: number | null;
  onIndexChange: (index: number | null) => void;
};

const SWIPE_THRESHOLD = 50;

/** Full-screen viewer: arrow keys, on-screen buttons and horizontal swipe. */
export function GalleryLightbox({ items, index, onIndexChange }: GalleryLightboxProps) {
  const pointerStart = useRef<number | null>(null);
  const item = index === null ? null : items[index];
  const count = items.length;

  const go = (delta: number) => {
    if (index === null) return;
    onIndexChange((index + delta + count) % count);
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      go(1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      go(-1);
    }
  };

  return (
    <Dialog.Root open={item !== null} onOpenChange={(open) => !open && onIndexChange(null)}>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-ink/90 transition-opacity duration-200 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0" />
        <Dialog.Popup
          onKeyDown={onKeyDown}
          className="surface-maroon fixed inset-0 z-50 flex flex-col bg-transparent! transition-opacity duration-200 outline-none data-[ending-style]:opacity-0 data-[starting-style]:opacity-0"
        >
          {item && index !== null ? (
            <>
              <div className="container-page flex h-[var(--header-h)] items-center justify-between">
                <Dialog.Title className="label">
                  <span className="tabular">
                    {index + 1} of {count}
                  </span>
                  <span className="sr-only">: {item.alt}</span>
                </Dialog.Title>
                <Dialog.Close className="inline-flex min-h-11 cursor-pointer items-center gap-3 label">
                  <span>Close</span>
                  <X aria-hidden="true" className="size-5" strokeWidth={1.25} />
                </Dialog.Close>
              </div>

              <figure
                className="relative flex min-h-0 flex-1 touch-pan-y flex-col items-center justify-center gap-4 px-[var(--gutter)] pb-6"
                onPointerDown={(e) => {
                  pointerStart.current = e.clientX;
                }}
                onPointerUp={(e) => {
                  if (pointerStart.current === null) return;
                  const dx = e.clientX - pointerStart.current;
                  pointerStart.current = null;
                  if (Math.abs(dx) > SWIPE_THRESHOLD) go(dx < 0 ? 1 : -1);
                }}
              >
                <div className="relative h-full max-h-[75vh] w-full max-w-5xl">
                  {item.src ? (
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      sizes="100vw"
                      className="object-contain"
                    />
                  ) : (
                    <MediaPlaceholder media={item} />
                  )}
                </div>
                <figcaption className="max-w-2xl text-center text-sm text-muted-foreground">
                  <span className="mr-3 label text-foreground">{item.category}</span>
                  {item.caption ?? item.alt}
                </figcaption>
              </figure>

              {count > 1 ? (
                <>
                  <button
                    type="button"
                    onClick={() => go(-1)}
                    aria-label="Previous image"
                    className="absolute top-1/2 left-2 grid size-12 -translate-y-1/2 cursor-pointer place-items-center rounded-full border border-rule bg-maroon-deep/60 sm:left-6"
                  >
                    <ChevronLeft aria-hidden="true" className="size-6" strokeWidth={1.25} />
                  </button>
                  <button
                    type="button"
                    onClick={() => go(1)}
                    aria-label="Next image"
                    className="absolute top-1/2 right-2 grid size-12 -translate-y-1/2 cursor-pointer place-items-center rounded-full border border-rule bg-maroon-deep/60 sm:right-6"
                  >
                    <ChevronRight aria-hidden="true" className="size-6" strokeWidth={1.25} />
                  </button>
                </>
              ) : null}
            </>
          ) : null}
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
