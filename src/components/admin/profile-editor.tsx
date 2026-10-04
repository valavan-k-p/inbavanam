"use client";

import { useActionState } from "react";
import { saveOrganisationProfile, type ProfileSaveState } from "@/app/admin/(dashboard)/profile/actions";

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

  return (
    <form action={formAction} className="flex max-w-3xl flex-col gap-8">
      {state.status === "error" && state.message && (
        <div role="alert" className="rounded-[var(--radius)] border-l-4 border-destructive bg-card p-4 text-sm font-medium text-destructive">
          {state.message}
        </div>
      )}
      {state.status === "success" && state.message && (
        <div role="alert" className="rounded-[var(--radius)] border-l-4 border-olive bg-card p-4 text-sm font-medium text-olive">
          {state.message}
        </div>
      )}

      {/* Overview & Purpose */}
      <section className="flex flex-col gap-4 rounded-[var(--radius)] border border-rule bg-card p-6 shadow-xs">
        <h2 className="font-display text-xl font-semibold text-foreground">
          1. Organisation Profile Overview
        </h2>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="eyebrow" className="text-xs font-semibold label text-foreground">
              Eyebrow Label
            </label>
            <input
              id="eyebrow"
              name="eyebrow"
              type="text"
              defaultValue={initial.eyebrow ?? "Organisation profile"}
              className={inputClass}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="tagline" className="text-xs font-semibold label text-foreground">
              Tagline (Tamil Meaning)
            </label>
            <input
              id="tagline"
              name="tagline"
              type="text"
              defaultValue={initial.tagline ?? "Happy Forest"}
              className={inputClass}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="heading" className="text-xs font-semibold label text-foreground">
            Profile Headline
          </label>
          <input
            id="heading"
            name="heading"
            type="text"
            defaultValue={initial.heading ?? "Rooted in community and land"}
            className={inputClass}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="lede" className="text-xs font-semibold label text-foreground">
            Lede Paragraph (Villages & Region)
          </label>
          <textarea
            id="lede"
            name="lede"
            rows={4}
            defaultValue={initial.lede ?? ""}
            className={inputClass}
          />
        </div>
      </section>

      {/* Founding Priorities */}
      <section className="flex flex-col gap-4 rounded-[var(--radius)] border border-rule bg-card p-6 shadow-xs">
        <h2 className="font-display text-xl font-semibold text-foreground">
          2. Founding Priorities
        </h2>

        <div className="flex flex-col gap-3 border-b border-rule pb-4">
          <h3 className="text-sm font-bold label text-terracotta">Priority A: Education & Reading</h3>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="priority1Title" className="text-xs font-semibold label text-foreground">
              Title
            </label>
            <input
              id="priority1Title"
              name="priority1Title"
              type="text"
              defaultValue={initial.priority1Title ?? "School and reading"}
              className={inputClass}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="priority1Desc" className="text-xs font-semibold label text-foreground">
              Description
            </label>
            <textarea
              id="priority1Desc"
              name="priority1Desc"
              rows={2}
              defaultValue={initial.priority1Desc ?? ""}
              className={inputClass}
            />
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-bold label text-olive">Priority B: Farming & Earning</h3>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="priority2Title" className="text-xs font-semibold label text-foreground">
              Title
            </label>
            <input
              id="priority2Title"
              name="priority2Title"
              type="text"
              defaultValue={initial.priority2Title ?? "Farming and earning"}
              className={inputClass}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="priority2Desc" className="text-xs font-semibold label text-foreground">
              Description
            </label>
            <textarea
              id="priority2Desc"
              name="priority2Desc"
              rows={2}
              defaultValue={initial.priority2Desc ?? ""}
              className={inputClass}
            />
          </div>
        </div>
      </section>

      {/* Founders Section */}
      <section className="flex flex-col gap-4 rounded-[var(--radius)] border border-rule bg-card p-6 shadow-xs">
        <h2 className="font-display text-xl font-semibold text-foreground">
          3. Founders (Gladston Xavier & Florina Xavier)
        </h2>

        {/* Founder 1 */}
        <div className="flex flex-col gap-3 border-b border-rule pb-4">
          <h3 className="text-sm font-bold label text-maroon">Dr. Gladston Xavier (Left Founder Card)</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="founder1Name" className="text-xs font-semibold label text-foreground">
                Name
              </label>
              <input
                id="founder1Name"
                name="founder1Name"
                type="text"
                defaultValue={initial.founder1Name ?? "Gladston Xavier"}
                className={inputClass}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="founder1Role" className="text-xs font-semibold label text-foreground">
                Role / Title
              </label>
              <input
                id="founder1Role"
                name="founder1Role"
                type="text"
                defaultValue={initial.founder1Role ?? "Founder & Social Worker"}
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
              name="founder1Bio"
              rows={3}
              defaultValue={initial.founder1Bio ?? ""}
              className={inputClass}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="founder1Portrait" className="text-xs font-semibold label text-foreground">
              Portrait Image Path
            </label>
            <input
              id="founder1Portrait"
              name="founder1Portrait"
              type="text"
              defaultValue={initial.founder1Portrait ?? "/gallery image/WhatsApp Image 2026-09-14 at 4.01.17 PM (7)"}
              className={inputClass}
            />
          </div>
        </div>

        {/* Founder 2 */}
        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-bold label text-maroon">Dr. Florina Xavier (Right Founder Card)</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="founder2Name" className="text-xs font-semibold label text-foreground">
                Name
              </label>
              <input
                id="founder2Name"
                name="founder2Name"
                type="text"
                defaultValue={initial.founder2Name ?? "Florina Xavier"}
                className={inputClass}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="founder2Role" className="text-xs font-semibold label text-foreground">
                Role / Title
              </label>
              <input
                id="founder2Role"
                name="founder2Role"
                type="text"
                defaultValue={initial.founder2Role ?? "Founder & Peacebuilder"}
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
              name="founder2Bio"
              rows={3}
              defaultValue={initial.founder2Bio ?? ""}
              className={inputClass}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="founder2Portrait" className="text-xs font-semibold label text-foreground">
              Portrait Image Path
            </label>
            <input
              id="founder2Portrait"
              name="founder2Portrait"
              type="text"
              defaultValue={initial.founder2Portrait ?? "/gallery image/WhatsApp Image 2026-09-14 at 4.01.17 PM (6)"}
              className={inputClass}
            />
          </div>
        </div>
      </section>

      {/* Save Button */}
      <div className="flex items-center justify-end gap-3 pt-2">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex min-h-11 cursor-pointer items-center justify-center rounded-[var(--radius)] bg-primary px-8 label text-primary-foreground transition-opacity disabled:opacity-60"
        >
          {pending ? "Saving..." : "Save Organisation Profile"}
        </button>
      </div>
    </form>
  );
}
