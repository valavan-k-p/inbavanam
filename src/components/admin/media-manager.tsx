"use client";

import { useActionState, useState } from "react";
import Image from "next/image";
import {
  Check,
  Copy,
  Image as ImageIcon,
  Plus,
  Trash2,
  UploadCloud,
  X,
} from "lucide-react";
import {
  deleteMedia,
  uploadMedia,
  type MediaUploadState,
} from "@/app/admin/(dashboard)/media/actions";

export interface MediaItemDisplay {
  id: string;
  storage_path: string;
  public_url: string;
  alt: string;
  caption?: string | null;
  category: string;
  kind?: string;
  created_at?: string;
  is_local?: boolean;
}

interface MediaManagerProps {
  items: MediaItemDisplay[];
}

const categories = [
  "All",
  "Architecture",
  "Nature",
  "Stay",
  "People",
  "Community",
  "Farming",
  "Experiences",
] as const;

export function MediaManager({ items }: MediaManagerProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [showUpload, setShowUpload] = useState<boolean>(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [state, formAction, pending] = useActionState<MediaUploadState, FormData>(
    uploadMedia,
    { status: "idle" },
  );

  const filteredItems = items.filter((item) => {
    if (selectedCategory === "All") return true;
    return item.category.toLowerCase() === selectedCategory.toLowerCase();
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Upload Toggle & Category Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-rule pb-4">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
                selectedCategory === cat
                  ? "bg-primary text-primary-foreground"
                  : "border border-rule bg-card text-muted-foreground hover:border-foreground hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Upload Trigger Button */}
        <button
          type="button"
          onClick={() => setShowUpload(!showUpload)}
          className="inline-flex min-h-10 items-center gap-2 rounded-[var(--radius)] bg-primary px-4 py-2 text-xs label text-primary-foreground shadow-xs transition-colors hover:bg-primary/90"
        >
          {showUpload ? <X className="size-4" /> : <Plus className="size-4" />}
          <span>{showUpload ? "Close Uploader" : "Upload New Image"}</span>
        </button>
      </div>

      {/* Upload Panel */}
      {showUpload && (
        <div className="rounded-[var(--radius)] border border-rule bg-card p-6 shadow-xs">
          <div className="mb-4">
            <h2 className="text-h3">Upload to Supabase Storage</h2>
            <p className="text-xs text-muted-foreground">
              Images are stored in the public &apos;media&apos; bucket and made available for events,
              programmes, and site content.
            </p>
          </div>

          <form action={formAction} className="flex flex-col gap-5">
            {state.status === "error" && state.message && (
              <div role="alert" className="rounded-[var(--radius)] border-l-4 border-destructive bg-background p-4 text-xs font-medium text-destructive">
                {state.message}
              </div>
            )}
            {state.status === "success" && state.message && (
              <div role="alert" className="rounded-[var(--radius)] border-l-4 border-olive bg-background p-4 text-xs font-medium text-olive">
                {state.message} Path: <code className="font-mono">{state.uploadedPath}</code>
              </div>
            )}

            <div className="grid gap-6 md:grid-cols-2">
              {/* File Drop Area */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold label text-foreground">
                  Select Image File (Max 10MB) <span className="text-terracotta">*</span>
                </label>
                <div className="relative flex min-h-44 flex-col items-center justify-center rounded-[var(--radius)] border-2 border-dashed border-rule bg-cream/30 p-6 text-center transition-colors hover:border-foreground">
                  {previewUrl ? (
                    <div className="relative flex flex-col items-center gap-2">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="max-h-32 max-w-full rounded object-contain shadow-xs"
                      />
                      <span className="text-xs text-muted-foreground">Click below to change</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                      <UploadCloud className="size-8 text-muted-foreground" />
                      <span className="text-xs font-medium">JPEG, PNG, WebP, or AVIF</span>
                    </div>
                  )}
                  <input
                    type="file"
                    name="file"
                    accept="image/jpeg,image/png,image/webp,image/avif"
                    required
                    onChange={handleFileChange}
                    className="absolute inset-0 cursor-pointer opacity-0"
                  />
                </div>
              </div>

              {/* Metadata Fields */}
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="category" className="text-xs font-semibold label text-foreground">
                    Category <span className="text-terracotta">*</span>
                  </label>
                  <select
                    id="category"
                    name="category"
                    defaultValue="Architecture"
                    className="min-h-11 rounded-[var(--radius)] border border-input bg-background px-3 py-2 text-sm"
                  >
                    {categories.filter((c) => c !== "All").map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="alt" className="text-xs font-semibold label text-foreground">
                    Alt Text (Description) <span className="text-terracotta">*</span>
                  </label>
                  <input
                    id="alt"
                    name="alt"
                    type="text"
                    required
                    placeholder="Describe what the photograph shows..."
                    className="min-h-11 rounded-[var(--radius)] border border-input bg-background px-3 py-2 text-sm"
                  />
                  <p className="text-[0.7rem] text-muted-foreground">
                    Important for screen readers and search engines.
                  </p>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="caption" className="text-xs font-semibold label text-foreground">
                    Caption (Optional)
                  </label>
                  <input
                    id="caption"
                    name="caption"
                    type="text"
                    placeholder="What, where, or when..."
                    className="min-h-11 rounded-[var(--radius)] border border-input bg-background px-3 py-2 text-sm"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 border-t border-rule pt-4">
              <button
                type="submit"
                disabled={pending}
                className="inline-flex min-h-11 cursor-pointer items-center justify-center rounded-[var(--radius)] bg-primary px-6 label text-primary-foreground transition-opacity disabled:opacity-60"
              >
                {pending ? "Uploading to Storage..." : "Upload Image"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Media Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="group flex flex-col justify-between overflow-hidden rounded-[var(--radius)] border border-rule bg-card shadow-xs transition-shadow hover:shadow-md"
          >
            {/* Image Preview Container with fixed aspect ratio */}
            <div className="relative aspect-4/3 w-full overflow-hidden bg-background">
              <Image
                src={item.public_url}
                alt={item.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                unoptimized={item.is_local}
              />
              <span className="absolute top-2 left-2 rounded bg-maroon-deep/80 px-2 py-0.5 text-[0.65rem] font-bold text-ivory backdrop-blur-xs">
                {item.category}
              </span>
            </div>

            {/* Info and Actions */}
            <div className="flex flex-1 flex-col justify-between p-4">
              <div className="flex flex-col gap-1">
                <p className="line-clamp-2 text-xs font-semibold text-foreground" title={item.alt}>
                  {item.alt}
                </p>
                {item.caption && (
                  <p className="line-clamp-1 text-[0.7rem] text-muted-foreground italic">
                    {item.caption}
                  </p>
                )}
                <p className="mt-1 font-mono text-[0.68rem] text-muted-foreground truncate" title={item.storage_path}>
                  {item.storage_path}
                </p>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-rule pt-3 text-xs">
                <button
                  type="button"
                  onClick={() => copyToClipboard(item.storage_path, item.id)}
                  className="inline-flex items-center gap-1.5 font-semibold label text-foreground hover:text-terracotta"
                >
                  {copiedId === item.id ? (
                    <>
                      <Check className="size-3.5 text-olive" />
                      <span className="text-olive">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="size-3.5" />
                      <span>Copy Path</span>
                    </>
                  )}
                </button>

                {!item.is_local && (
                  <form
                    action={() => {
                      if (window.confirm("Are you sure you want to delete this media item?")) {
                        deleteMedia(item.id, item.storage_path);
                      }
                    }}
                  >
                    <button
                      type="submit"
                      aria-label="Delete image"
                      className="text-muted-foreground transition-colors hover:text-destructive"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-3 rounded-[var(--radius)] border border-dashed border-rule p-12 text-center">
          <ImageIcon className="size-8 text-muted-foreground" />
          <p className="font-display text-lg">No media found in {selectedCategory}.</p>
          <button
            type="button"
            onClick={() => setShowUpload(true)}
            className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold label text-terracotta hover:underline"
          >
            <Plus className="size-3.5" />
            Upload an image
          </button>
        </div>
      )}
    </div>
  );
}
