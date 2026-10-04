import { requireAdmin } from "@/lib/auth";
import { ProfileEditor } from "@/components/admin/profile-editor";
import { profileOverview } from "@/data/organisation-profile";
import { founders } from "@/data/story";

export const metadata = { title: "About & Organisation Profile" };

export default async function AdminProfilePage() {
  const { supabase } = await requireAdmin();

  const { data: storedSetting } = await supabase
    .from("site_settings")
    .select("value")
    .eq("key", "organisation_profile")
    .single();

  const stored = (storedSetting?.value && typeof storedSetting.value === "object")
    ? (storedSetting.value as Record<string, string>)
    : {};

  const initialValues: Record<string, string> = {
    eyebrow: profileOverview.eyebrow,
    heading: profileOverview.heading,
    tagline: profileOverview.tagline,
    lede: profileOverview.lede,
    priority1Title: profileOverview.foundingPriorities[0]?.title ?? "School and reading",
    priority1Desc: profileOverview.foundingPriorities[0]?.description ?? "",
    priority2Title: profileOverview.foundingPriorities[1]?.title ?? "Farming and earning",
    priority2Desc: profileOverview.foundingPriorities[1]?.description ?? "",
    founder1Name: founders[0]?.name ?? "Gladston Xavier",
    founder1Role: founders[0]?.role ?? "Co-founder, social worker",
    founder1Bio: founders[0]?.bio ?? "",
    founder1Portrait: founders[0]?.portrait?.src ?? "/gallery image/WhatsApp Image 2026-09-14 at 4.01.17 PM (7).jpeg",
    founder2Name: founders[1]?.name ?? "Florina Xavier",
    founder2Role: founders[1]?.role ?? "Co-founder, social worker",
    founder2Bio: founders[1]?.bio ?? "",
    founder2Portrait: founders[1]?.portrait?.src ?? "/gallery image/WhatsApp Image 2026-09-14 at 4.01.17 PM (6).jpeg",
    ...stored,
  };

  return (
    <div className="flex max-w-3xl flex-col gap-8">
      <div>
        <span className="label text-muted-foreground">About & Organisation</span>
        <h1 className="text-h2">Organisation Profile & Founders</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage the overarching narrative of Inbavanam, village engagement focus, founding priorities,
          and Gladston & Florina Xavier&apos;s verified profiles.
        </p>
      </div>

      <ProfileEditor initial={initialValues} />
    </div>
  );
}
