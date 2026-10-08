"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { requireAdmin } from "@/lib/auth";
import { programIndex, type ProgramDetail } from "@/data/programs";

export type ProgrammeFormState = {
  status: "idle" | "error" | "success";
  message?: string;
  fieldErrors?: Record<string, string[] | undefined>;
};

const programSchema = z.object({
  slug: z.string().min(1),
  name: z.string().trim().min(2, "Title is required."),
  subtitle: z.string().trim().min(1, "Subtitle is required."),
  tag: z.string().trim().min(1, "Tag is required."),
  lead: z.string().trim().min(5, "Short description is required."),
  highlights: z.string().trim(),
  keyFactLabel: z.string().trim().optional(),
  keyFactValue: z.string().trim().optional(),
  sourceRef: z.string().trim().optional(),
  imagePath: z.string().trim().optional(),
  published: z.preprocess((v) => v === "on" || v === "true" || v === true, z.boolean()),
});

export async function saveProgramme(
  slug: string,
  _prev: ProgrammeFormState,
  formData: FormData,
): Promise<ProgrammeFormState> {
  const { supabase } = await requireAdmin();

  const raw = {
    slug,
    name: formData.get("name"),
    subtitle: formData.get("subtitle"),
    tag: formData.get("tag"),
    lead: formData.get("lead"),
    highlights: formData.get("highlights"),
    keyFactLabel: formData.get("keyFactLabel"),
    keyFactValue: formData.get("keyFactValue"),
    sourceRef: formData.get("sourceRef"),
    imagePath: formData.get("imagePath"),
    published: formData.get("published"),
  };

  const parsed = programSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      status: "error",
      message: "Please correct the errors below.",
      fieldErrors: z.flattenError(parsed.error).fieldErrors,
    };
  }

  const { data } = parsed;

  // Split highlights by line
  const highlightList = data.highlights
    .split("\n")
    .map((h) => h.trim())
    .filter(Boolean);

  // Fetch current stored programmes from site_settings or initialize with programIndex
  const { data: currentSetting } = await supabase
    .from("site_settings")
    .select("value")
    .eq("key", "programs")
    .single();

  let storedPrograms: (ProgramDetail & { published?: boolean; imagePath?: string })[] = [];
  if (currentSetting?.value && Array.isArray(currentSetting.value)) {
    storedPrograms = currentSetting.value;
  } else {
    // Seed with existing 12 programmes
    storedPrograms = programIndex.map((p) => ({ ...p, published: true }));
  }

  const existingIdx = storedPrograms.findIndex((p) => p.slug === slug);

  const updatedEntry = {
    ...(existingIdx >= 0 ? storedPrograms[existingIdx] : {}),
    slug,
    name: data.name,
    subtitle: data.subtitle,
    tag: data.tag,
    lead: data.lead,
    highlights: highlightList,
    keyFact: {
      label: data.keyFactLabel || "Programme Format",
      value: data.keyFactValue || "Experiential Workshop",
    },
    sourceRef: data.sourceRef || "",
    imagePath: data.imagePath || undefined,
    published: data.published,
  } as ProgramDetail & { published?: boolean; imagePath?: string };

  // Save snapshot of previous state before modifying
  if (currentSetting?.value) {
    await supabase.from("site_settings").upsert(
      {
        key: "programs_previous",
        value: currentSetting.value,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "key" },
    );
  }

  if (existingIdx >= 0) {
    storedPrograms[existingIdx] = updatedEntry;
  } else {
    storedPrograms.push(updatedEntry);
  }

  // Save to site_settings table
  const { error } = await supabase.from("site_settings").upsert(
    {
      key: "programs",
      value: storedPrograms as unknown as Record<string, unknown>[],
      updated_at: new Date().toISOString(),
    },
    { onConflict: "key" },
  );

  if (error) {
    return { status: "error", message: `Failed to save: ${error.message}` };
  }

  revalidatePath("/admin/programmes");
  revalidatePath("/our-work");
  revalidatePath("/");

  redirect("/admin/programmes");
}

export async function restorePreviousProgrammes() {
  const { supabase } = await requireAdmin();

  const { data: prevSetting } = await supabase
    .from("site_settings")
    .select("value")
    .eq("key", "programs_previous")
    .single();

  if (!prevSetting?.value) {
    return {
      success: false,
      message: "No previous version available to restore.",
    };
  }

  const { error } = await supabase.from("site_settings").upsert(
    {
      key: "programs",
      value: prevSetting.value,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "key" },
  );

  if (error) {
    return { success: false, message: `Failed to restore: ${error.message}` };
  }

  revalidatePath("/admin/programmes");
  revalidatePath("/our-work");
  revalidatePath("/");

  return {
    success: true,
    message: "Restored previous saved version of all programmes.",
  };
}

export async function restoreOriginalProgrammes() {
  const { supabase } = await requireAdmin();

  // Snapshot before reset
  const { data: currentSetting } = await supabase
    .from("site_settings")
    .select("value")
    .eq("key", "programs")
    .single();

  if (currentSetting?.value) {
    await supabase.from("site_settings").upsert(
      {
        key: "programs_previous",
        value: currentSetting.value,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "key" },
    );
  }

  const originalFactoryList = programIndex.map((p) => ({ ...p, published: true }));

  const { error } = await supabase.from("site_settings").upsert(
    {
      key: "programs",
      value: originalFactoryList as unknown as Record<string, unknown>[],
      updated_at: new Date().toISOString(),
    },
    { onConflict: "key" },
  );

  if (error) {
    return { success: false, message: `Failed to restore original: ${error.message}` };
  }

  revalidatePath("/admin/programmes");
  revalidatePath("/our-work");
  revalidatePath("/");

  return {
    success: true,
    message: "Restored original factory default programmes.",
  };
}
