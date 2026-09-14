import { useState } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { PillGroup } from "./pill-group";

function Harness() {
  const [value, setValue] = useState<"all" | "a" | "b">("all");
  return (
    <>
      <PillGroup
        label="Filter"
        layoutId="test"
        value={value}
        onChange={setValue}
        options={[
          { value: "all", label: "All" },
          { value: "a", label: "Architecture" },
          { value: "b", label: "Nature" },
        ]}
      />
      <p>selected: {value}</p>
    </>
  );
}

describe("PillGroup", () => {
  it("exposes a labelled group of toggle buttons with one pressed", async () => {
    const user = userEvent.setup();
    render(<Harness />);
    expect(screen.getByRole("group", { name: "Filter" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "All" })).toHaveAttribute("aria-pressed", "true");

    await user.click(screen.getByRole("button", { name: "Nature" }));
    expect(screen.getByRole("button", { name: "Nature" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("button", { name: "All" })).toHaveAttribute("aria-pressed", "false");
    expect(screen.getByText("selected: b")).toBeInTheDocument();
  });
});
