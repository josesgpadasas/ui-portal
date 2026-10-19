import {
  CheckSquare,
  Component,
  FolderTree,
  LayoutDashboard,
  LayoutTemplate,
  Lightbulb,
  Palette,
  Shapes,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { navItems, portalSessionUser } from "../data/designContent";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { useSectionHash } from "../hooks/useSectionHash";
import { Button } from "../ui/Button";
import { AnimatedMenuIcon } from "./AnimatedMenuIcon";
import { CollapsibleSidebar, type SidebarNavItem } from "./CollapsibleSidebar";
import { Drawer } from "./Drawer";

const iconClass = "size-5 shrink-0";

const navIcons = {
  overview: LayoutDashboard,
  structure: FolderTree,
  tokens: Palette,
  icons: Shapes,
  components: Component,
  patterns: Lightbulb,
  pages: LayoutTemplate,
  checklist: CheckSquare,
} as const;

type Props = {
  children: ReactNode;
};

export function AppShell({ children }: Props) {
  const mainRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const [activeId, setActiveId] = useState<(typeof navItems)[number]["id"]>(navItems[0].id);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const activeItem = navItems.find((n) => n.id === activeId) ?? navItems[0];

  const scrollToSection = useCallback((id: string) => {
    const main = mainRef.current;
    const el = document.getElementById(id);
    if (!main || !el) return;
    const top = el.getBoundingClientRect().top - main.getBoundingClientRect().top + main.scrollTop;
    main.scrollTo({ top, behavior: "smooth" });
  }, []);

  useSectionHash(activeId, setActiveId, scrollToSection);

  useEffect(() => {
    const root = mainRef.current;
    if (!root) return;

    const sections = navItems.map((n) => document.getElementById(n.id)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const id = visible[0]?.target.id;
        if (id && navItems.some((n) => n.id === id)) {
          setActiveId(id as (typeof navItems)[number]["id"]);
        }
      },
      { root, rootMargin: "-12% 0px -55% 0px", threshold: [0, 0.2, 0.4, 0.6] },
    );
    sections.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const mobileNavWasOpen = useRef(false);

  useEffect(() => {
    if (mobileNavWasOpen.current && !mobileNavOpen && !isDesktop) {
      menuButtonRef.current?.focus();
    }
    mobileNavWasOpen.current = mobileNavOpen;
  }, [mobileNavOpen, isDesktop]);

  useEffect(() => {
    if (isDesktop) setMobileNavOpen(false);
  }, [isDesktop]);

  const sidebarItems: SidebarNavItem[] = navItems.map((item) => {
    const Icon = navIcons[item.id];
    return {
      id: item.id,
      label: item.label,
      href: `#${item.id}`,
      active: activeId === item.id,
      onClick: (e) => {
        e.preventDefault();
        scrollToSection(item.id);
        setMobileNavOpen(false);
      },
      icon: <Icon className={iconClass} strokeWidth={1.75} aria-hidden />,
    };
  });

  const sidebar = (
    <CollapsibleSidebar
      brand="System Design"
      brandSubtitle="UI reference"
      brandMonogram="UI"
      items={sidebarItems}
      storageKey="sys-design-portal-sidebar"
      user={{
        displayName: portalSessionUser.displayName,
        email: portalSessionUser.email,
        onLogout: () => {
          window.alert("Sign out would call your OIDC provider end-session URL and clear the app session.");
        },
      }}
    />
  );

  return (
    <div className="flex h-full overflow-hidden bg-zinc-100">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-zinc-900 focus:shadow-lg focus:ring-2 focus:ring-primary/30"
      >
        Skip to content
      </a>

      {isDesktop ? <div className="flex h-full shrink-0">{sidebar}</div> : null}

      {!isDesktop ? (
        <Drawer
          open={mobileNavOpen}
          onClose={() => setMobileNavOpen(false)}
          ariaLabel="Site navigation"
          panelClassName="bg-zinc-50"
        >
          {sidebar}
        </Drawer>
      ) : null}

      <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden bg-[#fafafa]">
        <header className="z-20 flex shrink-0 items-center justify-between gap-3 border-b border-zinc-200 bg-white px-4 py-3 max-lg:pt-[max(0.75rem,env(safe-area-inset-top))] sm:px-6 lg:gap-4">
          <div className="flex min-w-0 flex-1 items-center gap-2">
              <button
                ref={menuButtonRef}
                type="button"
                className="motion-control flex size-10 shrink-0 items-center justify-center rounded-lg text-zinc-700 ring-1 ring-zinc-200 hover:bg-zinc-50 lg:hidden"
                onClick={() => setMobileNavOpen((open) => !open)}
                aria-expanded={mobileNavOpen}
                aria-controls="portal-nav-drawer"
                aria-label={mobileNavOpen ? "Close navigation menu" : "Open navigation menu"}
              >
                <AnimatedMenuIcon open={mobileNavOpen} />
              </button>
              <div className="min-w-0 lg:min-w-[10rem]">
                <p className="text-xs text-zinc-500">UI reference</p>
                <h1 key={activeId} className="motion-header-title truncate text-base font-semibold text-zinc-900 sm:text-lg">
                  {activeItem.label}
                </h1>
              </div>
          </div>
          <div className="hidden shrink-0 items-center gap-2 lg:flex">
            <Button size="sm" variant="secondary" onClick={() => scrollToSection(activeId)}>
              Jump to section
            </Button>
          </div>
        </header>

        <main
          id="main-content"
          ref={mainRef}
          tabIndex={-1}
          className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden scroll-smooth outline-none [-webkit-overflow-scrolling:touch]"
        >
          <div className="w-full min-w-0 space-y-10 px-3 py-6 sm:space-y-12 sm:px-6 sm:py-8 lg:space-y-16 lg:px-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
