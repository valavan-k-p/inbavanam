import { beforeEach, describe, expect, it } from "vitest";
import { rateLimit, resetRateLimit } from "./rate-limit";

describe("rateLimit", () => {
  beforeEach(() => resetRateLimit());

  it("allows up to the limit within a window, then blocks", () => {
    const now = 1_000;
    for (let i = 0; i < 3; i++) expect(rateLimit("k", 3, 60_000, now)).toBe(true);
    expect(rateLimit("k", 3, 60_000, now)).toBe(false);
  });

  it("resets after the window and tracks keys separately", () => {
    expect(rateLimit("a", 1, 60_000, 0)).toBe(true);
    expect(rateLimit("a", 1, 60_000, 10)).toBe(false);
    expect(rateLimit("b", 1, 60_000, 10)).toBe(true);
    expect(rateLimit("a", 1, 60_000, 60_001)).toBe(true);
  });
});
