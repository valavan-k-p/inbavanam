import type { Metadata } from "next";
import { aboutNotes, founders, foundersIntro, intro } from "@/data/story";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { Paragraphs } from "@/components/ui/paragraphs";
import { MediaFrame } from "@/components/ui/media-frame";
import { VideoFrame } from "@/components/ui/video-frame";
import { ButtonLink } from "@/components/ui/button-link";

export const metadata: Metadata = {
  title: "About",
  description:
    "The story of Inbavanam near Karamadai, and of Gladston and Florina Xavier, the social workers who run it.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="About" title="A place, and the people who made it." lede={intro.body[0]} />

      <section aria-labelledby="story-title" className="surface-maroon grain section-y">
        <div className="container-page grid gap-12 lg:grid-cols-12">
          <div className="flex flex-col gap-8 lg:col-span-5">
            <SectionHeading id="story-title" eyebrow="Our story" title={foundersIntro.heading} />
            <Paragraphs items={foundersIntro.body} className="text-lede" />
          </div>
          <VideoFrame
            media={foundersIntro.media}
            ratio="4 / 5"
            className="lg:col-span-6 lg:col-start-7"
          />
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
            {founders.map((f) => (
              <li key={f.name} className="flex flex-col gap-5">
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
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="idea-title" className="surface-ivory section-y">
        <div className="container-page grid gap-10 lg:grid-cols-12">
          <SectionHeading
            id="idea-title"
            eyebrow="The idea"
            title="The thinking behind the space"
            className="lg:col-span-5"
          />
          <div className="flex flex-col gap-5 text-lede lg:col-span-6 lg:col-start-7">
            <p>{aboutNotes.concept}</p>
            <p>{intro.body[1]}</p>
          </div>
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
          <div className="flex flex-col gap-6 lg:col-span-6 lg:col-start-7">
            <p className="text-muted-foreground">
              A timeline of Inbavanam and its programs is being prepared, along with introductions
              to the team who work here.
            </p>
            <ButtonLink href="/our-work" variant="text" arrow className="self-start">
              See our work today
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
