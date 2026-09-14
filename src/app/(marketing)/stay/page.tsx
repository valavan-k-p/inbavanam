import type { Metadata } from "next";
import { accommodationTemplate } from "@/data/collections";
import { getAccommodations } from "@/lib/db/content";
import { architecture, stayIntro } from "@/data/story";
import { enquireLink } from "@/data/site";
import { ImageHero } from "@/components/sections/image-hero";
import { AccommodationCard } from "@/components/sections/accommodation-card";
import { PlanStayBand } from "@/components/sections/bands";
import { SectionHeading } from "@/components/ui/section-heading";
import { ButtonLink } from "@/components/ui/button-link";
import { Reveal } from "@/components/ui/reveal";
import { LineArt } from "@/components/illustrations/line-art";

export const metadata: Metadata = {
  title: "Stay",
  description: "Accommodation and spaces at Inbavanam, near Karamadai in the Coimbatore region.",
  alternates: { canonical: "/stay" },
};

const showPreview = process.env.NODE_ENV === "development";

export const revalidate = 300;

export default async function StayPage() {
  const published = (await getAccommodations()).filter((a) => a.published);

  return (
    <>
      <ImageHero
        eyebrow="Stay"
        title={stayIntro.heading}
        lede={stayIntro.body}
        media={stayIntro.media}
      >
        <ButtonLink href={enquireLink.href} variant="khaki" arrow>
          {enquireLink.label}
        </ButtonLink>
      </ImageHero>

      <section aria-labelledby="rooms-title" className="section-y">
        <div className="container-page">
          <SectionHeading id="rooms-title" eyebrow="Rooms and spaces" title="Where you will stay" />
          {published.length ? (
            <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {published.map((item, i) => (
                <Reveal as="li" key={item.slug} delay={(i % 3) * 0.1}>
                  <AccommodationCard item={item} />
                </Reveal>
              ))}
            </ul>
          ) : (
            <div className="mt-14 flex flex-col gap-12">
              <Reveal className="flex flex-col gap-5 border-t border-rule pt-10 sm:flex-row sm:items-center sm:gap-10">
                <LineArt name="stone" className="size-20 shrink-0 text-walnut" />
                <p className="prose-measure text-lede">
                  Details of each room, including capacity and amenities, are being prepared and
                  will be listed here soon.
                </p>
              </Reveal>
              {showPreview ? (
                <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  <Reveal as="li">
                    <AccommodationCard item={accommodationTemplate} preview />
                  </Reveal>
                </ul>
              ) : null}
            </div>
          )}
        </div>
      </section>

      <PlanStayBand />

      <section aria-labelledby="buildings-title" className="surface-card section-y">
        <div className="container-page">
          <SectionHeading
            id="buildings-title"
            eyebrow="The buildings"
            title={architecture.heading}
          />
          <ul className="mt-14 grid gap-10 md:grid-cols-3">
            {architecture.facts.map((fact, i) => (
              <Reveal
                as="li"
                key={fact.label}
                delay={i * 0.12}
                className="group flex gap-5 border-t border-rule pt-6"
              >
                <span className="grid size-14 shrink-0 place-items-center rounded-full border border-rule transition-transform duration-500 group-hover:-translate-y-1">
                  <LineArt name={fact.art ?? "stone"} className="size-8 text-walnut" />
                </span>
                <span className="flex flex-col gap-2">
                  <h3 className="label">{fact.label}</h3>
                  <p className="text-muted-foreground">{fact.body}</p>
                </span>
              </Reveal>
            ))}
          </ul>
          <Reveal className="mt-12">
            <ButtonLink href="/gallery?category=Architecture" variant="text" arrow>
              See the architecture
            </ButtonLink>
          </Reveal>
        </div>
      </section>
    </>
  );
}
