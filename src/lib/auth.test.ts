import { describe, expect, it, vi } from "vitest";

vi.mock("@/lib/supabase/server", () => ({ createSupabaseServerClient: async () => null }));
vi.mock("next/navigation", () => ({ redirect: vi.fn() }));

const { safeAdminPath } = await import("./auth");

describe("safeAdminPath", () => {
  it("keeps redirects inside the admin area", () => {
    expect(safeAdminPath("/admin/events")).toBe("/admin/events");
    expect(safeAdminPath("/admin")).toBe("/admin");
  });

  it("rejects external, protocol-relative and login targets", () => {
    expect(safeAdminPath("https://evil.example")).toBe("/admin");
    expect(safeAdminPath("//evil.example")).toBe("/admin");
    expect(safeAdminPath("/admin/../contact")).toBe("/admin");
    expect(safeAdminPath("/admin/login")).toBe("/admin");
    expect(safeAdminPath(undefined)).toBe("/admin");
  });
});
