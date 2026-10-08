"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { MAX_FIELD_LENGTH, MAX_SECTION_LENGTH, MAX_VERSIONS } from "./limits";

export type ContentSaveState = {
  status: "idle" | "error" | "success";
  message?: string;
  savedSection?: string;
};

/** One saved state of a section, kept so it can be restored later. */
export type ContentVersion = {
  values: Record<string, string>;
  savedAt: string;
};

/** What the restore picker needs to list the versions. */
export type ContentVersionSummary = {
  index: number;
  savedAt: string;
  preview: string;
};

const HISTORY_KEY = "site_content_history";
/** The single-version shape this replaced; still read so nothing is lost. */
const LEGACY_HISTORY_KEY = "site_content_previous";

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

type Settings = Record<string, unknown>;
type Supabase = Awaited<ReturnType<typeof requireAdmin>>["supabase"];

const asObject = (value: unknown): Settings =>
  value && typeof value === "object" && !Array.isArray(value) ? (value as Settings) : {};

const asValues = (value: unknown): Record<string, string> => {
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(asObject(value))) {
    if (typeof v === "string") out[k] = v;
  }
  return out;
};

async function readSetting(supabase: Supabase, key: string): Promise<Settings> {
  const { data } = await supabase.from("site_settings").select("value").eq("key", key).single();
  return asObject(data?.value);
}

async function writeSetting(supabase: Supabase, key: string, value: unknown) {
  return supabase
    .from("site_settings")
    .upsert({ key, value, updated_at: new Date().toISOString() }, { onConflict: "key" });
}

/**
 * Versions of a section, newest first. Falls back to the old single-version
 * record so history saved before this change is still offered.
 */
async function readVersions(supabase: Supabase, sectionKey: string): Promise<ContentVersion[]> {
  const history = await readSetting(supabase, HISTORY_KEY);
  const list = history[sectionKey];
  if (Array.isArray(list)) {
    return list
      .filter((entry): entry is Settings => Boolean(entry) && typeof entry === "object")
      .map((entry) => ({
        values: asValues(entry.values),
        savedAt: typeof entry.savedAt === "string" ? entry.savedAt : "",
      }));
  }

  const legacy = await readSetting(supabase, LEGACY_HISTORY_KEY);
  const previous = legacy[sectionKey];
  if (previous && typeof previous === "object") {
    const archivedAt = legacy[`${sectionKey}_archived_at`];
    return [
      {
        values: asValues(previous),
        savedAt: typeof archivedAt === "string" ? archivedAt : "",
      },
    ];
  }
  return [];
}

/** Puts `values` at the front of the section's history, keeping MAX_VERSIONS. */
async function archive(supabase: Supabase, sectionKey: string, values: Record<string, string>) {
  if (!Object.keys(values).length) return;
  const history = await readSetting(supabase, HISTORY_KEY);
  const existing = await readVersions(supabase, sectionKey);
  const next = [{ values, savedAt: new Date().toISOString() }, ...existing].slice(0, MAX_VERSIONS);
  await writeSetting(supabase, HISTORY_KEY, { ...history, [sectionKey]: next });
}

export async function saveSiteContent(
  sectionKey: string,
  _prev: ContentSaveState,
  formData: FormData,
): Promise<ContentSaveState> {
  const { supabase } = await requireAdmin();

  const data: Record<string, string> = {};
  let total = 0;
  for (const [key, value] of formData.entries()) {
    if (typeof value !== "string") continue;
    const trimmed = value.trim();
    if (trimmed.length > MAX_FIELD_LENGTH) {
      return {
        status: "error",
        message: `"${key}" is too long: ${trimmed.length} characters, and the limit is ${MAX_FIELD_LENGTH}.`,
      };
    }
    total += trimmed.length;
    data[key] = trimmed;
  }
  if (total > MAX_SECTION_LENGTH) {
    return {
      status: "error",
      message: `This section is too long: ${total} characters, and the limit is ${MAX_SECTION_LENGTH}.`,
    };
  }

  const content = await readSetting(supabase, "site_content");
  await archive(supabase, sectionKey, asValues(content[sectionKey]));

  const { error } = await writeSetting(supabase, "site_content", {
    ...content,
    [sectionKey]: data,
  });
  if (error) {
    return { status: "error", message: `Failed to save changes: ${error.message}` };
  }

  PUBLIC_PATHS.forEach((p) => revalidatePath(p));
  revalidatePath("/admin/content");

  return {
    status: "success",
    message: "Section content updated successfully.",
    savedSection: sectionKey,
  };
}

/** The versions of a section that can be restored, newest first. */
export async function listContentVersions(sectionKey: string): Promise<ContentVersionSummary[]> {
  const { supabase } = await requireAdmin();
  const versions = await readVersions(supabase, sectionKey);
  return versions.map((version, index) => ({
    index,
    savedAt: version.savedAt,
    preview:
      Object.values(version.values)
        .find((v) => v.trim().length > 0)
        ?.slice(0, 80) ?? "",
  }));
}

/**
 * Restores one of the saved versions. The version being replaced is archived
 * first, so a restore can always be undone and nothing is ever discarded.
 */
export async function restorePreviousContent(
  sectionKey: string,
  versionIndex = 0,
): Promise<{ success: boolean; data?: Record<string, string>; message?: string }> {
  const { supabase } = await requireAdmin();

  const versions = await readVersions(supabase, sectionKey);
  const target = versions[versionIndex];
  if (!target || !Object.keys(target.values).length) {
    return { success: false, message: "No previous saved version exists for this section." };
  }

  const content = await readSetting(supabase, "site_content");
  await archive(supabase, sectionKey, asValues(content[sectionKey]));

  const { error } = await writeSetting(supabase, "site_content", {
    ...content,
    [sectionKey]: target.values,
  });
  if (error) {
    return { success: false, message: `Failed to restore previous version: ${error.message}` };
  }

  PUBLIC_PATHS.forEach((p) => revalidatePath(p));
  revalidatePath("/admin/content");

  return {
    success: true,
    data: target.values,
    message: "Previous version restored successfully.",
  };
}

/** Back to the text written into the site's code, whatever has been saved since. */
export async function restoreOriginalContent(
  sectionKey: string,
  originalValues: Record<string, string>,
): Promise<{ success: boolean; data?: Record<string, string>; message?: string }> {
  const { supabase } = await requireAdmin();

  const content = await readSetting(supabase, "site_content");
  await archive(supabase, sectionKey, asValues(content[sectionKey]));

  const { error } = await writeSetting(supabase, "site_content", {
    ...content,
    [sectionKey]: originalValues,
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
