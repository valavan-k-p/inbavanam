"use client";

import { Dialog } from "@base-ui/react/dialog";
import { Play, X } from "lucide-react";
import type { MediaAsset } from "@/types/content";
import { VideoFrame } from "@/components/ui/video-frame";

/** "Watch our story" control that opens the founders' film in a dialog. */
export function StoryButton({ media }: { media: MediaAsset }) {
  return (
    <Dialog.Root>
      <Dialog.Trigger className="group inline-flex cursor-pointer items-center gap-4 label">
        <span className="relative grid size-14 place-items-center rounded-full border border-ivory/70 transition-[transform,background-color,color] duration-500 ease-[var(--ease-out-soft)] group-hover:scale-105 group-hover:bg-ivory group-hover:text-maroon">
          <span
            aria-hidden="true"
            className="absolute inset-0 animate-[ping-soft_2.6s_ease-out_infinite] rounded-full border border-ivory/50"
          />
          <Play aria-hidden="true" className="size-5 translate-x-px" strokeWidth={1.5} />
        </span>
        <span className="link-underline pb-0.5">Watch our story</span>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-ink/90 transition-opacity duration-300 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0" />
        <Dialog.Popup className="on-dark fixed inset-0 z-50 grid place-items-center overflow-y-auto p-4 transition-[opacity,scale] duration-300 outline-none data-[ending-style]:scale-[0.98] data-[ending-style]:opacity-0 data-[starting-style]:scale-[0.98] data-[starting-style]:opacity-0">
          <div className="w-full max-w-5xl">
            <div className="mb-4 flex items-center justify-between">
              <Dialog.Title className="label">Our story</Dialog.Title>
              <Dialog.Close
                aria-label="Close video"
                className="grid size-11 cursor-pointer place-items-center rounded-full border border-rule hover:border-ivory"
              >
                <X aria-hidden="true" className="size-5" strokeWidth={1.25} />
              </Dialog.Close>
            </div>
            <VideoFrame media={media} ratio="16 / 9" />
            {media.src ? null : (
              <p className="mt-4 text-sm text-muted-foreground">
                The founders&apos; interview film will play here once it is supplied.
              </p>
            )}
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
