"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { galleryCategories, type GalleryCategory, type GalleryItem } from "@/types/content";
import { MediaFrame } from "@/components/ui/media-frame";
import { PillGroup } from "@/components/ui/pill-group";
import { cn } from "@/lib/utils";
import { GalleryLightbox } from "./gallery-lightbox";
import { spanClass } from "./spans";

type Filter = GalleryCategory | "all";

const options: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  ...galleryCategories.map((c) => ({ value: c as Filter, label: c })),
];

type GalleryGridProps = {
  items: GalleryItem[];
  initialCategory?: GalleryCategory | null;
};

export function GalleryGrid({ items, initialCategory = null }: GalleryGridProps) {
  const reduce = useReducedMotion();
  const [category, setCategory] = useState<Filter>(initialCategory ?? "all");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const visible = category === "all" ? items : items.filter((item) => item.category === category);

  return (
    <div className="flex flex-col gap-10">
      <PillGroup
        label="Filter by category"
        options={options}
        value={category}
        onChange={setCategory}
        layoutId="gallery-filter"
      />

      <p className="sr-only" aria-live="polite">
        {visible.length} {visible.length === 1 ? "item" : "items"}
        {category === "all" ? "" : ` in ${category}`}
      </p>

      {visible.length ? (
        <motion.ul
          layout={!reduce}
          className="grid grid-flow-dense auto-rows-[11rem] grid-cols-2 gap-3 sm:auto-rows-[13rem] md:grid-cols-3 md:gap-4 lg:auto-rows-[15rem]"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((item, i) => (
              <motion.li
                key={item.id}
                layout={!reduce}
                initial={reduce ? false : { opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduce ? undefined : { opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className={cn("relative", spanClass(item.span))}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(i)}
                  aria-label={`Open ${item.alt}`}
                  className="group absolute inset-0 block cursor-pointer overflow-hidden text-left"
                >
                  <MediaFrame media={item} fill sizes="(min-width: 768px) 33vw, 50vw" />
                  <span className="on-dark pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 bg-linear-to-t from-ink/80 to-transparent p-4 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                    <span className="label">{item.category}</span>
                  </span>
                </button>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      ) : (
        <p className="text-muted-foreground">Nothing in this category yet.</p>
      )}

      <GalleryLightbox items={visible} index={openIndex} onIndexChange={setOpenIndex} />
    </div>
  );
}
