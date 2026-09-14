import { describe, expect, it } from "vitest";
import { alongRay, nextIndex, radialPositions } from "./radial-geometry";

describe("radialPositions", () => {
  it("starts at 12 o'clock and proceeds clockwise", () => {
    const [top, right, bottom, left] = radialPositions(4, 40);
    expect(top).toMatchObject({ x: 50, y: 10 });
    expect(right).toMatchObject({ x: 90, y: 50 });
    expect(bottom).toMatchObject({ x: 50, y: 90 });
    expect(left).toMatchObject({ x: 10, y: 50 });
  });

  it("keeps every point inside the container", () => {
    for (const p of radialPositions(8, 40)) {
      expect(p.x).toBeGreaterThanOrEqual(10);
      expect(p.x).toBeLessThanOrEqual(90);
      expect(p.y).toBeGreaterThanOrEqual(10);
      expect(p.y).toBeLessThanOrEqual(90);
    }
  });

  it("places connector points on the same ray", () => {
    const [top] = radialPositions(8, 40);
    expect(alongRay(top, 20)).toEqual({ x: 50, y: 30 });
  });
});

describe("nextIndex", () => {
  it("wraps in both directions", () => {
    expect(nextIndex(7, "ArrowRight", 8)).toBe(0);
    expect(nextIndex(0, "ArrowLeft", 8)).toBe(7);
    expect(nextIndex(3, "ArrowDown", 8)).toBe(4);
    expect(nextIndex(3, "ArrowUp", 8)).toBe(2);
  });

  it("supports Home and End and ignores other keys", () => {
    expect(nextIndex(4, "Home", 8)).toBe(0);
    expect(nextIndex(4, "End", 8)).toBe(7);
    expect(nextIndex(4, "Enter", 8)).toBeNull();
  });
});
