import type { Metadata } from "next";
import { experiences } from "@/data/experiences";
import { experiencesIntro } from "@/data/story";
import { PageHero } from "@/components/sections/page-hero";
import { PlanStayBand } from "@/components/sections/bands";
import { MediaFrame } from "@/components/ui/media-frame";
import { ButtonLink } from "@/components/ui/button-link";
import { PhotoCard } from "@/components/ui/photo-card";
import { PillLinks } from "@/components/ui/pill-links";
import { Reveal } from "@/components/ui/reveal";
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
      <PageHero eyebrow="Experiences" title={experiencesIntro.heading} lede={experiencesIntro.body}>
        <PillLinks
          label="Jump to an experience"
          links={experiences.map((e) => ({ href: `#${e.slug}`, label: e.title }))}
        />
      </PageHero>

      <section aria-label="All experiences" className="container-page pb-[var(--section-y)]">
        <ul className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {experiences.map((item, i) => (
            <Reveal as="li" key={item.slug} delay={(i % 3) * 0.1}>
              <PhotoCard
                media={item.media}
                title={item.title}
                subtitle={item.summary}
                href={`#${item.slug}`}
              />
            </Reveal>
          ))}
        </ul>
      </section>

      <div className="surface-card pb-[var(--section-y)]">
        {experiences.map((item, i) => (
          <section
            key={item.slug}
            id={item.slug}
            aria-labelledby={`${item.slug}-title`}
            className="container-page grid scroll-mt-24 items-center gap-10 border-t border-rule py-16 lg:grid-cols-12"
          >
            <Reveal
              variant="clip"
              className={cn("lg:col-span-6", i % 2 === 1 && "lg:order-2 lg:col-start-7")}
            >
              <MediaFrame
                media={item.media}
                ratio="3 / 2"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </Reveal>
            <div
              className={cn(
                "flex flex-col gap-6 lg:col-span-5",
                i % 2 === 0 ? "lg:col-start-8" : "lg:col-start-1 lg:row-start-1",
              )}
            >
              <Reveal variant="scale">
                <LineArt name={item.illustration} className="size-16 text-olive" />
              </Reveal>
              <h2 id={`${item.slug}-title`} className="text-h2" data-reveal="up">
                {item.title}
              </h2>
              <Reveal delay={0.1} className="flex flex-col gap-6">
                <p className="text-lede text-muted-foreground">{item.summary}</p>
                <p className="text-sm text-muted-foreground">
                  Packages, capacity and pricing: information to be confirmed.
                </p>
                <ButtonLink
                  href={`/contact?type=event&experience=${item.slug}`}
                  variant="outline"
                  arrow
                  className="self-start"
                >
                  Enquire
                </ButtonLink>
              </Reveal>
            </div>
          </section>
        ))}
      </div>

      <PlanStayBand />
    </>
  );
}
