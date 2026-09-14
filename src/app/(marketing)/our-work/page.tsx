import type { Metadata } from "next";
import { programAreas } from "@/data/programs";
import { community } from "@/data/story";
import { PageHero } from "@/components/sections/page-hero";
import { MediaFrame } from "@/components/ui/media-frame";
import { ButtonLink } from "@/components/ui/button-link";
import { LineArt } from "@/components/illustrations/line-art";

export const metadata: Metadata = {
  title: "Our Work",
  description:
    "Education, empowerment, peacebuilding, natural farming, advocacy and sustainable development programs run from Inbavanam.",
  alternates: { canonical: "/our-work" },
};

export default function OurWorkPage() {
  return (
    <>
      <PageHero
        eyebrow="Our work"
        title="Work with the communities around Inbavanam"
        lede={community.body[0]}
      >
        <nav aria-label="Program areas">
          <ul className="flex flex-wrap gap-x-6 gap-y-3">
            {programAreas.map((area) => (
              <li key={area.slug}>
                <a
                  href={`#${area.slug}`}
                  className="min-h-11 content-center label underline-offset-8 hover:underline"
                >
                  {area.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </PageHero>

      <div className="pb-[var(--section-y)]">
        {programAreas.map((area, i) => (
          <section
            key={area.slug}
            id={area.slug}
            aria-labelledby={`${area.slug}-title`}
            className="container-page grid scroll-mt-24 gap-10 border-t border-rule py-16 lg:grid-cols-12"
          >
            <div className="flex flex-col gap-6 lg:col-span-5">
              <div className="flex items-center gap-5">
                <span className="label text-muted-foreground tabular">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <LineArt name={area.illustration} className="size-12 text-olive" />
              </div>
              <h2 id={`${area.slug}-title`} className="text-h2">
                {area.title}
              </h2>
              <p className="text-lede">{area.summary}</p>
              <div>
                <h3 className="label text-muted-foreground">Programs</h3>
                <ul className="mt-3 flex flex-col gap-2">
                  {area.programs.map((p) => (
                    <li key={p} className="flex items-center gap-3">
                      <span aria-hidden="true" className="size-1.5 rotate-45 bg-terracotta" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
              {area.slug === "natural-farming" ? <FarmingNotes /> : null}
              <div className="flex flex-wrap gap-6">
                <ButtonLink href="/community#volunteer" variant="outline">
                  Get involved
                </ButtonLink>
                <ButtonLink href={`/events?program=${area.slug}`} variant="text" arrow>
                  Related events
                </ButtonLink>
              </div>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <MediaFrame media={area.media} ratio="4 / 3" />
            </div>
          </section>
        ))}
      </div>
    </>
  );
}

function FarmingNotes() {
  return (
    <dl className="grid gap-4 border-t border-rule pt-5 text-sm">
      <div>
        <dt className="label text-muted-foreground">Current season</dt>
        <dd className="mt-1">Information to be confirmed</dd>
      </div>
      <div>
        <dt className="label text-muted-foreground">Bird list and plant album</dt>
        <dd className="mt-1">Being prepared</dd>
      </div>
    </dl>
  );
}
