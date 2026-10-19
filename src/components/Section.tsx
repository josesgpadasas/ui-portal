import type { ReactNode } from "react";

type Props = {
  id: string;
  title: string;
  description?: string;
  children: ReactNode;
};

export function Section({ id, title, description, children }: Props) {
  return (
    <section
      id={id}
      className="scroll-mt-[calc(4.25rem+env(safe-area-inset-top,0px))] border-b border-zinc-200 pb-10 last:border-b-0 sm:scroll-mt-20 sm:pb-12 lg:pb-16"
    >
      <header className="mb-6 sm:mb-8 lg:mb-10">
        <h2 className="text-xl font-semibold tracking-tight text-zinc-900 sm:text-2xl">{title}</h2>
        {description ? (
          <p className="copy-body mt-2 w-full max-w-none sm:mt-3">{description}</p>
        ) : null}
      </header>
      <div className="min-w-0 w-full">{children}</div>
    </section>
  );
}
