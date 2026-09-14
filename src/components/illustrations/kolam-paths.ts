/**
 * Geometry for the pulli kolam motifs. A kolam is drawn as a continuous
 * line looping around a grid of dots (pulli). These helpers generate that
 * geometry so dividers, borders and menu connectors share one visual rule.
 */

export type Point = { x: number; y: number };

/**
 * A two-strand "sikku" border: each strand arcs over one dot and under the
 * next, so the two strands cross between every pair of dots and together
 * encircle each dot once.
 */
export function kolamChain(count: number, spacing = 28, radius = 9, lift = 10) {
  const y = radius + lift;
  const dots: Point[] = Array.from({ length: count }, (_, i) => ({ x: radius + i * spacing, y }));

  const strand = (startOver: boolean) => {
    let d = `M ${dots[0].x - radius} ${y}`;
    dots.forEach((dot, i) => {
      const over = i % 2 === 0 ? startOver : !startOver;
      // sweep 1 travels over the top of the dot, sweep 0 underneath it
      d += ` A ${radius} ${radius} 0 0 ${over ? 1 : 0} ${dot.x + radius} ${y}`;
      const next = dots[i + 1];
      if (next) {
        const dir = over ? 1 : -1;
        d += ` C ${dot.x + radius} ${y + lift * dir} ${next.x - radius} ${y - lift * dir} ${next.x - radius} ${y}`;
      }
    });
    return d;
  };

  return {
    width: dots[dots.length - 1].x + radius,
    height: y * 2,
    dots,
    strands: [strand(true), strand(false)],
  };
}

/** A 3x3 pulli knot: a looped diamond with petals, used for corners and seals. */
export const kolamKnot = {
  size: 96,
  dots: [24, 48, 72].flatMap((y) => [24, 48, 72].map((x) => ({ x, y }))),
  paths: [
    "M48 8 C60 20 76 36 88 48 C76 60 60 76 48 88 C36 76 20 60 8 48 C20 36 36 20 48 8 Z",
    "M48 36 A12 12 0 1 1 47.99 36",
    "M48 14 C56 20 56 30 48 36 C40 30 40 20 48 14 Z",
    "M48 82 C56 76 56 66 48 60 C40 66 40 76 48 82 Z",
    "M14 48 C20 40 30 40 36 48 C30 56 20 56 14 48 Z",
    "M82 48 C76 40 66 40 60 48 C66 56 76 56 82 48 Z",
    "M24 14 A10 10 0 1 1 23.99 14",
    "M72 14 A10 10 0 1 1 71.99 14",
    "M24 62 A10 10 0 1 1 23.99 62",
    "M72 62 A10 10 0 1 1 71.99 62",
  ],
};
