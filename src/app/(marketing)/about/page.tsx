import type { Metadata } from "next";
import { aboutIntro, aboutNotes, founders, foundersIntro, intro } from "@/data/story";
import { SectionHeading } from "@/components/ui/section-heading";
import { Paragraphs } from "@/components/ui/paragraphs";
import { MediaFrame } from "@/components/ui/media-frame";
import { VideoFrame } from "@/components/ui/video-frame";
import { ButtonLink } from "@/components/ui/button-link";
import { Reveal } from "@/components/ui/reveal";
import { ValuesBand } from "@/components/sections/bands";

export const metadata: Metadata = {
  title: "About",
  description:
    "The story of Inbavanam near Karamadai, and of Gladston and Florina Xavier, the social workers who run it.",
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
            <Reveal delay={0.32}>
              <ButtonLink href="#story" variant="text" arrow>
                Our story
              </ButtonLink>
            </Reveal>
          </div>
          <Reveal variant="clip" className="lg:col-span-7">
            <MediaFrame
              media={aboutIntro.media}
              ratio="5 / 4"
              priority
              sizes="(min-width: 1024px) 58vw, 100vw"
            />
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

      <section aria-labelledby="timeline-title" className="section-y">
        <div className="container-page grid gap-10 lg:grid-cols-12">
          <SectionHeading
            id="timeline-title"
            eyebrow="Timeline"
            title="The last five years and more"
            className="lg:col-span-5"
          />
          <Reveal delay={0.15} className="flex flex-col gap-6 lg:col-span-6 lg:col-start-7">
            <p className="text-muted-foreground">
              A timeline of Inbavanam and its programs is being prepared, along with introductions
              to the team who work here.
            </p>
            <ButtonLink href="/our-work" variant="text" arrow className="self-start">
              See our work today
            </ButtonLink>
          </Reveal>
        </div>
      </section>
    </>
  );
}
