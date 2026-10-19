import { createPortal } from "react-dom";
import { useEffect, useRef, type ReactNode } from "react";
import { useFocusTrap } from "../hooks/useFocusTrap";
import { useScrollLock } from "../hooks/useScrollLock";

type Props = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  side?: "left" | "right";
  ariaLabel?: string;
  className?: string;
  panelClassName?: string;
};

export function Drawer({
  open,
  onClose,
  children,
  side = "left",
  ariaLabel = "Panel",
  className = "",
  panelClassName = "",
}: Props) {
  const panelRef = useRef<HTMLDivElement>(null);
  useScrollLock(open);
  useFocusTrap(open, panelRef);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const slideFrom = side === "left" ? "left-0" : "right-0";
  const motion = side === "left" ? "translate-x-0" : "translate-x-0";

  return createPortal(
    <>
      <div
        className="motion-backdrop fixed inset-0 z-[90] bg-zinc-900/45 backdrop-blur-[2px] opacity-100"
        aria-hidden
        onClick={onClose}
      />
      <div
        id="portal-nav-drawer"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        className={`motion-drawer fixed inset-y-0 ${slideFrom} z-[95] flex h-full w-[min(100%,20rem)] max-w-[92vw] flex-col pb-[env(safe-area-inset-bottom,0px)] shadow-2xl shadow-zinc-900/10 ${motion} ${className} ${panelClassName}`}
      >
        {children}
      </div>
    </>,
    document.body,
  );
}
