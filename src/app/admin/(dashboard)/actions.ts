"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { requireStaff } from "@/lib/auth";
import { getAdminResource, resourceSchema } from "@/lib/admin/resources";

export type RecordFormState = {
  status: "idle" | "error";
  message?: string;
  fieldErrors?: Record<string, string[] | undefined>;
};

const PUBLIC_PATHS = ["/", "/stay", "/experiences", "/events", "/gallery", "/our-work", "/about"];
const revalidatePublic = () => PUBLIC_PATHS.forEach((p) => revalidatePath(p));
const uuid = z.uuid();

export async function saveRecord(
  resourceSlug: string,
  id: string | null,
  _prev: RecordFormState,
  formData: FormData,
): Promise<RecordFormState> {
  const { supabase } = await requireStaff();
  const resource = getAdminResource(resourceSlug);
  if (!resource || (id && !uuid.safeParse(id).success))
    return { status: "error", message: "Unknown record." };

  const parsed = resourceSchema(resource).safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return {
      status: "error",
      message: "Please correct the fields marked below.",
      fieldErrors: z.flattenError(parsed.error).fieldErrors,
    };
  }

  const query = id
    ? supabase.from(resource.table).update(parsed.data).eq("id", id)
    : supabase.from(resource.table).insert(parsed.data);
  const { error } = await query;
  if (error) {
    const duplicate = error.code === "23505";
    return {
      status: "error",
      message: duplicate
        ? "That URL slug is already in use. Choose another."
        : "The record could not be saved. Please try again.",
    };
  }

  revalidatePublic();
  redirect(`/admin/${resource.slug}`);
}

export async function setPublished(resourceSlug: string, id: string, formData: FormData) {
  const { supabase } = await requireStaff();
  const resource = getAdminResource(resourceSlug);
  if (!resource || !uuid.safeParse(id).success) return;
  await supabase
    .from(resource.table)
    .update({ published: formData.get("published") === "true" })
    .eq("id", id);
  revalidatePublic();
  revalidatePath(`/admin/${resource.slug}`);
}

export async function deleteRecord(resourceSlug: string, id: string, formData: FormData) {
  const { supabase } = await requireStaff();
  const resource = getAdminResource(resourceSlug);
  if (!resource || !uuid.safeParse(id).success || formData.get("confirm") !== "on") return;
  await supabase.from(resource.table).delete().eq("id", id);
  revalidatePublic();
  redirect(`/admin/${resource.slug}`);
}

const enquiryStatuses = ["new", "in_progress", "closed"] as const;

export async function setEnquiryStatus(id: string, formData: FormData) {
  const { supabase } = await requireStaff();
  const status = z.enum(enquiryStatuses).safeParse(formData.get("status"));
  if (!status.success || !uuid.safeParse(id).success) return;
  await supabase.from("enquiries").update({ status: status.data }).eq("id", id);
  revalidatePath("/admin/enquiries");
  revalidatePath("/admin");
}

export async function signOut() {
  const { supabase } = await requireStaff();
  await supabase.auth.signOut();
  redirect("/admin/login");
}
