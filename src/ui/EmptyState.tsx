import { Inbox } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "./Button";

type Props = {
  title: string;
  description: string;
  action?: ReactNode;
};

export function EmptyState({ title, description, action }: Props) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-dashed border-zinc-300 bg-zinc-50/80 px-6 py-12 text-center">
      <div className="flex size-12 items-center justify-center rounded-xl bg-white text-zinc-500 ring-1 ring-zinc-200">
        <Inbox className="size-6" strokeWidth={1.75} aria-hidden />
      </div>
      <h4 className="mt-4 text-base font-semibold text-zinc-900">{title}</h4>
      <p className="copy-body mt-2 max-w-md">{description}</p>
      <div className="mt-6">{action ?? <Button>Create first record</Button>}</div>
    </div>
  );
}
