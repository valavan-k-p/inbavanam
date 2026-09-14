import type { Metadata } from "next";
import { programAreas } from "@/data/programs";
import { workIntro } from "@/data/story";
import { PageHero } from "@/components/sections/page-hero";
import { ProgramGrid } from "@/components/sections/program-grid";
import { CommunityBand } from "@/components/sections/bands";
import { MediaFrame } from "@/components/ui/media-frame";
import { ButtonLink } from "@/components/ui/button-link";
import { PillLinks } from "@/components/ui/pill-links";
import { Reveal } from "@/components/ui/reveal";
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
      <PageHero eyebrow="Our work" title={workIntro.heading} lede={workIntro.body} />

      <section aria-label="Programs" className="container-page pb-[var(--section-y)]">
        <ProgramGrid />
      </section>

      <CommunityBand />

      <section aria-labelledby="areas-title" className="section-y">
        <div className="container-page flex flex-col gap-8">
          <h2 id="areas-title" className="text-h2" data-reveal="up">
            Program areas
          </h2>
          <Reveal delay={0.1}>
            <PillLinks
              label="Program areas"
              links={programAreas.map((a) => ({ href: `#${a.slug}`, label: a.title }))}
            />
          </Reveal>
        </div>

        {programAreas.map((area, i) => (
          <section
            key={area.slug}
            id={area.slug}
            aria-labelledby={`${area.slug}-title`}
            className="container-page mt-16 grid scroll-mt-24 gap-10 border-t border-rule pt-16 lg:grid-cols-12"
          >
            <div className="flex flex-col gap-6 lg:col-span-5">
              <Reveal variant="left" className="flex items-center gap-5">
                <span className="label text-muted-foreground tabular">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <LineArt name={area.illustration} className="size-12 text-olive" />
              </Reveal>
              <h3 id={`${area.slug}-title`} className="text-h2" data-reveal="up">
                {area.title}
              </h3>
              <Reveal delay={0.1} className="flex flex-col gap-6">
                <p className="text-lede">{area.summary}</p>
                <div>
                  <h4 className="label text-muted-foreground">Programs</h4>
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
                  <ButtonLink href="/community#volunteer" variant="olive" arrow>
                    Get involved
                  </ButtonLink>
                  <ButtonLink href={`/events?program=${area.slug}`} variant="text" arrow>
                    Related events
                  </ButtonLink>
                </div>
              </Reveal>
            </div>
            <Reveal variant="clip" className="lg:col-span-6 lg:col-start-7">
              <MediaFrame media={area.media} ratio="4 / 3" />
            </Reveal>
          </section>
        ))}
      </section>
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
