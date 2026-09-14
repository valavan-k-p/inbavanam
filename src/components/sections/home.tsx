import {
  aboutIntro,
  architecture,
  experiencesIntro,
  founders,
  foundersIntro,
  galleryIntro,
  intro,
  place,
  stayIntro,
  workIntro,
} from "@/data/story";
import { enquireLink } from "@/data/site";
import { experiences } from "@/data/experiences";
import { getEvents, getGalleryItems } from "@/lib/db/content";
import { splitEvents } from "@/lib/dates";
import { SectionHeading } from "@/components/ui/section-heading";
import { MediaFrame } from "@/components/ui/media-frame";
import { VideoFrame } from "@/components/ui/video-frame";
import { ButtonLink } from "@/components/ui/button-link";
import { Reveal } from "@/components/ui/reveal";
import { Paragraphs } from "@/components/ui/paragraphs";
import { PhotoCard } from "@/components/ui/photo-card";
import { KolamDivider } from "@/components/illustrations/kolam";
import { LineArt } from "@/components/illustrations/line-art";
import { EventCard, EventsEmptyState } from "@/components/events/event-card";
import { GalleryWall } from "@/components/gallery/gallery-wall";
import { ProgramGrid } from "./program-grid";

export function AboutTeaserSection() {
  return (
    <section id="essence" aria-labelledby="about-title" className="overflow-hidden section-y">
      <div className="container-page grid items-center gap-12 lg:grid-cols-12">
        <div className="flex flex-col gap-7 lg:col-span-5">
          <SectionHeading
            id="about-title"
            eyebrow="About us"
            title={aboutIntro.heading}
            size="h1"
          />
          <Reveal delay={0.2}>
            <Paragraphs items={intro.body} className="text-muted-foreground" />
          </Reveal>
          <Reveal delay={0.3}>
            <ButtonLink href="/about" variant="text" arrow>
              Our story
            </ButtonLink>
          </Reveal>
        </div>
        <Reveal variant="clip" className="lg:col-span-7">
          <MediaFrame
            media={aboutIntro.media}
            ratio="5 / 4"
            sizes="(min-width: 1024px) 58vw, 100vw"
          />
        </Reveal>
      </div>
    </section>
  );
}

export function PlaceSection() {
  return (
    <section aria-labelledby="place-title" className="section-y">
      <div className="container-page grid items-end gap-12 lg:grid-cols-12">
        <Reveal variant="clip" className="lg:col-span-7">
          <MediaFrame media={place.media} ratio="16 / 10" sizes="(min-width: 1024px) 58vw, 100vw" />
        </Reveal>
        <div className="flex flex-col gap-8 lg:col-span-4 lg:col-start-9">
          <Reveal variant="scale">
            <LineArt name="sprout" className="size-20 text-olive" />
          </Reveal>
          <SectionHeading id="place-title" eyebrow={place.eyebrow} title={place.heading} />
          <Reveal delay={0.2}>
            <Paragraphs items={place.body} className="text-muted-foreground" />
          </Reveal>
        </div>
      </div>
      <KolamDivider className="container-page mt-20" />
    </section>
  );
}

export function ArchitectureSection() {
  return (
    <section aria-labelledby="architecture-title" className="surface-walnut grain section-y">
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-12">
          <SectionHeading
            id="architecture-title"
            eyebrow={architecture.eyebrow}
            title={architecture.heading}
            className="lg:col-span-6"
          />
          <Reveal delay={0.15} className="lg:col-span-5 lg:col-start-8 lg:pt-12">
            <Paragraphs items={architecture.body} className="text-lede" />
          </Reveal>
        </div>
        <Reveal variant="clip" className="mt-16">
          <VideoFrame media={architecture.media} ratio="21 / 9" />
        </Reveal>
        <ul className="mt-16 grid gap-10 md:grid-cols-3">
          {architecture.facts.map((fact, i) => (
            <Reveal
              as="li"
              key={fact.label}
              delay={i * 0.12}
              className="group flex gap-5 border-t border-rule pt-6"
            >
              <span className="grid size-14 shrink-0 place-items-center rounded-full border border-rule transition-transform duration-500 group-hover:-translate-y-1">
                <LineArt name={fact.art ?? "stone"} className="size-8 text-cream" />
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

export function StayFeatureSection() {
  return (
    <section aria-labelledby="stay-title" className="surface-cream overflow-hidden section-y">
      <div className="container-page grid items-center gap-12 lg:grid-cols-12">
        <div className="flex flex-col gap-8 lg:col-span-5">
          <SectionHeading
            id="stay-title"
            eyebrow="Stay"
            title={stayIntro.heading}
            lede={stayIntro.body}
          />
          <Reveal delay={0.25} className="flex flex-wrap items-center gap-6">
            <ButtonLink href={enquireLink.href} arrow>
              {enquireLink.label}
            </ButtonLink>
            <ButtonLink href="/stay" variant="text" arrow>
              See the spaces
            </ButtonLink>
          </Reveal>
        </div>
        <Reveal variant="clip" className="lg:col-span-6 lg:col-start-7">
          <MediaFrame
            media={stayIntro.media}
            ratio="4 / 5"
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
        </Reveal>
      </div>
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
        <ul className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {experiences.map((item, i) => (
            <Reveal as="li" key={item.slug} delay={(i % 3) * 0.1}>
              <PhotoCard
                media={item.media}
                title={item.title}
                subtitle={item.summary}
                href={`/experiences#${item.slug}`}
              />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function OurWorkSection() {
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
          <ProgramGrid />
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

export function FoundersSection() {
  return (
    <section aria-labelledby="founders-title" className="surface-maroon grain section-y">
      <div className="container-page grid gap-12 lg:grid-cols-12">
        <div className="flex flex-col gap-8 lg:col-span-5">
          <SectionHeading
            id="founders-title"
            eyebrow={foundersIntro.eyebrow}
            title={foundersIntro.heading}
          />
          <Reveal delay={0.15}>
            <Paragraphs items={foundersIntro.body} className="text-lede" />
          </Reveal>
          <ul className="flex flex-col gap-4 border-t border-rule pt-6">
            {founders.map((f, i) => (
              <Reveal as="li" key={f.name} variant="left" delay={0.2 + i * 0.1}>
                <p className="font-display text-h3">{f.name}</p>
                <p className="mt-1 label text-muted-foreground">{f.role}</p>
              </Reveal>
            ))}
          </ul>
          <Reveal delay={0.4}>
            <ButtonLink href="/about" variant="text" arrow>
              Read our story
            </ButtonLink>
          </Reveal>
        </div>
        <Reveal variant="clip" className="lg:col-span-6 lg:col-start-7">
          <VideoFrame media={foundersIntro.media} ratio="4 / 5" />
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
          <div className="container-page pt-14">
            <p className="label text-muted-foreground" data-reveal="fade">
              Gallery
            </p>
            <h2 id="gallery-title" className="mt-3 max-w-[18ch] text-h2" data-reveal="up">
              {galleryIntro.heading}
            </h2>
          </div>
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
