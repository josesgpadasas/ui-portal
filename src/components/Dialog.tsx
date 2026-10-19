import { createPortal } from "react-dom";
import { useRef, type ReactNode } from "react";
import { useDialogA11y } from "../hooks/useDialogA11y";
import { useScrollLock } from "../hooks/useScrollLock";

type Props = {
  open: boolean;
  onClose: () => void;
  title: string;
  titleId?: string;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
};

export function Dialog({ open, onClose, title, titleId = "dialog-title", children, footer, className = "" }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);
  useScrollLock(open);
  useDialogA11y(open, onClose, panelRef);

  if (!open) return null;

  return createPortal(
    <div
      className="motion-dialog-backdrop fixed inset-0 z-[100] flex items-end justify-center bg-zinc-900/45 p-3 backdrop-blur-[2px] sm:items-center sm:p-4"
      role="presentation"
      onClick={onClose}
    >
      <div
        ref={panelRef}
        className={`motion-dialog-panel w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-6 shadow-xl ${className}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(event) => event.stopPropagation()}
      >
        <h2 id={titleId} className="text-lg font-semibold text-zinc-900">
          {title}
        </h2>
        <div className="mt-2">{children}</div>
        {footer ? <div className="mt-6 flex flex-wrap justify-end gap-2">{footer}</div> : null}
      </div>
    </div>,
    document.body,
  );
}
