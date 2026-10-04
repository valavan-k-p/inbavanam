"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { type GalleryCategory } from "@/types/content";

export type MediaUploadState = {
  status: "idle" | "error" | "success";
  message?: string;
  uploadedPath?: string;
};

const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif"];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export async function uploadMedia(
  _prev: MediaUploadState,
  formData: FormData,
): Promise<MediaUploadState> {
  const { supabase } = await requireAdmin();

  const file = formData.get("file") as File | null;
  const alt = formData.get("alt") as string | null;
  const caption = formData.get("caption") as string | null;
  const category = (formData.get("category") as string | null) ?? "Architecture";

  if (!file || file.size === 0) {
    return { status: "error", message: "Please select an image file to upload." };
  }

  if (!ALLOWED_MIME_TYPES.includes(file.type)) {
    return {
      status: "error",
      message: "Unsupported file type. Please upload a JPEG, PNG, WebP, or AVIF image.",
    };
  }

  if (file.size > MAX_FILE_SIZE) {
    return { status: "error", message: "File exceeds 10MB limit. Please compress the image." };
  }

  if (!alt || alt.trim().length === 0) {
    return { status: "error", message: "Alt text is required for accessibility." };
  }

  // Generate safe storage path
  const sanitizedName = file.name.toLowerCase().replace(/[^a-z0-9.-]/g, "-");
  const folder = category.toLowerCase().replace(/[^a-z0-9]/g, "-");
  const storagePath = `${folder}/${Date.now()}-${sanitizedName}`;

  // Upload to Supabase Storage
  const buffer = await file.arrayBuffer();
  const { error: uploadError } = await supabase.storage
    .from("media")
    .upload(storagePath, buffer, {
      contentType: file.type,
      upsert: true,
    });

  if (uploadError) {
    return {
      status: "error",
      message: `Failed to upload to storage: ${uploadError.message}`,
    };
  }

  // Insert into gallery_items table
  const { error: dbError } = await supabase.from("gallery_items").insert({
    kind: "image",
    storage_path: storagePath,
    alt: alt.trim(),
    caption: caption ? caption.trim() : null,
    category: category as GalleryCategory,
    span: "regular",
    published: true,
  });

  if (dbError) {
    console.warn("Inserted storage but gallery_items record failed:", dbError.message);
  }

  revalidatePath("/admin/media");
  revalidatePath("/gallery");
  revalidatePath("/");

  return {
    status: "success",
    message: "Image uploaded successfully.",
    uploadedPath: storagePath,
  };
}

export async function updateMediaMetadata(
  id: string,
  formData: FormData,
) {
  const { supabase } = await requireAdmin();
  const alt = formData.get("alt") as string;
  const caption = formData.get("caption") as string | null;

  if (!alt || alt.trim().length === 0) return;

  await supabase
    .from("gallery_items")
    .update({
      alt: alt.trim(),
      caption: caption ? caption.trim() : null,
    })
    .eq("id", id);

  revalidatePath("/admin/media");
  revalidatePath("/gallery");
}

export async function deleteMedia(id: string, storagePath: string) {
  const { supabase } = await requireAdmin();

  // Remove from gallery_items
  await supabase.from("gallery_items").delete().eq("id", id);

  // Remove from storage bucket if possible
  if (storagePath && !storagePath.startsWith("http") && !storagePath.startsWith("/")) {
    await supabase.storage.from("media").remove([storagePath]);
  }

  revalidatePath("/admin/media");
  revalidatePath("/gallery");
}
