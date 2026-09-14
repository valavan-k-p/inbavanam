import { z } from "zod";
import { galleryCategories, type EventCategory } from "@/types/content";

/**
 * Admin content types. Each entry drives the list, the create/edit form and
 * the validation for one table, so adding a content type is a config change
 * rather than new pages. Table and column names match supabase/migrations.
 */

export type FieldType =
  "text" | "textarea" | "date" | "number" | "checkbox" | "url" | "select" | "slug" | "list";

export type AdminField = {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  options?: readonly string[];
  hint?: string;
};

export type AdminResource = {
  slug: string;
  table: string;
  title: string;
  singular: string;
  description: string;
  fields: AdminField[];
  listColumns: string[];
  orderBy: { column: string; ascending: boolean };
};

const eventCategories: readonly EventCategory[] = [
  "Program",
  "Training",
  "Community",
  "Celebration",
  "Retreat",
  "Private booking",
];

const published: AdminField = {
  name: "published",
  label: "Published",
  type: "checkbox",
  hint: "Only published items appear on the public site.",
};
const sortOrder: AdminField = {
  name: "sort_order",
  label: "Sort order",
  type: "number",
  hint: "Lower numbers appear first.",
};
const slug: AdminField = {
  name: "slug",
  label: "URL slug",
  type: "slug",
  required: true,
  hint: "Lowercase letters, numbers and hyphens, e.g. garden-room.",
};

export const adminResources: AdminResource[] = [
  {
    slug: "accommodations",
    table: "accommodations",
    title: "Accommodations",
    singular: "accommodation",
    description: "Rooms and spaces shown on the Stay page.",
    fields: [
      { name: "name", label: "Name", type: "text", required: true },
      slug,
      { name: "summary", label: "Summary", type: "textarea" },
      { name: "capacity", label: "Capacity", type: "text", hint: "For example: 2 adults." },
      { name: "amenities", label: "Amenities", type: "list", hint: "One per line." },
      published,
      sortOrder,
    ],
    listColumns: ["name", "capacity"],
    orderBy: { column: "sort_order", ascending: true },
  },
  {
    slug: "experiences",
    table: "experiences",
    title: "Experiences",
    singular: "experience",
    description: "Retreats, camps and other ways to use the space.",
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      slug,
      { name: "summary", label: "Summary", type: "textarea" },
      { name: "body", label: "Details", type: "textarea" },
      published,
      sortOrder,
    ],
    listColumns: ["title"],
    orderBy: { column: "sort_order", ascending: true },
  },
  {
    slug: "events",
    table: "events",
    title: "Events",
    singular: "event",
    description: "Calendar entries, including when spaces are booked.",
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      slug,
      {
        name: "category",
        label: "Category",
        type: "select",
        required: true,
        options: eventCategories,
      },
      { name: "start_date", label: "Start date", type: "date", required: true },
      { name: "end_date", label: "End date", type: "date", hint: "Leave empty for a single day." },
      { name: "time_label", label: "Time", type: "text", hint: "For example: 10:00 to 16:00." },
      { name: "location", label: "Location", type: "text", required: true },
      { name: "summary", label: "Summary", type: "textarea" },
      { name: "registration_url", label: "Registration link", type: "url" },
      published,
    ],
    listColumns: ["title", "start_date", "category"],
    orderBy: { column: "start_date", ascending: false },
  },
  {
    slug: "gallery",
    table: "gallery_items",
    title: "Gallery",
    singular: "gallery item",
    description: "Photographs and films. Upload files to the media bucket, then add them here.",
    fields: [
      {
        name: "alt",
        label: "Alt text",
        type: "text",
        required: true,
        hint: "Describe what the image shows.",
      },
      { name: "caption", label: "Caption", type: "textarea", hint: "What, where and when." },
      {
        name: "category",
        label: "Category",
        type: "select",
        required: true,
        options: galleryCategories,
      },
      { name: "kind", label: "Type", type: "select", required: true, options: ["image", "video"] },
      {
        name: "storage_path",
        label: "File path",
        type: "text",
        required: true,
        hint: "Path inside the media bucket, e.g. architecture/stone-wall.jpg.",
      },
      { name: "poster_path", label: "Poster path", type: "text", hint: "Videos only." },
      { name: "span", label: "Layout", type: "select", options: ["regular", "tall", "wide"] },
      published,
      sortOrder,
    ],
    listColumns: ["alt", "category"],
    orderBy: { column: "sort_order", ascending: true },
  },
  {
    slug: "programs",
    table: "programs",
    title: "Programs",
    singular: "program",
    description: "Our Work program pages.",
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      slug,
      { name: "area", label: "Program area", type: "text", required: true },
      { name: "summary", label: "Summary", type: "textarea" },
      { name: "body", label: "Story", type: "textarea" },
      published,
      sortOrder,
    ],
    listColumns: ["title", "area"],
    orderBy: { column: "sort_order", ascending: true },
  },
  {
    slug: "founders",
    table: "founders",
    title: "Founders",
    singular: "founder",
    description: "Founder profiles for the About page.",
    fields: [
      { name: "name", label: "Name", type: "text", required: true },
      { name: "role", label: "Role", type: "text" },
      {
        name: "bio",
        label: "Biography",
        type: "textarea",
        hint: "Publish only text the founder has approved.",
      },
      { name: "portrait_path", label: "Portrait path", type: "text" },
      { name: "video_path", label: "Video path", type: "text" },
      published,
      sortOrder,
    ],
    listColumns: ["name", "role"],
    orderBy: { column: "sort_order", ascending: true },
  },
  {
    slug: "team",
    table: "team_members",
    title: "Team",
    singular: "team member",
    description: "Staff introductions.",
    fields: [
      { name: "name", label: "Name", type: "text", required: true },
      { name: "role", label: "Role", type: "text" },
      { name: "bio", label: "Biography", type: "textarea" },
      { name: "portrait_path", label: "Portrait path", type: "text" },
      published,
      sortOrder,
    ],
    listColumns: ["name", "role"],
    orderBy: { column: "sort_order", ascending: true },
  },
];

