/**
 * Typed content model shared by the static data layer (src/data) and the
 * Supabase layer (src/lib/db). Field names mirror the database columns in
 * supabase/migrations so either source can feed the same components.
 */

export type MediaKind = "image" | "video";

/**
 * A photograph or video. `src: null` means the real Inbavanam asset has not
 * been supplied yet; components render a labelled placeholder instead of
 * stock imagery. Every null src is listed in docs/CONTENT_GAPS.md.
 */
export type MediaAsset = {
  kind: MediaKind;
  src: string | null;
  alt: string;
  caption?: string;
  /** Poster frame for video. */
  poster?: string | null;
  /** WebVTT captions for video. */
  captions?: string | null;
  width?: number;
  height?: number;
  /** Shown on the placeholder so editors know what to supply. */
  brief?: string;
};

export type NavItem = {
  label: string;
  href: string;
  /** One line shown in the radial and mobile menus. */
  description: string;
  /** Line-art shown in the menu medallion until a photograph is supplied. */
  art: IllustrationName;
  /** Optional photograph for the menu medallion. */
  image?: string | null;
};

export type Fact = {
  label: string;
  body: string;
  /** False when the wording still needs verification against source video. */
  verified: boolean;
  art?: IllustrationName;
};

export type ProgramArea = {
  slug: string;
  title: string;
  summary: string;
  /** Program names exactly as listed in the existing-site review document. */
  programs: string[];
  media: MediaAsset;
  illustration: IllustrationName;
};

export type Experience = {
  slug: string;
  title: string;
  summary: string;
  media: MediaAsset;
  illustration: IllustrationName;
};

export type Accommodation = {
  slug: string;
  name: string;
  summary: string;
  capacity: string;
  amenities: string[];
  images: MediaAsset[];
  published: boolean;
};

export type EventCategory =
  "Program" | "Training" | "Community" | "Celebration" | "Retreat" | "Private booking";

export type EventItem = {
  slug: string;
  title: string;
  category: EventCategory;
  /** ISO 8601 date, e.g. 2026-10-02. */
  startDate: string;
  endDate?: string;
  time?: string;
  location: string;
  summary: string;
  media?: MediaAsset;
  programSlug?: string;
  registrationUrl?: string;
};

export const galleryCategories = [
  "Architecture",
  "Nature",
  "Stay",
  "People",
  "Community",
  "Farming",
  "Experiences",
] as const;

export type GalleryCategory = (typeof galleryCategories)[number];

export type GalleryItem = MediaAsset & {
  id: string;
  category: GalleryCategory;
  /** Relative visual weight in the editorial grid. */
  span?: "tall" | "wide" | "regular";
};

export type Founder = {
  name: string;
  role: string;
  bio: string | null;
  portrait: MediaAsset;
};

export type IllustrationName =
  | "sprout"
  | "sesame"
  | "gathering"
  | "book"
  | "hands"
  | "stone"
  | "leaf"
  | "sun"
  | "path"
  | "lamp"
  | "people"
  | "home"
  | "dove"
  | "ball"
  | "scales"
  | "frame";
