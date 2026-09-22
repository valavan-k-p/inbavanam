/**
 * Geometry for the experience card stack: where each card sits behind the
 * top one, and how the stack tilts towards the pointer. Kept free of React
 * so it can be unit tested.
 */

/** How many cards deep the stack is drawn before cards are parked out of sight. */
export const VISIBLE_DEPTH = 2;

/** Distance of a card from the top card, wrapped so the stack loops endlessly. */
export function stackOffset(index: number, active: number, count: number): number {
  if (count <= 0) return 0;
  return (((index - active) % count) + count) % count;
}

/** Moves the active index by `delta`, wrapping at both ends. */
export function stepIndex(active: number, delta: number, count: number): number {
  if (count <= 0) return 0;
  return (((active + delta) % count) + count) % count;
}

export type CardPose = {
  y: number;
  scale: number;
  rotate: number;
  opacity: number;
  zIndex: number;
};

/**
 * Resting pose of a card at `offset`. The top card sits square to the
 * viewer; the ones behind step down, shrink and alternate their tilt.
 * Cards deeper than VISIBLE_DEPTH wait behind the stack, ready to wrap.
 */
export function cardPose(offset: number, count: number): CardPose {
  const zIndex = count - offset;
  if (offset > VISIBLE_DEPTH) {
    return { y: 42, scale: 0.84, rotate: 0, opacity: 0, zIndex };
  }
  return {
    y: offset * 16,
    scale: 1 - offset * 0.06,
    rotate: offset === 0 ? 0 : offset % 2 === 1 ? -2.4 : 2.4,
    opacity: 1,
    zIndex,
  };
}

/**
 * Stack tilt from a pointer position given in 0-1 across the stage.
 * Returns degrees; the sign follows the pointer, as if the stack were a
 * card held in the hand.
 */
export function tiltFromPointer(x: number, y: number, max = 9): { rotateX: number; rotateY: number } {
  const clamp = (v: number) => Math.min(1, Math.max(0, v));
  return {
    rotateY: (clamp(x) - 0.5) * 2 * max,
    rotateX: -(clamp(y) - 0.5) * 2 * (max * 0.75),
  };
}

/** A drag is committed when it passes this distance, or is thrown this fast. */
export const DRAG_DISTANCE = 90;
export const DRAG_VELOCITY = 450;

/** Which way a released drag should move the stack: 1 forwards, -1 back, 0 stay. */
export function dragOutcome(offsetX: number, velocityX: number): -1 | 0 | 1 {
  if (offsetX <= -DRAG_DISTANCE || velocityX <= -DRAG_VELOCITY) return 1;
  if (offsetX >= DRAG_DISTANCE || velocityX >= DRAG_VELOCITY) return -1;
  return 0;
}
