"use client";

import { useId, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { EventItem } from "@/types/content";
import { eventDates, monthGrid, shiftMonth } from "@/lib/dates";
import { cn } from "@/lib/utils";

const weekdays = [
  ["Mon", "Monday"],
  ["Tue", "Tuesday"],
  ["Wed", "Wednesday"],
  ["Thu", "Thursday"],
  ["Fri", "Friday"],
  ["Sat", "Saturday"],
  ["Sun", "Sunday"],
] as const;

const monthLabel = new Intl.DateTimeFormat("en-IN", {
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

/**
 * Month view showing which days have programs, gatherings or bookings.
 * Days with events link to the event entry in the list below.
 */
export function EventCalendar({ events, today }: { events: EventItem[]; today: string }) {
  const [cursor, setCursor] = useState(today.slice(0, 7));
  const headingId = useId();
  const [year, month] = cursor.split("-").map(Number);
  const weeks = monthGrid(year, month);

  const byDate = useMemo(() => {
    const map = new Map<string, EventItem[]>();
    for (const event of events) {
      for (const date of eventDates(event)) map.set(date, [...(map.get(date) ?? []), event]);
    }
    return map;
  }, [events]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4">
        <h2 id={headingId} aria-live="polite" className="text-h3">
          {monthLabel.format(new Date(Date.UTC(year, month - 1, 1)))}
        </h2>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setCursor((c) => shiftMonth(c, -1))}
            aria-label="Previous month"
            className="grid size-11 cursor-pointer place-items-center border border-rule transition-colors hover:bg-foreground/5"
          >
            <ChevronLeft aria-hidden="true" className="size-5" strokeWidth={1.25} />
          </button>
          <button
            type="button"
            onClick={() => setCursor((c) => shiftMonth(c, 1))}
            aria-label="Next month"
            className="grid size-11 cursor-pointer place-items-center border border-rule transition-colors hover:bg-foreground/5"
          >
            <ChevronRight aria-hidden="true" className="size-5" strokeWidth={1.25} />
          </button>
        </div>
      </div>

      <table aria-labelledby={headingId} className="w-full table-fixed border-collapse">
        <thead>
          <tr>
            {weekdays.map(([short, full]) => (
              <th
                key={short}
                scope="col"
                abbr={full}
                className="pb-3 text-left label font-semibold text-muted-foreground"
              >
                {short}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {weeks.map((week) => (
            <tr key={week.find(Boolean)}>
              {week.map((date, i) => {
                const dayEvents = date ? byDate.get(date) : undefined;
                return (
                  <td
                    key={date ?? `pad-${i}`}
                    aria-current={date === today ? "date" : undefined}
                    className={cn(
                      "h-16 border border-rule p-1.5 align-top sm:h-24 sm:p-2",
                      !date && "bg-foreground/[0.03]",
                      date === today && "bg-ivory",
                    )}
                  >
                    {date ? (
                      <div className="flex h-full flex-col gap-1">
                        <span
                          className={cn(
                            "text-sm tabular",
                            date === today && "font-semibold text-terracotta",
                          )}
                        >
                          {Number(date.slice(8))}
                        </span>
                        {dayEvents?.map((event) => (
                          <a
                            key={event.slug}
                            href={`#event-${event.slug}`}
                            className="flex items-center gap-1.5 text-xs leading-tight underline-offset-2 hover:underline"
                          >
                            <span
                              aria-hidden="true"
                              className="size-1.5 shrink-0 rounded-full bg-terracotta"
                            />
                            <span className="sr-only sm:not-sr-only sm:line-clamp-2">
                              {event.title}
                            </span>
                          </a>
                        ))}
                      </div>
                    ) : null}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <p className="text-sm text-muted-foreground">
        <span
          aria-hidden="true"
          className="mr-2 inline-block size-1.5 rounded-full bg-terracotta align-middle"
        />
        Marked days have a program, gathering or booking.
      </p>
    </div>
  );
}
