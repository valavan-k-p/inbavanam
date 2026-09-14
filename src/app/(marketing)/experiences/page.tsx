import type { Metadata } from "next";
import { experiences } from "@/data/experiences";
import { PageHero } from "@/components/sections/page-hero";
import { MediaFrame } from "@/components/ui/media-frame";
import { ButtonLink } from "@/components/ui/button-link";
import { LineArt } from "@/components/illustrations/line-art";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Experiences",
  description: "Retreats, group stays, camps, celebrations and corporate gatherings at Inbavanam.",
  alternates: { canonical: "/experiences" },
};

export default function ExperiencesPage() {
  return (
    <>
      <PageHero
        eyebrow="Experiences"
        title="Ways to use the space"
        lede="Inbavanam hosts people who come to rest, to learn and to gather. Each visit is arranged directly with the founders."
      />

      <div className="pb-[var(--section-y)]">
        {experiences.map((item, i) => (
          <section
            key={item.slug}
            id={item.slug}
            aria-labelledby={`${item.slug}-title`}
            className="container-page grid scroll-mt-24 items-center gap-10 border-t border-rule py-16 lg:grid-cols-12"
          >
            <div className={cn("lg:col-span-6", i % 2 === 1 && "lg:order-2 lg:col-start-7")}>
              <MediaFrame
                media={item.media}
                ratio="3 / 2"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>
            <div
              className={cn(
                "flex flex-col gap-6 lg:col-span-5",
                i % 2 === 0 ? "lg:col-start-8" : "lg:col-start-1 lg:row-start-1",
              )}
            >
              <LineArt name={item.illustration} className="size-16 text-olive" />
              <h2 id={`${item.slug}-title`} className="text-h2">
                {item.title}
              </h2>
              <p className="text-lede text-muted-foreground">{item.summary}</p>
              <p className="text-sm text-muted-foreground">
                Packages, capacity and pricing: information to be confirmed.
              </p>
              <ButtonLink
                href={`/contact?type=event&experience=${item.slug}`}
                variant="outline"
                className="self-start"
              >
                Enquire
              </ButtonLink>
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
