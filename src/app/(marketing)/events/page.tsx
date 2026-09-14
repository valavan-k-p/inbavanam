import type { Metadata } from "next";
import Link from "next/link";
import { getEvents } from "@/lib/db/content";
import { getProgramArea } from "@/data/programs";
import { splitEvents, todayISO } from "@/lib/dates";
import { PageHero } from "@/components/sections/page-hero";
import { EventCalendar } from "@/components/events/event-calendar";
import { EventCard, EventsEmptyState } from "@/components/events/event-card";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Upcoming programs, trainings and gatherings at Inbavanam, and when the spaces are in use.",
  alternates: { canonical: "/events" },
};

type EventsPageProps = { searchParams: Promise<Record<string, string | string[] | undefined>> };

export default async function EventsPage({ searchParams }: EventsPageProps) {
  const { program } = await searchParams;
  const area = typeof program === "string" ? getProgramArea(program) : undefined;
  const events = await getEvents();
  const visible = area ? events.filter((e) => e.programSlug === area.slug) : events;
  const today = todayISO();
  const { upcoming, past } = splitEvents(visible, today);

  return (
    <>
      <PageHero
        eyebrow="Events"
        title="Calendar and upcoming activities"
        lede="Programs, trainings, celebrations and bookings, so you can see when the spaces at Inbavanam are in use."
      >
        {area ? (
          <p className="text-sm">
            Showing events for <strong>{area.title}</strong>.{" "}
            <Link href="/events" className="underline underline-offset-4">
              Show all events
            </Link>
          </p>
        ) : null}
      </PageHero>

      <section aria-label="Calendar" className="container-page pb-16">
        <Reveal
          variant="scale"
          className="rounded-[var(--radius)] border border-rule bg-card p-4 md:p-8"
        >
          <EventCalendar events={visible} today={today} />
        </Reveal>
      </section>

      <section aria-labelledby="upcoming-title" className="surface-card section-y">
        <div className="container-page">
          <h2 id="upcoming-title" className="text-h2" data-reveal="up">
            Upcoming
          </h2>
          <Reveal delay={0.1} className="mt-10">
            {upcoming.length ? (
              upcoming.map((e) => (
                <div key={e.slug} id={`event-${e.slug}`} className="scroll-mt-24">
                  <EventCard event={e} />
                </div>
              ))
            ) : (
              <EventsEmptyState />
            )}
          </Reveal>
        </div>
      </section>

      {past.length ? (
        <section aria-labelledby="past-title" className="section-y">
          <div className="container-page">
            <h2 id="past-title" className="text-h2" data-reveal="up">
              Past events
            </h2>
            <div className="mt-10">
              {past.map((e) => (
                <div key={e.slug} id={`event-${e.slug}`} className="scroll-mt-24">
                  <EventCard event={e} />
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
