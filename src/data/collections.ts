import type { Accommodation, EventItem, GalleryItem } from "@/types/content";

/**
 * Collections that will move to Supabase once the admin is in use. They are
 * intentionally empty or placeholder-only: no rooms, events or photographs
 * are invented. See docs/CONTENT_GAPS.md.
 */

/** No accommodation details have been supplied yet. */
export const accommodations: Accommodation[] = [];

/**
 * Shape preview shown only in development so the Stay layout can be
 * reviewed before real rooms exist. Never rendered in production.
 */
export const accommodationTemplate: Accommodation = {
  slug: "template",
  name: "Accommodation name",
  summary: "Short description of the room or space.",
  capacity: "To be confirmed",
  amenities: ["To be confirmed"],
  images: [
    {
      kind: "image",
      src: null,
      alt: "Accommodation photograph",
      brief: "Room or space photograph, landscape, with natural light.",
    },
  ],
  published: false,
};

/** No dated events have been supplied yet. */
export const events: EventItem[] = [];

const g = (
  id: string,
  category: GalleryItem["category"],
  alt: string,
  brief: string,
  span: GalleryItem["span"] = "regular",
): GalleryItem => ({ id, kind: "image", src: null, category, alt, brief, span });

/** Placeholder slots describing the photographs the gallery needs. */
export const galleryItems: GalleryItem[] = [
  g(
    "arch-exterior",
    "Architecture",
    "Stone building exterior",
    "Exterior of the stone buildings in daylight.",
    "tall",
  ),
  g("nature-land", "Nature", "The grounds at Inbavanam", "Wide view across the land.", "wide"),
  g(
    "people-founders",
    "People",
    "Gladston and Florina Xavier",
    "The founders together on the grounds.",
  ),
  g("farming-sesame", "Farming", "Crops on the land", "Crops on the land, with the season noted."),
  g("stay-interior", "Stay", "A room at Inbavanam", "Interior of a room or shared space.", "tall"),
  g(
    "community-program",
    "Community",
    "A community program",
    "Community program, with consent and caption.",
  ),
  g("arch-detail", "Architecture", "Stone wall detail", "Close detail of stone and joinery."),
  g(
    "experiences-gathering",
    "Experiences",
    "A gathering on site",
    "A group gathering or celebration.",
    "wide",
  ),
  g(
    "nature-birds",
    "Nature",
    "Birds seen on the land",
    "Bird photograph for the forthcoming bird list.",
  ),
  g(
    "farming-drying",
    "Farming",
    "Herbs drying on site",
    "Vegetables or herbs being dried for powders.",
  ),
];
