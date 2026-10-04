import Link from "next/link";
import {
  CalendarDays,
  Clock,
  FileText,
  Image as ImageIcon,
  Inbox,
  Plus,
  Sparkles,
  Users,
} from "lucide-react";
import { requireAdmin } from "@/lib/auth";
import { programIndex } from "@/data/programs";
import { galleryItems } from "@/data/collections";

export const metadata = { title: "Dashboard" };

export default async function AdminDashboardPage() {
  const { supabase, name } = await requireAdmin();

  const today = new Date().toISOString().split("T")[0];

  // Fetch real counts from Supabase
  const [
    eventsTotalRes,
    eventsUpcomingRes,
    upcomingListRes,
    programsCountRes,
    galleryCountRes,
    enquiriesNewRes,
    recentEnquiriesRes,
    recentSettingsRes,
  ] = await Promise.all([
    supabase.from("events").select("id", { count: "exact", head: true }),
    supabase.from("events").select("id", { count: "exact", head: true }).gte("start_date", today),
    supabase
      .from("events")
      .select("id, title, category, start_date, location, published")
      .gte("start_date", today)
      .order("start_date")
      .limit(4),
    supabase.from("programs").select("id", { count: "exact", head: true }),
    supabase.from("gallery_items").select("id", { count: "exact", head: true }),
    supabase.from("enquiries").select("id", { count: "exact", head: true }).eq("status", "new"),
    supabase
      .from("enquiries")
      .select("id, name, email, type, created_at, status")
      .order("created_at", { ascending: false })
      .limit(4),
    supabase
      .from("site_settings")
      .select("key, updated_at")
      .order("updated_at", { ascending: false })
      .limit(4),
  ]);

  const totalEvents = eventsTotalRes.count ?? 0;
  const upcomingEvents = eventsUpcomingRes.count ?? 0;
  // If database programs table is empty, show the 12 core programmes from content model
  const totalPrograms = programsCountRes.count && programsCountRes.count > 0
    ? programsCountRes.count
    : programIndex.length;
  // If gallery table is empty, show local count
  const totalMedia = galleryCountRes.count && galleryCountRes.count > 0
    ? galleryCountRes.count
    : galleryItems.length;
  const newEnquiries = enquiriesNewRes.count ?? 0;

  const upcomingList = upcomingListRes.data ?? [];
  const recentEnquiries = recentEnquiriesRes.data ?? [];
  const recentSettings = recentSettingsRes.data ?? [];

  return (
    <div className="flex flex-col gap-10">
      {/* Welcome Header */}
      <div className="flex flex-col gap-2 border-b border-rule pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className="label text-muted-foreground">Admin Overview</span>
          <h1 className="text-h2">Welcome back, {name}</h1>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/events/new"
            className="inline-flex min-h-11 items-center gap-2 rounded-[var(--radius)] bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-xs transition-colors hover:bg-primary/90"
          >
            <Plus className="size-4" />
            <span>Add Event</span>
          </Link>
          <Link
            href="/admin/media"
            className="inline-flex min-h-11 items-center gap-2 rounded-[var(--radius)] border border-rule bg-card px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-foreground"
          >
            <ImageIcon className="size-4" />
            <span>Upload Media</span>
          </Link>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Events */}
        <Link
          href="/admin/events"
          className="group flex flex-col justify-between rounded-[var(--radius)] border border-rule bg-card p-6 shadow-xs transition-colors hover:border-foreground"
        >
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="label text-xs">Total Events</span>
            <CalendarDays className="size-5 text-terracotta" />
          </div>
          <div className="mt-4 flex items-baseline gap-3">
            <span className="font-display text-4xl font-semibold tabular">{totalEvents}</span>
            <span className="text-xs text-muted-foreground">
              {upcomingEvents} upcoming
            </span>
          </div>
          <span className="mt-4 text-xs font-semibold label text-terracotta underline-offset-4 group-hover:underline">
            Manage Calendar →
          </span>
        </Link>

        {/* Programmes */}
        <Link
          href="/admin/programmes"
          className="group flex flex-col justify-between rounded-[var(--radius)] border border-rule bg-card p-6 shadow-xs transition-colors hover:border-foreground"
        >
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="label text-xs">Programmes</span>
            <Sparkles className="size-5 text-walnut" />
          </div>
          <div className="mt-4 flex items-baseline gap-3">
            <span className="font-display text-4xl font-semibold tabular">{totalPrograms}</span>
            <span className="text-xs text-muted-foreground">initiatives active</span>
          </div>
          <span className="mt-4 text-xs font-semibold label text-walnut underline-offset-4 group-hover:underline">
            Manage Programmes →
          </span>
        </Link>

        {/* Media */}
        <Link
          href="/admin/media"
          className="group flex flex-col justify-between rounded-[var(--radius)] border border-rule bg-card p-6 shadow-xs transition-colors hover:border-foreground"
        >
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="label text-xs">Media Items</span>
            <ImageIcon className="size-5 text-olive" />
          </div>
          <div className="mt-4 flex items-baseline gap-3">
            <span className="font-display text-4xl font-semibold tabular">{totalMedia}</span>
            <span className="text-xs text-muted-foreground">in library</span>
          </div>
          <span className="mt-4 text-xs font-semibold label text-olive underline-offset-4 group-hover:underline">
            Media Library →
          </span>
        </Link>

        {/* Enquiries */}
        <Link
          href="/admin/enquiries"
          className="group flex flex-col justify-between rounded-[var(--radius)] border border-rule bg-cream p-6 shadow-xs transition-colors hover:border-foreground"
        >
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="label text-xs">New Enquiries</span>
            <Inbox className="size-5 text-maroon" />
          </div>
          <div className="mt-4 flex items-baseline gap-3">
            <span className="font-display text-4xl font-semibold text-maroon tabular">
              {newEnquiries}
            </span>
            <span className="text-xs text-maroon/70">awaiting reply</span>
          </div>
          <span className="mt-4 text-xs font-semibold label text-maroon underline-offset-4 group-hover:underline">
            Open Inbox →
          </span>
        </Link>
      </div>

      {/* Main Content Grid: Upcoming Events & Quick Navigation */}
      <div className="grid gap-8 lg:grid-cols-12">
        {/* Left column (7 cols): Upcoming Events */}
        <section className="flex flex-col gap-4 lg:col-span-7">
          <div className="flex items-center justify-between">
            <h2 className="text-h3">Upcoming Events</h2>
            <Link
              href="/admin/events"
              className="text-xs font-semibold label text-terracotta underline-offset-4 hover:underline"
            >
              View all
            </Link>
          </div>

          {upcomingList.length > 0 ? (
            <div className="flex flex-col divide-y divide-rule rounded-[var(--radius)] border border-rule bg-card">
              {upcomingList.map((event) => (
                <div
                  key={event.id}
                  className="flex items-center justify-between gap-4 p-4 transition-colors hover:bg-background/40"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold label text-terracotta">
                        {event.category}
                      </span>
                      {!event.published && (
                        <span className="rounded bg-ivory px-1.5 py-0.5 text-[0.65rem] font-bold text-muted-foreground">
                          Draft
                        </span>
                      )}
                    </div>
                    <Link
                      href={`/admin/events/${event.id}`}
                      className="block truncate font-semibold text-foreground hover:underline"
                    >
                      {event.title}
                    </Link>
                    <p className="text-xs text-muted-foreground">
                      {event.start_date} • {event.location}
                    </p>
                  </div>
                  <Link
                    href={`/admin/events/${event.id}`}
                    className="shrink-0 text-xs font-semibold label underline-offset-4 hover:underline"
                  >
                    Edit
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-3 rounded-[var(--radius)] border border-dashed border-rule bg-card/60 p-8 text-center">
              <CalendarDays className="size-8 text-muted-foreground/60" />
              <p className="font-display text-lg">No upcoming events scheduled</p>
              <p className="max-w-xs text-xs text-muted-foreground">
                Add programs, workshops, or group bookings to make them visible on the calendar.
              </p>
              <Link
                href="/admin/events/new"
                className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold label text-terracotta hover:underline"
              >
                <Plus className="size-3.5" />
                Add first event
              </Link>
            </div>
          )}

          {/* Recent Inbound Enquiries */}
          <div className="mt-4 flex items-center justify-between">
            <h2 className="text-h3">Recent Enquiries</h2>
            <Link
              href="/admin/enquiries"
              className="text-xs font-semibold label text-terracotta underline-offset-4 hover:underline"
            >
              View inbox
            </Link>
          </div>
          {recentEnquiries.length > 0 ? (
            <div className="flex flex-col divide-y divide-rule rounded-[var(--radius)] border border-rule bg-card">
              {recentEnquiries.map((enq) => (
                <div key={enq.id} className="flex items-center justify-between p-4">
                  <div className="min-w-0">
                    <p className="truncate font-semibold text-foreground">{enq.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {enq.type} enquiry • {enq.email}
                    </p>
                  </div>
                  <span
                    className={
                      enq.status === "new"
                        ? "rounded bg-terracotta/15 px-2 py-0.5 text-xs font-bold text-terracotta capitalize"
                        : "rounded bg-ivory px-2 py-0.5 text-xs text-muted-foreground capitalize"
                    }
                  >
                    {enq.status}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No enquiries received yet.</p>
          )}
        </section>

        {/* Right column (5 cols): Content Management Fast Links */}
        <section className="flex flex-col gap-4 lg:col-span-5">
          <h2 className="text-h3">Content Management</h2>
          <div className="flex flex-col gap-3">
            <Link
              href="/admin/content"
              className="flex items-start gap-4 rounded-[var(--radius)] border border-rule bg-card p-4 transition-colors hover:border-foreground"
            >
              <div className="grid size-10 shrink-0 place-items-center rounded bg-cream text-maroon">
                <FileText className="size-5" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">Website Copy & Sections</h3>
                <p className="text-xs text-muted-foreground">
                  Edit Homepage Hero, About story, The Land, Architecture, and Stay content.
                </p>
              </div>
            </Link>

            <Link
              href="/admin/programmes"
              className="flex items-start gap-4 rounded-[var(--radius)] border border-rule bg-card p-4 transition-colors hover:border-foreground"
            >
              <div className="grid size-10 shrink-0 place-items-center rounded bg-cream text-walnut">
                <Sparkles className="size-5" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">12 Work Initiatives</h3>
                <p className="text-xs text-muted-foreground">
                  Update descriptions, key facts, highlights, and partner references.
                </p>
              </div>
            </Link>

            <Link
              href="/admin/profile"
              className="flex items-start gap-4 rounded-[var(--radius)] border border-rule bg-card p-4 transition-colors hover:border-foreground"
            >
              <div className="grid size-10 shrink-0 place-items-center rounded bg-cream text-olive">
                <Users className="size-5" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">Organisation Profile & Founders</h3>
                <p className="text-xs text-muted-foreground">
                  Manage Gladston & Florina profiles, village partnerships, and history.
                </p>
              </div>
            </Link>

            <Link
              href="/admin/media"
              className="flex items-start gap-4 rounded-[var(--radius)] border border-rule bg-card p-4 transition-colors hover:border-foreground"
            >
              <div className="grid size-10 shrink-0 place-items-center rounded bg-cream text-terracotta">
                <ImageIcon className="size-5" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">Media & Image Library</h3>
                <p className="text-xs text-muted-foreground">
                  Upload photographs, manage alt text, and copy paths for website sections.
                </p>
              </div>
            </Link>
          </div>

          {/* Audit: Recently updated content */}
          {recentSettings.length > 0 && (
            <div className="mt-4 rounded-[var(--radius)] border border-rule bg-card p-4">
              <span className="flex items-center gap-1.5 text-xs label text-muted-foreground">
                <Clock className="size-3.5" />
                Recently Modified Content
              </span>
              <ul className="mt-3 flex flex-col gap-2 text-xs">
                {recentSettings.map((s) => (
                  <li key={s.key} className="flex items-center justify-between">
                    <span className="font-mono text-muted-foreground">{s.key}</span>
                    <span className="text-muted-foreground">
                      {new Date(s.updated_at).toLocaleDateString("en-IN", {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
