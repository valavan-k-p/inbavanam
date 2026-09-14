import type { Metadata } from "next";
import { getGalleryItems } from "@/lib/db/content";
import { galleryIntro } from "@/data/story";
import { galleryCategories, type GalleryCategory } from "@/types/content";
import { GalleryExplorer } from "@/components/gallery/gallery-explorer";
import { MediaFrame } from "@/components/ui/media-frame";

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
      <GalleryExplorer
        items={galleryItems}
        initialCategory={isCategory(category) ? category : null}
        title={galleryIntro.heading}
        lede={galleryIntro.body}
      />
      {/* Without JavaScript the wall cannot run, so list the photographs plainly. */}
      <noscript>
        <section aria-label="Gallery" className="container-page py-16">
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {galleryItems.map((item) => (
              <li key={item.id}>
                <MediaFrame media={item} ratio="4 / 3" />
                <p className="mt-3 label text-muted-foreground">{item.category}</p>
              </li>
            ))}
          </ul>
        </section>
      </noscript>
    </>
  );
}
