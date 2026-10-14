import { describe, expect, it, vi } from "vitest";

vi.mock("@/lib/supabase/server", () => ({ createSupabaseServerClient: async () => null }));
vi.mock("next/navigation", () => ({ redirect: vi.fn() }));

const { safeAdminPath } = await import("./auth");

describe("safeAdminPath", () => {
  it("keeps redirects inside the admin area", () => {
    expect(safeAdminPath("/inbavanamadmin/events")).toBe("/inbavanamadmin/events");
    expect(safeAdminPath("/inbavanamadmin")).toBe("/inbavanamadmin");
    expect(safeAdminPath("/admin/events")).toBe("/inbavanamadmin/events");
    expect(safeAdminPath("/admin")).toBe("/inbavanamadmin");
  });

  it("rejects external, protocol-relative and login targets", () => {
    expect(safeAdminPath("https://evil.example")).toBe("/inbavanamadmin");
    expect(safeAdminPath("//evil.example")).toBe("/inbavanamadmin");
    expect(safeAdminPath("/inbavanamadmin/../contact")).toBe("/inbavanamadmin");
    expect(safeAdminPath("/inbavanamadmin/login")).toBe("/inbavanamadmin");
    expect(safeAdminPath("/admin/login")).toBe("/inbavanamadmin");
    expect(safeAdminPath(undefined)).toBe("/inbavanamadmin");
  });
});
