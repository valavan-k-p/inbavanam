"use client";

import { useActionState } from "react";
import { saveContactSettings, type SettingsSaveState } from "@/app/admin/(dashboard)/settings/actions";

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

  return (
    <form action={formAction} className="flex flex-col gap-5 rounded-[var(--radius)] border border-rule bg-card p-6 shadow-xs">
      {state.status === "error" && state.message && (
        <div role="alert" className="rounded-[var(--radius)] border-l-4 border-destructive bg-background p-3 text-xs text-destructive">
          {state.message}
        </div>
      )}
      {state.status === "success" && state.message && (
        <div role="alert" className="rounded-[var(--radius)] border-l-4 border-olive bg-background p-3 text-xs text-olive">
          {state.message}
        </div>
      )}

      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="text-xs font-semibold label text-foreground">
          Contact Email Address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          defaultValue={initial.email ?? ""}
          placeholder="e.g. info@inbavanam.org"
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="phone" className="text-xs font-semibold label text-foreground">
          Contact Phone Number
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          defaultValue={initial.phone ?? ""}
          placeholder="e.g. +91 94432 00000"
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="address" className="text-xs font-semibold label text-foreground">
          Postal / Street Address
        </label>
        <textarea
          id="address"
          name="address"
          rows={2}
          defaultValue={initial.address ?? ""}
          placeholder="e.g. Inbavanam, Near Karamadai, Coimbatore District, Tamil Nadu 641104"
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="map_url" className="text-xs font-semibold label text-foreground">
          Google Maps Location URL
        </label>
        <input
          id="map_url"
          name="map_url"
          type="url"
          defaultValue={initial.map_url ?? "https://maps.app.goo.gl/LakRJCWDNT8QczTC9"}
          placeholder="https://maps.app.goo.gl/..."
          className={inputClass}
        />
        <p className="text-[0.7rem] text-muted-foreground">
          Used by the clickable location pin and directions link.
        </p>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="support_url" className="text-xs font-semibold label text-foreground">
          External Support / Donation URL
        </label>
        <input
          id="support_url"
          name="support_url"
          type="url"
          defaultValue={initial.support_url ?? ""}
          placeholder="https://..."
          className={inputClass}
        />
      </div>

      <div className="flex items-center justify-end pt-3 border-t border-rule">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex min-h-11 cursor-pointer items-center justify-center rounded-[var(--radius)] bg-primary px-8 label text-primary-foreground transition-opacity disabled:opacity-60"
        >
          {pending ? "Saving..." : "Save Settings"}
        </button>
      </div>
    </form>
  );
}
