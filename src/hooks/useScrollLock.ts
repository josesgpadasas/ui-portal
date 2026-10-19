import { useEffect } from "react";

/** Locks vertical scroll on a scroll container (portal main) while overlays are open. */
export function useScrollLock(locked: boolean, selector = "main") {
  useEffect(() => {
    if (!locked) return;
    const el = document.querySelector(selector);
    if (!(el instanceof HTMLElement)) return;
    const previous = el.style.overflow;
    el.style.overflow = "hidden";
    return () => {
      el.style.overflow = previous;
    };
  }, [locked, selector]);
}
