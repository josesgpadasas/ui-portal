import { renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useMediaQuery } from "./useMediaQuery";

describe("useMediaQuery", () => {
  it("returns matchMedia result", () => {
    const listeners = new Set<() => void>();
    vi.spyOn(window, "matchMedia").mockImplementation(
      (query: string) =>
        ({
          matches: query.includes("1024"),
          media: query,
          onchange: null,
          addEventListener: (_: string, cb: () => void) => {
            listeners.add(cb);
          },
          removeEventListener: (_: string, cb: () => void) => {
            listeners.delete(cb);
          },
          addListener: (cb: () => void) => {
            listeners.add(cb);
          },
          removeListener: (cb: () => void) => {
            listeners.delete(cb);
          },
          dispatchEvent: () => true,
        }) as MediaQueryList,
    );

    const { result } = renderHook(() => useMediaQuery("(min-width: 1024px)"));
    expect(result.current).toBe(true);
  });
});
