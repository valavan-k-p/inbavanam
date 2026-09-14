import { z } from "zod";

export const enquiryTypes = ["general", "stay", "event", "volunteer", "support"] as const;
export type EnquiryType = (typeof enquiryTypes)[number];

export const enquiryTypeLabels: Record<EnquiryType, string> = {
  general: "General enquiry",
  stay: "Plan a stay",
  event: "Event or gathering",
  volunteer: "Volunteer",
  support: "Support Inbavanam",
};

export function isEnquiryType(value: unknown): value is EnquiryType {
  return typeof value === "string" && (enquiryTypes as readonly string[]).includes(value);
}

/** Treats empty form fields as absent so optional rules only apply to real input. */
const optional = <T extends z.ZodType>(schema: T) =>
  z.preprocess((value) => (value === "" || value === null ? undefined : value), schema.optional());

/**
 * One schema for every enquiry context, shared by the browser (instant
 * feedback) and the server action (authoritative check).
 */
export const enquirySchema = z
  .object({
    type: z.enum(enquiryTypes, { error: "Choose what your enquiry is about." }),
    name: z.string().trim().min(2, { error: "Please enter your name." }).max(120),
    email: z
      .email({ error: "Please enter a valid email address, like name@example.com." })
      .max(200),
    phone: optional(
      z
        .string()
        .trim()
        .max(30)
        .regex(/^[+\d\s()-]{6,}$/, { error: "Use digits, spaces, brackets or + only." }),
    ),
    arrival: optional(z.iso.date({ error: "Choose a valid date." })),
    departure: optional(z.iso.date({ error: "Choose a valid date." })),
    groupSize: optional(
      z.coerce
        .number({ error: "Enter a number." })
        .int()
        .min(1, { error: "At least 1 person." })
        .max(1000),
    ),
    message: z
      .string()
      .trim()
      .min(10, { error: "Please tell us a little more (at least 10 characters)." })
      .max(4000, { error: "Please keep your message under 4000 characters." }),
    context: optional(z.string().trim().max(200)),
    consent: z.literal("on", { error: "Please agree so that we can reply to you." }),
  })
  .refine((d) => !d.arrival || !d.departure || d.departure >= d.arrival, {
    path: ["departure"],
    error: "Departure must be on or after arrival.",
  });

export type Enquiry = z.infer<typeof enquirySchema>;
export type EnquiryFieldErrors = Partial<Record<keyof Enquiry, string[]>>;

export function validateEnquiry(input: Record<string, unknown>) {
  const result = enquirySchema.safeParse(input);
  if (result.success) return { success: true as const, data: result.data };
  return {
    success: false as const,
    fieldErrors: z.flattenError(result.error).fieldErrors as EnquiryFieldErrors,
  };
}
