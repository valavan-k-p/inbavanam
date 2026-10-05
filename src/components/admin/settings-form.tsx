"use client";

import { useActionState, useEffect, useState, useTransition } from "react";
import { ArrowUpRight, History, Loader2, RotateCcw, Save } from "lucide-react";
import {
  saveContactSettings,
  restorePreviousSettings,
  restoreOriginalSettings,
  type SettingsSaveState,
  type ContactSettingsRecord,
} from "@/app/admin/(dashboard)/settings/actions";

interface SettingsFormProps {
  initial: {
    email: string | null;
    phone: string | null;
    address: string | null;
    map_url: string | null;
    support_url: string | null;
  };
}

const inputClass =
  "min-h-11 w-full rounded-[var(--radius)] border border-input bg-cream/50 px-3.5 py-2 text-base text-ink transition-colors hover:border-foreground focus:border-foreground focus:outline-hidden";

export function SettingsForm({ initial }: SettingsFormProps) {
  const [state, formAction, pending] = useActionState<SettingsSaveState, FormData>(
    saveContactSettings,
    { status: "idle" },
  );

  const [isRestoring, startRestoreTransition] = useTransition();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [restoreFeedback, setRestoreFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  // Field states for controlled undo and dirty tracking
  const [savedBaseline, setSavedBaseline] = useState<ContactSettingsRecord>(initial);
  const [email, setEmail] = useState(initial.email ?? "");
  const [phone, setPhone] = useState(initial.phone ?? "");
  const [address, setAddress] = useState(initial.address ?? "");
  const [mapUrl, setMapUrl] = useState(initial.map_url ?? "");
  const [supportUrl, setSupportUrl] = useState(initial.support_url ?? "");

  const isDirty =
    email !== (savedBaseline.email ?? "") ||
    phone !== (savedBaseline.phone ?? "") ||
    address !== (savedBaseline.address ?? "") ||
    mapUrl !== (savedBaseline.map_url ?? "") ||
    supportUrl !== (savedBaseline.support_url ?? "");

  // Track save status changes to update baseline without cascading effects
  const [prevStatus, setPrevStatus] = useState(state.status);
  if (state.status !== prevStatus) {
    setPrevStatus(state.status);
    if (state.status === "success") {
      setSavedBaseline({
        email: email || null,
        phone: phone || null,
        address: address || null,
        map_url: mapUrl || null,
        support_url: supportUrl || null,
      });
    }
  }

  // Warn on leave if unsaved
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
    setEmail(savedBaseline.email ?? "");
    setPhone(savedBaseline.phone ?? "");
    setAddress(savedBaseline.address ?? "");
    setMapUrl(savedBaseline.map_url ?? "");
    setSupportUrl(savedBaseline.support_url ?? "");
  };

  const applyRestoredData = (data: ContactSettingsRecord) => {
    setEmail(data.email ?? "");
    setPhone(data.phone ?? "");
    setAddress(data.address ?? "");
    setMapUrl(data.map_url ?? "");
    setSupportUrl(data.support_url ?? "");
    setSavedBaseline(data);
  };

  const handleRestorePrevious = () => {
    setRestoreFeedback(null);
    startRestoreTransition(async () => {
      const res = await restorePreviousSettings();
      setRestoreFeedback({
        type: res.success ? "success" : "error",
        message: res.message,
      });
      if (res.success && res.data) {
        applyRestoredData(res.data);
      }
    });
  };

  const handleRestoreOriginal = () => {
    setShowConfirmModal(false);
    setRestoreFeedback(null);
    startRestoreTransition(async () => {
      const res = await restoreOriginalSettings();
      setRestoreFeedback({
        type: res.success ? "success" : "error",
        message: res.message,
      });
      if (res.success && res.data) {
        applyRestoredData(res.data);
      }
    });
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Top Location & Safe Restore Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-[var(--radius)] border border-rule bg-card/60 p-4">
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <span className="font-semibold text-muted-foreground uppercase tracking-wider">
            Where does this appear:
          </span>
          <span className="rounded-full bg-cream px-2.5 py-0.5 font-medium text-foreground">
            Contact Page (/contact), Footer, & Interactive Map Pin
          </span>
          <a
            href="/contact"
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
            title="Restore factory default settings from src/data"
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

      <form
        action={formAction}
        className="flex flex-col gap-6 rounded-[var(--radius)] border border-rule bg-card p-6 shadow-xs"
      >
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label htmlFor="email" className="text-xs font-semibold label text-foreground">
              Contact Email Address
            </label>
            <span className="rounded-full bg-cream px-2 py-0.5 text-[0.7rem] font-medium text-muted-foreground">
              Contact Page & Footer
            </span>
          </div>
          <input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="e.g. info@inbavanam.org"
            className={inputClass}
          />
          <p className="text-[0.7rem] text-muted-foreground">
            Enquiry emails and public footer mailto link.
          </p>
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label htmlFor="phone" className="text-xs font-semibold label text-foreground">
              Contact Phone Number
            </label>
            <span className="rounded-full bg-cream px-2 py-0.5 text-[0.7rem] font-medium text-muted-foreground">
              Contact Page
            </span>
          </div>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="e.g. +91 94432 00000"
            className={inputClass}
          />
          <p className="text-[0.7rem] text-muted-foreground">
            Displayed on the /contact page for direct telephone enquiries.
          </p>
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label htmlFor="address" className="text-xs font-semibold label text-foreground">
              Postal / Street Address
            </label>
            <span className="rounded-full bg-cream px-2 py-0.5 text-[0.7rem] font-medium text-muted-foreground">
              Contact & Directions
            </span>
          </div>
          <textarea
            id="address"
            name="address"
            rows={2}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="e.g. Inbavanam, Near Karamadai, Coimbatore District, Tamil Nadu 641104"
            className={inputClass}
          />
          <p className="text-[0.7rem] text-muted-foreground">
            Optional postal address shown in the contact details panel.
          </p>
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label htmlFor="map_url" className="text-xs font-semibold label text-foreground">
              Google Maps Location Link
            </label>
            <span className="rounded-full bg-cream px-2 py-0.5 text-[0.7rem] font-medium text-muted-foreground">
              Map Pin Click Action
            </span>
          </div>
          <input
            id="map_url"
            name="map_url"
            type="url"
            value={mapUrl}
            onChange={(e) => setMapUrl(e.target.value)}
            placeholder="https://maps.app.goo.gl/LakRJCWDNT8QczTC9"
            className={inputClass}
          />
          <p className="text-[0.7rem] text-muted-foreground">
            Exact URL opened when visitors click the animated map pin or directions link.
          </p>
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label htmlFor="support_url" className="text-xs font-semibold label text-foreground">
              Support / Contribution Link
            </label>
            <span className="rounded-full bg-cream px-2 py-0.5 text-[0.7rem] font-medium text-muted-foreground">
              Footer & Community
            </span>
          </div>
          <input
            id="support_url"
            name="support_url"
            type="text"
            value={supportUrl}
            onChange={(e) => setSupportUrl(e.target.value)}
            placeholder="/community#support or https://..."
            className={inputClass}
          />
          <p className="text-[0.7rem] text-muted-foreground">
            Destination for the &ldquo;Support Inbavanam&rdquo; button in the footer.
          </p>
        </div>

        {/* Action Button */}
        <div className="flex items-center justify-end gap-3 pt-3">
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
                <span>Saving Settings...</span>
              </>
            ) : (
              <>
                <Save className="size-4" />
                <span>Save Contact Settings</span>
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
              Restore original contact settings?
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              This will replace your current settings with the original factory default values from
              the site configuration.
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
