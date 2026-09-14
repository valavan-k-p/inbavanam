import type { Enquiry } from "@/lib/validations/enquiry";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type SaveResult = { ok: true } | { ok: false; reason: "not-configured" | "failed" };

/**
 * Stores an enquiry. The public role may only INSERT into `enquiries`
 * (see supabase/migrations); it can never read enquiries back.
 */
export async function saveEnquiry(enquiry: Enquiry): Promise<SaveResult> {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    if (process.env.NODE_ENV === "development") {
      console.info("[enquiry] Supabase not configured; enquiry received in development:", {
        type: enquiry.type,
        name: enquiry.name,
      });
      return { ok: true };
    }
    return { ok: false, reason: "not-configured" };
  }

  const { error } = await supabase.from("enquiries").insert({
    type: enquiry.type,
    name: enquiry.name,
    email: enquiry.email,
    phone: enquiry.phone ?? null,
    arrival_date: enquiry.arrival ?? null,
    departure_date: enquiry.departure ?? null,
    group_size: enquiry.groupSize ?? null,
    message: enquiry.message,
    context: enquiry.context ?? null,
  });

  if (error) {
    console.error("[enquiry] insert failed", error.code, error.message);
    return { ok: false, reason: "failed" };
  }
  return { ok: true };
}
