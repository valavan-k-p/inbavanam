import { describe, expect, it } from "vitest";
import type { EventItem } from "@/types/content";
import { eventDates, formatDateRange, monthGrid, shiftMonth, splitEvents, todayISO } from "./dates";

describe("monthGrid", () => {
  it("starts weeks on Monday and pads with nulls", () => {
    // 1 September 2026 is a Tuesday.
    const weeks = monthGrid(2026, 9);
    expect(weeks[0]).toEqual([
      null,
      "2026-09-01",
      "2026-09-02",
      "2026-09-03",
      "2026-09-04",
      "2026-09-05",
      "2026-09-06",
    ]);
    expect(weeks.flat().filter(Boolean)).toHaveLength(30);
    expect(weeks.every((w) => w.length === 7)).toBe(true);
  });

  it("handles leap-year February", () => {
    expect(monthGrid(2028, 2).flat().filter(Boolean)).toHaveLength(29);
  });
});

describe("shiftMonth", () => {
  it("crosses year boundaries", () => {
    expect(shiftMonth("2026-12", 1)).toBe("2027-01");
    expect(shiftMonth("2026-01", -1)).toBe("2025-12");
  });
});

describe("eventDates", () => {
  it("lists each day of a multi-day event", () => {
    expect(
      eventDates({
        slug: "x",
        title: "x",
        category: "Program",
        startDate: "2026-02-27",
        endDate: "2026-03-02",
        location: "",
        summary: "",
      }),
    ).toEqual(["2026-02-27", "2026-02-28", "2026-03-01", "2026-03-02"]);
  });
});

const event = (slug: string, startDate: string, endDate?: string): EventItem => ({
  slug,
  title: slug,
  category: "Program",
  startDate,
  endDate,
  location: "Inbavanam",
  summary: "Test fixture",
});

describe("formatDateRange", () => {
  it("formats a single day", () => {
    expect(formatDateRange("2026-10-02")).toBe("2 October 2026");
  });

  it("omits the repeated year within one year", () => {
    expect(formatDateRange("2026-10-02", "2026-10-04")).toBe("2 October – 4 October 2026");
  });

  it("keeps both years across a year boundary", () => {
    expect(formatDateRange("2026-12-30", "2027-01-02")).toBe("30 December 2026 – 2 January 2027");
  });
});

describe("todayISO", () => {
  it("uses India Standard Time", () => {
    // 20:00 UTC on 1 Jan is already 2 Jan in India (UTC+5:30).
    expect(todayISO(new Date("2026-01-01T20:00:00Z"))).toBe("2026-01-02");
  });
});

describe("splitEvents", () => {
  it("orders upcoming soonest first and past most recent first", () => {
    const { upcoming, past } = splitEvents(
      [
        event("a", "2026-01-10"),
        event("b", "2026-03-01"),
        event("c", "2025-12-01"),
        event("d", "2026-02-01"),
      ],
      "2026-01-15",
    );
    expect(upcoming.map((e) => e.slug)).toEqual(["d", "b"]);
    expect(past.map((e) => e.slug)).toEqual(["a", "c"]);
  });

  it("treats a multi-day event as upcoming until its last day", () => {
    const { upcoming } = splitEvents([event("camp", "2026-01-10", "2026-01-20")], "2026-01-15");
    expect(upcoming).toHaveLength(1);
  });
});
