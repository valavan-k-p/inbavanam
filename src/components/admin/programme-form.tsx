"use client";

import { useActionState } from "react";
import Link from "next/link";
import { type ProgrammeFormState } from "@/app/admin/(dashboard)/programmes/actions";

interface ProgrammeFormProps {
  initial: {
    slug: string;
    name: string;
    subtitle: string;
    tag: string;
    lead: string;
    highlights: string[];
    keyFact?: { label: string; value: string };
    sourceRef?: string;
    imagePath?: string;
    published?: boolean;
  };
  action: (prev: ProgrammeFormState, formData: FormData) => Promise<ProgrammeFormState>;
  cancelHref: string;
}

const inputClass =
  "min-h-11 w-full rounded-[var(--radius)] border border-input bg-cream/50 px-3.5 py-2 text-base text-ink transition-colors hover:border-foreground focus:border-foreground focus:outline-hidden aria-[invalid=true]:border-destructive";

export function ProgrammeForm({ initial, action, cancelHref }: ProgrammeFormProps) {
  const [state, formAction, pending] = useActionState(action, { status: "idle" });
  const errors = state.fieldErrors ?? {};

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
        <label htmlFor="name" className="text-sm font-semibold text-foreground">
          Programme Title <span className="text-terracotta">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          defaultValue={initial.name}
          required
          className={inputClass}
          aria-invalid={Boolean(errors.name)}
        />
        {errors.name && <p className="text-xs text-destructive">{errors.name[0]}</p>}
      </div>

      {/* Subtitle & Tag */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="subtitle" className="text-sm font-semibold text-foreground">
            Subtitle <span className="text-terracotta">*</span>
          </label>
          <input
            id="subtitle"
            name="subtitle"
            type="text"
            defaultValue={initial.subtitle}
            required
            className={inputClass}
            aria-invalid={Boolean(errors.subtitle)}
          />
          {errors.subtitle && <p className="text-xs text-destructive">{errors.subtitle[0]}</p>}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="tag" className="text-sm font-semibold text-foreground">
            Tag / Category <span className="text-terracotta">*</span>
          </label>
          <input
            id="tag"
            name="tag"
            type="text"
            defaultValue={initial.tag}
            required
            className={inputClass}
            aria-invalid={Boolean(errors.tag)}
          />
          {errors.tag && <p className="text-xs text-destructive">{errors.tag[0]}</p>}
        </div>
      </div>

      {/* Lead / Short description */}
      <div className="flex flex-col gap-2">
        <label htmlFor="lead" className="text-sm font-semibold text-foreground">
          Short Description (Lead) <span className="text-terracotta">*</span>
        </label>
        <textarea
          id="lead"
          name="lead"
          rows={3}
          defaultValue={initial.lead}
          required
          placeholder="Concise overview of what this programme achieves..."
          className={inputClass}
          aria-invalid={Boolean(errors.lead)}
        />
        {errors.lead && <p className="text-xs text-destructive">{errors.lead[0]}</p>}
      </div>

      {/* Highlights */}
      <div className="flex flex-col gap-2">
        <label htmlFor="highlights" className="text-sm font-semibold text-foreground">
          Detailed Highlights & Outcomes (one bullet point per line)
        </label>
        <textarea
          id="highlights"
          name="highlights"
          rows={6}
          defaultValue={initial.highlights.join("\n")}
          placeholder="Enter one highlight point per line..."
          className={inputClass}
        />
        <p className="text-xs text-muted-foreground">
          Each line will appear as an individual highlight item in the programme modal.
        </p>
      </div>

      {/* Key Fact */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="keyFactLabel" className="text-sm font-semibold text-foreground">
            Key Fact Label
          </label>
          <input
            id="keyFactLabel"
            name="keyFactLabel"
            type="text"
            defaultValue={initial.keyFact?.label ?? "Workshop Format"}
            className={inputClass}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="keyFactValue" className="text-sm font-semibold text-foreground">
            Key Fact Value
          </label>
          <input
            id="keyFactValue"
            name="keyFactValue"
            type="text"
            defaultValue={initial.keyFact?.value ?? "Experiential Programme"}
            className={inputClass}
          />
        </div>
      </div>

      {/* Source Reference & Image */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="sourceRef" className="text-sm font-semibold text-foreground">
            Source Reference
          </label>
          <input
            id="sourceRef"
            name="sourceRef"
            type="text"
            defaultValue={initial.sourceRef ?? ""}
            placeholder="e.g. Section 10: Inbavanam Profile PDF"
            className={inputClass}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="imagePath" className="text-sm font-semibold text-foreground">
            Image Path (Optional)
          </label>
          <input
            id="imagePath"
            name="imagePath"
            type="text"
            defaultValue={initial.imagePath ?? ""}
            placeholder="e.g. programmes/peacebuilding.jpg"
            className={inputClass}
          />
        </div>
      </div>

      {/* Published Toggle */}
      <div className="flex flex-col gap-2 rounded-[var(--radius)] border border-rule bg-card p-4">
        <label className="flex items-center gap-3 font-semibold text-foreground">
          <input
            type="checkbox"
            name="published"
            defaultChecked={initial.published !== false}
            className="size-5 accent-maroon"
          />
          <span>Visible on website</span>
        </label>
        <p className="text-xs text-muted-foreground">
          When unchecked, this programme card is hidden from the public initiatives grid.
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4 pt-4">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex min-h-11 cursor-pointer items-center justify-center rounded-[var(--radius)] bg-primary px-8 label text-primary-foreground transition-opacity disabled:opacity-60"
        >
          {pending ? "Saving..." : "Save Programme"}
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
