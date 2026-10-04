"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { requireAdmin } from "@/lib/auth";

export type EventFormState = {
  status: "idle" | "error" | "success";
  message?: string;
  fieldErrors?: Record<string, string[] | undefined>;
};

const PUBLIC_PATHS = ["/", "/events", "/contact"];
const revalidatePublic = () => PUBLIC_PATHS.forEach((p) => revalidatePath(p));
const uuid = z.uuid();

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const eventSchema = z.object({
  title: z.string().trim().min(2, "Event title must be at least 2 characters."),
  slug: z.string().trim().optional(),
  category: z.enum([
    "Program",
    "Training",
    "Community",
    "Celebration",
    "Retreat",
    "Private booking",
  ]),
  start_date: z.string().min(1, "Start date is required."),
  end_date: z.string().optional().nullable(),
  start_time: z.string().optional().nullable(),
  end_time: z.string().optional().nullable(),
  location: z.string().trim().min(1, "Location is required."),
  summary: z.string().trim().max(1000).optional().nullable(),
  image_path: z.string().trim().optional().nullable(),
  registration_url: z
    .string()
    .trim()
    .url("Registration URL must be a valid link.")
    .optional()
    .or(z.literal(""))
    .nullable(),
  published: z.preprocess((v) => v === "on" || v === "true" || v === true, z.boolean()),
});

export async function saveEvent(
  id: string | null,
  _prev: EventFormState,
  formData: FormData,
): Promise<EventFormState> {
  const { supabase } = await requireAdmin();

  const raw = {
    title: formData.get("title"),
    slug: formData.get("slug"),
    category: formData.get("category"),
    start_date: formData.get("start_date"),
    end_date: formData.get("end_date") || null,
    start_time: formData.get("start_time") || null,
    end_time: formData.get("end_time") || null,
    location: formData.get("location") || "Inbavanam",
    summary: formData.get("summary") || null,
    image_path: formData.get("image_path") || null,
    registration_url: formData.get("registration_url") || null,
    published: formData.get("published"),
  };

  const parsed = eventSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      status: "error",
      message: "Please correct the fields marked below.",
      fieldErrors: z.flattenError(parsed.error).fieldErrors,
    };
  }

  const data = parsed.data;

  // Format time label for legacy and public view (e.g., "10:00 to 16:00" or "09:30")
  let timeLabel = "";
  if (data.start_time && data.end_time) {
    timeLabel = `${data.start_time} to ${data.end_time}`;
  } else if (data.start_time) {
    timeLabel = `${data.start_time}`;
  }

  // Derive slug if not supplied
  const finalSlug = data.slug && data.slug.length > 0 ? slugify(data.slug) : slugify(data.title);

  // Validate date range
  if (data.end_date && data.end_date < data.start_date) {
    return {
      status: "error",
      message: "End date must be on or after start date.",
      fieldErrors: { end_date: ["End date must be on or after start date."] },
    };
  }

  const row = {
    title: data.title,
    slug: finalSlug,
    category: data.category,
    start_date: data.start_date,
    end_date: data.end_date,
    time_label: timeLabel || null,
    location: data.location,
    summary: data.summary,
    image_path: data.image_path,
    registration_url: data.registration_url || null,
    published: data.published,
  };

  if (id) {
    if (!uuid.safeParse(id).success) {
      return { status: "error", message: "Invalid event ID." };
    }
    const { error } = await supabase.from("events").update(row).eq("id", id);
    if (error) {
      return {
        status: "error",
        message: error.code === "23505" ? "An event with this title/slug already exists." : error.message,
      };
    }
  } else {
    const { error } = await supabase.from("events").insert(row);
    if (error) {
      return {
        status: "error",
        message: error.code === "23505" ? "An event with this title/slug already exists." : error.message,
      };
    }
  }

  revalidatePublic();
  revalidatePath("/admin/events");
  redirect("/admin/events");
}

export async function deleteEvent(id: string, formData: FormData) {
  const { supabase } = await requireAdmin();
  if (!uuid.safeParse(id).success || formData.get("confirm") !== "on") return;
  await supabase.from("events").delete().eq("id", id);
  revalidatePublic();
  revalidatePath("/admin/events");
  redirect("/admin/events");
}

export async function toggleEventPublish(id: string, currentPublished: boolean) {
  const { supabase } = await requireAdmin();
  if (!uuid.safeParse(id).success) return;
  await supabase.from("events").update({ published: !currentPublished }).eq("id", id);
  revalidatePublic();
  revalidatePath("/admin/events");
}
