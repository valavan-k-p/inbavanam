import type { Metadata } from "next";
import Image from "next/image";
import { aboutIntro, aboutNotes, founders, foundersIntro, intro } from "@/data/story";
import { SectionHeading } from "@/components/ui/section-heading";
import { Paragraphs } from "@/components/ui/paragraphs";
import { MediaFrame } from "@/components/ui/media-frame";
import { VideoFrame } from "@/components/ui/video-frame";
import { ButtonLink } from "@/components/ui/button-link";
import { Reveal } from "@/components/ui/reveal";
import { ValuesBand } from "@/components/sections/bands";

import { OrganisationProfileSection } from "@/components/sections/organisation-profile";

export const metadata: Metadata = {
  title: "About & Organisation Profile",
  description:
    "The story of Inbavanam near Karamadai, Gladston and Florina Xavier, and our community development programmes in Kandiyur and Bagavathi Amman Koil.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <section className="overflow-hidden pt-[calc(var(--header-h)+clamp(3rem,7vw,6rem))] pb-[var(--section-y)]">
        <div className="container-page grid items-center gap-12 lg:grid-cols-12">
          <div className="flex flex-col gap-7 lg:col-span-5">
            <SectionHeading as="h1" size="h1" eyebrow="About us" title={aboutIntro.heading} />
            <Reveal delay={0.24}>
              <Paragraphs items={intro.body} className="text-muted-foreground" />
            </Reveal>
            <Reveal delay={0.32} className="flex flex-wrap items-center gap-6">
              <ButtonLink href="#story" variant="text" arrow>
                Our story
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
                src="/about us image/ab image nbg.png"
                alt="Gladston Xavier and Florina Xavier with Inbavanam retreat sanctuary and Western Ghats landscape"
                width={1462}
                height={1076}
                priority
                className="h-auto w-full max-w-[440px] sm:max-w-[540px] md:max-w-[620px] lg:max-w-[700px] xl:max-w-[780px] 2xl:max-w-[840px] object-contain drop-shadow-[0_14px_32px_rgba(45,28,20,0.08)] transition-transform duration-700 ease-out hover:scale-[1.015]"
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
            <SectionHeading id="story-title" eyebrow="Our story" title={foundersIntro.heading} />
            <Reveal delay={0.15}>
              <Paragraphs items={foundersIntro.body} className="text-lede" />
            </Reveal>
          </div>
          <Reveal variant="clip" className="lg:col-span-6 lg:col-start-7">
            <VideoFrame media={foundersIntro.media} ratio="4 / 5" />
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="founders-title" className="section-y">
        <div className="container-page">
          <SectionHeading
            id="founders-title"
            eyebrow="Founders"
            title="Gladston and Florina Xavier"
          />
          <ul className="mt-14 grid gap-12 md:grid-cols-2">
            {founders.map((f, i) => (
              <Reveal as="li" key={f.name} delay={i * 0.12} className="group flex flex-col gap-5">
                <MediaFrame
                  media={f.portrait}
                  ratio="4 / 5"
                  sizes="(min-width: 768px) 45vw, 100vw"
                />
                <h3 className="text-h3">{f.name}</h3>
                <p className="label text-muted-foreground">{f.role}</p>
                {f.bio ? (
                  <p>{f.bio}</p>
                ) : (
                  <p className="text-muted-foreground">
                    A short biography will be added once the founders have approved it.
                  </p>
                )}
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="idea-title" className="surface-card section-y">
        <div className="container-page grid gap-10 lg:grid-cols-12">
          <SectionHeading
            id="idea-title"
            eyebrow="The idea"
            title="The thinking behind the space"
            className="lg:col-span-5"
          />
          <Reveal
            delay={0.15}
            className="flex flex-col gap-5 text-lede lg:col-span-6 lg:col-start-7"
          >
            <p>{aboutNotes.concept}</p>
            <p>{intro.body[1]}</p>
          </Reveal>
        </div>
      </section>

      {/* Full Inbavanam Organisation Profile */}
      <OrganisationProfileSection />
    </>
  );
}
