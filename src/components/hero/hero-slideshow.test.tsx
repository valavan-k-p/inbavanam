import { act, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { MediaAsset } from "@/types/content";
import { HeroSlideshow, SLIDE_MS } from "./hero-slideshow";

const slides: MediaAsset[] = [
  { kind: "image", src: "/hero section/one.webp", alt: "" },
  { kind: "image", src: "/hero section/two.webp", alt: "" },
  { kind: "image", src: "/hero section/three.webp", alt: "" },
];

/** Index of the photograph currently on top. */
const shown = () =>
  screen
    .getAllByRole("presentation", { hidden: true })
    .findIndex((img) => img.hasAttribute("data-active"));

/** The outgoing photograph must stay opaque under the incoming one. */
const opaque = () =>
  screen
    .getAllByRole("presentation", { hidden: true })
    .filter((img) => img.className.includes("opacity-100")).length;

describe("HeroSlideshow", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("moves to the next photograph on each interval and wraps around", () => {
    render(<HeroSlideshow slides={slides} />);
    expect(shown()).toBe(0);

    act(() => void vi.advanceTimersByTime(SLIDE_MS));
    expect(shown()).toBe(1);

    act(() => void vi.advanceTimersByTime(SLIDE_MS));
    expect(shown()).toBe(2);

    act(() => void vi.advanceTimersByTime(SLIDE_MS));
    expect(shown()).toBe(0);
  });

  it("keeps the outgoing photograph opaque underneath, so the dissolve cannot flicker", () => {
    render(<HeroSlideshow slides={slides} />);
    act(() => void vi.advanceTimersByTime(SLIDE_MS));
    expect(shown()).toBe(1);
    // The incoming one and the one it is covering; never a gap to the base.
    expect(opaque()).toBe(2);
  });

  it("holds a single photograph rather than cycling", () => {
    render(<HeroSlideshow slides={slides.slice(0, 1)} />);
    act(() => void vi.advanceTimersByTime(SLIDE_MS * 3));
    expect(shown()).toBe(0);
  });

  it("skips entries that have no photograph yet", () => {
    render(
      <HeroSlideshow
        slides={[...slides, { kind: "image", src: null, alt: "" } satisfies MediaAsset]}
      />,
    );
    expect(screen.getAllByRole("presentation", { hidden: true })).toHaveLength(3);
  });
});
