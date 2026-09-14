import type { Metadata } from "next";
import { getGalleryItems } from "@/lib/db/content";
import { galleryCategories, type GalleryCategory } from "@/types/content";
import { PageHero } from "@/components/sections/page-hero";
import { GalleryGrid } from "@/components/gallery/gallery-grid";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Photographs and films of Inbavanam: architecture, nature, stays, people, community and farming.",
  alternates: { canonical: "/gallery" },
};

type GalleryPageProps = { searchParams: Promise<Record<string, string | string[] | undefined>> };

const isCategory = (value: unknown): value is GalleryCategory =>
  typeof value === "string" && (galleryCategories as readonly string[]).includes(value);

export default async function GalleryPage({ searchParams }: GalleryPageProps) {
  const { category } = await searchParams;
  const galleryItems = await getGalleryItems();

  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="Architecture, land and people"
        lede="Every photograph here will carry a caption saying what it shows, where and when."
      />
      <section aria-label="Gallery" className="container-page pb-[var(--section-y)]">
        <GalleryGrid
          items={galleryItems}
          initialCategory={isCategory(category) ? category : null}
        />
      </section>
    </>
  );
}
