import { contact, TBC } from "@/data/site";
import { requireStaff } from "@/lib/auth";

export const metadata = { title: "Settings" };

const rows = [
  ["Contact email", "NEXT_PUBLIC_CONTACT_EMAIL", contact.email],
  ["Contact phone", "NEXT_PUBLIC_CONTACT_PHONE", contact.phone],
  ["Postal address", "NEXT_PUBLIC_CONTACT_ADDRESS", contact.address],
  ["Map link", "NEXT_PUBLIC_MAP_URL", contact.mapUrl],
  ["Donation page", "NEXT_PUBLIC_SUPPORT_URL", contact.supportUrl],
] as const;

export default async function SettingsPage() {
  await requireStaff();
  return (
    <div className="flex max-w-3xl flex-col gap-8">
      <h1 className="text-h2">Settings</h1>
      <p className="text-muted-foreground">
        Contact details are set as environment variables in the hosting dashboard (Vercel), then
        take effect on the next deployment. Until a value is set, the site shows &ldquo;{TBC}
        &rdquo;.
      </p>
      <dl className="flex flex-col">
        {rows.map(([label, variable, value]) => (
          <div key={variable} className="grid gap-1 border-t border-rule py-4 sm:grid-cols-3">
            <dt className="font-semibold">{label}</dt>
            <dd className="font-mono text-sm text-muted-foreground">{variable}</dd>
            <dd>{value ?? TBC}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
