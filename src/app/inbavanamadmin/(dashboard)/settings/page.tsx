import { contact, TBC } from "@/data/site";
import { requireAdmin } from "@/lib/auth";
import { SettingsForm } from "@/components/admin/settings-form";

export const metadata = { title: "Settings" };

export default async function SettingsPage() {
  const { supabase } = await requireAdmin();

  const { data: storedSetting } = await supabase
    .from("site_settings")
    .select("value")
    .eq("key", "contact")
    .single();

  const stored = (storedSetting?.value && typeof storedSetting.value === "object")
    ? (storedSetting.value as Record<string, string | null>)
    : {};

  const currentValues = {
    email: stored.email ?? contact.email,
    phone: stored.phone ?? contact.phone,
    address: stored.address ?? contact.address,
    map_url: stored.map_url ?? contact.mapUrl,
    support_url: stored.support_url ?? contact.supportUrl,
  };

  const envRows = [
    ["Contact email", "NEXT_PUBLIC_CONTACT_EMAIL", contact.email],
    ["Contact phone", "NEXT_PUBLIC_CONTACT_PHONE", contact.phone],
    ["Postal address", "NEXT_PUBLIC_CONTACT_ADDRESS", contact.address],
    ["Map link", "NEXT_PUBLIC_MAP_URL", contact.mapUrl],
    ["Donation page", "NEXT_PUBLIC_SUPPORT_URL", contact.supportUrl],
  ] as const;

  return (
    <div className="flex max-w-3xl flex-col gap-8">
      <div>
        <span className="label text-muted-foreground">Configuration</span>
        <h1 className="text-h2">Settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage contact details, phone numbers, email addresses, and map links for the website.
        </p>
      </div>

      <SettingsForm initial={currentValues} />

      <section className="flex flex-col gap-4 rounded-[var(--radius)] border border-rule bg-card/60 p-6">
        <h2 className="text-sm font-bold label text-muted-foreground">
          Environment Fallback Configuration
        </h2>
        <p className="text-xs text-muted-foreground">
          If database values are not set, the site reads from environment variables configured in Vercel:
        </p>
        <dl className="flex flex-col text-xs">
          {envRows.map(([label, variable, value]) => (
            <div key={variable} className="grid gap-1 border-t border-rule py-3 sm:grid-cols-3">
              <dt className="font-semibold text-foreground">{label}</dt>
              <dd className="font-mono text-muted-foreground">{variable}</dd>
              <dd className="text-muted-foreground">{value ?? TBC}</dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}
