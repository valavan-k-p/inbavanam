import { describe, expect, it } from "vitest";
import { isEnquiryType, validateEnquiry } from "./enquiry";

const valid = {
  type: "stay",
  name: "Asha",
  email: "asha@example.org",
  phone: "",
  arrival: "2026-11-01",
  departure: "2026-11-03",
  groupSize: "4",
  message: "We would like to stay for two nights.",
  consent: "on",
};

describe("validateEnquiry", () => {
  it("accepts a complete stay enquiry and normalises optional fields", () => {
    const result = validateEnquiry(valid);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.groupSize).toBe(4);
      expect(result.data.phone).toBeUndefined();
    }
  });

  it("requires consent, a valid email and a real message", () => {
    const result = validateEnquiry({
      ...valid,
      email: "not-an-email",
      message: "hi",
      consent: undefined,
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.fieldErrors.email?.[0]).toMatch(/valid email/);
      expect(result.fieldErrors.message?.[0]).toMatch(/at least 10/);
      expect(result.fieldErrors.consent?.[0]).toMatch(/agree/);
    }
  });

  it("rejects a departure before arrival", () => {
    const result = validateEnquiry({ ...valid, arrival: "2026-11-05", departure: "2026-11-01" });
    expect(result.success).toBe(false);
    if (!result.success) expect(result.fieldErrors.departure?.[0]).toMatch(/on or after arrival/);
  });

  it("rejects unknown enquiry types and malformed phone numbers", () => {
    const result = validateEnquiry({ ...valid, type: "booking", phone: "call me" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.fieldErrors.type).toBeDefined();
      expect(result.fieldErrors.phone).toBeDefined();
    }
  });

  it("trims whitespace-only names as missing", () => {
    const result = validateEnquiry({ ...valid, name: "   " });
    expect(result.success).toBe(false);
  });
});

describe("isEnquiryType", () => {
  it("narrows query-string values", () => {
    expect(isEnquiryType("volunteer")).toBe(true);
    expect(isEnquiryType("admin")).toBe(false);
    expect(isEnquiryType(undefined)).toBe(false);
  });
});
