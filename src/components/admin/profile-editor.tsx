"use client";

import { useActionState, useEffect, useState, useTransition } from "react";
import { ArrowUpRight, History, Loader2, RotateCcw, Save } from "lucide-react";
import {
  saveOrganisationProfile,
  restorePreviousProfile,
  restoreOriginalProfile,
  type ProfileSaveState,
} from "@/app/admin/(dashboard)/profile/actions";
import { ImageInput } from "./image-input";

interface ProfileEditorProps {
  initial: Record<string, string>;
}

const inputClass =
  "min-h-11 w-full rounded-[var(--radius)] border border-input bg-cream/50 px-3.5 py-2 text-base text-ink transition-colors hover:border-foreground focus:border-foreground focus:outline-hidden";

export function ProfileEditor({ initial }: ProfileEditorProps) {
  const [state, formAction, pending] = useActionState<ProfileSaveState, FormData>(
    saveOrganisationProfile,
    { status: "idle" },
  );

  const [isRestoring, startRestoreTransition] = useTransition();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [restoreFeedback, setRestoreFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  // Form field states
  const [savedBaseline, setSavedBaseline] = useState<Record<string, string>>(initial);
  const [values, setValues] = useState<Record<string, string>>(initial);

  // Track save status changes to update baseline without cascading effects
  const [prevStatus, setPrevStatus] = useState(state.status);
  if (state.status !== prevStatus) {
    setPrevStatus(state.status);
    if (state.status === "success") {
      setSavedBaseline(values);
    }
  }

  const updateField = (key: string, val: string) => {
    setValues((prev) => ({ ...prev, [key]: val }));
  };

  // Determine if dirty
  const isDirty = Object.keys(values).some((k) => (values[k] ?? "") !== (savedBaseline[k] ?? ""));

  // Warn on tab close if unsaved
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
    setValues(savedBaseline);
  };

  const handleRestorePrevious = () => {
    setRestoreFeedback(null);
    startRestoreTransition(async () => {
      const res = await restorePreviousProfile();
      setRestoreFeedback({
        type: res.success ? "success" : "error",
        message: res.message,
      });
      if (res.success && res.data) {
        setValues(res.data);
        setSavedBaseline(res.data);
      }
    });
  };

  const handleRestoreOriginal = () => {
    setShowConfirmModal(false);
    setRestoreFeedback(null);
    startRestoreTransition(async () => {
      const res = await restoreOriginalProfile();
      setRestoreFeedback({
        type: res.success ? "success" : "error",
        message: res.message,
      });
      if (res.success && res.data) {
        setValues(res.data);
        setSavedBaseline(res.data);
      }
    });
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Top Action Bar with Location Badges & Safe Restore */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-[var(--radius)] border border-rule bg-card/60 p-4">
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <span className="font-semibold text-muted-foreground uppercase tracking-wider">
            Where does this appear:
          </span>
          <span className="rounded-full bg-cream px-2.5 py-0.5 font-medium text-foreground">
            About Page (/about#organisation-profile) & Profile (/about/profile)
          </span>
          <a
            href="/about#organisation-profile"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-semibold text-olive hover:underline"
          >
            <span>View on Site</span>
            <ArrowUpRight className="size-3.5" />
          </a>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {isDirty && (
            <button
              type="button"
              onClick={handleUndo}
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-[var(--radius)] border border-rule bg-card px-3 py-1.5 text-xs font-semibold text-foreground transition-colors hover:bg-cream/40"
              title="Discard your current unsaved edits"
            >
              <RotateCcw className="size-3.5" />
              <span>Undo Changes</span>
            </button>
          )}

          <button
            type="button"
            disabled={isRestoring || pending}
            onClick={handleRestorePrevious}
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-[var(--radius)] border border-rule bg-card px-3 py-1.5 text-xs font-semibold text-foreground transition-colors hover:bg-cream/40 disabled:opacity-50"
            title="Restore previous saved version from history"
          >
            <History className="size-3.5" />
            <span>Restore Previous Version</span>
          </button>

          <button
            type="button"
            disabled={isRestoring || pending}
            onClick={() => setShowConfirmModal(true)}
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-[var(--radius)] border border-rule bg-card px-3 py-1.5 text-xs font-semibold text-terracotta transition-colors hover:bg-terracotta/10 disabled:opacity-50"
            title="Restore original factory defaults from src/data"
          >
            <RotateCcw className="size-3.5" />
            <span>Restore Original</span>
          </button>
        </div>
      </div>

      {/* Unsaved indicator */}
      {isDirty && (
        <div className="flex items-center justify-between rounded-[var(--radius)] border border-terracotta/30 bg-terracotta/10 px-4 py-2 text-xs font-semibold text-terracotta">
          <span>You have unsaved changes</span>
          <button
            type="button"
            onClick={handleUndo}
            className="inline-flex cursor-pointer items-center gap-1 text-ink underline hover:text-foreground"
          >
            <RotateCcw className="size-3" />
            <span>Reset to saved state</span>
          </button>
        </div>
      )}

      {/* Feedback alerts */}
      {restoreFeedback && (
        <div
          role="alert"
          className={`rounded-[var(--radius)] border-l-4 p-3.5 text-xs font-medium ${
            restoreFeedback.type === "success"
              ? "border-olive bg-card text-olive"
              : "border-destructive bg-card text-destructive"
          }`}
        >
          {restoreFeedback.message}
        </div>
      )}
      {state.status === "error" && state.message && (
        <div
          role="alert"
          className="rounded-[var(--radius)] border-l-4 border-destructive bg-card p-4 text-sm font-medium text-destructive"
        >
          {state.message}
        </div>
      )}
      {state.status === "success" && state.message && (
        <div
          role="alert"
          className="rounded-[var(--radius)] border-l-4 border-olive bg-card p-4 text-sm font-medium text-olive"
        >
          {state.message}
        </div>
      )}

      <form action={formAction} className="flex flex-col gap-8">
        {/* Hidden inputs to guarantee every field is submitted */}
        {Object.entries(values).map(([k, v]) => (
          <input key={k} type="hidden" name={k} value={v ?? ""} />
        ))}

        {/* 1. Overview & Purpose */}
        <section className="flex flex-col gap-5 rounded-[var(--radius)] border border-rule bg-card p-6 shadow-xs">
          <div>
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl font-semibold text-foreground">
                1. Organisation Profile Overview
              </h2>
              <span className="rounded-full bg-cream px-2 py-0.5 text-[0.7rem] font-medium text-muted-foreground">
                About & Profile Top
              </span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              Opening mission copy explaining Inbavanam&apos;s connection to Kandiyur and Bagavathi
              Amman Koil villages.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="eyebrow" className="text-xs font-semibold label text-foreground">
                Eyebrow Label
              </label>
              <input
                id="eyebrow"
                type="text"
                value={values.eyebrow ?? ""}
                onChange={(e) => updateField("eyebrow", e.target.value)}
                className={inputClass}
              />
              <p className="text-[0.7rem] text-muted-foreground">Default: Organisation profile</p>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="tagline" className="text-xs font-semibold label text-foreground">
                Tagline (Tamil Meaning)
              </label>
              <input
                id="tagline"
                type="text"
                value={values.tagline ?? ""}
                onChange={(e) => updateField("tagline", e.target.value)}
                className={inputClass}
              />
              <p className="text-[0.7rem] text-muted-foreground">Default: Happy Forest</p>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="heading" className="text-xs font-semibold label text-foreground">
              Profile Headline
            </label>
            <input
              id="heading"
              type="text"
              value={values.heading ?? ""}
              onChange={(e) => updateField("heading", e.target.value)}
              className={inputClass}
            />
            <p className="text-[0.7rem] text-muted-foreground">Default: Rooted in community and land</p>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="lede" className="text-xs font-semibold label text-foreground">
              Lede Paragraph (Villages & Region)
            </label>
            <textarea
              id="lede"
              rows={4}
              value={values.lede ?? ""}
              onChange={(e) => updateField("lede", e.target.value)}
              className={inputClass}
            />
            <p className="text-[0.7rem] text-muted-foreground">
              Paragraph detailing work in Kandiyur and Bagavathi Amman Koil.
            </p>
          </div>
        </section>

        {/* 2. Founding Priorities */}
        <section className="flex flex-col gap-5 rounded-[var(--radius)] border border-rule bg-card p-6 shadow-xs">
          <div>
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl font-semibold text-foreground">
                2. Founding Priorities
              </h2>
              <span className="rounded-full bg-cream px-2 py-0.5 text-[0.7rem] font-medium text-muted-foreground">
                Where it started pillars
              </span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              The two foundational pillars displayed side-by-side under &ldquo;Where it started&rdquo;.
            </p>
          </div>

          <div className="flex flex-col gap-4 border-b border-rule pb-5">
            <h3 className="text-sm font-bold label text-terracotta">
              Priority A: Education & Reading
            </h3>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="priority1Title" className="text-xs font-semibold label text-foreground">
                Title
              </label>
              <input
                id="priority1Title"
                type="text"
                value={values.priority1Title ?? ""}
                onChange={(e) => updateField("priority1Title", e.target.value)}
                className={inputClass}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="priority1Desc" className="text-xs font-semibold label text-foreground">
                Description
              </label>
              <textarea
                id="priority1Desc"
                rows={2}
                value={values.priority1Desc ?? ""}
                onChange={(e) => updateField("priority1Desc", e.target.value)}
                className={inputClass}
              />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-bold label text-olive">Priority B: Farming & Earning</h3>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="priority2Title" className="text-xs font-semibold label text-foreground">
                Title
              </label>
              <input
                id="priority2Title"
                type="text"
                value={values.priority2Title ?? ""}
                onChange={(e) => updateField("priority2Title", e.target.value)}
                className={inputClass}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="priority2Desc" className="text-xs font-semibold label text-foreground">
                Description
              </label>
              <textarea
                id="priority2Desc"
                rows={2}
                value={values.priority2Desc ?? ""}
                onChange={(e) => updateField("priority2Desc", e.target.value)}
                className={inputClass}
              />
            </div>
          </div>
        </section>

        {/* 3. Founders Section */}
        <section className="flex flex-col gap-6 rounded-[var(--radius)] border border-rule bg-card p-6 shadow-xs">
          <div>
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl font-semibold text-foreground">
                3. Founders (Gladston Xavier & Florina Xavier)
              </h2>
              <span className="rounded-full bg-cream px-2 py-0.5 text-[0.7rem] font-medium text-muted-foreground">
                About Page — Founders Block
              </span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              Manage names, roles, approved biographies, and portrait photographs for both founders.
            </p>
          </div>

          {/* Founder 1 */}
          <div className="flex flex-col gap-4 border-b border-rule pb-6">
            <h3 className="text-sm font-bold label text-maroon">
              Dr. Gladston Xavier (Left Founder Card)
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="founder1Name" className="text-xs font-semibold label text-foreground">
                  Full Name
                </label>
                <input
                  id="founder1Name"
                  type="text"
                  value={values.founder1Name ?? ""}
                  onChange={(e) => updateField("founder1Name", e.target.value)}
                  className={inputClass}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="founder1Role" className="text-xs font-semibold label text-foreground">
                  Role / Title
                </label>
                <input
                  id="founder1Role"
                  type="text"
                  value={values.founder1Role ?? ""}
                  onChange={(e) => updateField("founder1Role", e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="founder1Bio" className="text-xs font-semibold label text-foreground">
                Approved Biography
              </label>
              <textarea
                id="founder1Bio"
                rows={3}
                value={values.founder1Bio ?? ""}
                onChange={(e) => updateField("founder1Bio", e.target.value)}
                placeholder="Dr. Gladston Xavier's approved background, peacebuilding work, and social work career..."
                className={inputClass}
              />
            </div>
            <ImageInput
              name="founder1Portrait"
              value={values.founder1Portrait ?? ""}
              onChange={(val) => updateField("founder1Portrait", val)}
              label="Dr. Gladston Xavier Portrait Photograph"
              hint="High-resolution natural light portrait displayed on the founders card."
              locationInfo="About Page — Left Founder Card"
            />
          </div>

          {/* Founder 2 */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-bold label text-maroon">
              Dr. Florina Xavier (Right Founder Card)
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="founder2Name" className="text-xs font-semibold label text-foreground">
                  Full Name
                </label>
                <input
                  id="founder2Name"
                  type="text"
                  value={values.founder2Name ?? ""}
                  onChange={(e) => updateField("founder2Name", e.target.value)}
                  className={inputClass}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="founder2Role" className="text-xs font-semibold label text-foreground">
                  Role / Title
                </label>
                <input
                  id="founder2Role"
                  type="text"
                  value={values.founder2Role ?? ""}
                  onChange={(e) => updateField("founder2Role", e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="founder2Bio" className="text-xs font-semibold label text-foreground">
                Approved Biography
              </label>
              <textarea
                id="founder2Bio"
                rows={3}
                value={values.founder2Bio ?? ""}
                onChange={(e) => updateField("founder2Bio", e.target.value)}
                placeholder="Dr. Florina Xavier's approved background, conflict transformation work, and peace studies..."
                className={inputClass}
              />
            </div>
            <ImageInput
              name="founder2Portrait"
              value={values.founder2Portrait ?? ""}
              onChange={(val) => updateField("founder2Portrait", val)}
              label="Dr. Florina Xavier Portrait Photograph"
              hint="High-resolution natural light portrait displayed on the founders card."
              locationInfo="About Page — Right Founder Card"
            />
          </div>
        </section>

        {/* Save Button */}
        <div className="sticky bottom-6 z-20 flex items-center justify-end gap-3 rounded-[var(--radius)] border border-rule bg-card/95 p-4 shadow-lg backdrop-blur-xs">
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

          <button
            type="submit"
            disabled={pending || (!isDirty && state.status !== "error")}
            className="inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-[var(--radius)] bg-primary px-8 label text-primary-foreground transition-opacity disabled:cursor-not-allowed disabled:opacity-60"
          >
            {pending ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                <span>Saving Profile...</span>
              </>
            ) : (
              <>
                <Save className="size-4" />
                <span>Save Organisation Profile</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Restore Confirmation Dialog */}
      {showConfirmModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 p-4 backdrop-blur-xs"
        >
          <div className="w-full max-w-md rounded-[var(--radius)] border border-rule bg-card p-6 shadow-2xl">
            <h2 className="font-display text-xl font-semibold text-foreground">
              Restore original content?
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              This will replace your current profile and founders content with the original version
              from the Inbavanam profile.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowConfirmModal(false)}
                className="inline-flex min-h-10 cursor-pointer items-center rounded-[var(--radius)] border border-rule bg-card px-4 text-xs font-semibold text-foreground hover:bg-cream/40"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleRestoreOriginal}
                className="inline-flex min-h-10 cursor-pointer items-center rounded-[var(--radius)] bg-terracotta px-5 text-xs font-semibold text-primary-foreground hover:opacity-90"
              >
                Restore
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
