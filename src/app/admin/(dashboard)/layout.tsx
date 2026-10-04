import type { Metadata } from "next";
import { getSupabaseConfig } from "@/lib/supabase/config";
import { requireAdmin } from "@/lib/auth";
import { AdminNav } from "@/components/admin/admin-nav";
import { signOut } from "./actions";

export const metadata: Metadata = {
  title: { default: "Admin", template: "%s | Inbavanam Admin" },
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  if (!getSupabaseConfig()) return <NotConfigured />;
  const staff = await requireAdmin();

  let unreadEnquiries = 0;
  try {
    const { count } = await staff.supabase
      .from("enquiries")
      .select("id", { count: "exact", head: true })
      .eq("status", "new");
    unreadEnquiries = count ?? 0;
  } catch {
    // fallback if table query fails
  }

  return (
    <div className="flex min-h-dvh flex-col md:flex-row">
      <AdminNav
        staff={{ name: staff.name, role: staff.role }}
        unreadEnquiries={unreadEnquiries}
        signOutAction={signOut}
      />
      <main id="main" className="surface-ivory min-w-0 flex-1 p-6 md:p-10">
        {children}
      </main>
    </div>
  );
}

function NotConfigured() {
  return (
    <main id="main" className="container-page flex min-h-dvh flex-col justify-center gap-4 py-20">
      <p className="label text-muted-foreground">Admin</p>
      <h1 className="text-h2">The admin needs Supabase to be configured.</h1>
      <p className="prose-measure text-muted-foreground">
        Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY, apply the migrations
        in supabase/migrations, and create the first staff user. The steps are in README.md.
      </p>
    </main>
  );
}
