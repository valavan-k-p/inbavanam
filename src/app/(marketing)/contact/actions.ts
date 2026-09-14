"use server";

import { headers } from "next/headers";
import { validateEnquiry, type EnquiryFieldErrors } from "@/lib/validations/enquiry";
import { rateLimit } from "@/lib/rate-limit";
import { saveEnquiry } from "@/lib/db/enquiries";

export type EnquiryState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: EnquiryFieldErrors;
  values?: Record<string, string>;
};

export async function submitEnquiry(
  _prev: EnquiryState,
  formData: FormData,
): Promise<EnquiryState> {
  const values: Record<string, string> = {};
  for (const [key, value] of formData) if (typeof value === "string") values[key] = value;

  // Honeypot: real visitors never see or fill this field.
  if (values.website) return { status: "success" };

  const requestHeaders = await headers();
  const ip = requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (!rateLimit(`enquiry:${ip}`)) {
    return {
      status: "error",
      message:
        "We have received several enquiries from this connection. Please try again in about ten minutes.",
      values,
    };
  }

  const result = validateEnquiry(values);
  if (!result.success) {
    return {
      status: "error",
      message: "Please check the fields marked below.",
      fieldErrors: result.fieldErrors,
      values,
    };
  }

  const saved = await saveEnquiry(result.data);
  if (!saved.ok) {
    return {
      status: "error",
      message:
        saved.reason === "not-configured"
          ? "Online enquiries are not switched on yet. Please try again later."
          : "Your enquiry could not be sent just now. Please try again in a moment.",
      values,
    };
  }

  return { status: "success" };
}
