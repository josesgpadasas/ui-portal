import { useEffect, useRef } from "react";
import { navItems } from "../data/designContent";

type NavId = (typeof navItems)[number]["id"];

function parseHash(): NavId | null {
  const raw = window.location.hash.replace(/^#/, "");
  if (raw && navItems.some((n) => n.id === raw)) return raw as NavId;
  return null;
}

export function useSectionHash(
  activeId: NavId,
  setActiveId: (id: NavId) => void,
  scrollToSection: (id: string) => void,
) {
  const skipHashSync = useRef(false);

  useEffect(() => {
    const id = parseHash();
    if (!id) return;
    skipHashSync.current = true;
    setActiveId(id);
    requestAnimationFrame(() => {
      scrollToSection(id);
      skipHashSync.current = false;
    });
  }, [scrollToSection, setActiveId]);

  useEffect(() => {
    const onHashChange = () => {
      const id = parseHash();
      if (!id) return;
      setActiveId(id);
      scrollToSection(id);
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [scrollToSection, setActiveId]);

  useEffect(() => {
    if (skipHashSync.current) return;
    const next = `#${activeId}`;
    if (window.location.hash === next) return;
    window.history.replaceState(null, "", next);
  }, [activeId]);
}
