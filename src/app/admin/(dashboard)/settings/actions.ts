"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { contact as defaultContact, supportLink } from "@/data/site";

export type SettingsSaveState = {
  status: "idle" | "error" | "success";
  message?: string;
};

export interface ContactSettingsRecord {
  email: string | null;
  phone: string | null;
  address: string | null;
  map_url: string | null;
  support_url: string | null;
}

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

  // Snapshot current settings to contact_previous
  const { data: current } = await supabase
    .from("site_settings")
    .select("value")
    .eq("key", "contact")
    .single();

  if (current?.value) {
    await supabase.from("site_settings").upsert(
      {
        key: "contact_previous",
        value: current.value,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "key" },
    );
  }

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

  return { status: "success", message: "Contact & location settings saved successfully." };
}

export async function restorePreviousSettings(): Promise<{
  success: boolean;
  message: string;
  data?: ContactSettingsRecord;
}> {
  const { supabase } = await requireAdmin();

  const { data: prevSetting } = await supabase
    .from("site_settings")
    .select("value")
    .eq("key", "contact_previous")
    .single();

  if (!prevSetting?.value || typeof prevSetting.value !== "object") {
    return {
      success: false,
      message: "No previous saved version found in history snapshot.",
    };
  }

  const prevData = prevSetting.value as ContactSettingsRecord;

  const { error } = await supabase.from("site_settings").upsert(
    {
      key: "contact",
      value: prevData,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "key" },
  );

  if (error) {
    return { success: false, message: `Failed to restore: ${error.message}` };
  }

  revalidatePath("/admin/settings");
  revalidatePath("/contact");
  revalidatePath("/");

  return {
    success: true,
    message: "Restored previous saved version of settings.",
    data: prevData,
  };
}

export async function restoreOriginalSettings(): Promise<{
  success: boolean;
  message: string;
  data?: ContactSettingsRecord;
}> {
  const { supabase } = await requireAdmin();

  // Snapshot before reset
  const { data: current } = await supabase
    .from("site_settings")
    .select("value")
    .eq("key", "contact")
    .single();

  if (current?.value) {
    await supabase.from("site_settings").upsert(
      {
        key: "contact_previous",
        value: current.value,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "key" },
    );
  }

  const originalDefaults: ContactSettingsRecord = {
    email: defaultContact.email,
    phone: defaultContact.phone,
    address: defaultContact.address,
    map_url: defaultContact.mapUrl,
    support_url: supportLink.href,
  };

  const { error } = await supabase.from("site_settings").upsert(
    {
      key: "contact",
      value: originalDefaults,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "key" },
  );

  if (error) {
    return { success: false, message: `Failed to restore: ${error.message}` };
  }

  revalidatePath("/admin/settings");
  revalidatePath("/contact");
  revalidatePath("/");

  return {
    success: true,
    message: "Restored original factory default settings.",
    data: originalDefaults,
  };
}
