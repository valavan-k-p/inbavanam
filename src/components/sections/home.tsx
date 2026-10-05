import Image from "next/image";
import {
  aboutIntro,
  architecture,
  experiencesIntro,
  galleryIntro,
  intro,
  place,
  workIntro,
} from "@/data/story";
import { getEvents, getGalleryItems, getProgramList, getSiteContentSection } from "@/lib/db/content";
import { splitEvents } from "@/lib/dates";
import { SectionHeading } from "@/components/ui/section-heading";
import { VideoFrame } from "@/components/ui/video-frame";
import { ButtonLink } from "@/components/ui/button-link";
import { Reveal } from "@/components/ui/reveal";
import { Paragraphs } from "@/components/ui/paragraphs";
import { LineArt } from "@/components/illustrations/line-art";
import { EventCard, EventsEmptyState } from "@/components/events/event-card";
import { GalleryWall } from "@/components/gallery/gallery-wall";
import { ProgramGrid } from "./program-grid";
import { experiences } from "@/data/experiences";
import { ExperienceStack } from "@/components/experiences/experience-stack";

export async function AboutTeaserSection() {
  const aboutData = await getSiteContentSection("about", {
    heading: aboutIntro.heading,
    imagePath: "/about us image/about-collage.webp",
  });
  const introData = await getSiteContentSection("intro", {
    body1: intro.body[0],
    body2: intro.body[1],
  });

  return (
    <section id="essence" aria-labelledby="about-title" className="overflow-hidden section-y">
      <div className="container-page grid items-center gap-10 sm:gap-12 lg:grid-cols-12 lg:gap-12 xl:gap-16">
        <div className="flex flex-col gap-7 lg:col-span-5">
          <SectionHeading
            id="about-title"
            eyebrow="About us"
            title={aboutData.heading}
            size="h1"
          />
          <Reveal delay={0.2}>
            <Paragraphs items={[introData.body1, introData.body2]} className="text-muted-foreground" />
          </Reveal>
          <Reveal delay={0.3}>
            <ButtonLink href="/about" variant="text" arrow>
              Our story
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
  );
}

export async function PlaceSection() {
  const placeData = await getSiteContentSection("the_land", {
    imagePath: place.media.src ?? "/inbavanam cover/farm.png",
  });
  return (
    <section className="w-full">
      {/* Full-width photograph shown whole: the section takes the image's own 16:9 shape. */}
      <Image
        src={placeData.imagePath}
        alt={place.media.alt}
        width={1672}
        height={941}
        sizes="100vw"
        className="h-auto w-full"
      />
    </section>
  );
}

