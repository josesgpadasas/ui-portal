import { ChevronDown } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { Button } from "./Button";

type Item = { id: string; label: string; onSelect: () => void; destructive?: boolean };

type Props = {
  label: string;
  items: Item[];
  align?: "start" | "end";
};

export function Dropdown({ label, items, align = "end" }: Props) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [open]);

  return (
    <div ref={rootRef} className="relative inline-block text-left">
      <Button
        variant="secondary"
        size="sm"
        aria-expanded={open}
        aria-haspopup="menu"
        aria-controls={menuId}
        onClick={() => setOpen((value) => !value)}
      >
        {label}
        <ChevronDown className="size-4" aria-hidden />
      </Button>
      {open ? (
        <ul
          id={menuId}
          role="menu"
          className={`absolute z-20 mt-1 min-w-[10rem] rounded-xl border border-zinc-200 bg-white py-1 shadow-lg ${
            align === "end" ? "right-0" : "left-0"
          }`}
        >
          {items.map((item) => (
            <li key={item.id} role="none">
              <button
                type="button"
                role="menuitem"
                className={`block w-full px-3 py-2 text-left text-sm hover:bg-zinc-50 ${
                  item.destructive ? "text-red-700" : "text-zinc-800"
                }`}
                onClick={() => {
                  item.onSelect();
                  setOpen(false);
                }}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export function DropdownDemo() {
  return (
    <Dropdown
      label="Actions"
      items={[
        { id: "export", label: "Export CSV", onSelect: () => undefined },
        { id: "archive", label: "Archive", onSelect: () => undefined },
        { id: "delete", label: "Delete", destructive: true, onSelect: () => undefined },
      ]}
    />
  );
}
