import { describe, expect, it } from "vitest";
import { getAdminResource, resourceSchema } from "./resources";

const events = getAdminResource("events")!;

describe("resourceSchema", () => {
  it("validates an event and converts form values", () => {
    const result = resourceSchema(events).safeParse({
      title: "Open day",
      slug: "open-day",
      category: "Community",
      start_date: "2026-12-05",
      end_date: "",
      time_label: "",
      location: "Inbavanam",
      summary: "",
      registration_url: "",
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.end_date).toBeNull();
      expect(result.data.published).toBe(false);
    }
  });

  it("rejects bad slugs, unknown categories and reversed dates", () => {
    const result = resourceSchema(events).safeParse({
      title: "X",
      slug: "Open Day!",
      category: "Party",
      start_date: "2026-12-05",
      end_date: "2026-12-01",
      location: "Inbavanam",
    });
    expect(result.success).toBe(false);
    const paths = result.error?.issues.map((i) => i.path[0]);
    expect(paths).toEqual(expect.arrayContaining(["slug", "category"]));
  });

  it("splits list fields into trimmed lines", () => {
    const rooms = getAdminResource("accommodations")!;
    const result = resourceSchema(rooms).safeParse({
      name: "Room",
      slug: "room",
      amenities: " Fan \n\n Desk ",
    });
    expect(result.success && result.data.amenities).toEqual(["Fan", "Desk"]);
  });
});