export async function ArchitectureSection() {
  const archData = await getSiteContentSection("architecture", {
    eyebrow: architecture.eyebrow,
    heading: architecture.heading,
    body1: architecture.body[0],
    body2: architecture.body[1],
    imagePath: architecture.media.src ?? "",
    fact1Label: architecture.facts[0]?.label ?? "Natural cooling",
    fact1Body: architecture.facts[0]?.body ?? "",
    fact2Label: architecture.facts[1]?.label ?? "Heavy stone",
    fact2Body: architecture.facts[1]?.body ?? "",
    fact3Label: architecture.facts[2]?.label ?? "Climate-responsive design",
    fact3Body: architecture.facts[2]?.body ?? "",
  });

  const media = {
    ...architecture.media,
    src: archData.imagePath,
  };

  const facts = [
    {
      art: architecture.facts[0]?.art ?? "stone",
      label: archData.fact1Label || architecture.facts[0]?.label || "Natural cooling",
      body: archData.fact1Body || architecture.facts[0]?.body || "",
    },
    {
      art: architecture.facts[1]?.art ?? "stone",
      label: archData.fact2Label || architecture.facts[1]?.label || "Heavy stone",
      body: archData.fact2Body || architecture.facts[1]?.body || "",
    },
    {
      art: architecture.facts[2]?.art ?? "sun",
      label: archData.fact3Label || architecture.facts[2]?.label || "Climate-responsive design",
      body: archData.fact3Body || architecture.facts[2]?.body || "",
    },
  ];

  return (
    <section aria-labelledby="architecture-title" className="surface-walnut grain section-y">
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-12">
          <SectionHeading
            id="architecture-title"
            eyebrow={archData.eyebrow}
            title={archData.heading}
            className="lg:col-span-6"
          />
          <Reveal delay={0.15} className="lg:col-span-5 lg:col-start-8 lg:pt-12">
            <Paragraphs items={[archData.body1, archData.body2]} className="text-lede" />
          </Reveal>
        </div>
        <Reveal variant="clip" className="mt-16">
          <VideoFrame
            media={media}
            ratio="var(--frame-ratio)"
            className="[--frame-ratio:1.33] md:[--frame-ratio:2.33]"
          />
        </Reveal>
        <ul className="mt-16 grid gap-10 md:grid-cols-3">
          {facts.map((fact, i) => (
            <Reveal
              as="li"
              key={fact.label}
              delay={i * 0.12}
              className="group flex gap-5 border-t border-rule pt-6"
            >
              <span className="grid size-14 shrink-0 place-items-center rounded-full border border-rule transition-transform duration-500 group-hover:-translate-y-1">
                <LineArt name={fact.art} className="size-8 text-cream" />
              </span>
              <span className="flex flex-col gap-2">
                <h3 className="label">{fact.label}</h3>
                <p className="text-muted-foreground">{fact.body}</p>
              </span>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

export async function StayFeatureSection() {
  const stayData = await getSiteContentSection("stay", {
    imagePath: "/inbavanam cover/pets.jpg",
  });

  return (
    <section className="w-full">
      {/* Full-width photograph shown whole: the section takes the image's own 16:9 shape. */}
      <Image
        src={stayData.imagePath || "/inbavanam cover/pets.jpg"}
        alt="Inbavanam sanctuary life and architecture"
        width={3417}
        height={1920}
        sizes="100vw"
        className="h-auto w-full"
      />
    </section>
  );
}

export function ExperiencesSection() {
  return (
    <section aria-labelledby="experiences-title" className="section-y">
      <div className="container-page">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading
            id="experiences-title"
            eyebrow="Experiences"
            title={experiencesIntro.heading}
            lede={experiencesIntro.body}
          />
          <Reveal variant="fade">
            <ButtonLink href="/experiences" variant="text" arrow>
              All experiences
            </ButtonLink>
          </Reveal>
        </div>
        <Reveal delay={0.15} className="mt-14">
          <ExperienceStack items={experiences} />
        </Reveal>
      </div>
    </section>
  );
}

export async function OurWorkSection() {
  const programs = await getProgramList();
  return (
    <section aria-labelledby="work-title" className="surface-card section-y">
      <div className="container-page">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading
            id="work-title"
            eyebrow="Our work"
            title={workIntro.heading}
            lede={workIntro.body}
          />
          <Reveal variant="fade">
            <ButtonLink href="/our-work" variant="olive" arrow>
              Explore our work
            </ButtonLink>
          </Reveal>
        </div>
        <div className="mt-14">
          <ProgramGrid items={programs} />
        </div>
      </div>
    </section>
  );
}

export async function EventsSection() {
  const { upcoming } = splitEvents(await getEvents());
  return (
    <section aria-labelledby="events-title" className="section-y">
      <div className="container-page">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading
            id="events-title"
            eyebrow="Events"
            title="What is happening at Inbavanam"
          />
          <Reveal variant="fade">
            <ButtonLink href="/events" variant="text" arrow>
              Full calendar
            </ButtonLink>
          </Reveal>
        </div>
        <Reveal className="mt-14">
          {upcoming.length ? (
            upcoming.slice(0, 3).map((e) => <EventCard key={e.slug} event={e} />)
          ) : (
            <EventsEmptyState />
          )}
        </Reveal>
      </div>
    </section>
  );
}

export async function GalleryPreviewSection() {
  const items = await getGalleryItems();
  return (
    <section aria-labelledby="gallery-title">
      <GalleryWall
        items={items}
        label="Gallery wall"
        className="h-[85svh] min-h-[34rem]"
        top={
          // The wall carries the section; the heading stays for assistive
          // technology instead of being drawn over the photographs.
          <h2 id="gallery-title" className="sr-only">
            {galleryIntro.heading}
          </h2>
        }
        corner={
          <ButtonLink href="/gallery" variant="khaki" size="sm" arrow>
            Open the gallery
          </ButtonLink>
        }
      />
    </section>
  );
}
