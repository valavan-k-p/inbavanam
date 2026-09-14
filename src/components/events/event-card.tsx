import Link from "next/link";
import { CalendarDays, MapPin } from "lucide-react";
import type { EventItem } from "@/types/content";
import { formatDateRange } from "@/lib/dates";
import { LineArt } from "@/components/illustrations/line-art";

export function EventCard({
  event,
  headingLevel = "h3",
}: {
  event: EventItem;
  headingLevel?: "h2" | "h3";
}) {
  const Heading = headingLevel;
  return (
    <article className="grid gap-4 border-t border-rule py-8 md:grid-cols-12">
      <p className="label text-muted-foreground tabular md:col-span-3">
        <time dateTime={event.startDate}>{formatDateRange(event.startDate, event.endDate)}</time>
      </p>
      <div className="flex flex-col gap-3 md:col-span-7">
        <p className="label text-terracotta">{event.category}</p>
        <Heading className="text-h3">{event.title}</Heading>
        <p className="text-muted-foreground">{event.summary}</p>
        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          {event.time ? (
            <li className="flex items-center gap-2">
              <CalendarDays aria-hidden="true" className="size-4" strokeWidth={1.5} />
              {event.time}
            </li>
          ) : null}
          <li className="flex items-center gap-2">
            <MapPin aria-hidden="true" className="size-4" strokeWidth={1.5} />
            {event.location}
          </li>
        </ul>
      </div>
      <div className="md:col-span-2 md:text-right">
        <Link
          href={event.registrationUrl ?? `/contact?type=event&event=${event.slug}`}
          className="label inline-flex min-h-11 items-center underline-offset-8 hover:underline"
        >
          {event.registrationUrl ? "Register" : "Enquire"}
          <span className="sr-only"> about {event.title}</span>
        </Link>
      </div>
    </article>
  );
}

export function EventsEmptyState() {
  return (
    <div className="flex flex-col items-start gap-5 border-t border-rule pt-10 sm:flex-row sm:items-center sm:gap-10">
      <LineArt name="lamp" className="size-20 text-terracotta" />
      <div className="flex flex-col gap-3">
        <p className="font-display text-h3">No events are listed yet.</p>
        <p className="prose-measure text-muted-foreground">
          The calendar will show programs, trainings, celebrations and when the spaces at Inbavanam
          are in use. If you would like to host a gathering, tell us what you have in mind.
        </p>
        <Link
          href="/contact?type=event"
          className="label inline-flex min-h-11 items-center self-start underline-offset-8 hover:underline"
        >
          Ask about hosting an event
        </Link>
      </div>
    </div>
  );
}
