type Item = { id: string; label: string };

type Props = {
  items: Item[];
  ariaLabel: string;
};

export function SectionToc({ items, ariaLabel }: Props) {
  return (
    <nav
      aria-label={ariaLabel}
      className="hidden xl:block xl:sticky xl:top-4 xl:max-h-[calc(100vh-6rem)] xl:overflow-y-auto xl:self-start"
    >
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-500">On this page</p>
      <ul className="space-y-1 border-l border-zinc-200 pl-3">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className="block py-1 text-sm text-zinc-600 transition hover:text-primary"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
