import Link from "next/link";
import { Plus } from "lucide-react";
import { requireAdmin } from "@/lib/auth";
import { EventListView, type AdminEventItem } from "@/components/admin/event-list-view";
import { events as localEvents } from "@/data/collections";

export const metadata = { title: "Events & Calendar" };

export default async function AdminEventsPage() {
  const { supabase } = await requireAdmin();

  const { data: rows, error } = await supabase
    .from("events")
    .select("id, title, slug, category, start_date, end_date, time_label, location, summary, published")
    .order("start_date", { ascending: false });

  let events: AdminEventItem[] = [];

  if (rows && rows.length > 0) {
    events = rows.map((r) => ({
      id: String(r.id),
      title: String(r.title),
      slug: String(r.slug),
      category: String(r.category),
      start_date: String(r.start_date),
      end_date: r.end_date ? String(r.end_date) : null,
      time_label: r.time_label ? String(r.time_label) : null,
      location: String(r.location ?? "Inbavanam"),
      summary: r.summary ? String(r.summary) : null,
      published: Boolean(r.published),
    }));
  } else if (!error && localEvents.length > 0) {
    // If Supabase table is empty, show local events as initial reference
    events = localEvents.map((e, idx) => ({
      id: `local-${idx}`,
      title: e.title,
      slug: e.slug,
      category: e.category,
      start_date: e.startDate,
      end_date: e.endDate ?? null,
      time_label: e.time ?? null,
      location: e.location,
      summary: e.summary,
      published: true,
    }));
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="label text-muted-foreground">Calendar Management</span>
          <h1 className="text-h2">Events</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage upcoming programs, workshops, community gatherings, and group bookings.
          </p>
        </div>
        <Link
          href="/admin/events/new"
          className="inline-flex min-h-11 items-center gap-2 rounded-[var(--radius)] bg-primary px-5 label text-primary-foreground shadow-xs transition-colors hover:bg-primary/90"
        >
          <Plus className="size-4" />
          <span>Add Event</span>
        </Link>
      </div>

      {error && (
        <div role="alert" className="rounded-[var(--radius)] border-l-4 border-destructive bg-card p-4 text-sm text-destructive">
          Could not load events from database: {error.message}
        </div>
      )}

      <EventListView events={events} />
    </div>
  );
}
