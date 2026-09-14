import { describe, expect, it } from "vitest";
import {
  MIN_FACING,
  WALL_COLS,
  WALL_ROWS,
  measureWall,
  projectTile,
  pseudoRandom,
  tileItemIndex,
  wrapCentered,
} from "./wall-geometry";

describe("wrapCentered", () => {
  it("wraps into [-size/2, size/2)", () => {
    expect(wrapCentered(0, 100)).toBe(0);
    expect(wrapCentered(49, 100)).toBe(49);
    expect(wrapCentered(50, 100)).toBe(-50);
    expect(wrapCentered(-51, 100)).toBe(49);
    expect(wrapCentered(1234, 100)).toBe(34);
  });
});

describe("tileItemIndex", () => {
  it("covers every item and avoids repeating a neighbour", () => {
    const count = 10;
    const indices = Array.from({ length: WALL_COLS * WALL_ROWS }, (_, k) =>
      tileItemIndex(k, count),
    );
    expect(new Set(indices).size).toBe(count);
    for (let k = 0; k < indices.length; k++) {
      const c = k % WALL_COLS;
      if (c < WALL_COLS - 1) expect(indices[k + 1]).not.toBe(indices[k]);
      if (k + WALL_COLS < indices.length) expect(indices[k + WALL_COLS]).not.toBe(indices[k]);
    }
  });

  it("handles a single item and no items", () => {
    expect(tileItemIndex(5, 1)).toBe(0);
    expect(tileItemIndex(5, 0)).toBe(-1);
  });
});

describe("pseudoRandom", () => {
  it("is deterministic and within [0, 1)", () => {
    for (let k = 0; k < 200; k++) {
      const v = pseudoRandom(k);
      expect(v).toBeGreaterThanOrEqual(0);
      expect(v).toBeLessThan(1);
      expect(pseudoRandom(k)).toBe(v);
    }
  });
});

describe("measureWall", () => {
  it.each([
    [375, 812],
    [1440, 900],
    [1920, 1080],
  ])("keeps the visible arc inside one repeat at %ix%i", (w, h) => {
    const g = measureWall(w, h);
    const visibleHalfArc = Math.acos(MIN_FACING) * g.radius;
    expect(visibleHalfArc).toBeLessThanOrEqual((WALL_COLS * g.cellW) / 2);
    expect(visibleHalfArc).toBeLessThanOrEqual((WALL_ROWS * g.cellH) / 2);
  });
});

describe("projectTile", () => {
  it("faces the viewer at the centre and turns away towards the edge", () => {
    expect(projectTile(0, 0, 1000).facing).toBe(1);
    expect(projectTile(1000, 0, 1000).facing).toBeCloseTo(Math.cos(1));
    expect(projectTile(0, -500, 1000).pitch).toBeCloseTo(-0.5);
  });
});
