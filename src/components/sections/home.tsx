import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  architecture,
  community,
  finalCta,
  founders,
  foundersIntro,
  intro,
  place,
} from "@/data/story";
import { contact, enquireLink, site, supportLink, TBC } from "@/data/site";
import { experiences } from "@/data/experiences";
import { programAreas } from "@/data/programs";
import { getEvents, getGalleryItems } from "@/lib/db/content";
import { splitEvents } from "@/lib/dates";
import { SectionHeading } from "@/components/ui/section-heading";
import { MediaFrame } from "@/components/ui/media-frame";
import { VideoFrame } from "@/components/ui/video-frame";
import { ButtonLink } from "@/components/ui/button-link";
import { Reveal } from "@/components/ui/reveal";
import { KolamDivider } from "@/components/illustrations/kolam";
import { LineArt } from "@/components/illustrations/line-art";
import { EventCard, EventsEmptyState } from "@/components/events/event-card";
import { Paragraphs } from "@/components/ui/paragraphs";

export function EssenceSection() {
  return (
    <section id="essence" aria-labelledby="essence-title" className="surface-ivory section-y">
      <div className="container-page grid gap-10 lg:grid-cols-12">
        <SectionHeading
          id="essence-title"
          eyebrow={intro.eyebrow}
          title={intro.heading}
          className="lg:col-span-7"
        />
        <Paragraphs
          items={intro.body}
          className="text-lede lg:col-span-4 lg:col-start-9 lg:pt-12"
        />
      </div>
      <KolamDivider className="container-page mt-20" />
    </section>
  );
}

