"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { profileOverview } from "@/data/organisation-profile";
import { founders } from "@/data/story";

export type ProfileSaveState = {
  status: "idle" | "error" | "success";
  message?: string;
};

export async function saveOrganisationProfile(
  _prev: ProfileSaveState,
  formData: FormData,
): Promise<ProfileSaveState> {
  const { supabase } = await requireAdmin();

  const data: Record<string, string> = {};
  for (const [key, value] of formData.entries()) {
    if (typeof value === "string") {
      data[key] = value.trim();
    }
  }

  // Snapshot current version to organisation_profile_previous
  const { data: current } = await supabase
    .from("site_settings")
    .select("value")
    .eq("key", "organisation_profile")
    .single();

  if (current?.value) {
    await supabase.from("site_settings").upsert(
      {
        key: "organisation_profile_previous",
        value: current.value,
      },
      { onConflict: "key" },
    );
  }

  const { error } = await supabase.from("site_settings").upsert(
    {
      key: "organisation_profile",
      value: data,
    },
    { onConflict: "key" },
  );

  if (error) {
    return { status: "error", message: `Failed to save organisation profile: ${error.message}` };
  }

  revalidatePath("/about");
  revalidatePath("/about/profile");
  revalidatePath("/admin/profile");
  revalidatePath("/");

  return {
    status: "success",
    message: "Organisation profile and founders updated successfully.",
  };
}

export async function restorePreviousProfile(): Promise<{
  success: boolean;
  message: string;
  data?: Record<string, string>;
}> {
  const { supabase } = await requireAdmin();

  const { data: prevSetting } = await supabase
    .from("site_settings")
    .select("value")
    .eq("key", "organisation_profile_previous")
    .single();

  if (!prevSetting?.value || typeof prevSetting.value !== "object") {
    return {
      success: false,
      message: "No previous saved version found in history snapshot.",
    };
  }

  const previousData = prevSetting.value as Record<string, string>;

  const { error } = await supabase.from("site_settings").upsert(
    {
      key: "organisation_profile",
      value: previousData,
    },
    { onConflict: "key" },
  );

  if (error) {
    return { success: false, message: `Failed to restore: ${error.message}` };
  }

  revalidatePath("/about");
  revalidatePath("/about/profile");
  revalidatePath("/admin/profile");
  revalidatePath("/");

  return {
    success: true,
    message: "Restored previous saved version of organisation profile.",
    data: previousData,
  };
}

export async function restoreOriginalProfile(): Promise<{
  success: boolean;
  message: string;
  data?: Record<string, string>;
}> {
  const { supabase } = await requireAdmin();

  // Snapshot current before resetting
  const { data: current } = await supabase
    .from("site_settings")
    .select("value")
    .eq("key", "organisation_profile")
    .single();

  if (current?.value) {
    await supabase.from("site_settings").upsert(
      {
        key: "organisation_profile_previous",
        value: current.value,
      },
      { onConflict: "key" },
    );
  }

  const originalFactoryDefaults: Record<string, string> = {
    eyebrow: profileOverview.eyebrow,
    tagline: profileOverview.tagline,
    heading: profileOverview.heading,
    lede: profileOverview.lede,
    priority1Title: profileOverview.foundingPriorities[0].title,
    priority1Desc: profileOverview.foundingPriorities[0].description,
    priority2Title: profileOverview.foundingPriorities[1].title,
    priority2Desc: profileOverview.foundingPriorities[1].description,
    founder1Name: founders[0]?.name ?? "Gladston Xavier",
    founder1Role: founders[0]?.role ?? "Co-founder, social worker",
    founder1Bio: founders[0]?.bio ?? "",
    founder1Portrait:
      founders[0]?.portrait?.src ??
      "/gallery image/WhatsApp Image 2026-09-14 at 4.01.17 PM (7).jpeg",
    founder2Name: founders[1]?.name ?? "Florina Xavier",
    founder2Role: founders[1]?.role ?? "Co-founder, social worker",
    founder2Bio: founders[1]?.bio ?? "",
    founder2Portrait:
      founders[1]?.portrait?.src ??
      "/gallery image/WhatsApp Image 2026-09-14 at 4.01.17 PM (6).jpeg",
  };

  const { error } = await supabase.from("site_settings").upsert(
    {
      key: "organisation_profile",
      value: originalFactoryDefaults,
    },
    { onConflict: "key" },
  );

  if (error) {
    return { success: false, message: `Failed to restore: ${error.message}` };
  }

  revalidatePath("/about");
  revalidatePath("/about/profile");
  revalidatePath("/admin/profile");
  revalidatePath("/");

  return {
    success: true,
    message: "Restored original factory default profile & founders.",
    data: originalFactoryDefaults,
  };
}
