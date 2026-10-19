type Props = {
  className?: string;
  /** Two-letter monogram — keep in sync with `public/favicon.svg`. */
  letters?: string;
  title?: string;
};

/** Monogram in a framed container (same pattern as portfolio `brand-logo.tsx`). */
export function BrandLogo({
  className,
  letters = "UI",
  title = "System Design",
}: Props) {
  const monogram = letters.slice(0, 2).toUpperCase();

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      role="img"
      aria-label={title}
      className={className}
    >
      <rect width="32" height="32" rx="6" fill="#006BDF" />
      <rect x="2.5" y="2.5" width="27" height="27" rx="4" fill="#ffffff" stroke="#b3d9f7" strokeWidth="1.25" />
      <text
        x="16"
        y="16.5"
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily="DM Sans, Segoe UI, ui-sans-serif, system-ui, sans-serif"
        fontSize="15"
        fontWeight="700"
        fill="#004a99"
        letterSpacing="-0.08em"
      >
        {monogram}
      </text>
      <rect x="24.25" y="5.25" width="3.25" height="3.25" rx="1" fill="#cce5ff" />
    </svg>
  );
}
