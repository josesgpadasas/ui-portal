import type { ReactNode } from "react";

type Props = {
  title: string;
  description?: string;
  route?: string;
  children: ReactNode;
  height?: number;
};

export function PreviewFrame({ title, description, route, children, height = 440 }: Props) {
  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
      <div className="flex flex-col gap-2 border-b border-zinc-200 bg-zinc-50 px-3 py-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4 sm:px-4">
        <div className="min-w-0 flex-1 sm:pr-2">
          <p className="text-sm font-medium text-zinc-900 sm:text-base">{title}</p>
          {description ? <p className="copy-body-tight mt-1 w-full max-w-none">{description}</p> : null}
        </div>
        {route ? (
          <code className="w-fit max-w-full shrink-0 self-start truncate rounded-lg border border-zinc-200 bg-white px-2.5 py-1 font-mono text-[10px] text-primary-subtle sm:max-w-[min(100%,20rem)] sm:text-[11px]">
            {route}
          </code>
        ) : null}
      </div>
      <div className="overflow-auto bg-zinc-100/90 p-2 sm:p-4 [-webkit-overflow-scrolling:touch]" style={{ maxHeight: height }}>
        <div className="mx-auto max-w-full overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm ring-1 ring-zinc-950/5">
          {children}
        </div>
      </div>
    </div>
  );
}
