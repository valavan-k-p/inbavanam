"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Calendar as CalendarIcon,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock,
  Edit,
  List,
  MapPin,
  Plus,
} from "lucide-react";
import { eventDates, formatDateRange, monthGrid, shiftMonth } from "@/lib/dates";
import { toggleEventPublish } from "@/app/admin/(dashboard)/events/actions";
import { type EventCategory } from "@/types/content";

export interface AdminEventItem {
  id: string;
  title: string;
  slug: string;
  category: string;
  start_date: string;
  end_date: string | null;
  time_label: string | null;
  location: string;
  summary: string | null;
  published: boolean;
}

interface EventListViewProps {
  events: AdminEventItem[];
}

const categories = [
  "All",
  "Program",
  "Training",
  "Community",
  "Celebration",
  "Retreat",
  "Private booking",
] as const;

export function EventListView({ events }: EventListViewProps) {
  const [view, setView] = useState<"list" | "calendar">("list");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const today = new Date().toISOString().split("T")[0];
  const [cursor, setCursor] = useState(today.slice(0, 7));
  const [year, month] = cursor.split("-").map(Number);
  const weeks = monthGrid(year, month);

  const filteredEvents = useMemo(() => {
    if (selectedCategory === "All") return events;
    return events.filter((e) => e.category === selectedCategory);
  }, [events, selectedCategory]);

  const byDate = useMemo(() => {
    const map = new Map<string, AdminEventItem[]>();
    for (const event of filteredEvents) {
      // Create EventItem-compatible shape for dates helper
      const dates = eventDates({
        slug: event.slug,
        title: event.title,
        category: event.category as EventCategory,
        startDate: event.start_date,
        endDate: event.end_date ?? undefined,
        location: event.location,
        summary: event.summary ?? "",
      });
      for (const d of dates) {
        map.set(d, [...(map.get(d) ?? []), event]);
      }
    }
    return map;
  }, [filteredEvents]);

  const monthLabel = new Intl.DateTimeFormat("en-IN", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, month - 1, 1)));

  return (
    <div className="flex flex-col gap-6">
      {/* Top Filter and View Switcher Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-rule pb-4">
        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
                selectedCategory === cat
                  ? "bg-primary text-primary-foreground"
                  : "border border-rule bg-card text-muted-foreground hover:border-foreground hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* View Toggle Buttons */}
        <div className="flex items-center gap-2">
          <div className="inline-flex rounded-[var(--radius)] border border-rule bg-card p-0.5">
            <button
              type="button"
              onClick={() => setView("list")}
              className={`inline-flex items-center gap-1.5 rounded-[var(--radius)] px-3 py-1.5 text-xs font-semibold ${
                view === "list"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <List className="size-3.5" />
              <span>List</span>
            </button>
            <button
              type="button"
              onClick={() => setView("calendar")}
              className={`inline-flex items-center gap-1.5 rounded-[var(--radius)] px-3 py-1.5 text-xs font-semibold ${
                view === "calendar"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <CalendarIcon className="size-3.5" />
              <span>Calendar</span>
            </button>
          </div>

          <Link
            href="/admin/events/new"
            className="inline-flex min-h-9 items-center gap-1.5 rounded-[var(--radius)] bg-primary px-3 py-1.5 text-xs label text-primary-foreground hover:bg-primary/90"
          >
            <Plus className="size-3.5" />
            <span>Add Event</span>
          </Link>
        </div>
      </div>

      {/* List View */}
      {view === "list" && (
        <div className="flex flex-col gap-4">
          {filteredEvents.length > 0 ? (
            <div className="overflow-x-auto rounded-[var(--radius)] border border-rule bg-card shadow-xs">
              <table className="w-full min-w-[40rem] text-left text-sm">
                <thead className="border-b border-rule bg-background/50">
                  <tr>
                    <th scope="col" className="py-3 px-4 label text-muted-foreground">
                      Title
                    </th>
                    <th scope="col" className="py-3 px-4 label text-muted-foreground">
                      Category
                    </th>
                    <th scope="col" className="py-3 px-4 label text-muted-foreground">
                      Date & Time
                    </th>
                    <th scope="col" className="py-3 px-4 label text-muted-foreground">
                      Location
                    </th>
                    <th scope="col" className="py-3 px-4 label text-muted-foreground">
                      Status
                    </th>
                    <th scope="col" className="py-3 px-4 text-right label text-muted-foreground">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-rule">
                  {filteredEvents.map((event) => (
                    <tr key={event.id} className="transition-colors hover:bg-background/40">
                      <td className="py-3.5 px-4 font-semibold">
                        <Link
                          href={`/admin/events/${event.id}`}
                          className="hover:underline hover:text-terracotta"
                        >
                          {event.title}
                        </Link>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="rounded bg-ivory px-2 py-0.5 text-xs font-semibold text-walnut">
                          {event.category}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-xs text-muted-foreground">
                        <p className="font-medium text-foreground">
                          {formatDateRange(event.start_date, event.end_date ?? undefined)}
                        </p>
                        {event.time_label && (
                          <p className="flex items-center gap-1 text-[0.7rem] text-muted-foreground">
                            <Clock className="size-3" />
                            {event.time_label}
                          </p>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="size-3 text-muted-foreground" />
                          {event.location}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <button
                          type="button"
                          onClick={() => toggleEventPublish(event.id, event.published)}
                          className={`rounded px-2 py-0.5 text-xs font-bold transition-colors ${
                            event.published
                              ? "bg-olive/15 text-olive hover:bg-olive/25"
                              : "bg-terracotta/15 text-terracotta hover:bg-terracotta/25"
                          }`}
                        >
                          {event.published ? "Published" : "Draft"}
                        </button>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-3">
                          <Link
                            href={`/admin/events/${event.id}`}
                            className="inline-flex items-center gap-1 text-xs font-semibold text-foreground hover:underline"
                          >
                            <Edit className="size-3.5" />
                            <span>Edit</span>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-3 rounded-[var(--radius)] border border-dashed border-rule p-10 text-center">
              <CalendarDays className="size-8 text-muted-foreground" />
              <p className="font-display text-lg">No events found in this category.</p>
              <Link
                href="/admin/events/new"
                className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold label text-terracotta hover:underline"
              >
                <Plus className="size-3.5" />
                Add an Event
              </Link>
            </div>
          )}
        </div>
      )}

      {/* Calendar View */}
      {view === "calendar" && (
        <div className="flex flex-col gap-4 rounded-[var(--radius)] border border-rule bg-card p-6 shadow-xs">
          {/* Month Switcher */}
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl font-semibold text-foreground">{monthLabel}</h2>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setCursor((c) => shiftMonth(c, -1))}
                aria-label="Previous month"
                className="grid size-9 place-items-center rounded border border-rule bg-background hover:bg-foreground/5"
              >
                <ChevronLeft className="size-4" />
              </button>
              <button
                type="button"
                onClick={() => setCursor((c) => shiftMonth(c, 1))}
                aria-label="Next month"
                className="grid size-9 place-items-center rounded border border-rule bg-background hover:bg-foreground/5"
              >
                <ChevronRight className="size-4" />
              </button>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 border-t border-l border-rule">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
              <div
                key={d}
                className="border-r border-b border-rule bg-background/50 p-2 text-center text-xs font-semibold label text-muted-foreground"
              >
                {d}
              </div>
            ))}
            {weeks.flat().map((iso, idx) => {
              const dayEvents = iso ? byDate.get(iso) ?? [] : [];
              const isToday = iso === today;
              const inMonth = Boolean(iso);
              const day = iso ? Number(iso.slice(8)) : "";
              return (
                <div
                  key={iso ?? `pad-${idx}`}
                  className={`min-h-24 border-r border-b border-rule p-2 transition-colors ${
                    inMonth ? "bg-card" : "bg-background/25 text-muted-foreground/40"
                  } ${isToday ? "bg-cream/40" : ""}`}
                >
                  <div className="flex items-center justify-between text-xs">
                    <span
                      className={`font-semibold tabular ${
                        isToday
                          ? "grid size-5 place-items-center rounded-full bg-terracotta text-ivory text-[0.7rem]"
                          : ""
                      }`}
                    >
                      {day}
                    </span>
                    {dayEvents.length > 0 && (
                      <span className="text-[0.65rem] text-muted-foreground">
                        {dayEvents.length} event{dayEvents.length > 1 ? "s" : ""}
                      </span>
                    )}
                  </div>
                  <div className="mt-1 flex flex-col gap-1">
                    {dayEvents.slice(0, 3).map((e) => (
                      <Link
                        key={e.id}
                        href={`/admin/events/${e.id}`}
                        className={`truncate rounded px-1.5 py-0.5 text-[0.68rem] font-medium transition-opacity hover:opacity-80 ${
                          e.published
                            ? "bg-primary text-primary-foreground"
                            : "bg-terracotta/20 text-terracotta"
                        }`}
                        title={e.title}
                      >
                        {e.title}
                      </Link>
                    ))}
                    {dayEvents.length > 3 && (
                      <span className="text-[0.65rem] text-muted-foreground">
                        +{dayEvents.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
