import { createClient } from "@supabase/supabase-js";
import type { Accommodation, EventItem, GalleryItem } from "@/types/content";
import { galleryCategories } from "@/types/content";
import {
  accommodations as localAccommodations,
  events as localEvents,
  galleryItems as localGallery,
} from "@/data/collections";
import { programIndex, type ProgramDetail } from "@/data/programs";
import { profileOverview } from "@/data/organisation-profile";
import { contact as defaultContact } from "@/data/site";
import { getSupabaseConfig } from "@/lib/supabase/config";

/**
 * Public content repository. Reads published rows from Supabase when it is
 * configured and falls back to the typed local data in src/data otherwise,
 * so the site works before the database has any content.
 *
 * Uses a session-less client: public pages never read cookies, so they
 * stay statically renderable and are refreshed with `revalidate`.
 */
function getDb() {
  const config = getSupabaseConfig();
  return config
    ? createClient(config.url, config.key, { auth: { persistSession: false } })
    : null;
}

/** Turns a Storage path into a public URL; full URLs pass through unchanged. */
export function mediaUrl(path: string | null | undefined): string | null {
  if (!path) return null;
  if (/^https?:\/\//.test(path) || path.startsWith("/")) return path;
  const config = getSupabaseConfig();
  return config ? `${config.url}/storage/v1/object/public/media/${path}` : null;
}

type Row = Record<string, unknown>;
const str = (v: unknown) => (typeof v === "string" && v.length ? v : undefined);

export async function getEvents(): Promise<EventItem[]> {
  const db = getDb();
  if (!db) return localEvents;
  const { data, error } = await db
    .from("events")
    .select(
      "slug,title,category,start_date,end_date,time_label,location,summary,image_path,registration_url,program:programs(slug)",
    )
    .eq("published", true)
    .order("start_date");
  if (error) {
    console.error("[content] events", error.message);
    return localEvents;
  }
  return (data as Row[]).map((r) => ({
    slug: String(r.slug),
    title: String(r.title),
    category: r.category as EventItem["category"],
    startDate: String(r.start_date),
    endDate: str(r.end_date),
    time: str(r.time_label),
    location: str(r.location) ?? "Inbavanam",
    summary: str(r.summary) ?? "",
    registrationUrl: str(r.registration_url),
    programSlug: str((r.program as Row | null)?.slug),
    media: r.image_path
      ? { kind: "image", src: mediaUrl(String(r.image_path)), alt: String(r.title) }
      : undefined,
  }));
}

export async function getGalleryItems(): Promise<GalleryItem[]> {
  const db = getDb();
  if (!db) return localGallery;
  const { data, error } = await db
    .from("gallery_items")
    .select("id,kind,storage_path,poster_path,alt,caption,category,span")
    .eq("published", true)
    .order("sort_order");
  if (error) {
    console.error("[content] gallery", error.message);
    return localGallery;
  }
  const rows = (data as Row[]).filter((r) =>
    (galleryCategories as readonly unknown[]).includes(r.category),
  );
  return rows.length
    ? rows.map((r) => ({
        id: String(r.id),
        kind: r.kind === "video" ? "video" : "image",
        src: mediaUrl(str(r.storage_path)),
        poster: mediaUrl(str(r.poster_path)),
        alt: String(r.alt),
        caption: str(r.caption),
        category: r.category as GalleryItem["category"],
        span: (str(r.span) as GalleryItem["span"]) ?? "regular",
      }))
    : localGallery;
}

export async function getAccommodations(): Promise<Accommodation[]> {
  const db = getDb();
  if (!db) return localAccommodations;
  const { data, error } = await db
    .from("accommodations")
    .select(
      "slug,name,summary,capacity,amenities,published,images:accommodation_images(storage_path,alt,caption,sort_order)",
    )
    .eq("published", true)
    .order("sort_order");
  if (error) {
    console.error("[content] accommodations", error.message);
    return localAccommodations;
  }
  return (data as Row[]).map((r) => ({
    slug: String(r.slug),
    name: String(r.name),
    summary: str(r.summary) ?? "",
    capacity: str(r.capacity) ?? "To be confirmed",
    amenities:
      Array.isArray(r.amenities) && r.amenities.length
        ? (r.amenities as string[])
        : ["To be confirmed"],
    published: true,
    images: ((r.images as Row[] | null) ?? [])
      .sort((a, b) => Number(a.sort_order) - Number(b.sort_order))
      .map((img) => ({
        kind: "image" as const,
        src: mediaUrl(str(img.storage_path)),
        alt: String(img.alt),
        caption: str(img.caption),
      })),
  }));
}

/**
 * Returns the 12 verified programmes, pulling any custom edits from Supabase
 * when configured and falling back to programIndex otherwise.
 */
export async function getProgramList(): Promise<ProgramDetail[]> {
  const db = getDb();
  if (!db) return programIndex;
  const { data, error } = await db
    .from("site_settings")
    .select("value")
    .eq("key", "programs")
    .single();

  if (error || !data?.value || !Array.isArray(data.value)) {
    return programIndex;
  }

  // Filter only published ones on the public site
  return (data.value as (ProgramDetail & { published?: boolean })[]).filter(
    (p) => p.published !== false,
  );
}

/**
 * Reads a dynamic website content section, falling back to local story data.
 */
export async function getSiteContentSection<T extends Record<string, unknown>>(
  sectionKey: string,
  fallback: T,
): Promise<T> {
  const db = getDb();
  if (!db) return fallback;
  const { data, error } = await db
    .from("site_settings")
    .select("value")
    .eq("key", "site_content")
    .single();

  if (error || !data?.value || typeof data.value !== "object") {
    return fallback;
  }

  const section = (data.value as Record<string, unknown>)[sectionKey];
  if (!section || typeof section !== "object") return fallback;

  return { ...fallback, ...section };
}

/**
 * Reads the organisation profile overview, falling back to local data.
 */
export async function getOrganisationProfileContent() {
  const db = getDb();
  if (!db) return profileOverview;
  const { data, error } = await db
    .from("site_settings")
    .select("value")
    .eq("key", "organisation_profile")
    .single();

  if (error || !data?.value || typeof data.value !== "object") {
    return profileOverview;
  }

  const v = data.value as Record<string, string>;
  return {
    ...profileOverview,
    eyebrow: v.eyebrow ?? profileOverview.eyebrow,
    heading: v.heading ?? profileOverview.heading,
    tagline: v.tagline ?? profileOverview.tagline,
    lede: v.lede ?? profileOverview.lede,
    foundingPriorities: [
      {
        title: v.priority1Title ?? profileOverview.foundingPriorities[0].title,
        description: v.priority1Desc ?? profileOverview.foundingPriorities[0].description,
      },
      {
        title: v.priority2Title ?? profileOverview.foundingPriorities[1].title,
        description: v.priority2Desc ?? profileOverview.foundingPriorities[1].description,
      },
    ],
  };
}

/**
 * Reads live contact settings from the database, falling back to environment variables.
 */
export async function getContactDetails() {
  const db = getDb();
  if (!db) return defaultContact;
  const { data, error } = await db
    .from("site_settings")
    .select("value")
    .eq("key", "contact")
    .single();

  if (error || !data?.value || typeof data.value !== "object") {
    return defaultContact;
  }

  const v = data.value as Record<string, string | null>;
  return {
    email: v.email ?? defaultContact.email,
    phone: v.phone ?? defaultContact.phone,
    address: v.address ?? defaultContact.address,
    mapUrl: v.map_url ?? defaultContact.mapUrl,
    supportUrl: v.support_url ?? defaultContact.supportUrl,
  };
}

