import { Maximize2, X } from "lucide-react";
import { createPortal } from "react-dom";
import { useRef, type ReactNode } from "react";
import { useDialogA11y } from "../hooks/useDialogA11y";
import { useScrollLock } from "../hooks/useScrollLock";
import { Button } from "../ui/Button";

type Props = {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  route?: string;
  children: ReactNode;
};

export function TemplatePreviewModal({ open, onClose, title, description, route, children }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);
  useScrollLock(open);
  useDialogA11y(open, onClose, panelRef);

  if (!open) return null;

  const titleId = "template-preview-modal-title";

  return createPortal(
    <div
      className="motion-dialog-backdrop fixed inset-0 z-[100] flex items-stretch justify-center bg-zinc-900/50 p-2 backdrop-blur-[2px] sm:items-center sm:p-4"
      role="presentation"
      onClick={onClose}
    >
      <div
        ref={panelRef}
        className="motion-dialog-panel flex h-[min(100%,96vh)] w-full max-w-6xl flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex shrink-0 flex-wrap items-start justify-between gap-3 border-b border-zinc-200 bg-zinc-50 px-4 py-3 sm:px-5">
          <div className="min-w-0 flex-1">
            <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-zinc-500">
              <Maximize2 className="size-3.5" aria-hidden />
              Template preview
            </p>
            <h2 id={titleId} className="mt-0.5 text-lg font-semibold text-zinc-900">
              {title}
            </h2>
            {description ? <p className="copy-body-tight mt-1">{description}</p> : null}
          </div>
          <div className="flex shrink-0 flex-wrap items-center gap-2">
            {route ? (
              <code className="hidden max-w-[min(100%,18rem)] truncate rounded-lg border border-zinc-200 bg-white px-2.5 py-1 font-mono text-[10px] text-primary-subtle sm:inline-block sm:text-[11px]">
                {route}
              </code>
            ) : null}
            <Button size="sm" variant="secondary" onClick={onClose} aria-label="Close expanded preview">
              <X className="size-4" aria-hidden />
              Close
            </Button>
          </div>
        </div>
        <div className="min-h-0 flex-1 overflow-auto bg-zinc-100/90 p-2 sm:p-4 [-webkit-overflow-scrolling:touch]">
          <div className="mx-auto max-w-full overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm ring-1 ring-zinc-950/5">
            {children}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
