"use client";

import { useState } from "react";
import { galleryCategories, type GalleryCategory, type GalleryItem } from "@/types/content";
import { MediaFrame } from "@/components/ui/media-frame";
import { cn } from "@/lib/utils";
import { GalleryLightbox } from "./gallery-lightbox";

const ratios: Record<NonNullable<GalleryItem["span"]>, string> = {
  tall: "4 / 5",
  wide: "3 / 2",
  regular: "1 / 1",
};

type GalleryGridProps = {
  items: GalleryItem[];
  initialCategory?: GalleryCategory | null;
};

export function GalleryGrid({ items, initialCategory = null }: GalleryGridProps) {
  const [category, setCategory] = useState<GalleryCategory | null>(initialCategory);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const visible = category ? items.filter((item) => item.category === category) : items;

  return (
    <div className="flex flex-col gap-10">
      <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-2">
        {[null, ...galleryCategories].map((c) => (
          <button
            key={c ?? "all"}
            type="button"
            aria-pressed={category === c}
            onClick={() => setCategory(c)}
            className={cn(
              "min-h-11 cursor-pointer border px-4 label transition-colors",
              category === c
                ? "border-maroon bg-maroon text-ivory"
                : "border-rule hover:border-foreground",
            )}
          >
            {c ?? "All"}
          </button>
        ))}
      </div>

      <p className="sr-only" aria-live="polite">
        {visible.length} {visible.length === 1 ? "item" : "items"}
        {category ? ` in ${category}` : ""}
      </p>

      {visible.length ? (
        <ul className="columns-1 gap-4 sm:columns-2 lg:columns-3">
          {visible.map((item, i) => (
            <li key={item.id} className="mb-4 break-inside-avoid">
              <button
                type="button"
                onClick={() => setOpenIndex(i)}
                className="block w-full cursor-pointer text-left"
                aria-label={`Open ${item.alt}`}
              >
                <MediaFrame
                  media={item}
                  ratio={ratios[item.span ?? "regular"]}
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  showCaption={false}
                />
              </button>
              <p className="mt-3 label text-muted-foreground">{item.category}</p>
              {item.caption ? <p className="mt-1 text-sm">{item.caption}</p> : null}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-muted-foreground">Nothing in this category yet.</p>
      )}

      <GalleryLightbox items={visible} index={openIndex} onIndexChange={setOpenIndex} />
    </div>
  );
}
