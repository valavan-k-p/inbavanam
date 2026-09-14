import { cache } from "react";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type StaffRole = "admin" | "editor";

/**
 * The signed-in staff member, or null. Verified against Supabase Auth on
 * every call (getUser contacts the auth server rather than trusting the
 * cookie) and against the role stored in `profiles`.
 */
export const getStaff = cache(async () => {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return null;
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) return null;
  const { data: profile } = await supabase
    .from("profiles")
    .select("role, full_name")
    .eq("id", auth.user.id)
    .single();
  const role = profile?.role as StaffRole | null | undefined;
  if (role !== "admin" && role !== "editor") return null;
  return {
    supabase,
    user: auth.user,
    role,
    name: (profile?.full_name as string | null) ?? auth.user.email ?? "Staff",
  };
});

/** Use at the top of every admin page and server action. */
export async function requireStaff() {
  const staff = await getStaff();
  if (!staff) redirect("/admin/login");
  return staff;
}

/** Only allow redirects back into the admin area. */
export function safeAdminPath(value: unknown): string {
  return typeof value === "string" &&
    /^\/admin(\/[\w-]*)*$/.test(value) &&
    !value.startsWith("/admin/login")
    ? value
    : "/admin";
}
