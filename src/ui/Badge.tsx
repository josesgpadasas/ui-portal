import type { ReactNode } from "react";

const tones = {
  neutral: "bg-zinc-100 text-zinc-700",
  accent: "bg-primary-muted text-primary-subtle",
  success: "bg-emerald-100 text-emerald-800",
  warning: "bg-amber-100 text-amber-900",
  danger: "bg-red-100 text-red-800",
} as const;

type Props = {
  children: ReactNode;
  tone?: keyof typeof tones;
};

export function Badge({ children, tone = "neutral" }: Props) {
  return (
    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${tones[tone]}`}>{children}</span>
  );
}
