const styles = {
  info: "border-sky-200 bg-sky-50 text-sky-900",
  success: "border-emerald-200 bg-emerald-50 text-emerald-900",
  warning: "border-amber-200 bg-amber-50 text-amber-950",
  error: "border-red-200 bg-red-50 text-red-900",
} as const;

type Props = {
  variant?: keyof typeof styles;
  title: string;
  children?: React.ReactNode;
};

export function Alert({ variant = "info", title, children }: Props) {
  return (
    <div className={`rounded-xl border px-4 py-3 text-sm ${styles[variant]}`} role="status">
      <p className="font-medium">{title}</p>
      {children ? <p className="mt-1.5 leading-relaxed opacity-90 text-pretty">{children}</p> : null}
    </div>
  );
}
