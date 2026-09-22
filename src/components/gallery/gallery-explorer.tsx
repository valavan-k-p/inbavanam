"use client";

import { useMemo, useState } from "react";
import { useReducedMotion } from "motion/react";
import { LayoutGrid, Orbit } from "lucide-react";
import { galleryCategories, type GalleryCategory, type GalleryItem } from "@/types/content";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";
import { GalleryGrid } from "./gallery-grid";
import { GalleryWall } from "./gallery-wall";

type Filter = GalleryCategory | "all";

const options: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  ...galleryCategories.map((c) => ({ value: c as Filter, label: c })),
];

type GalleryExplorerProps = {
  items: GalleryItem[];
  initialCategory: GalleryCategory | null;
  title: string;
  lede: string;
};

/**
 * Gallery page: the immersive wall by default, or the accessible grid.
 * Visitors who prefer reduced motion start in the grid.
 */
export function GalleryExplorer({ items, initialCategory, title, lede }: GalleryExplorerProps) {
  const reduce = useReducedMotion();
  const [choice, setChoice] = useState<"wall" | "grid" | null>(null);
  const view = choice ?? (reduce ? "grid" : "wall");
  const [category, setCategory] = useState<Filter>(initialCategory ?? "all");
  const visible = useMemo(
    () => (category === "all" ? items : items.filter((item) => item.category === category)),
    [items, category],
  );

  if (view === "grid") {
    return (
      <>
        <section className="pt-[calc(var(--header-h)+clamp(3rem,7vw,6rem))] pb-12 md:pb-16">
          <div className="container-page flex flex-col gap-8">
            <SectionHeading as="h1" size="h1" eyebrow="Gallery" title={title} lede={lede} />
            <ViewToggle view="grid" onChange={setChoice} className="self-start" tone="light" />
          </div>
        </section>
        <section aria-label="Gallery" className="container-page pb-[var(--section-y)]">
          <GalleryGrid items={items} initialCategory={category === "all" ? null : category} />
        </section>
      </>
    );
  }

  return (
    <GalleryWall
      key={category}
      items={visible}
      label="Gallery wall"
      className="h-svh min-h-[36rem]"
      top={
        // The wall speaks for itself, so the page heading is kept for screen
        // readers and search engines rather than drawn over the photographs.
        <h1 className="sr-only">{title}</h1>
      }
      footer={<WallFilters value={category} onChange={setCategory} />}
      corner={<ViewToggle view="wall" onChange={setChoice} tone="dark" />}
    />
  );
}

function WallFilters({ value, onChange }: { value: Filter; onChange: (value: Filter) => void }) {
  return (
    <div
      role="group"
      aria-label="Filter by category"
      className="flex flex-wrap justify-center gap-x-4 gap-y-0"
    >
      {options.map((option) => {
        const active = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(option.value)}
            className={cn(
              "relative min-h-10 cursor-pointer px-1 text-[0.8rem] transition-colors duration-300",
              active ? "text-ivory" : "text-stone hover:text-ivory",
            )}
          >
            {option.label}
            <span
              aria-hidden="true"
              className={cn(
                "absolute inset-x-1 bottom-1.5 h-px origin-left bg-ivory transition-transform duration-300",
                active ? "scale-x-100" : "scale-x-0",
              )}
            />
          </button>
        );
      })}
    </div>
  );
}

function ViewToggle({
  view,
  onChange,
  tone,
  className,
}: {
  view: "wall" | "grid";
  onChange: (view: "wall" | "grid") => void;
  tone: "light" | "dark";
  className?: string;
}) {
  const next = view === "wall" ? "grid" : "wall";
  const Icon = next === "grid" ? LayoutGrid : Orbit;
  return (
    <button
      type="button"
      onClick={() => onChange(next)}
      className={cn(
        "inline-flex min-h-10 cursor-pointer items-center gap-2 rounded-full border px-4 label text-[0.66rem] transition-colors duration-300",
        tone === "dark"
          ? "border-khaki text-ivory hover:bg-khaki/15"
          : "border-rule hover:border-foreground",
        className,
      )}
    >
      <Icon aria-hidden="true" className="size-4" strokeWidth={1.5} />
      {next === "grid" ? "Grid view" : "Explore as a wall"}
    </button>
  );
}