export function PlaceSection() {
  return (
    <section aria-labelledby="place-title" className="section-y">
      <div className="container-page grid items-end gap-10 lg:grid-cols-12">
        <Reveal className="lg:col-span-7">
          <MediaFrame media={place.media} ratio="5 / 4" sizes="(min-width: 1024px) 58vw, 100vw" />
        </Reveal>
        <div className="flex flex-col gap-8 lg:col-span-4 lg:col-start-9">
          <LineArt name="sprout" className="size-20 text-olive" />
          <SectionHeading id="place-title" eyebrow={place.eyebrow} title={place.heading} />
          <Paragraphs items={place.body} className="text-muted-foreground" />
        </div>
      </div>
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
          <Paragraphs
            items={architecture.body}
            className="text-lede lg:col-span-5 lg:col-start-8 lg:pt-12"
          />
        </div>
        <Reveal className="mt-16">
          <VideoFrame media={architecture.media} ratio="21 / 9" />
        </Reveal>
        <ol className="mt-16 grid gap-10 md:grid-cols-3">
          {architecture.facts.map((fact, i) => (
            <li key={fact.label} className="flex flex-col gap-3 border-t border-rule pt-6">
              <span className="font-display text-h3 text-muted-foreground tabular">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="label">{fact.label}</h3>
              <p className="text-muted-foreground">{fact.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function StayPreviewSection() {
  return (
    <section aria-labelledby="stay-title" className="section-y">
      <div className="container-page grid items-center gap-10 lg:grid-cols-12">
        <div className="flex flex-col gap-8 lg:col-span-5">
          <SectionHeading id="stay-title" eyebrow="Stay" title="Rooms and spaces for rest." />
          <p className="text-muted-foreground">
            Details of the rooms, their capacity and amenities are being prepared and will be listed
            here. You can already ask us about a stay.
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <ButtonLink href={enquireLink.href}>Plan your stay</ButtonLink>
            <ButtonLink href="/stay" variant="text" arrow>
              See the spaces
            </ButtonLink>
          </div>
        </div>
        <Reveal className="lg:col-span-6 lg:col-start-7">
          <MediaFrame
            media={{
              kind: "image",
              src: null,
              alt: "A room at Inbavanam",
              brief: "Room or shared space, natural light.",
            }}
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
    <section aria-labelledby="experiences-title" className="surface-ivory section-y">
      <div className="container-page">
        <SectionHeading
          id="experiences-title"
          eyebrow="Experiences"
          title="Ways to use the space"
        />
        <ul className="mt-14 grid gap-x-10 md:grid-cols-2 lg:grid-cols-3">
          {experiences.map((item) => (
            <li key={item.slug} className="border-t border-rule">
              <Link
                href={`/experiences#${item.slug}`}
                className="group flex h-full gap-6 py-8 transition-colors hover:text-terracotta"
              >
                <LineArt name={item.illustration} className="size-14 shrink-0 text-olive" />
                <span className="flex flex-col gap-2">
                  <span className="font-display text-h3">{item.title}</span>
                  <span className="text-muted-foreground">{item.summary}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function CommunitySection() {
  return (
    <section aria-labelledby="community-title" className="surface-olive grain section-y">
      <div className="container-page grid items-center gap-10 lg:grid-cols-12">
        <div className="flex flex-col gap-8 lg:col-span-5">
          <SectionHeading
            id="community-title"
            eyebrow={community.eyebrow}
            title={community.heading}
          />
          <Paragraphs items={community.body} className="text-lede" />
          <ButtonLink href="/community" variant="outline" className="self-start">
            Get involved
          </ButtonLink>
        </div>
        <Reveal className="lg:col-span-6 lg:col-start-7">
          <MediaFrame media={community.media} ratio="4 / 3" />
        </Reveal>
      </div>
    </section>
  );
}

export function OurWorkSection() {
  return (
    <section aria-labelledby="work-title" className="section-y">
      <div className="container-page">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading
            id="work-title"
            eyebrow="Our work"
            title="Programs with the communities around Inbavanam"
          />
          <ButtonLink href="/our-work" variant="text" arrow>
            All programs
          </ButtonLink>
        </div>
        <ol className="mt-14">
          {programAreas.map((area, i) => (
            <li key={area.slug} className="border-t border-rule last:border-b">
              <Link
                href={`/our-work#${area.slug}`}
                className="group grid items-baseline gap-3 py-7 transition-colors hover:text-terracotta md:grid-cols-12"
              >
                <span className="label text-muted-foreground tabular md:col-span-1">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-h3 md:col-span-4">{area.title}</span>
                <span className="text-muted-foreground md:col-span-6">{area.summary}</span>
                <ArrowUpRight
                  aria-hidden="true"
                  className="hidden size-5 justify-self-end md:col-span-1 md:block"
                  strokeWidth={1.25}
                />
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export async function EventsSection() {
  const { upcoming } = splitEvents(await getEvents());
  return (
    <section aria-labelledby="events-title" className="surface-ivory section-y">
      <div className="container-page">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading
            id="events-title"
            eyebrow="Events"
            title="What is happening at Inbavanam"
          />
          <ButtonLink href="/events" variant="text" arrow>
            Full calendar
          </ButtonLink>
        </div>
        <div className="mt-14">
          {upcoming.length ? (
            upcoming.slice(0, 3).map((e) => <EventCard key={e.slug} event={e} />)
          ) : (
            <EventsEmptyState />
          )}
        </div>
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
          <Paragraphs items={foundersIntro.body} className="text-lede" />
          <ul className="flex flex-col gap-4 border-t border-rule pt-6">
            {founders.map((f) => (
              <li key={f.name}>
                <p className="font-display text-h3">{f.name}</p>
                <p className="mt-1 label text-muted-foreground">{f.role}</p>
              </li>
            ))}
          </ul>
          <ButtonLink href="/about" variant="text" arrow className="self-start">
            Read our story
          </ButtonLink>
        </div>
        <Reveal className="lg:col-span-6 lg:col-start-7">
          <VideoFrame media={foundersIntro.media} ratio="4 / 5" />
        </Reveal>
      </div>
    </section>
  );
}

export async function GalleryPreviewSection() {
  const preview = (await getGalleryItems()).slice(0, 5);
  return (
    <section aria-labelledby="gallery-title" className="section-y">
      <div className="container-page">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading
            id="gallery-title"
            eyebrow="Gallery"
            title="Architecture, land and people"
          />
          <ButtonLink href="/gallery" variant="text" arrow>
            View the gallery
          </ButtonLink>
        </div>
        <div className="mt-14 grid grid-cols-2 gap-3 md:grid-cols-6 md:gap-4">
          {preview.map((item, i) => (
            <Reveal
              key={item.id}
              delay={i * 0.05}
              className={
                i === 0
                  ? "col-span-2 md:col-span-3 md:row-span-2"
                  : i === 4
                    ? "col-span-2 md:col-span-3"
                    : "md:col-span-3 lg:col-span-3"
              }
            >
              <MediaFrame
                media={item}
                ratio={i === 0 ? "4 / 5" : "4 / 3"}
                sizes="(min-width: 768px) 50vw, 100vw"
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function LocationSection() {
  return (
    <section aria-labelledby="location-title" className="surface-ivory section-y">
      <div className="container-page grid gap-10 lg:grid-cols-12">
        <SectionHeading
          id="location-title"
          eyebrow="Location"
          title="Finding Inbavanam"
          className="lg:col-span-5"
        />
        <dl className="grid gap-8 sm:grid-cols-2 lg:col-span-6 lg:col-start-7">
          <div className="border-t border-rule pt-5">
            <dt className="label text-muted-foreground">Where</dt>
            <dd className="mt-3">{site.locationLong}</dd>
          </div>
          <div className="border-t border-rule pt-5">
            <dt className="label text-muted-foreground">Address</dt>
            <dd className="mt-3">{contact.address ?? TBC}</dd>
          </div>
          <div className="border-t border-rule pt-5">
            <dt className="label text-muted-foreground">Directions</dt>
            <dd className="mt-3">
              {contact.mapUrl ? (
                <a
                  href={contact.mapUrl}
                  className="underline-offset-4 hover:underline"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Open in maps<span className="sr-only"> (opens in a new tab)</span>
                </a>
              ) : (
                TBC
              )}
            </dd>
          </div>
          <div className="border-t border-rule pt-5">
            <dt className="label text-muted-foreground">Land</dt>
            <dd className="mt-3 first-letter:uppercase">{site.landArea}</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}

export function FinalCtaSection() {
  return (
    <section aria-labelledby="cta-title" className="surface-indigo grain section-y">
      <div className="container-page flex flex-col items-center gap-8 text-center">
        <LineArt name="gathering" className="size-20 text-cream" />
        <h2 id="cta-title" className="max-w-[20ch] text-h1">
          {finalCta.heading}
        </h2>
        <p className="prose-measure text-lede text-muted-foreground">{finalCta.body}</p>
        <div className="flex flex-wrap justify-center gap-4">
          <ButtonLink href={enquireLink.href}>Plan your stay</ButtonLink>
          <ButtonLink href="/community" variant="outline">
            Get involved
          </ButtonLink>
        </div>
        <ButtonLink href={supportLink.href} variant="text" arrow>
          {supportLink.label}
        </ButtonLink>
      </div>
    </section>
  );
}
