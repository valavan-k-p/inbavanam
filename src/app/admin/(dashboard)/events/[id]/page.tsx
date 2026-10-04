import { notFound } from "next/navigation";
import { z } from "zod";
import { requireAdmin } from "@/lib/auth";
import { EventForm } from "@/components/admin/event-form";
import { deleteEvent, saveEvent } from "../actions";

type Props = { params: Promise<{ id: string }> };

export const metadata = { title: "Edit Event" };

export default async function EditEventPage({ params }: Props) {
  const { id } = await params;
  if (!z.uuid().safeParse(id).success) notFound();

  const { supabase } = await requireAdmin();

  const { data: event, error } = await supabase
    .from("events")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !event) notFound();

  return (
    <div className="flex max-w-2xl flex-col gap-10">
      <div>
        <span className="label text-muted-foreground">Events / Calendar</span>
        <h1 className="text-h2">Edit Event</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Update the event schedule, details, status, or location.
        </p>
      </div>

      <EventForm
        initial={event}
        action={saveEvent.bind(null, id)}
        cancelHref="/admin/events"
      />

      {/* Delete Confirmation Box */}
      <section
        aria-labelledby="danger-title"
        className="flex flex-col gap-4 rounded-[var(--radius)] border border-destructive/30 bg-destructive/5 p-6"
      >
        <h2 id="danger-title" className="text-h3 text-destructive">
          Delete Event
        </h2>
        <p className="text-sm text-muted-foreground">
          Permanently removes this event from the database and public calendar. Unpublishing is
          recommended if you only want to hide it temporarily.
        </p>
        <form action={deleteEvent.bind(null, id)} className="flex flex-col items-start gap-4">
          <label className="flex items-center gap-3 text-sm font-semibold text-foreground">
            <input type="checkbox" name="confirm" required className="size-5 accent-maroon" />
            <span>I confirm that I want to permanently delete this event.</span>
          </label>
          <button
            type="submit"
            className="min-h-11 cursor-pointer rounded-[var(--radius)] border border-destructive bg-card px-5 label text-destructive transition-colors hover:bg-destructive hover:text-ivory"
          >
            Delete permanently
          </button>
        </form>
      </section>
    </div>
  );
}
