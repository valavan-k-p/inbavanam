import type { Metadata } from "next";
import Image from "next/image";
import { aboutIntro, aboutPurpose, aboutStory } from "@/data/story";
import { SectionHeading } from "@/components/ui/section-heading";
import { Paragraphs } from "@/components/ui/paragraphs";
import { MediaFrame } from "@/components/ui/media-frame";
import { ButtonLink } from "@/components/ui/button-link";
import { Reveal } from "@/components/ui/reveal";
import { LineArt } from "@/components/illustrations/line-art";
import { ValuesBand } from "@/components/sections/bands";

import { OrganisationProfileSection } from "@/components/sections/organisation-profile";

import { getSiteContentSection } from "@/lib/db/content";

export const metadata: Metadata = {
  title: "About & Organisation Profile",
  description:
    "Inbavanam, meaning happy forest: a community-development initiative working on education, livelihoods, rights and sustainability in Kandiyur and Bagavathi Amman Koil, Coimbatore district.",
  alternates: { canonical: "/about" },
};

export default async function AboutPage() {
  const aboutData = await getSiteContentSection("about", {
    heading: aboutIntro.heading,
    imagePath: "/about us image/about-collage.webp",
  });

  return (
    <>
      <section className="overflow-hidden pt-[calc(var(--header-h)+clamp(3rem,7vw,6rem))] pb-[var(--section-y)]">
        <div className="container-page grid items-center gap-12 lg:grid-cols-12">
          <div className="flex flex-col gap-7 lg:col-span-5">
            <SectionHeading as="h1" size="h1" eyebrow="About us" title={aboutData.heading} />
            <Reveal delay={0.24}>
              <Paragraphs items={aboutStory.body.slice(0, 1)} className="text-muted-foreground" />
            </Reveal>
            <Reveal delay={0.32} className="flex flex-wrap items-center gap-6">
              <ButtonLink href="#purpose" variant="text" arrow>
                Vision and purpose
              </ButtonLink>
              <ButtonLink href="#organisation-profile" variant="text" arrow>
                Organisation profile
              </ButtonLink>
            </Reveal>
          </div>
          <Reveal
            variant="fade"
            delay={0.2}
            className="flex items-center justify-center lg:col-span-7 lg:justify-center xl:justify-end"
          >
            <div className="relative flex w-full items-center justify-center lg:justify-center xl:justify-end">
              <Image
                src={aboutData.imagePath}
                alt="Circular collage of Inbavanam: the round brick pavilion, the two-storey residence, the hall, a tiled cottage and the Western Ghats, set around the Inbavanam logo"
                width={1371}
                height={1148}
                priority
                className="h-auto w-full max-w-[440px] object-contain transition-transform duration-700 ease-out hover:scale-[1.015] sm:max-w-[540px] md:max-w-[620px] lg:max-w-[700px] xl:max-w-[780px] 2xl:max-w-[840px]"
                sizes="(min-width: 1536px) 840px, (min-width: 1280px) 780px, (min-width: 1024px) 58vw, (min-width: 640px) 540px, 92vw"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <ValuesBand />

      <section
        id="story"
        aria-labelledby="story-title"
        className="surface-maroon grain scroll-mt-20 section-y"
      >
        <div className="container-page grid gap-12 lg:grid-cols-12">
          <div className="flex flex-col gap-8 lg:col-span-5">
            <SectionHeading
              id="story-title"
              eyebrow={aboutStory.eyebrow}
              title={aboutStory.heading}
            />
            <Reveal delay={0.15}>
              <Paragraphs items={aboutStory.body} className="text-lede" />
            </Reveal>
          </div>
          <Reveal variant="clip" className="lg:col-span-6 lg:col-start-7">
            <MediaFrame
              media={aboutStory.media}
              ratio="4 / 5"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </Reveal>
        </div>
      </section>

      <section id="purpose" aria-labelledby="purpose-title" className="scroll-mt-20 section-y">
        <div className="container-page grid gap-10 lg:grid-cols-12">
          <div className="flex flex-col gap-6 lg:col-span-5">
            <SectionHeading
              id="purpose-title"
              eyebrow={aboutPurpose.eyebrow}
              title={aboutPurpose.heading}
            />
            <Reveal delay={0.15}>
              <p className="text-lede text-muted-foreground">{aboutPurpose.lede}</p>
            </Reveal>
          </div>
          <ul className="grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:col-span-6 lg:col-start-7">
            {aboutPurpose.items.map((item, i) => (
              <Reveal
                as="li"
                key={item}
                delay={(i % 4) * 0.08}
                className="flex gap-4 border-t border-rule pt-4"
              >
                <LineArt name="sprout" className="mt-0.5 size-5 shrink-0 text-olive" />
                <span>{item}</span>
              </Reveal>
            ))}
          </ul>
          <Reveal delay={0.2} className="lg:col-span-9">
            <p className="text-lede text-muted-foreground">{aboutPurpose.close}</p>
          </Reveal>
        </div>
      </section>

      {/* Full Inbavanam Organisation Profile */}
      <OrganisationProfileSection />
    </>
  );
}
