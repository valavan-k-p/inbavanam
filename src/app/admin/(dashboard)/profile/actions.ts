"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";

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
    message: "Organisation profile updated successfully.",
  };
}
