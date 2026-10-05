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

export type MediaPickerItem = {
  src: string;
  alt: string;
  caption?: string;
  category: string;
};

export async function getAvailableMediaItems(): Promise<MediaPickerItem[]> {
  const { supabase } = await requireAdmin();
  const list: MediaPickerItem[] = [];

  // 1. Fetch from Supabase gallery_items
  try {
    const { data: dbItems } = await supabase
      .from("gallery_items")
      .select("storage_path, alt, caption, category")
      .order("created_at", { ascending: false });

    if (dbItems) {
      for (const item of dbItems) {
        if (!item.storage_path) continue;
        const publicUrl = item.storage_path.startsWith("http") || item.storage_path.startsWith("/")
          ? item.storage_path
          : `${process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/+$/, "")}/storage/v1/object/public/media/${item.storage_path}`;

        list.push({
          src: publicUrl,
          alt: item.alt || "Inbavanam image",
          caption: item.caption || undefined,
          category: item.category || "General",
        });
      }
    }
  } catch (e) {
    console.warn("Could not query gallery_items:", e);
  }

  // 2. Add local curated website photography so admin can easily pick existing photos
  const localPresets: MediaPickerItem[] = [
    { src: "/images/hero image.png", alt: "Inbavanam Hero Artwork", category: "Hero" },
    { src: "/hero section/hero-1-cottage-and-fields.webp", alt: "Cottage and Fields", category: "Hero" },
    { src: "/hero section/hero-2-western-ghats.webp", alt: "Western Ghats Mist", category: "Hero" },
    { src: "/hero section/hero-3-brick-elevation.webp", alt: "Brick Elevation", category: "Hero" },
    { src: "/hero section/hero-4-round-pavilion.webp", alt: "Round Pavilion", category: "Hero" },
    { src: "/hero section/hero-5-complex-and-wall.webp", alt: "Complex and Wall", category: "Hero" },
    { src: "/about us image/about-collage.webp", alt: "About Inbavanam Circular Collage", category: "About" },
    { src: "/inbavanam cover/farm.png", alt: "Farmland at Inbavanam with cattle grazing", category: "The Land" },
    { src: "/inbavanam cover/pets.jpg", alt: "Inbavanam sanctuary life and architecture", category: "Stay" },
    { src: "/inbavanam cover/side inbavanam.png", alt: "Inbavanam side landscape and courtyard", category: "Community" },
    { src: "/inbavanam cover/top view inbavanam.png", alt: "Aerial view of Inbavanam", category: "Find Us" },
    { src: "/gallery image/WhatsApp Image 2026-09-14 at 4.01.18 PM (13).jpeg", alt: "Brick and stone main building", category: "Architecture" },
    { src: "/gallery image/WhatsApp Image 2026-09-14 at 4.01.18 PM (21).jpeg", alt: "Guest room with Athangudi tiles", category: "Stay" },
    { src: "/gallery image/WhatsApp Image 2026-09-14 at 4.01.17 PM (7).jpeg", alt: "Gladston Xavier portrait", category: "Founders" },
    { src: "/gallery image/WhatsApp Image 2026-09-14 at 4.01.17 PM (6).jpeg", alt: "Florina Xavier portrait", category: "Founders" },
    { src: "/gallery image/WhatsApp Image 2026-09-14 at 4.01.17 PM (4).jpeg", alt: "Gladston and Florina Xavier outdoors", category: "Founders" },
    { src: "/community/courtyard-session.webp", alt: "Children session in courtyard", category: "Community" },
    { src: "/community/craft-display.webp", alt: "Children holding paper flowers", category: "Community" },
    { src: "/community/drawing-workshop.webp", alt: "Learning session in hall", category: "Programmes" },
    { src: "/community/community-group-portrait.webp", alt: "Children and adults group portrait", category: "Community" },
  ];

  for (const preset of localPresets) {
    if (!list.some((i) => i.src === preset.src)) {
      list.push(preset);
    }
  }

  return list;
}

export async function uploadMediaDirect(
  formData: FormData,
): Promise<{ success: boolean; url?: string; message?: string }> {
  const result = await uploadMedia({ status: "idle" }, formData);
  if (result.status === "success" && result.uploadedPath) {
    const publicUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/+$/, "")}/storage/v1/object/public/media/${result.uploadedPath}`;
    return { success: true, url: publicUrl, message: result.message };
  }
  return { success: false, message: result.message ?? "Upload failed." };
}

