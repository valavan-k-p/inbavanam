import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next/cache", () => ({ revalidatePath: () => {} }));

/** A stand-in for the two site_settings rows these actions read and write. */
const rows = new Map<string, unknown>();

const supabase = {
  from() {
    return {
      select() {
        return {
          eq(_col: string, key: string) {
            return {
              single: async () => ({ data: rows.has(key) ? { value: rows.get(key) } : null }),
            };
          },
        };
      },
      async upsert(record: { key: string; value: unknown }) {
        rows.set(record.key, record.value);
        return { error: null };
      },
    };
  },
};

vi.mock("@/lib/auth", () => ({ requireAdmin: async () => ({ supabase }) }));

const { saveSiteContent, restorePreviousContent, listContentVersions } = await import("./actions");
const { MAX_VERSIONS } = await import("./limits");

const save = (section: string, values: Record<string, string>) =>
  saveSiteContent(section, { status: "idle" }, formOf(values));

const formOf = (values: Record<string, string>) => {
  const fd = new FormData();
  for (const [k, v] of Object.entries(values)) fd.append(k, v);
  return fd;
};

const live = (section: string) =>
  (rows.get("site_content") as Record<string, Record<string, string>>)?.[section];

describe("admin content history", () => {
  beforeEach(() => rows.clear());

  it("keeps every edit, not just the last one", async () => {
    await save("hero", { heading: "one" });
    await save("hero", { heading: "two" });
    await save("hero", { heading: "three" });

    const versions = await listContentVersions("hero");
    expect(versions).toHaveLength(2);
    expect(live("hero")).toEqual({ heading: "three" });
  });

  it("restores a chosen version, not only the most recent", async () => {
    await save("hero", { heading: "one" });
    await save("hero", { heading: "two" });
    await save("hero", { heading: "three" });

    // index 0 is "two", index 1 is "one"
    const res = await restorePreviousContent("hero", 1);
    expect(res.success).toBe(true);
    expect(live("hero")).toEqual({ heading: "one" });
  });

  it("keeps what it replaced, so a restore can be undone", async () => {
    await save("hero", { heading: "one" });
    await save("hero", { heading: "two" });

    await restorePreviousContent("hero", 0);
    expect(live("hero")).toEqual({ heading: "one" });

    // "two" was archived by the restore, so it is still reachable.
    await restorePreviousContent("hero", 0);
    expect(live("hero")).toEqual({ heading: "two" });
  });

  it("holds at most ten versions", async () => {
    for (let i = 0; i < 15; i++) await save("hero", { heading: `v${i}` });
    expect(await listContentVersions("hero")).toHaveLength(MAX_VERSIONS);
  });

  it("keeps each section's history separate", async () => {
    await save("hero", { heading: "hero one" });
    await save("hero", { heading: "hero two" });
    await save("land", { heading: "land one" });

    expect(await listContentVersions("hero")).toHaveLength(1);
    expect(await listContentVersions("land")).toHaveLength(0);
    expect(live("land")).toEqual({ heading: "land one" });
  });

  it("offers history saved in the old single-version format", async () => {
    rows.set("site_content", { hero: { heading: "current" } });
    rows.set("site_content_previous", {
      hero: { heading: "from before the upgrade" },
      hero_archived_at: "2026-10-01T10:00:00.000Z",
    });

    const versions = await listContentVersions("hero");
    expect(versions).toHaveLength(1);

    await restorePreviousContent("hero", 0);
    expect(live("hero")).toEqual({ heading: "from before the upgrade" });
  });

  it("refuses a field longer than the limit", async () => {
    const res = await save("hero", { heading: "x".repeat(5_001) });
    expect(res.status).toBe("error");
    expect(res.message).toMatch(/too long/i);
    expect(rows.get("site_content")).toBeUndefined();
  });

  it("reports when a section has no saved version", async () => {
    const res = await restorePreviousContent("hero", 0);
    expect(res.success).toBe(false);
    expect(res.message).toMatch(/no previous/i);
  });
});
