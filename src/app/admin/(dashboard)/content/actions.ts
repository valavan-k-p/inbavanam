"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";

export type ContentSaveState = {
  status: "idle" | "error" | "success";
  message?: string;
  savedSection?: string;
};

const PUBLIC_PATHS = ["/", "/about", "/stay", "/experiences", "/our-work", "/community", "/events", "/gallery", "/contact"];

export async function saveSiteContent(
  sectionKey: string,
  _prev: ContentSaveState,
  formData: FormData,
): Promise<ContentSaveState> {
  const { supabase } = await requireAdmin();

  // Extract all fields into an object
  const data: Record<string, string> = {};
  for (const [key, value] of formData.entries()) {
    if (typeof value === "string") {
      data[key] = value.trim();
    }
  }

  // Fetch current site_content from site_settings
  const { data: existing } = await supabase
    .from("site_settings")
    .select("value")
    .eq("key", "site_content")
    .single();

  const currentContent = (existing?.value && typeof existing.value === "object") ? existing.value : {};

  const updatedContent = {
    ...currentContent,
    [sectionKey]: data,
  };

  const { error } = await supabase.from("site_settings").upsert(
    {
      key: "site_content",
      value: updatedContent,
    },
    { onConflict: "key" },
  );

  if (error) {
    return { status: "error", message: `Failed to save changes: ${error.message}` };
  }

  // Revalidate public pages
  PUBLIC_PATHS.forEach((p) => revalidatePath(p));
  revalidatePath("/admin/content");

  return {
    status: "success",
    message: "Section content updated successfully.",
    savedSection: sectionKey,
  };
}
