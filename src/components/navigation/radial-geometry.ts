export type RadialPoint = { angle: number; x: number; y: number };

const round = (n: number) => Math.round(n * 1000) / 1000;

/**
 * Evenly spaced points on a circle, in percent of a square container.
 * The first point sits at 12 o'clock and the rest follow clockwise, which
 * matches the DOM (and therefore Tab) order of the menu items.
 */
export function radialPositions(count: number, radius = 40, startAngle = -90): RadialPoint[] {
  return Array.from({ length: count }, (_, i) => {
    const angle = startAngle + (360 / count) * i;
    const rad = (angle * Math.PI) / 180;
    return { angle, x: round(50 + Math.cos(rad) * radius), y: round(50 + Math.sin(rad) * radius) };
  });
}

/** A point along the ray from the centre towards `point`, at `radius` percent. */
export function alongRay(point: RadialPoint, radius: number) {
  const rad = (point.angle * Math.PI) / 180;
  return { x: round(50 + Math.cos(rad) * radius), y: round(50 + Math.sin(rad) * radius) };
}

/** Arrow-key navigation around the ring. Returns null for keys it does not handle. */
export function nextIndex(current: number, key: string, count: number): number | null {
  switch (key) {
    case "ArrowRight":
    case "ArrowDown":
      return (current + 1) % count;
    case "ArrowLeft":
    case "ArrowUp":
      return (current - 1 + count) % count;
    case "Home":
      return 0;
    case "End":
      return count - 1;
    default:
      return null;
  }
}
