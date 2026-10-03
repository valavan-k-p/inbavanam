import { act, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { MediaAsset } from "@/types/content";
import { HeroSlideshow, SLIDE_MS } from "./hero-slideshow";

const slides: MediaAsset[] = [
  { kind: "image", src: "/hero section/one.webp", alt: "" },
  { kind: "image", src: "/hero section/two.webp", alt: "" },
  { kind: "image", src: "/hero section/three.webp", alt: "" },
];

/** Index of the slide currently faded in. */
const shown = () =>
  screen
    .getAllByRole("presentation", { hidden: true })
    .findIndex((img) => img.className.includes("opacity-100"));

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
