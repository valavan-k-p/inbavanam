import type { Metadata } from "next";
import { Logo } from "@/components/brand/logo";
import { safeAdminPath } from "@/lib/auth";
import { getSupabaseConfig } from "@/lib/supabase/config";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Admin sign in",
  robots: { index: false, follow: false },
};

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };

export default async function LoginPage({ searchParams }: Props) {
  const { next, error } = await searchParams;
  const isConfigured = Boolean(getSupabaseConfig());
  return (
    <main id="main" className="surface-maroon grain flex min-h-dvh items-center justify-center p-6">
      <div className="flex w-full max-w-sm flex-col gap-8">
        <Logo size={80} onDark />
        <h1 className="text-h2">Admin sign in</h1>
        {error === "forbidden" ? (
          <p role="alert" className="border-l-2 border-cream bg-maroon-deep p-4 text-sm">
            Access denied. You must have an administrator account to access the dashboard.
          </p>
        ) : null}
        {isConfigured ? (
          <LoginForm next={safeAdminPath(next)} />
        ) : (
          <p className="text-muted-foreground">
            Sign-in is unavailable until Supabase is configured. See README.md.
          </p>
        )}
        <p className="text-sm text-muted-foreground">
          Accounts are created by an administrator. There is no public registration.
        </p>
      </div>
    </main>
  );
}
