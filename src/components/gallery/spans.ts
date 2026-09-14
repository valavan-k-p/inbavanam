import type { GalleryItem } from "@/types/content";

/** Grid spans that give the gallery its uneven, editorial rhythm. */
export function spanClass(span: GalleryItem["span"]) {
  if (span === "tall") return "row-span-2";
  if (span === "wide") return "col-span-2";
  return "";
}
