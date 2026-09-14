import type { Accommodation } from "@/types/content";
import { MediaFrame } from "@/components/ui/media-frame";
import { ButtonLink } from "@/components/ui/button-link";

export function AccommodationCard({
  item,
  preview = false,
}: {
  item: Accommodation;
  preview?: boolean;
}) {
  const [cover] = item.images;
  return (
    <article className="grid gap-8 border-t border-rule pt-8 md:grid-cols-12">
      <div className="md:col-span-6">
        {cover ? (
          <MediaFrame media={cover} ratio="3 / 2" sizes="(min-width: 768px) 50vw, 100vw" />
        ) : null}
      </div>
      <div className="flex flex-col gap-5 md:col-span-5 md:col-start-8">
        {preview ? (
          <p className="self-start border border-current px-2 py-1 label text-terracotta">
            Layout preview (development only)
          </p>
        ) : null}
        <h2 className="text-h2">{item.name}</h2>
        <p className="text-muted-foreground">{item.summary}</p>
        <dl className="grid grid-cols-2 gap-6">
          <div className="border-t border-rule pt-3">
            <dt className="label text-muted-foreground">Capacity</dt>
            <dd className="mt-2">{item.capacity}</dd>
          </div>
          <div className="border-t border-rule pt-3">
            <dt className="label text-muted-foreground">Amenities</dt>
            <dd className="mt-2">{item.amenities.join(", ")}</dd>
          </div>
        </dl>
        <ButtonLink href={`/contact?type=stay&space=${item.slug}`} className="self-start">
          Enquire
        </ButtonLink>
      </div>
    </article>
  );
}
