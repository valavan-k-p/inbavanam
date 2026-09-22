import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { primaryNav } from "@/data/site";
import { SiteMenu } from "./site-menu";

const pathname = vi.hoisted(() => ({ value: "/" }));
vi.mock("next/navigation", () => ({ usePathname: () => pathname.value }));

async function openMenu() {
  const user = userEvent.setup();
  render(<SiteMenu />);
  await user.click(screen.getByRole("button", { name: /menu/i }));
  const dialog = await screen.findByRole("dialog");
  return { user, dialog };
}

describe("SiteMenu", () => {
  beforeEach(() => {
    pathname.value = "/";
  });

  it("opens a labelled dialog containing every primary destination", async () => {
    const { dialog } = await openMenu();
    expect(dialog).toHaveAccessibleName("Site navigation");
    const nav = within(dialog).getByRole("navigation", { name: "Primary" });
    for (const item of primaryNav) {
      // Rendered once for the radial layout and once for the stacked layout; CSS shows one.
      expect(within(nav).getAllByRole("link", { name: item.label })).toHaveLength(2);
    }
  });

  it("closes with Escape and returns focus to the trigger", async () => {
    const { user } = await openMenu();
    await user.keyboard("{Escape}");
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
    expect(screen.getByRole("button", { name: /menu/i })).toHaveFocus();
  });

  it("closes from the visible Close button", async () => {
    const { user, dialog } = await openMenu();
    await user.click(within(dialog).getByRole("button", { name: /close/i }));
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
  });

  it("moves around the ring with the arrow keys, wrapping at the ends", async () => {
    const { user, dialog } = await openMenu();
    const radial = within(dialog)
      .getAllByRole("link")
      .filter((el) => el.dataset.navLink === "radial");
    expect(radial).toHaveLength(primaryNav.length);

    radial[0].focus();
    await user.keyboard("{ArrowRight}");
    expect(radial[1]).toHaveFocus();
    await user.keyboard("{ArrowLeft}{ArrowLeft}");
    expect(radial[radial.length - 1]).toHaveFocus();
    await user.keyboard("{Home}");
    expect(radial[0]).toHaveFocus();
  });

  it("marks the current section with aria-current", async () => {
    pathname.value = "/our-work";
    const { dialog } = await openMenu();
    const current = within(dialog)
      .getAllByRole("link", { name: "Our Work" })
      .every((el) => el.getAttribute("aria-current") === "page");
    expect(current).toBe(true);
    expect(within(dialog).getAllByRole("link", { name: "Stay" })[0]).not.toHaveAttribute(
      "aria-current",
    );
  });

  it("describes each radial destination for assistive technology", async () => {
    const { dialog } = await openMenu();
    const about = within(dialog)
      .getAllByRole("link", { name: "About" })
      .find((el) => el.dataset.navLink === "radial");
    const description = primaryNav.find((item) => item.label === "About")?.description;
    expect(about).toHaveAccessibleDescription(description);
  });
});
