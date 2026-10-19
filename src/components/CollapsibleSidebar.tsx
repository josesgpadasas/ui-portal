import { ChevronLeft } from "lucide-react";
import { useEffect, useState, type MouseEventHandler, type ReactNode } from "react";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { BrandLogo } from "./BrandLogo";
import { SidebarUserSession, type SidebarUserSessionProps } from "./SidebarUserSession";

/** Expanded / collapsed rail widths (Tailwind). Mobile drawer uses full width of its container. */
const WIDTH = {
  expanded: "w-72",
  collapsed: "w-[4.25rem]",
  compactExpanded: "w-52",
  compactCollapsed: "w-14",
} as const;

export type SidebarNavItem = {
  id?: string;
  label: string;
  icon: ReactNode;
  active?: boolean;
  href?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
};

type Props = {
  brand?: string;
  brandSubtitle?: string;
  brandMonogram?: string;
  items: SidebarNavItem[];
  defaultCollapsed?: boolean;
  compact?: boolean;
  storageKey?: string;
  user?: Omit<SidebarUserSessionProps, "collapsed">;
};

function readStoredCollapsed(key: string | undefined, fallback: boolean) {
  if (!key || typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (raw === "true") return true;
    if (raw === "false") return false;
  } catch {
    /* ignore */
  }
  return fallback;
}

export function CollapsibleSidebar({
  brand = "System Name",
  brandSubtitle,
  brandMonogram = "SD",
  items,
  defaultCollapsed = false,
  compact = false,
  storageKey,
  user,
}: Props) {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const [collapsed, setCollapsed] = useState(() => readStoredCollapsed(storageKey, defaultCollapsed));
  const collapsedUi = isDesktop && collapsed;

  useEffect(() => {
    if (!storageKey || !isDesktop) return;
    try {
      window.localStorage.setItem(storageKey, String(collapsed));
    } catch {
      /* ignore */
    }
  }, [collapsed, isDesktop, storageKey]);

  const widthClass = collapsedUi
    ? compact
      ? WIDTH.compactCollapsed
      : WIDTH.collapsed
    : compact
      ? WIDTH.compactExpanded
      : WIDTH.expanded;

  return (
    <aside
      data-collapsed={collapsedUi ? "true" : "false"}
      className={`motion-sidebar flex h-full max-h-full shrink-0 flex-col overflow-hidden border-r border-zinc-200 bg-zinc-50/95 lg:bg-zinc-50 lg:shadow-[inset_-1px_0_0_0_rgba(0,0,0,0.03)] ${
        isDesktop ? widthClass : "w-full"
      }`}
      aria-label="Main navigation"
    >
      <div
        className={`flex shrink-0 ${
          collapsedUi
            ? "flex-col items-center gap-2.5 px-2.5 pb-3 pt-4"
            : "items-start justify-between gap-3 px-4 pb-3 pt-4"
        }`}
      >
        <div className={`flex items-center ${collapsedUi ? "justify-center" : "min-w-0 flex-1 gap-3"}`}>
          <BrandLogo className="size-10 shrink-0" letters={brandMonogram} title={brand} />
          {brand ? (
            <div
              className={`motion-sidebar-brand min-w-0 overflow-hidden leading-tight ${
                collapsedUi ? "max-w-0 opacity-0" : "max-w-[11rem] opacity-100"
              }`}
              aria-hidden={collapsedUi}
            >
              <p className="truncate text-[15px] font-semibold text-zinc-900">{brand}</p>
              {brandSubtitle ? (
                <p className="mt-0.5 truncate text-[11px] font-medium uppercase tracking-wider text-primary">{brandSubtitle}</p>
              ) : null}
            </div>
          ) : null}
        </div>
        {isDesktop ? (
          <button
            type="button"
            onClick={() => setCollapsed((c) => !c)}
            className={`motion-control flex size-9 shrink-0 items-center justify-center rounded-lg border border-transparent text-zinc-600 hover:border-zinc-200 hover:bg-white hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 ${
              collapsedUi ? "" : "self-start"
            }`}
            aria-expanded={!collapsed}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <ChevronLeft
              className={`size-4 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${collapsed ? "rotate-180" : ""}`}
              aria-hidden
            />
          </button>
        ) : null}
      </div>

      <nav className="flex min-h-0 flex-1 flex-col justify-start gap-1 overflow-y-auto px-3 pb-3 pt-1 [-webkit-overflow-scrolling:touch]">
        {items.map((item) => {
          const className = `motion-nav-link flex items-center rounded-xl font-medium ${
            collapsedUi ? "justify-center px-0 py-3" : "gap-3 px-3.5 py-2.5 text-left"
          } ${
            item.active
              ? "bg-primary text-white shadow-sm shadow-primary/20"
              : "text-zinc-600 hover:bg-white/90 hover:text-zinc-900"
          }`;
          const inner = (
            <>
              <span className="flex size-5 shrink-0 items-center justify-center [&>svg]:size-5">{item.icon}</span>
              <span
                className={`motion-nav-label truncate text-[15px] leading-snug ${
                  collapsedUi ? "max-w-0 opacity-0" : "max-w-[12rem] opacity-100"
                }`}
                aria-hidden={collapsedUi}
              >
                {item.label}
              </span>
            </>
          );
          const a11yLabel = collapsedUi
            ? item.active
              ? `${item.label}, current section`
              : item.label
            : undefined;

          if (item.href) {
            return (
              <a
                key={item.id ?? item.label}
                href={item.href}
                title={collapsedUi ? item.label : undefined}
                aria-label={a11yLabel}
                aria-current={item.active ? "page" : undefined}
                onClick={item.onClick}
                className={className}
              >
                {inner}
              </a>
            );
          }
          return (
            <button
              key={item.id ?? item.label}
              type="button"
              title={collapsedUi ? item.label : undefined}
              aria-label={a11yLabel}
              aria-current={item.active ? "page" : undefined}
              onClick={item.onClick}
              className={className}
            >
              {inner}
            </button>
          );
        })}
      </nav>
      {user ? (
        <SidebarUserSession
          displayName={user.displayName}
          email={user.email}
          collapsed={collapsedUi}
          onLogout={user.onLogout}
        />
      ) : null}
    </aside>
  );
}
