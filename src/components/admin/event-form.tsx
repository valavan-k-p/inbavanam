"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { CalendarDays, Clock, ImageIcon, MapPin } from "lucide-react";
import type { EventFormState } from "@/app/admin/(dashboard)/events/actions";

interface EventFormProps {
  initial?: {
    id?: string;
    title?: string;
    slug?: string;
    category?: string;
    start_date?: string;
    end_date?: string | null;
    time_label?: string | null;
    location?: string;
    summary?: string | null;
    image_path?: string | null;
    registration_url?: string | null;
    published?: boolean;
  };
  action: (prev: EventFormState, formData: FormData) => Promise<EventFormState>;
  cancelHref: string;
}

const inputClass =
  "min-h-11 w-full rounded-[var(--radius)] border border-input bg-cream/50 px-3.5 py-2 text-base text-ink transition-colors hover:border-foreground focus:border-foreground focus:outline-hidden aria-[invalid=true]:border-destructive";

const categories = [
  "Program",
  "Training",
  "Community",
  "Celebration",
  "Retreat",
  "Private booking",
] as const;

export function EventForm({ initial = {}, action, cancelHref }: EventFormProps) {
  const [state, formAction, pending] = useActionState(action, { status: "idle" });
  const errors = state.fieldErrors ?? {};

  // Extract start and end time from time_label if exists (e.g., "10:00 to 16:00")
  let defaultStartTime = "";
  let defaultEndTime = "";
  if (initial.time_label) {
    const parts = initial.time_label.split(/ to | - | – /i);
    if (parts[0]) defaultStartTime = parts[0].trim();
    if (parts[1]) defaultEndTime = parts[1].trim();
  }

  const [imagePath, setImagePath] = useState(initial.image_path ?? "");

  return (
    <form action={formAction} className="flex max-w-2xl flex-col gap-6">
      {state.status === "error" && state.message && (
        <div
          role="alert"
          className="rounded-[var(--radius)] border-l-4 border-destructive bg-card p-4 text-sm font-medium text-destructive shadow-xs"
        >
          {state.message}
        </div>
      )}

      {/* Title */}
      <div className="flex flex-col gap-2">
        <label htmlFor="title" className="text-sm font-semibold text-foreground">
          Event Title <span className="text-terracotta">*</span>
        </label>
        <input
          id="title"
          name="title"
          type="text"
          defaultValue={initial.title ?? ""}
          required
          placeholder="e.g. Nonviolent Communication Workshop"
          className={inputClass}
          aria-invalid={Boolean(errors.title)}
        />
        {errors.title && <p className="text-xs text-destructive">{errors.title[0]}</p>}
      </div>

      {/* Category */}
      <div className="flex flex-col gap-2">
        <label htmlFor="category" className="text-sm font-semibold text-foreground">
          Category <span className="text-terracotta">*</span>
        </label>
        <select
          id="category"
          name="category"
          defaultValue={initial.category ?? "Program"}
          required
          className={inputClass}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        {errors.category && <p className="text-xs text-destructive">{errors.category[0]}</p>}
      </div>

      {/* Dates: Start Date & End Date */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="start_date" className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
            <CalendarDays className="size-4 text-terracotta" />
            <span>Start Date</span> <span className="text-terracotta">*</span>
          </label>
          <input
            id="start_date"
            name="start_date"
            type="date"
            defaultValue={initial.start_date ?? ""}
            required
            className={inputClass}
            aria-invalid={Boolean(errors.start_date)}
          />
          {errors.start_date && (
            <p className="text-xs text-destructive">{errors.start_date[0]}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="end_date" className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
            <CalendarDays className="size-4 text-muted-foreground" />
            <span>End Date (optional)</span>
          </label>
          <input
            id="end_date"
            name="end_date"
            type="date"
            defaultValue={initial.end_date ?? ""}
            className={inputClass}
            aria-invalid={Boolean(errors.end_date)}
          />
          <p className="text-xs text-muted-foreground">Leave empty for a single-day event.</p>
          {errors.end_date && <p className="text-xs text-destructive">{errors.end_date[0]}</p>}
        </div>
      </div>

      {/* Times: Start Time & End Time */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="start_time" className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
            <Clock className="size-4 text-muted-foreground" />
            <span>Start Time</span>
          </label>
          <input
            id="start_time"
            name="start_time"
            type="time"
            defaultValue={defaultStartTime}
            className={inputClass}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="end_time" className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
            <Clock className="size-4 text-muted-foreground" />
            <span>End Time</span>
          </label>
          <input
            id="end_time"
            name="end_time"
            type="time"
            defaultValue={defaultEndTime}
            className={inputClass}
          />
        </div>
      </div>

      {/* Location */}
      <div className="flex flex-col gap-2">
        <label htmlFor="location" className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
          <MapPin className="size-4 text-muted-foreground" />
          <span>Location</span> <span className="text-terracotta">*</span>
        </label>
        <input
          id="location"
          name="location"
          type="text"
          defaultValue={initial.location ?? "Inbavanam"}
          required
          className={inputClass}
          aria-invalid={Boolean(errors.location)}
        />
        {errors.location && <p className="text-xs text-destructive">{errors.location[0]}</p>}
      </div>

      {/* Summary / Description */}
      <div className="flex flex-col gap-2">
        <label htmlFor="summary" className="text-sm font-semibold text-foreground">
          Description / Summary
        </label>
        <textarea
          id="summary"
          name="summary"
          rows={4}
          defaultValue={initial.summary ?? ""}
          placeholder="Brief summary of the schedule, purpose, and who can attend..."
          className={inputClass}
        />
      </div>

      {/* Image Reference */}
      <div className="flex flex-col gap-2">
        <label htmlFor="image_path" className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
          <ImageIcon className="size-4 text-muted-foreground" />
          <span>Event Image / Storage Path</span>
        </label>
        <input
          id="image_path"
          name="image_path"
          type="text"
          value={imagePath}
          onChange={(e) => setImagePath(e.target.value)}
          placeholder="e.g. events/workshop.jpg or https://..."
          className={inputClass}
        />
        <p className="text-xs text-muted-foreground">
          Enter a path from the Media library (or select from Media section).
        </p>
      </div>

      {/* Registration Link */}
      <div className="flex flex-col gap-2">
        <label htmlFor="registration_url" className="text-sm font-semibold text-foreground">
          External Registration URL (optional)
        </label>
        <input
          id="registration_url"
          name="registration_url"
          type="url"
          defaultValue={initial.registration_url ?? ""}
          placeholder="https://forms.gle/... (if empty, links to Inbavanam contact form)"
          className={inputClass}
          aria-invalid={Boolean(errors.registration_url)}
        />
        {errors.registration_url && (
          <p className="text-xs text-destructive">{errors.registration_url[0]}</p>
        )}
      </div>

      {/* Publish Status */}
      <div className="flex flex-col gap-2 rounded-[var(--radius)] border border-rule bg-card p-4">
        <label className="flex items-center gap-3 font-semibold text-foreground">
          <input
            type="checkbox"
            name="published"
            defaultChecked={initial.published === true}
            className="size-5 accent-maroon"
          />
          <span>Publish on public calendar</span>
        </label>
        <p className="text-xs text-muted-foreground">
          When unchecked, this event is saved as a draft and visible only to administrators.
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4 pt-4">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex min-h-11 cursor-pointer items-center justify-center rounded-[var(--radius)] bg-primary px-8 label text-primary-foreground transition-opacity disabled:opacity-60"
        >
          {pending ? "Saving..." : "Save Event"}
        </button>
        <Link
          href={cancelHref}
          className="inline-flex min-h-11 items-center px-4 label text-muted-foreground underline-offset-4 hover:underline"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
