import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeAll, describe, expect, it, vi } from "vitest";
import type { GalleryItem } from "@/types/content";
import { GalleryWall } from "./gallery-wall";

const items: GalleryItem[] = Array.from({ length: 10 }, (_, i) => ({
  id: `g${i}`,
  kind: "image",
  src: null,
  alt: `Photo ${i}`,
  category: i % 2 ? "Nature" : "Architecture",
  span: "regular",
}));

class FakeResizeObserver {
  private readonly cb: ResizeObserverCallback;
  constructor(cb: ResizeObserverCallback) {
    this.cb = cb;
  }
  observe() {
    this.cb(
      [{ contentRect: { width: 1440, height: 900 } } as ResizeObserverEntry],
      this as unknown as ResizeObserver,
    );
  }
  unobserve() {}
  disconnect() {}
}

class FakeIntersectionObserver {
  private readonly cb: IntersectionObserverCallback;
  constructor(cb: IntersectionObserverCallback) {
    this.cb = cb;
  }
  observe() {
    this.cb(
      [{ isIntersecting: true } as IntersectionObserverEntry],
      this as unknown as IntersectionObserver,
    );
  }
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
}

beforeAll(() => {
  // vitest.setup.ts defines these as writable but not configurable, so assign
  // rather than stub. Reduced motion: no fly-in or zoom, so results are
  // immediate and deterministic.
  Object.assign(window, {
    matchMedia: (query: string) => ({
      matches: query.includes("reduce"),
      media: query,
      onchange: null,
      addEventListener() {},
      removeEventListener() {},
      addListener() {},
      removeListener() {},
      dispatchEvent: () => false,
    }),
    IntersectionObserver: FakeIntersectionObserver,
  });
  vi.stubGlobal("ResizeObserver", FakeResizeObserver);
  vi.stubGlobal("requestAnimationFrame", (cb: FrameRequestCallback) =>
    window.setTimeout(() => cb(performance.now()), 0),
  );
  vi.stubGlobal("cancelAnimationFrame", (id: number) => window.clearTimeout(id));
});

const visibleTiles = (container: HTMLElement) =>
  [...container.querySelectorAll<HTMLElement>(".wall-tile")].filter(
    (t) => t.style.visibility === "visible",
  );

async function renderWall() {
  const utils = render(<GalleryWall items={items} label="Gallery wall" />);
  await waitFor(() => expect(visibleTiles(utils.container).length).toBeGreaterThan(20));
  return utils;
}

describe("GalleryWall", () => {
  it("wraps a grid of tiles onto the sphere, hiding those past its edge", async () => {
    const { container } = await renderWall();
    const all = container.querySelectorAll(".wall-tile");
    const shown = visibleTiles(container);
    expect(all).toHaveLength(168);
    expect(shown.length).toBeLessThan(all.length);
    expect(shown[0].style.transform).toMatch(
      /rotateY\(.+rad\) rotateX\(.+rad\) translateZ\(.+px\)/,
    );
    for (const tile of all) expect(tile).toHaveAttribute("aria-hidden", "true");
  });

  it("moves with the arrow keys and opens the centred photograph with Enter", async () => {
    const user = userEvent.setup();
    await renderWall();
    const region = screen.getByRole("group", { name: /gallery wall/i });
    region.focus();
    await user.keyboard("{ArrowRight}{ArrowDown}");
    await user.keyboard("{Enter}");
    const dialog = await screen.findByRole("dialog");
    expect(within(dialog).getByText(/of 10/)).toBeInTheDocument();
  });

  it("opens a tile on a short press but not at the end of a drag", async () => {
    const { container } = await renderWall();
    const region = screen.getByRole("group", { name: /gallery wall/i });

    const tile = visibleTiles(container)[0];
    fireEvent.pointerDown(tile, { button: 0, pointerId: 1, clientX: 100, clientY: 100 });
    fireEvent.pointerMove(region, { pointerId: 1, clientX: 180, clientY: 100 });
    fireEvent.pointerUp(tile, { pointerId: 1, clientX: 180, clientY: 100 });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    fireEvent.pointerDown(tile, { button: 0, pointerId: 2, clientX: 100, clientY: 100 });
    fireEvent.pointerUp(tile, { pointerId: 2, clientX: 101, clientY: 100 });
    expect(await screen.findByRole("dialog")).toBeInTheDocument();
  });
});
