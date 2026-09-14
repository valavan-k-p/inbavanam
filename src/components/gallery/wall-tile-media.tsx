import Image from "next/image";
import type { GalleryCategory, GalleryItem, IllustrationName } from "@/types/content";
import { LineArt } from "@/components/illustrations/line-art";
import { cn } from "@/lib/utils";

const art: Record<GalleryCategory, IllustrationName> = {
  Architecture: "stone",
  Nature: "leaf",
  Stay: "home",
  People: "people",
  Community: "gathering",
  Farming: "sesame",
  Experiences: "sun",
};

const tones: Record<GalleryCategory, string> = {
  Architecture: "from-[#7a5442] to-[#3b261f]",
  Nature: "from-[#6b7148] to-[#35361f]",
  Stay: "from-[#8a6a52] to-[#46301f]",
  People: "from-[#8b4a3c] to-[#3c1d1d]",
  Community: "from-[#7d6a45] to-[#3b3a24]",
  Farming: "from-[#88804f] to-[#46412a]",
  Experiences: "from-[#9a5a3f] to-[#4a2a1f]",
};

/**
 * Tile content for the gallery wall. Real photographs fill the tile; until
 * they are supplied, a category-tinted panel with line-art stands in (the
 * caption and the lightbox say that the photograph is still to come).
 */
export function WallTileMedia({ item, className }: { item: GalleryItem; className?: string }) {
  const src = item.kind === "video" ? item.poster : item.src;
  return (
    <div className={cn("absolute inset-0", className)}>
      {src ? (
        <Image src={src} alt="" fill sizes="380px" draggable={false} className="object-cover" />
      ) : (
        <div
          className={cn(
            "grain absolute inset-0 flex flex-col items-center justify-center gap-3 bg-linear-to-br text-cream/85",
            tones[item.category],
          )}
        >
          <LineArt name={art[item.category]} className="size-[28%] max-h-16 min-h-8" />
          <span className="label text-[0.58rem]">{item.category}</span>
        </div>
      )}
    </div>
  );
}
