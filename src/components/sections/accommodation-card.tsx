import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Accommodation } from "@/types/content";
import { MediaFrame } from "@/components/ui/media-frame";

export function AccommodationCard({
  item,
  preview = false,
}: {
  item: Accommodation;
  preview?: boolean;
}) {
  const [cover] = item.images;
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[var(--radius)] border border-rule bg-card transition-[transform,box-shadow] duration-500 ease-[var(--ease-out-soft)] hover:-translate-y-1 hover:shadow-[0_28px_50px_-30px_rgb(43_21_21/0.5)]">
      {cover ? (
        <MediaFrame
          media={cover}
          ratio="4 / 3"
          showCaption={false}
          sizes="(min-width: 1024px) 33vw, 100vw"
        />
      ) : null}
      <div className="flex flex-1 flex-col gap-4 p-6">
        {preview ? (
          <p className="self-start rounded-full border border-current px-3 py-1 label text-[0.6rem] text-terracotta">
            Layout preview (development only)
          </p>
        ) : null}
        <h3 className="text-h3">{item.name}</h3>
        <p className="text-sm text-muted-foreground">{item.summary}</p>
        <dl className="grid grid-cols-2 gap-4 border-t border-rule pt-4 text-sm">
          <div>
            <dt className="label text-[0.62rem] text-muted-foreground">Capacity</dt>
            <dd className="mt-1">{item.capacity}</dd>
          </div>
          <div>
            <dt className="label text-[0.62rem] text-muted-foreground">Amenities</dt>
            <dd className="mt-1">{item.amenities.join(", ")}</dd>
          </div>
        </dl>
        <Link
          href={`/contact?type=stay&space=${item.slug}`}
          className="mt-auto inline-flex min-h-11 items-center gap-2 self-start label"
        >
          <span className="link-underline pb-0.5">Enquire</span>
          <ArrowRight
            aria-hidden="true"
            className="size-4 transition-transform duration-300 group-hover:translate-x-1"
            strokeWidth={1.5}
          />
          <span className="sr-only"> about {item.name}</span>
        </Link>
      </div>
    </article>
  );
}
