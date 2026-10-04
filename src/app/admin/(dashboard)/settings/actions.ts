"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";

export type SettingsSaveState = {
  status: "idle" | "error" | "success";
  message?: string;
};

export async function saveContactSettings(
  _prev: SettingsSaveState,
  formData: FormData,
): Promise<SettingsSaveState> {
  const { supabase } = await requireAdmin();

  const email = (formData.get("email") as string | null)?.trim() || null;
  const phone = (formData.get("phone") as string | null)?.trim() || null;
  const address = (formData.get("address") as string | null)?.trim() || null;
  const map_url = (formData.get("map_url") as string | null)?.trim() || null;
  const support_url = (formData.get("support_url") as string | null)?.trim() || null;

  const { error } = await supabase.from("site_settings").upsert(
    {
      key: "contact",
      value: { email, phone, address, map_url, support_url },
    },
    { onConflict: "key" },
  );

  if (error) {
    return { status: "error", message: `Failed to update settings: ${error.message}` };
  }

  revalidatePath("/admin/settings");
  revalidatePath("/contact");
  revalidatePath("/");

  return { status: "success", message: "Settings saved successfully." };
}