export function getAdminResource(slug: string) {
  return adminResources.find((r) => r.slug === slug);
}

const emptyToNull = (v: unknown) => (v === "" || v === undefined ? null : v);

function fieldSchema(field: AdminField): z.ZodType {
  const label = field.label;
  switch (field.type) {
    case "checkbox":
      return z.preprocess((v) => v === "on" || v === true, z.boolean());
    case "number":
      return z.preprocess(
        emptyToNull,
        z.coerce
          .number({ error: `${label} must be a number.` })
          .int()
          .nullable(),
      );
    case "date":
      return field.required
        ? z.iso.date({ error: `${label} must be a valid date.` })
        : z.preprocess(
            emptyToNull,
            z.iso.date({ error: `${label} must be a valid date.` }).nullable(),
          );
    case "url":
      return z.preprocess(
        emptyToNull,
        z.url({ error: `${label} must be a full link starting with https://.` }).nullable(),
      );
    case "select":
      return field.required
        ? z.enum(field.options as [string, ...string[]], {
            error: `Choose a ${label.toLowerCase()}.`,
          })
        : z.preprocess(emptyToNull, z.enum(field.options as [string, ...string[]]).nullable());
    case "slug":
      return z
        .string()
        .trim()
        .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
          error: "Use lowercase letters, numbers and single hyphens.",
        })
        .max(80);
    case "list":
      return z.preprocess(
        (v) =>
          String(v ?? "")
            .split("\n")
            .map((s) => s.trim())
            .filter(Boolean),
        z.array(z.string().max(120)).max(50),
      );
    default: {
      const max = field.type === "textarea" ? 10000 : 300;
      return field.required
        ? z
            .string()
            .trim()
            .min(1, { error: `${label} is required.` })
            .max(max)
        : z.preprocess(emptyToNull, z.string().trim().max(max).nullable());
    }
  }
}

/** Builds the validation schema for a resource from its field config. */
export function resourceSchema(resource: AdminResource) {
  const shape: Record<string, z.ZodType> = {};
  for (const field of resource.fields) shape[field.name] = fieldSchema(field);
  let schema = z.object(shape);
  if (resource.table === "events") {
    schema = schema.refine(
      (d) =>
        !d.end_date || (typeof d.start_date === "string" && String(d.end_date) >= d.start_date),
      { path: ["end_date"], error: "End date must be on or after the start date." },
    ) as unknown as typeof schema;
  }
  return schema;
}
