import { useState, type ReactNode } from "react";

export type TabDef = { id: string; label: string; panel: ReactNode };

type Props = {
  tabs: TabDef[];
  defaultTabId?: string;
};

export function Tabs({ tabs, defaultTabId }: Props) {
  const [active, setActive] = useState(defaultTabId ?? tabs[0]?.id ?? "");
  const current = tabs.find((tab) => tab.id === active) ?? tabs[0];

  return (
    <div>
      <div role="tablist" aria-label="Tabs" className="flex gap-1 overflow-x-auto border-b border-zinc-200">
        {tabs.map((tab) => {
          const selected = tab.id === active;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={selected}
              id={`tab-${tab.id}`}
              aria-controls={`panel-${tab.id}`}
              className={`motion-control shrink-0 border-b-2 px-4 py-2.5 text-sm font-medium ${
                selected ? "border-primary text-primary" : "border-transparent text-zinc-600 hover:text-zinc-900"
              }`}
              onClick={() => setActive(tab.id)}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      <div
        role="tabpanel"
        id={`panel-${current?.id}`}
        aria-labelledby={`tab-${current?.id}`}
        className="py-4"
      >
        {current?.panel}
      </div>
    </div>
  );
}
