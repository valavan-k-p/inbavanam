import { requireAdmin } from "@/lib/auth";
import { mediaUrl } from "@/lib/db/content";
import { galleryItems as localGallery } from "@/data/collections";
import { MediaManager, type MediaItemDisplay } from "@/components/admin/media-manager";

export const metadata = { title: "Images & Media" };

export default async function AdminMediaPage() {
  const { supabase } = await requireAdmin();

  const { data: dbItems, error } = await supabase
    .from("gallery_items")
    .select("id, storage_path, poster_path, alt, caption, category, kind, created_at")
    .order("created_at", { ascending: false });

  const items: MediaItemDisplay[] = [];

  // Add items from Supabase
  if (dbItems && dbItems.length > 0) {
    for (const item of dbItems) {
      items.push({
        id: String(item.id),
        storage_path: String(item.storage_path),
        public_url: mediaUrl(String(item.storage_path)) ?? String(item.storage_path),
        alt: String(item.alt),
        caption: item.caption ? String(item.caption) : null,
        category: String(item.category),
        kind: String(item.kind),
        created_at: String(item.created_at),
        is_local: false,
      });
    }
  }

  // Supplement with local gallery items if not already uploaded
  for (const local of localGallery) {
    if (local.src && !items.some((i) => i.public_url === local.src)) {
      items.push({
        id: `local-${local.id}`,
        storage_path: local.src,
        public_url: local.src,
        alt: local.alt,
        caption: local.caption ?? null,
        category: local.category,
        kind: local.kind,
        is_local: true,
      });
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <span className="label text-muted-foreground">Asset Management</span>
        <h1 className="text-h2">Images & Media</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Upload photographs to Supabase Storage, manage descriptions, and grab media paths to use in
          events, programmes, and website sections.
        </p>
      </div>

      {error && (
        <div role="alert" className="rounded-[var(--radius)] border-l-4 border-destructive bg-card p-4 text-sm text-destructive">
          Could not load gallery from database: {error.message}. Showing local photography library.
        </div>
      )}

      <MediaManager items={items} />
    </div>
  );
}
