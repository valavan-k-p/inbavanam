"use client";

import { useEffect, useState, useTransition } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  Check,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  FileText,
  History,
  RotateCcw,
} from "lucide-react";
import {
  saveSiteContent,
  restorePreviousContent,
  restoreOriginalContent,
  listContentVersions,
  type ContentVersionSummary,
  type ContentSaveState,
} from "@/app/admin/(dashboard)/content/actions";
import { ImageInput } from "./image-input";

export interface SectionFieldConfig {
  name: string;
  label: string;
  type: "text" | "textarea" | "image";
  hint: string;
  rows?: number;
  locationInfo?: string;
  placeholder?: string;
}

export interface ContentSectionConfig {
  key: string;
  title: string;
  description: string;
  locationBadge: string;
  previewUrl: string;
  fields: SectionFieldConfig[];
}

const inputClass =
  "min-h-11 w-full rounded-[var(--radius)] border border-input bg-card px-3.5 py-2 text-sm text-ink transition-colors hover:border-foreground focus:border-foreground focus:outline-hidden";

function SectionCard({
  config,
  initialValues,
  originalDefaults,
}: {
  config: ContentSectionConfig;
  initialValues: Record<string, string>;
  originalDefaults: Record<string, string>;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [savedValues, setSavedValues] = useState<Record<string, string>>(initialValues);
  const [formValues, setFormValues] = useState<Record<string, string>>(initialValues);
  const [savePending, startSaveTransition] = useTransition();
  const [restorePending, startRestoreTransition] = useTransition();
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Modal dialog states for confirmation
  const [showRestoreOriginalModal, setShowRestoreOriginalModal] = useState(false);
  const [showRestorePrevModal, setShowRestorePrevModal] = useState(false);
  const [versions, setVersions] = useState<ContentVersionSummary[]>([]);
  const [chosenVersion, setChosenVersion] = useState(0);

  // Check if form has unsaved modifications
  const isDirty = JSON.stringify(formValues) !== JSON.stringify(savedValues);

  // Warn on browser tab close if dirty
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = "You have unsaved changes.";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDirty]);

  const handleFieldChange = (name: string, value: string) => {
    setFormValues((prev) => ({ ...prev, [name]: value }));
    setStatusMessage(null);
  };

  const handleUndoUnsaved = () => {
    setFormValues(savedValues);
    setStatusMessage(null);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(null);

    const formData = new FormData();
    for (const [key, value] of Object.entries(formValues)) {
      formData.append(key, value);
    }

    startSaveTransition(async () => {
      const res: ContentSaveState = await saveSiteContent(config.key, { status: "idle" }, formData);
      if (res.status === "success") {
        setSavedValues(formValues);
        setStatusMessage({ type: "success", text: "Changes saved successfully." });
      } else {
        setStatusMessage({
          type: "error",
          text: res.message || "Unable to save changes. Please try again.",
        });
      }
    });
  };

  const handleConfirmRestoreOriginal = () => {
    setShowRestoreOriginalModal(false);
    startRestoreTransition(async () => {
      const res = await restoreOriginalContent(config.key, originalDefaults);
      if (res.success && res.data) {
        setFormValues(res.data);
        setSavedValues(res.data);
        setStatusMessage({
          type: "success",
          text: "Original default website content restored successfully.",
        });
      } else {
        setStatusMessage({
          type: "error",
          text: res.message || "Failed to restore original content.",
        });
      }
    });
  };

  // The picker needs the list of saved versions before it can show them.
  const openRestorePrevious = () => {
    setChosenVersion(0);
    setShowRestorePrevModal(true);
    startRestoreTransition(async () => setVersions(await listContentVersions(config.key)));
  };

  const handleConfirmRestorePrevious = () => {
    setShowRestorePrevModal(false);
    startRestoreTransition(async () => {
      const res = await restorePreviousContent(config.key, chosenVersion);
      if (res.success && res.data) {
        setFormValues(res.data);
        setSavedValues(res.data);
        setStatusMessage({
          type: "success",
          text: "Previous version restored successfully.",
        });
      } else {
        setStatusMessage({
          type: "error",
          text: res.message || "Failed to restore previous version.",
        });
      }
    });
  };

  return (
    <div className="rounded-[var(--radius)] border border-rule bg-card shadow-xs transition-colors">
      {/* Header bar */}
      <div className="flex w-full items-center justify-between p-5 text-left">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex flex-1 cursor-pointer items-center gap-3.5 pr-4 text-left"
        >
          <div className="grid size-10 shrink-0 place-items-center rounded bg-cream text-maroon">
            <FileText className="size-5" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-base font-semibold text-foreground">{config.title}</h3>
              <span className="rounded-full bg-cream px-2.5 py-0.5 text-[0.68rem] font-medium text-maroon">
                {config.locationBadge}
              </span>
              {isDirty && (
                <span className="flex items-center gap-1 rounded bg-amber-100 px-2 py-0.5 text-[0.68rem] font-semibold text-amber-900">
                  <AlertTriangle className="size-3" /> Unsaved Changes
                </span>
              )}
            </div>
            <p className="mt-0.5 text-xs text-muted-foreground">{config.description}</p>
          </div>
        </button>

        <div className="flex shrink-0 items-center gap-2">
          <Link
            href={config.previewUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="View where this section appears on the public website"
            className="hidden items-center gap-1 rounded border border-rule px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:border-foreground hover:text-foreground sm:inline-flex"
          >
            <span>View on Site</span>
            <ExternalLink className="size-3" />
          </Link>

          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="cursor-pointer rounded p-1 text-muted-foreground hover:text-foreground"
          >
            {isOpen ? <ChevronDown className="size-5" /> : <ChevronRight className="size-5" />}
          </button>
        </div>
      </div>

      {/* Expanded Editor Form */}
      {isOpen && (
        <form onSubmit={handleSave} className="flex flex-col gap-6 border-t border-rule p-6">
          {/* Status Alert Banner */}
          {statusMessage && (
            <div
              role="alert"
              className={`rounded-md border-l-4 p-3.5 text-xs ${
                statusMessage.type === "success"
                  ? "border-olive bg-cream font-medium text-olive"
                  : "border-destructive bg-destructive/10 font-medium text-destructive"
              }`}
            >
              {statusMessage.text}
            </div>
          )}

          {/* Section Location & Preview Reminder */}
          <div className="flex flex-wrap items-center justify-between rounded-lg border border-rule/60 bg-cream/40 p-3.5 text-xs">
            <span className="text-muted-foreground">
              <strong className="text-foreground">Where this appears:</strong>{" "}
              {config.locationBadge}
            </span>
            <Link
              href={config.previewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-semibold text-maroon hover:underline"
            >
              <span>Preview on website</span>
              <ArrowRight className="size-3" />
            </Link>
          </div>

          {/* Form Fields */}
          <div className="flex flex-col gap-5">
            {config.fields.map((field) => (
              <div key={field.name}>
                {field.type === "image" ? (
                  <ImageInput
                    name={field.name}
                    label={field.label}
                    description={field.hint}
                    locationInfo={field.locationInfo || config.locationBadge}
                    initialValue={formValues[field.name] ?? ""}
                    onChange={(val) => handleFieldChange(field.name, val)}
                  />
                ) : (
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-baseline justify-between">
                      <label
                        htmlFor={`${config.key}-${field.name}`}
                        className="label text-xs font-semibold text-foreground"
                      >
                        {field.label}
                      </label>
                      {field.locationInfo && (
                        <span className="text-[0.68rem] text-muted-foreground italic">
                          {field.locationInfo}
                        </span>
                      )}
                    </div>

                    {field.type === "textarea" ? (
                      <textarea
                        id={`${config.key}-${field.name}`}
                        name={field.name}
                        rows={field.rows ?? 3}
                        value={formValues[field.name] ?? ""}
                        onChange={(e) => handleFieldChange(field.name, e.target.value)}
                        placeholder={field.placeholder}
                        className={inputClass}
                      />
                    ) : (
                      <input
                        id={`${config.key}-${field.name}`}
                        name={field.name}
                        type="text"
                        value={formValues[field.name] ?? ""}
                        onChange={(e) => handleFieldChange(field.name, e.target.value)}
                        placeholder={field.placeholder}
                        className={inputClass}
                      />
                    )}

                    <p className="text-[0.72rem] text-muted-foreground">{field.hint}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Action bar with Undo, Restore, and Save */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-rule pt-5">
            {/* Left Recovery Controls */}
            <div className="flex flex-wrap items-center gap-2">
              {isDirty && (
                <button
                  type="button"
                  onClick={handleUndoUnsaved}
                  title="Discard changes you haven't saved yet"
                  className="inline-flex min-h-9 cursor-pointer items-center gap-1.5 rounded-[var(--radius)] border border-amber-300 bg-amber-50 px-3 py-1.5 label text-xs font-semibold text-amber-900 transition-colors hover:bg-amber-100"
                >
                  <RotateCcw className="size-3.5" />
                  <span>Undo Changes</span>
                </button>
              )}

              <button
                type="button"
                onClick={openRestorePrevious}
                disabled={restorePending}
                title="Restore the previous saved version of this content"
                className="inline-flex min-h-9 cursor-pointer items-center gap-1.5 rounded-[var(--radius)] border border-rule bg-card px-3 py-1.5 label text-xs text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
              >
                <History className="size-3.5" />
                <span>Restore Previous Version</span>
              </button>

              <button
                type="button"
                onClick={() => setShowRestoreOriginalModal(true)}
                disabled={restorePending}
                title="Restore the factory default website content"
                className="inline-flex min-h-9 cursor-pointer items-center gap-1.5 rounded-[var(--radius)] border border-rule bg-card px-3 py-1.5 label text-xs text-muted-foreground transition-colors hover:border-destructive hover:text-destructive"
              >
                <RotateCcw className="size-3.5" />
                <span>Restore Original</span>
              </button>
            </div>

            {/* Right Save Button */}
            <div className="flex items-center gap-2">
              <button
                type="submit"
                disabled={savePending || !isDirty}
                className="inline-flex min-h-10 cursor-pointer items-center justify-center gap-2 rounded-[var(--radius)] bg-primary px-6 label text-xs font-semibold text-primary-foreground shadow-xs transition-opacity disabled:cursor-not-allowed disabled:opacity-50"
              >
                {savePending ? (
                  <span>Saving Changes...</span>
                ) : (
                  <>
                    <Check className="size-4" />
                    <span>Save Changes</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Confirmation Modal: Restore Original */}
      {showRestoreOriginalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-xl border border-rule bg-card p-6 shadow-2xl">
            <div className="flex items-center gap-3 text-destructive">
              <AlertTriangle className="size-6" />
              <h3 className="text-lg font-semibold text-foreground">Restore Original Content?</h3>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              This will replace your current content in <strong>{config.title}</strong> with the
              original factory version that existed before editing.
            </p>
            <div className="mt-6 flex items-center justify-end gap-3 border-t border-rule pt-4">
              <button
                type="button"
                onClick={() => setShowRestoreOriginalModal(false)}
                className="cursor-pointer rounded-[var(--radius)] border border-rule px-4 py-2 label text-xs text-muted-foreground hover:text-foreground"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmRestoreOriginal}
                disabled={restorePending}
                className="text-destructive-foreground cursor-pointer rounded-[var(--radius)] bg-destructive px-5 py-2 label text-xs font-semibold hover:bg-destructive/90"
              >
                {restorePending ? "Restoring..." : "Restore Original"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal: Restore Previous Version */}
      {showRestorePrevModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-xl border border-rule bg-card p-6 shadow-2xl">
            <div className="flex items-center gap-3 text-foreground">
              <History className="size-6 text-maroon" />
              <h3 className="text-lg font-semibold text-foreground">Restore Previous Version?</h3>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              Choose a saved version of <strong>{config.title}</strong> to bring back. What is on
              the site now is kept as a version too, so this can be undone.
            </p>
            {versions.length ? (
              <label className="mt-4 block text-sm">
                <span className="label text-muted-foreground">Version</span>
                <select
                  value={chosenVersion}
                  onChange={(e) => setChosenVersion(Number(e.target.value))}
                  className="mt-2 min-h-11 w-full rounded-[var(--radius)] border border-rule bg-background px-3 text-sm"
                >
                  {versions.map((v) => (
                    <option key={v.index} value={v.index}>
                      {v.savedAt
                        ? new Date(v.savedAt).toLocaleString("en-IN", {
                            day: "numeric",
                            month: "short",
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : `Version ${v.index + 1}`}
                      {v.preview ? ` — ${v.preview}` : ""}
                    </option>
                  ))}
                </select>
              </label>
            ) : (
              <p className="mt-4 text-sm text-muted-foreground">
                {restorePending ? "Loading saved versions..." : "No saved versions yet."}
              </p>
            )}
            <div className="mt-6 flex items-center justify-end gap-3 border-t border-rule pt-4">
              <button
                type="button"
                onClick={() => setShowRestorePrevModal(false)}
                className="cursor-pointer rounded-[var(--radius)] border border-rule px-4 py-2 label text-xs text-muted-foreground hover:text-foreground"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmRestorePrevious}
                disabled={restorePending}
                className="cursor-pointer rounded-[var(--radius)] bg-primary px-5 py-2 label text-xs font-semibold text-primary-foreground hover:bg-primary/90"
              >
                {restorePending ? "Restoring..." : "Restore"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function ContentEditor({
  sections,
  values,
  originalDefaults,
}: {
  sections: ContentSectionConfig[];
  values: Record<string, Record<string, string>>;
  originalDefaults: Record<string, Record<string, string>>;
}) {
  return (
    <div className="flex flex-col gap-4">
      {sections.map((section) => (
        <SectionCard
          key={section.key}
          config={section}
          initialValues={values[section.key] ?? {}}
          originalDefaults={originalDefaults[section.key] ?? {}}
        />
      ))}
    </div>
  );
}
