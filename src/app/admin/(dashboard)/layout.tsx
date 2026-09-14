import type { Metadata } from "next";
import Link from "next/link";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { requireStaff } from "@/lib/auth";
import { adminResources } from "@/lib/admin/resources";
import { signOut } from "./actions";

export const metadata: Metadata = {
  title: { default: "Admin", template: "%s | Inbavanam admin" },
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  if (!isSupabaseConfigured) return <NotConfigured />;
  const staff = await requireStaff();

  const nav = [
    { href: "/admin", label: "Dashboard" },
    ...adminResources.map((r) => ({ href: `/admin/${r.slug}`, label: r.title })),
    { href: "/admin/enquiries", label: "Enquiries" },
    { href: "/admin/settings", label: "Settings" },
  ];

  return (
    <div className="min-h-dvh md:grid md:grid-cols-[16rem_1fr]">
      <aside className="surface-maroon flex flex-col gap-8 p-6">
        <Link href="/admin" className="label tracking-[0.3em]">
          Inbavanam admin
        </Link>
        <nav aria-label="Admin">
          <ul className="flex flex-wrap gap-x-4 gap-y-1 md:flex-col">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block min-h-11 content-center underline-offset-4 hover:underline"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-auto flex flex-col gap-3 border-t border-rule pt-6 text-sm">
          <p>
            {staff.name}
            <span className="block text-muted-foreground capitalize">{staff.role}</span>
          </p>
          <form action={signOut}>
            <button
              type="submit"
              className="min-h-11 cursor-pointer label underline-offset-4 hover:underline"
            >
              Sign out
            </button>
          </form>
        </div>
      </aside>
      <main id="main" className="surface-ivory min-w-0 p-6 md:p-10">
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
