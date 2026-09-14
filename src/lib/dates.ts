import type { EventItem } from "@/types/content";

const TIME_ZONE = "Asia/Kolkata";

const dayMonthYear = new Intl.DateTimeFormat("en-IN", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

const dayMonth = new Intl.DateTimeFormat("en-IN", {
  day: "numeric",
  month: "long",
  timeZone: "UTC",
});

/** Parses a YYYY-MM-DD string as a calendar date, independent of the host time zone. */
export function parseISODate(value: string): Date {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day));
}

/** Today's calendar date at Inbavanam (India Standard Time), as YYYY-MM-DD. */
export function todayISO(now: Date = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: TIME_ZONE }).format(now);
}

export function formatDateRange(start: string, end?: string): string {
  const startDate = parseISODate(start);
  if (!end || end === start) return dayMonthYear.format(startDate);
  const endDate = parseISODate(end);
  const sameYear = startDate.getUTCFullYear() === endDate.getUTCFullYear();
  return `${(sameYear ? dayMonth : dayMonthYear).format(startDate)} – ${dayMonthYear.format(endDate)}`;
}

const toISO = (d: Date) => d.toISOString().slice(0, 10);

/** Weeks of a month (Monday first) as ISO dates, padded with nulls. `month` is 1-12. */
export function monthGrid(year: number, month: number): (string | null)[][] {
  const first = new Date(Date.UTC(year, month - 1, 1));
  const lead = (first.getUTCDay() + 6) % 7;
  const days = new Date(Date.UTC(year, month, 0)).getUTCDate();
  const cells: (string | null)[] = Array.from({ length: lead }, () => null);
  for (let d = 1; d <= days; d++) cells.push(toISO(new Date(Date.UTC(year, month - 1, d))));
  while (cells.length % 7) cells.push(null);
  return Array.from({ length: cells.length / 7 }, (_, w) => cells.slice(w * 7, w * 7 + 7));
}

/** Moves a YYYY-MM cursor by whole months. */
export function shiftMonth(cursor: string, delta: number): string {
  const [year, month] = cursor.split("-").map(Number);
  return toISO(new Date(Date.UTC(year, month - 1 + delta, 1))).slice(0, 7);
}

/** Every calendar date an event covers (capped at 62 days). */
export function eventDates(event: EventItem): string[] {
  const dates: string[] = [];
  const end = event.endDate ?? event.startDate;
  for (
    let d = parseISODate(event.startDate);
    toISO(d) <= end && dates.length < 62;
    d.setUTCDate(d.getUTCDate() + 1)
  ) {
    dates.push(toISO(d));
  }
  return dates;
}

/** Splits events into upcoming (soonest first) and past (most recent first). */
export function splitEvents(events: EventItem[], today: string = todayISO()) {
  const upcoming: EventItem[] = [];
  const past: EventItem[] = [];
  for (const event of events) {
    ((event.endDate ?? event.startDate) >= today ? upcoming : past).push(event);
  }
  upcoming.sort((a, b) => a.startDate.localeCompare(b.startDate));
  past.sort((a, b) => b.startDate.localeCompare(a.startDate));
  return { upcoming, past };
}
