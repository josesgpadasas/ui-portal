import type { ReactNode } from "react";

type Props = {
  breadcrumbs?: string[];
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
};

export function MiniPageHeader({ breadcrumbs, eyebrow, title, description, actions }: Props) {
  return (
    <header className="shrink-0 border-b border-zinc-200 bg-white px-4 py-3">
      {breadcrumbs && breadcrumbs.length > 0 ? (
        <nav aria-label="Breadcrumb" className="mb-1 flex flex-wrap items-center gap-1 text-xs text-zinc-500">
          {breadcrumbs.map((crumb, i) => (
            <span key={`${crumb}-${i}`} className="flex items-center gap-1">
              {i > 0 ? <span className="text-zinc-300" aria-hidden>/</span> : null}
              <span className={i === breadcrumbs.length - 1 ? "font-medium text-zinc-700" : undefined}>{crumb}</span>
            </span>
          ))}
        </nav>
      ) : null}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          {eyebrow ? <p className="text-xs text-zinc-500">{eyebrow}</p> : null}
          <h2 className="text-base font-semibold text-zinc-900">{title}</h2>
          {description ? <p className="mt-0.5 text-xs text-zinc-500">{description}</p> : null}
        </div>
        {actions ? <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div> : null}
      </div>
    </header>
  );
}

export function MiniPageBody({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`flex-1 overflow-auto bg-[#fafafa] ${className}`}>{children}</div>;
}
