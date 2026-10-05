"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { Check, Image as ImageIcon, Search, UploadCloud, X } from "lucide-react";
import {
  getAvailableMediaItems,
  uploadMediaDirect,
  type MediaPickerItem,
} from "@/app/admin/(dashboard)/media/actions";

export interface ImageInputProps {
  name: string;
  label?: string;
  description?: string;
  hint?: string;
  locationInfo?: string;
  initialValue?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export function ImageInput({
  name,
  label = "Photograph",
  description,
  hint,
  locationInfo,
  initialValue = "",
  value: propValue,
  onChange,
}: ImageInputProps) {
  const [internalValue, setInternalValue] = useState(propValue ?? initialValue);
  const value = propValue !== undefined ? propValue : internalValue;
  const helperText = hint ?? description;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"library" | "upload">("library");
  const [libraryItems, setLibraryItems] = useState<MediaPickerItem[]>([]);
  const [isLoadingLibrary, setIsLoadingLibrary] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [uploadPending, startUploadTransition] = useTransition();
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [showManualInput, setShowManualInput] = useState(false);

  const setValue = (val: string) => {
    if (propValue === undefined) {
      setInternalValue(val);
    }
    onChange?.(val);
  };

  const handleSelect = (src: string) => {
    setValue(src);
    setIsModalOpen(false);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
    if (libraryItems.length === 0) {
      setIsLoadingLibrary(true);
      getAvailableMediaItems()
        .then((items) => setLibraryItems(items))
        .catch((err) => console.error("Failed to load media items:", err))
        .finally(() => setIsLoadingLibrary(false));
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadError(null);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("alt", `${label} replacement image`);
    formData.append("category", "General");

    startUploadTransition(async () => {
      const res = await uploadMediaDirect(formData);
      if (res.success && res.url) {
        handleSelect(res.url);
      } else {
        setUploadError(res.message || "Failed to upload image.");
      }
    });
  };

  const categories = ["All", ...Array.from(new Set(libraryItems.map((i) => i.category)))];

  const filteredItems = libraryItems.filter((item) => {
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch =
      searchQuery === "" ||
      item.alt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.src.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col gap-2 rounded-lg border border-rule/80 bg-background/50 p-4">
      {/* Hidden input for form submission */}
      <input type="hidden" name={name} value={value} />

      <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between">
        <label className="text-xs font-semibold label text-foreground">{label}</label>
        {locationInfo && (
          <span className="text-[0.68rem] text-muted-foreground italic">
            Used in: {locationInfo}
          </span>
        )}
      </div>

      {helperText && <p className="text-[0.75rem] text-muted-foreground">{helperText}</p>}

      {/* Visual Image Preview & Control Box */}
      <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-center">
        {/* Thumbnail Preview */}
        <div className="relative aspect-video w-full max-w-[200px] shrink-0 overflow-hidden rounded-md border border-rule bg-card/60 shadow-xs">
          {value ? (
            <Image
              src={value}
              alt={label}
              fill
              unoptimized
              sizes="200px"
              className="object-cover"
            />
          ) : (
            <div className="flex size-full flex-col items-center justify-center gap-1.5 p-3 text-muted-foreground">
              <ImageIcon className="size-6 text-muted-foreground/60" />
              <span className="text-[0.68rem] text-center">No image selected</span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-1 flex-col gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleOpenModal}
              className="inline-flex min-h-9 cursor-pointer items-center gap-1.5 rounded-[var(--radius)] bg-primary px-3.5 py-1.5 label text-xs text-primary-foreground shadow-xs transition-opacity hover:opacity-90"
            >
              <UploadCloud className="size-3.5" />
              <span>Replace Image</span>
            </button>

            {value && (
              <button
                type="button"
                onClick={() => {
                  setValue("");
                  onChange?.("");
                }}
                className="inline-flex min-h-9 cursor-pointer items-center gap-1 rounded-[var(--radius)] border border-rule bg-card px-3 py-1.5 label text-xs text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
              >
                <X className="size-3.5" />
                <span>Remove</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => setShowManualInput(!showManualInput)}
              className="inline-flex min-h-9 cursor-pointer items-center rounded-[var(--radius)] px-2 py-1.5 text-[0.7rem] text-muted-foreground underline-offset-4 hover:underline"
            >
              {showManualInput ? "Hide manual URL" : "Edit path manually"}
            </button>
          </div>

          <p className="truncate font-mono text-[0.7rem] text-muted-foreground/80">
            {value ? `Current: ${value}` : "No image selected. Default fallback will be used."}
          </p>

          {showManualInput && (
            <input
              type="text"
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                onChange?.(e.target.value);
              }}
              placeholder="e.g. /images/hero image.png or https://..."
              className="mt-1 min-h-9 w-full rounded border border-input bg-card px-3 text-xs text-ink transition-colors hover:border-foreground focus:outline-hidden"
            />
          )}
        </div>
      </div>

      {/* Media Selection Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="flex max-h-[88vh] w-full max-w-3xl flex-col rounded-xl border border-rule bg-card p-6 shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-rule pb-4">
              <div>
                <h3 className="font-semibold text-lg text-foreground">Select {label}</h3>
                <p className="text-xs text-muted-foreground">
                  Pick an existing image from the media library or upload a new one.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="rounded p-1.5 text-muted-foreground hover:bg-background hover:text-foreground"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Tabs */}
            <div className="mt-4 flex gap-2 border-b border-rule pb-3">
              <button
                type="button"
                onClick={() => setActiveTab("library")}
                className={`cursor-pointer rounded px-3 py-1.5 text-xs font-semibold label transition-colors ${
                  activeTab === "library"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-background"
                }`}
              >
                Media Library ({libraryItems.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("upload")}
                className={`cursor-pointer rounded px-3 py-1.5 text-xs font-semibold label transition-colors ${
                  activeTab === "upload"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-background"
                }`}
              >
                Upload New Image
              </button>
            </div>

            {/* Tab 1: Library */}
            {activeTab === "library" && (
              <div className="flex flex-1 flex-col gap-4 overflow-hidden pt-4">
                {/* Search & Category Filter */}
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div className="relative flex-1">
                    <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Search images by name or category..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="min-h-9 w-full rounded border border-input bg-background/50 pr-3 pl-9 text-xs text-foreground focus:outline-hidden"
                    />
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setSelectedCategory(cat)}
                        className={`rounded px-2.5 py-1 text-[0.7rem] font-medium transition-colors ${
                          selectedCategory === cat
                            ? "bg-foreground text-background"
                            : "bg-background text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Grid */}
                <div className="flex-1 overflow-y-auto pr-1">
                  {isLoadingLibrary ? (
                    <div className="flex min-h-[220px] items-center justify-center text-xs text-muted-foreground">
                      Loading available photography...
                    </div>
                  ) : filteredItems.length === 0 ? (
                    <div className="flex min-h-[220px] flex-col items-center justify-center gap-2 text-xs text-muted-foreground">
                      <ImageIcon className="size-8 text-muted-foreground/40" />
                      <span>No images match your search.</span>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                      {filteredItems.map((item) => {
                        const isSelected = value === item.src;
                        return (
                          <button
                            key={item.src}
                            type="button"
                            onClick={() => handleSelect(item.src)}
                            className={`group relative flex flex-col overflow-hidden rounded-md border text-left transition-all ${
                              isSelected
                                ? "border-primary ring-2 ring-primary ring-offset-1"
                                : "border-rule hover:border-foreground"
                            }`}
                          >
                            <div className="relative aspect-4/3 w-full bg-background">
                              <Image
                                src={item.src}
                                alt={item.alt}
                                fill
                                unoptimized
                                sizes="180px"
                                className="object-cover transition-transform group-hover:scale-105"
                              />
                              {isSelected && (
                                <div className="absolute top-1 right-1 flex size-5 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xs">
                                  <Check className="size-3 stroke-[3]" />
                                </div>
                              )}
                            </div>
                            <div className="p-2">
                              <p className="truncate text-[0.7rem] font-medium text-foreground">
                                {item.alt}
                              </p>
                              <span className="text-[0.62rem] text-muted-foreground">
                                {item.category}
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Tab 2: Upload */}
            {activeTab === "upload" && (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 py-12">
                <div className="flex max-w-sm flex-col items-center justify-center rounded-xl border-2 border-dashed border-rule p-8 text-center">
                  <UploadCloud className="size-10 text-muted-foreground" />
                  <h4 className="mt-3 font-semibold text-sm text-foreground">
                    Upload image to Supabase
                  </h4>
                  <p className="mt-1 text-xs text-muted-foreground">
                    JPEG, PNG, WebP or AVIF (up to 10MB). Image is automatically optimized and stored
                    in the Supabase media bucket.
                  </p>

                  <label className="mt-5 inline-flex min-h-10 cursor-pointer items-center justify-center rounded-[var(--radius)] bg-primary px-5 py-2 label text-xs text-primary-foreground shadow-xs transition-opacity hover:opacity-90">
                    <span>{uploadPending ? "Uploading..." : "Select File from Computer"}</span>
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp,image/avif"
                      disabled={uploadPending}
                      onChange={handleFileUpload}
                      className="sr-only"
                    />
                  </label>

                  {uploadError && (
                    <p className="mt-3 text-xs text-destructive">{uploadError}</p>
                  )}
                </div>
              </div>
            )}

            {/* Footer */}
            <div className="mt-4 flex items-center justify-end border-t border-rule pt-3">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="cursor-pointer rounded px-4 py-2 label text-xs text-muted-foreground hover:text-foreground"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
