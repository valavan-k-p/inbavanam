"use client";

import { useState, useTransition } from "react";
import { ArrowUpRight, History, RotateCcw } from "lucide-react";
import {
  restorePreviousProgrammes,
  restoreOriginalProgrammes,
} from "@/app/admin/(dashboard)/programmes/actions";

export function ProgrammesToolbar() {
  const [isPending, startTransition] = useTransition();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(
    null,
  );

  const handleRestorePrevious = () => {
    setFeedback(null);
    startTransition(async () => {
      const res = await restorePreviousProgrammes();
      setFeedback({
        type: res.success ? "success" : "error",
        message: res.message,
      });
    });
  };

  const handleRestoreOriginal = () => {
    setShowConfirmModal(false);
    setFeedback(null);
    startTransition(async () => {
      const res = await restoreOriginalProgrammes();
      setFeedback({
        type: res.success ? "success" : "error",
        message: res.message,
      });
    });
  };

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-[var(--radius)] border border-rule bg-card/60 p-4">
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <span className="font-semibold text-muted-foreground uppercase tracking-wider">
            Where does this appear:
          </span>
          <span className="rounded-full bg-cream px-2.5 py-0.5 font-medium text-foreground">
            Our Work Page — Initiatives Grid (/our-work)
          </span>
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

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            disabled={isPending}
            onClick={handleRestorePrevious}
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-[var(--radius)] border border-rule bg-card px-3 py-1.5 text-xs font-semibold text-foreground transition-colors hover:bg-cream/40 disabled:opacity-50"
            title="Restore previous saved version"
          >
            <History className="size-3.5" />
            <span>Restore Previous Version</span>
          </button>

          <button
            type="button"
            disabled={isPending}
            onClick={() => setShowConfirmModal(true)}
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-[var(--radius)] border border-rule bg-card px-3 py-1.5 text-xs font-semibold text-terracotta transition-colors hover:bg-terracotta/10 disabled:opacity-50"
            title="Restore factory default programmes from src/data"
          >
            <RotateCcw className="size-3.5" />
            <span>Restore Original</span>
          </button>
        </div>
      </div>

      {feedback && (
        <div
          role="alert"
          className={`rounded-[var(--radius)] border-l-4 p-3 text-xs font-medium ${
            feedback.type === "success"
              ? "border-olive bg-card text-olive"
              : "border-destructive bg-card text-destructive"
          }`}
        >
          {feedback.message}
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 p-4 backdrop-blur-xs"
        >
          <div className="w-full max-w-md rounded-[var(--radius)] border border-rule bg-card p-6 shadow-2xl">
            <h2 className="font-display text-xl font-semibold text-foreground">
              Restore original programmes?
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              This will replace all your current programme customisations with the original 12
              factory default programmes from the Inbavanam profile.
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
    </>
  );
}
