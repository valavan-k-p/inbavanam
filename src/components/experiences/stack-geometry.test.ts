import { describe, expect, it } from "vitest";
import {
  VISIBLE_DEPTH,
  cardPose,
  dragOutcome,
  stackOffset,
  stepIndex,
  tiltFromPointer,
} from "./stack-geometry";

describe("stackOffset", () => {
  it("measures distance from the top card and wraps", () => {
    expect(stackOffset(2, 2, 5)).toBe(0);
    expect(stackOffset(3, 2, 5)).toBe(1);
    expect(stackOffset(1, 2, 5)).toBe(4);
    expect(stackOffset(0, 0, 0)).toBe(0);
  });
});

describe("stepIndex", () => {
  it("wraps in both directions", () => {
    expect(stepIndex(4, 1, 5)).toBe(0);
    expect(stepIndex(0, -1, 5)).toBe(4);
    expect(stepIndex(1, 1, 5)).toBe(2);
  });
});

describe("cardPose", () => {
  it("puts the top card square to the viewer", () => {
    expect(cardPose(0, 5)).toMatchObject({ y: 0, scale: 1, rotate: 0, opacity: 1 });
  });

  it("steps cards back, alternating their tilt", () => {
    const first = cardPose(1, 5);
    const second = cardPose(2, 5);
    expect(first.y).toBeGreaterThan(0);
    expect(second.scale).toBeLessThan(first.scale);
    expect(Math.sign(first.rotate)).toBe(-Math.sign(second.rotate));
  });

  it("hides cards deeper than the visible stack and keeps the top one in front", () => {
    expect(cardPose(VISIBLE_DEPTH + 1, 5).opacity).toBe(0);
    expect(cardPose(0, 5).zIndex).toBeGreaterThan(cardPose(1, 5).zIndex);
  });
});

describe("tiltFromPointer", () => {
  it("is level at the centre and leans towards the pointer", () => {
    expect(tiltFromPointer(0.5, 0.5)).toEqual({ rotateX: -0, rotateY: 0 });
    expect(tiltFromPointer(1, 0.5).rotateY).toBeGreaterThan(0);
    expect(tiltFromPointer(0, 0.5).rotateY).toBeLessThan(0);
    expect(tiltFromPointer(0.5, 1).rotateX).toBeLessThan(0);
  });

  it("clamps pointer positions from outside the stage", () => {
    expect(tiltFromPointer(4, -2).rotateY).toBe(9);
    expect(tiltFromPointer(4, -2).rotateX).toBeCloseTo(6.75);
  });
});

describe("dragOutcome", () => {
  it("advances on a long or fast drag to the left", () => {
    expect(dragOutcome(-120, 0)).toBe(1);
    expect(dragOutcome(-10, -900)).toBe(1);
  });

  it("goes back on a drag to the right, and stays put on a small one", () => {
    expect(dragOutcome(120, 0)).toBe(-1);
    expect(dragOutcome(20, 50)).toBe(0);
  });
});
