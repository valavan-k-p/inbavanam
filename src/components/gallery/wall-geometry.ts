/**
 * Geometry for the gallery wall: a grid of tiles wrapped onto the front of
 * a sphere. Kept free of React so it can be unit tested.
 */

export const WALL_COLS = 14;
export const WALL_ROWS = 12;

/** Wraps a value into [-size / 2, size / 2), so the grid repeats endlessly. */
export function wrapCentered(value: number, size: number): number {
  const m = ((value % size) + size) % size;
  return m >= size / 2 ? m - size : m;
}

/**
 * Which gallery item a tile shows. Each row is shifted so that neighbours,
 * horizontally and vertically, rarely repeat the same photograph.
 */
export function tileItemIndex(tile: number, count: number, cols = WALL_COLS): number {
  if (count <= 0) return -1;
  const c = tile % cols;
  const r = Math.floor(tile / cols);
  const shift = (cols + 3) % count === 0 ? cols + 4 : cols + 3;
  return (r * shift + c) % count;
}

/** Deterministic value in [0, 1) per tile, used to stagger the entrance. */
export function pseudoRandom(seed: number): number {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
}

export type WallGeometry = {
  tileW: number;
  tileH: number;
  cellW: number;
  cellH: number;
  /** Sphere radius in px. */
  radius: number;
};

/** Tile size and sphere radius for a wall of the given size. */
export function measureWall(width: number, height: number): WallGeometry {
  // Width sets the tile size; height caps it on short, wide screens.
  const tileW = Math.round(
    Math.min(380, Math.max(170, width * 0.22), Math.max(140, height * 0.45)),
  );
  const tileH = Math.round(tileW * 0.625);
  const gap = Math.round(tileW * 0.06);
  const cellW = tileW + gap;
  const cellH = tileH + gap;
  // Keep the visible arc (|angle| < acos(0.3), about 1.27 rad) inside one
  // repeat of the grid, so a tile never needs to be in two places at once.
  const radius = Math.round(Math.min(WALL_COLS * cellW, WALL_ROWS * cellH) / 2.6);
  return { tileW, tileH, cellW, cellH, radius };
}

/** Below this facing value a tile is too close to the edge of the sphere to show. */
export const MIN_FACING = 0.3;

/** Angles for a tile at flat offset (x, y) from the centre of the view. */
export function projectTile(x: number, y: number, radius: number) {
  const yaw = x / radius;
  const pitch = y / radius;
  return { yaw, pitch, facing: Math.cos(yaw) * Math.cos(pitch) };
}
