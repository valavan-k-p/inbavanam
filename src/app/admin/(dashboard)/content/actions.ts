"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";

export type ContentSaveState = {
  status: "idle" | "error" | "success";
  message?: string;
  savedSection?: string;
};

const PUBLIC_PATHS = [
  "/",
  "/about",
  "/stay",
  "/experiences",
  "/our-work",
  "/community",
  "/events",
  "/gallery",
  "/contact",
];

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

  // 1. Fetch current site_content from site_settings to preserve history
  const { data: existing } = await supabase
    .from("site_settings")
    .select("value")
    .eq("key", "site_content")
    .single();

  const currentContent =
    existing?.value && typeof existing.value === "object"
      ? (existing.value as Record<string, unknown>)
      : {};

  const currentSection = currentContent[sectionKey];

  // 2. Archive previous version of this section before overwriting
  if (currentSection && typeof currentSection === "object") {
    try {
      const { data: existingHistory } = await supabase
        .from("site_settings")
        .select("value")
        .eq("key", "site_content_previous")
        .single();

      const historyMap =
        existingHistory?.value && typeof existingHistory.value === "object"
          ? (existingHistory.value as Record<string, unknown>)
          : {};

      await supabase.from("site_settings").upsert({
        key: "site_content_previous",
        value: {
          ...historyMap,
          [sectionKey]: currentSection,
          [`${sectionKey}_archived_at`]: new Date().toISOString(),
        },
      });
    } catch (e) {
      console.warn("Could not archive previous content version:", e);
    }
  }

  // 3. Update section content
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

export async function restorePreviousContent(
  sectionKey: string,
): Promise<{ success: boolean; data?: Record<string, string>; message?: string }> {
  const { supabase } = await requireAdmin();

  // Read from site_content_previous
  const { data: prevRecord } = await supabase
    .from("site_settings")
    .select("value")
    .eq("key", "site_content_previous")
    .single();

  if (!prevRecord?.value || typeof prevRecord.value !== "object") {
    return { success: false, message: "No previous saved version exists for this section." };
  }

  const prevSection = (prevRecord.value as Record<string, unknown>)[sectionKey];
  if (!prevSection || typeof prevSection !== "object") {
    return { success: false, message: "No previous version found for this section." };
  }

  // Write back to site_content
  const { data: currentRecord } = await supabase
    .from("site_settings")
    .select("value")
    .eq("key", "site_content")
    .single();

  const current =
    currentRecord?.value && typeof currentRecord.value === "object"
      ? (currentRecord.value as Record<string, unknown>)
      : {};

  const restoredContent = { ...current, [sectionKey]: prevSection };

  const { error } = await supabase.from("site_settings").upsert({
    key: "site_content",
    value: restoredContent,
  });

  if (error) {
    return { success: false, message: `Failed to restore previous version: ${error.message}` };
  }

  PUBLIC_PATHS.forEach((p) => revalidatePath(p));
  revalidatePath("/admin/content");

  return {
    success: true,
    data: prevSection as Record<string, string>,
    message: "Previous version restored successfully.",
  };
}

export async function restoreOriginalContent(
  sectionKey: string,
  originalValues: Record<string, string>,
): Promise<{ success: boolean; data?: Record<string, string>; message?: string }> {
  const { supabase } = await requireAdmin();

  const { data: currentRecord } = await supabase
    .from("site_settings")
    .select("value")
    .eq("key", "site_content")
    .single();

  const current =
    currentRecord?.value && typeof currentRecord.value === "object"
      ? (currentRecord.value as Record<string, unknown>)
      : {};

  const restoredContent = { ...current, [sectionKey]: originalValues };

  const { error } = await supabase.from("site_settings").upsert({
    key: "site_content",
    value: restoredContent,
  });

  if (error) {
    return { success: false, message: `Failed to restore original content: ${error.message}` };
  }

  PUBLIC_PATHS.forEach((p) => revalidatePath(p));
  revalidatePath("/admin/content");

  return {
    success: true,
    data: originalValues,
    message: "Original content restored successfully.",
  };
}
