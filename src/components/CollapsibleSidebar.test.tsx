import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { CollapsibleSidebar } from "./CollapsibleSidebar";

vi.mock("../hooks/useMediaQuery", () => ({
  useMediaQuery: () => true,
}));

describe("CollapsibleSidebar", () => {
  it("renders brand and navigation labels when expanded on desktop", () => {
    render(
      <CollapsibleSidebar
        brand="System Design"
        items={[
          {
            label: "Overview",
            href: "#overview",
            active: true,
            icon: <span data-testid="icon" />,
          },
        ]}
      />,
    );

    expect(screen.getByText("System Design")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Overview/i })).toHaveAttribute("aria-current", "page");
  });
});
