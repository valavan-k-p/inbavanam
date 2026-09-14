"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { rateLimit } from "@/lib/rate-limit";
import { safeAdminPath } from "@/lib/auth";

export type LoginState = { error?: string };

const credentials = z.object({
  email: z.email(),
  password: z.string().min(1).max(200),
});

export async function signIn(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return { error: "Supabase is not configured." };

  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (!rateLimit(`login:${ip}`, 10))
    return { error: "Too many attempts. Please wait a few minutes and try again." };

  const parsed = credentials.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!parsed.success) return { error: "Enter your email address and password." };

  const { error } = await supabase.auth.signInWithPassword(parsed.data);
  // Same message whatever the cause, so the form does not reveal which accounts exist.
  if (error) return { error: "That email and password combination was not recognised." };

  redirect(safeAdminPath(formData.get("next")));
}
