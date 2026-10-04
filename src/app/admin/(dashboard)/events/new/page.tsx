import { requireAdmin } from "@/lib/auth";
import { EventForm } from "@/components/admin/event-form";
import { saveEvent } from "../actions";

export const metadata = { title: "Add Event" };

export default async function NewEventPage() {
  await requireAdmin();

  return (
    <div className="flex flex-col gap-8">
      <div>
        <span className="label text-muted-foreground">Events / Calendar</span>
        <h1 className="text-h2">Add New Event</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Create a program workshop, outbound training, community gathering, or private retreat.
        </p>
      </div>

      <EventForm
        action={saveEvent.bind(null, null)}
        cancelHref="/admin/events"
      />
    </div>
  );
}
