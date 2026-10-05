"use client";

import { useActionState, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, RotateCcw } from "lucide-react";
import { type ProgrammeFormState } from "@/app/admin/(dashboard)/programmes/actions";
import { ImageInput } from "./image-input";

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

  // Form field states for undo & dirty tracking
  const [name, setName] = useState(initial.name);
  const [subtitle, setSubtitle] = useState(initial.subtitle);
  const [tag, setTag] = useState(initial.tag);
  const [lead, setLead] = useState(initial.lead);
  const [highlights, setHighlights] = useState(initial.highlights.join("\n"));
  const [keyFactLabel, setKeyFactLabel] = useState(initial.keyFact?.label ?? "Workshop Format");
  const [keyFactValue, setKeyFactValue] = useState(initial.keyFact?.value ?? "Experiential Programme");
  const [sourceRef, setSourceRef] = useState(initial.sourceRef ?? "");
  const [imagePath, setImagePath] = useState(initial.imagePath ?? "");
  const [published, setPublished] = useState(initial.published !== false);

  const isDirty =
    name !== initial.name ||
    subtitle !== initial.subtitle ||
    tag !== initial.tag ||
    lead !== initial.lead ||
    highlights !== initial.highlights.join("\n") ||
    keyFactLabel !== (initial.keyFact?.label ?? "Workshop Format") ||
    keyFactValue !== (initial.keyFact?.value ?? "Experiential Programme") ||
    sourceRef !== (initial.sourceRef ?? "") ||
    imagePath !== (initial.imagePath ?? "") ||
    published !== (initial.published !== false);

  // Warn on browser navigation if unsaved
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDirty]);

  const handleUndo = () => {
    setName(initial.name);
    setSubtitle(initial.subtitle);
    setTag(initial.tag);
    setLead(initial.lead);
    setHighlights(initial.highlights.join("\n"));
    setKeyFactLabel(initial.keyFact?.label ?? "Workshop Format");
    setKeyFactValue(initial.keyFact?.value ?? "Experiential Programme");
    setSourceRef(initial.sourceRef ?? "");
    setImagePath(initial.imagePath ?? "");
    setPublished(initial.published !== false);
  };

  return (
    <form action={formAction} className="flex max-w-2xl flex-col gap-6">
      {/* Location Badge & Preview */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-[var(--radius)] border border-rule bg-card/60 px-4 py-2.5 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-muted-foreground uppercase tracking-wider">
            Where does this appear:
          </span>
          <span className="rounded-full bg-cream px-2.5 py-0.5 font-medium text-foreground">
            Our Work Page — Initiatives Grid
          </span>
        </div>
        <a
          href="/our-work#initiatives"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-semibold text-olive hover:underline"
        >
          <span>View on Site</span>
          <ArrowUpRight className="size-3.5" />
        </a>
      </div>

      {isDirty && (
        <div className="flex items-center justify-between rounded-[var(--radius)] border border-terracotta/30 bg-terracotta/10 px-4 py-2 text-xs font-semibold text-terracotta">
          <span>You have unsaved changes</span>
          <button
            type="button"
            onClick={handleUndo}
            className="inline-flex cursor-pointer items-center gap-1 text-ink underline hover:text-foreground"
          >
            <RotateCcw className="size-3" />
            <span>Undo Changes</span>
          </button>
        </div>
      )}

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
          value={name}
          onChange={(e) => setName(e.target.value)}
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
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
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
            value={tag}
            onChange={(e) => setTag(e.target.value)}
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
          value={lead}
          onChange={(e) => setLead(e.target.value)}
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
          value={highlights}
          onChange={(e) => setHighlights(e.target.value)}
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
            value={keyFactLabel}
            onChange={(e) => setKeyFactLabel(e.target.value)}
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
            value={keyFactValue}
            onChange={(e) => setKeyFactValue(e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      {/* Source Reference */}
      <div className="flex flex-col gap-2">
        <label htmlFor="sourceRef" className="text-sm font-semibold text-foreground">
          Source Reference
        </label>
        <input
          id="sourceRef"
          name="sourceRef"
          type="text"
          value={sourceRef}
          onChange={(e) => setSourceRef(e.target.value)}
          placeholder="e.g. Section 10: Inbavanam Profile PDF"
          className={inputClass}
        />
      </div>

      {/* Visual Image Picker */}
      <ImageInput
        name="imagePath"
        value={imagePath}
        onChange={setImagePath}
        label="Programme Photograph (Optional)"
        hint="Photograph illustrating the workshop, activity, or community setting."
        locationInfo="Our Work Page — Programme Card & Modal"
      />

      {/* Published Toggle */}
      <div className="flex flex-col gap-2 rounded-[var(--radius)] border border-rule bg-card p-4">
        <label className="flex items-center gap-3 font-semibold text-foreground">
          <input
            type="checkbox"
            name="published"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
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
        {isDirty && (
          <button
            type="button"
            onClick={handleUndo}
            className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-[var(--radius)] border border-rule bg-card px-5 label text-foreground hover:bg-cream/40"
          >
            <RotateCcw className="size-4" />
            <span>Undo Changes</span>
          </button>
        )}
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
