export const INIT_SETUP_PATH = "M:\\sys_dev\\personal\\init_setup";
export const ROOT_PATH = "M:\\sys_dev\\personal\\sys_design";
export const INIT_SETUP_PORTAL_URL = "http://127.0.0.1:5175";

/** Update when stack defaults in init_setup change. */
export const portalChangelog = {
  alignedWithInitSetup: "2026-10-19",
  headline: "Primary #006BDF, Lucide icons, collapsible app shell with OIDC session footer.",
  entries: [
    { date: "2026-10-19", note: "Token export, dark token preview, shared Dialog/Drawer." },
    { date: "2026-10-15", note: "Page templates, component gallery, init_setup path references." },
  ],
} as const;

export const uiComponentCatalog = [
  {
    id: "button",
    name: "Button",
    portalPath: "portal/src/ui/Button.tsx",
    targetPath: "frontend/src/components/ui/button.tsx",
    initSetupHint: "Match variants: primary, secondary, ghost, danger",
    blurb: "Primary actions and toolbar controls",
  },
  {
    id: "badge",
    name: "Badge",
    portalPath: "portal/src/ui/Badge.tsx",
    targetPath: "frontend/src/components/ui/badge.tsx",
    blurb: "Status chips in tables and detail headers",
  },
  {
    id: "input",
    name: "Input",
    portalPath: "portal/src/ui/Input.tsx",
    targetPath: "frontend/src/components/ui/input.tsx",
    blurb: "Labeled fields with hint and error slots",
  },
  {
    id: "alert",
    name: "Alert",
    portalPath: "portal/src/ui/Alert.tsx",
    targetPath: "frontend/src/components/ui/alert.tsx",
    blurb: "Inline page alerts (info, success, warning, error)",
  },
  {
    id: "dialog",
    name: "Dialog",
    portalPath: "portal/src/components/Dialog.tsx",
    targetPath: "frontend/src/components/ui/dialog.tsx",
    blurb: "Modal confirmations — portaled to document.body",
  },
  {
    id: "drawer",
    name: "Drawer",
    portalPath: "portal/src/components/Drawer.tsx",
    targetPath: "frontend/src/components/layout/mobile-drawer.tsx",
    blurb: "Mobile navigation sheet",
  },
  {
    id: "shell",
    name: "App shell",
    portalPath: "portal/src/components/AppShell.tsx",
    targetPath: "frontend/src/components/layout/app-shell.tsx",
    initSetupHint: "See init_setup frontend layout routes",
    blurb: "Sidebar, header, scrollable main",
  },
] as const;

export const darkColorTokens = [
  { name: "Surface", hex: "#09090b", usage: "App background in dark mode" },
  { name: "Elevated", hex: "#18181b", usage: "Cards, modals, tables" },
  { name: "Border", hex: "#3f3f46", usage: "Dividers and inputs" },
  { name: "Text", hex: "#fafafa", usage: "Primary copy" },
  { name: "Muted", hex: "#a1a1aa", usage: "Secondary text" },
  { name: "Primary", hex: "#3b9eff", usage: "Actions and links (lighter accent on dark)" },
  { name: "Primary muted", hex: "#0c1929", usage: "Selected nav, subtle highlights" },
];

export const navItems = [
  { id: "overview", label: "Overview" },
  { id: "structure", label: "Frontend structure" },
  { id: "tokens", label: "Design tokens" },
  { id: "icons", label: "Icons" },
  { id: "components", label: "Components" },
  { id: "patterns", label: "UX patterns" },
  { id: "pages", label: "Page templates" },
  { id: "checklist", label: "Implementation" },
] as const;

export const stackSummary = [
  { label: "Framework", value: "Next.js (App Router) + TypeScript" },
  { label: "Styling", value: "Tailwind CSS + design tokens" },
  { label: "State & forms", value: "TanStack Query · RHF + Zod" },
  { label: "Components", value: "Owned primitives (shadcn/ui optional)" },
  { label: "Icons", value: "Lucide React (lucide-react)" },
];

export const frontendTree = `frontend/
├── src/
│   ├── app/                 # routes, layouts, loading.tsx, error.tsx
│   ├── components/
│   │   ├── ui/              # buttons, inputs, tables (this reference)
│   │   └── layout/          # shell, nav, page header (Lucide icons)
│   ├── features/            # aligned with API modules
│   │   └── <domain>/
│   │       ├── components/
│   │       ├── hooks/
│   │       └── api.ts
│   └── lib/
│       ├── api/             # OpenAPI-generated client
│       └── auth/            # OIDC session helpers
└── public/`;

export const colorTokens = [
  { name: "Accent / primary", hex: "#006BDF", usage: "Primary actions, active nav, links" },
  { name: "Surface", hex: "#fafafa", usage: "App background" },
  { name: "Elevated", hex: "#ffffff", usage: "Cards, modals, tables" },
  { name: "Border", hex: "#e4e4e7", usage: "Dividers, inputs, frames" },
  { name: "Text", hex: "#18181b", usage: "Headings and body" },
  { name: "Muted", hex: "#71717a", usage: "Secondary text, hints" },
];

export const typeScale = [
  { name: "Display", sample: "Page title", className: "text-3xl font-semibold tracking-tight" },
  { name: "Heading", sample: "Section title", className: "text-2xl font-semibold tracking-tight" },
  { name: "Subheading", sample: "Card title", className: "text-lg font-medium" },
  { name: "Body", sample: "Default paragraph text for forms and tables.", className: "text-sm leading-relaxed" },
  { name: "Caption", sample: "Helper · metadata", className: "text-xs text-zinc-500" },
  { name: "Mono", sample: "traceId · port · API path", className: "font-mono text-xs" },
];

export const spacingRadii = [
  "Page padding: px-4 sm:px-6 lg:px-8 · py-8",
  "Section gap: space-y-16 between major blocks",
  "Card padding: p-5 or p-6",
  "Control height: h-10 (md), h-9 (sm)",
  "Radius: rounded-lg (controls), rounded-xl (panels), rounded-2xl (cards)",
  "Shadow: shadow-sm on elevated surfaces only",
];

export const uxPatterns = [
  {
    title: "Loading",
    body: "Use route-level loading.tsx for page transitions; skeleton rows for tables; disable submit buttons while mutating.",
  },
  {
    title: "Errors",
    body: "Inline field errors from Zod; page-level error.tsx with retry; toast for non-blocking API failures.",
  },
  {
    title: "Empty states",
    body: "Explain why empty, one primary action, optional secondary link to docs or import.",
  },
  {
    title: "Authorization",
    body: "Hide destructive actions when forbidden; prefer disabled + tooltip only when discovery is required.",
  },
  {
    title: "Signed-in session",
    body: "Sidebar footer: user display name (from OIDC claims), optional email, initials avatar, Log out → end-session + clear app cookies.",
  },
  {
    title: "Lists",
    body: "Filters persist in URL search params; cursor pagination for large datasets; bulk actions in sticky bar.",
  },
  {
    title: "Accessibility",
    body: "Visible focus rings, label every input, table headers scoped, dialog focus trap, color is never the only signal.",
  },
];

export const implementationChecklist = [
  {
    phase: "Before UI work",
    items: [
      "Confirm OpenAPI spec and error shape (code, message, details, traceId)",
      "Define feature folder names to match API modules",
      "Add design tokens to globals.css or tailwind @theme",
      "Add lucide-react; do not mix other icon libraries in the same app",
    ],
  },
  {
    phase: "Component pass",
    items: [
      "Copy ui primitives into frontend/src/components/ui/",
      "Add layout shell (sidebar + header) in components/layout/",
      "Wire TanStack Query defaults (staleTime, retry, error mapping)",
    ],
  },
  {
    phase: "Page pass",
    items: [
      "Implement list → detail navigation with shared breadcrumbs",
      "Add loading.tsx / error.tsx per route segment",
      "Run keyboard-only smoke test on forms and dialogs",
    ],
  },
];

export const pageTemplateMeta = [
  { id: "shell", label: "App shell", desc: "Sidebar, user session + sign out, top bar, content" },
  { id: "dashboard", label: "Dashboard", desc: "KPI cards and recent activity table" },
  { id: "list", label: "List / search", desc: "Filters, data table, pagination" },
  { id: "detail", label: "Record detail", desc: "Header actions, tabs, audit trail" },
  { id: "form", label: "Create / edit", desc: "Two-column form with sticky footer" },
  { id: "auth", label: "Sign in", desc: "OIDC redirect or credential form (edge)" },
  { id: "settings", label: "Settings", desc: "Section nav + preference forms" },
  { id: "empty", label: "Empty state", desc: "Zero-data onboarding panel" },
] as const;

export type PageTemplateId = (typeof pageTemplateMeta)[number]["id"];

export const pageTemplateDetails: Record<
  PageTemplateId,
  { route: string; whenToUse: string; buildingBlocks: string[]; inAppShell: boolean }
> = {
  shell: {
    route: "app/(authenticated)/layout.tsx",
    whenToUse: "Wrap every signed-in route. Owns navigation, session, and the content scroll region.",
    buildingBlocks: ["Brand + collapsible nav", "User session footer", "Page header slot", "Main outlet"],
    inAppShell: true,
  },
  dashboard: {
    route: "app/(authenticated)/dashboard/page.tsx",
    whenToUse: "Landing view after sign-in — KPIs, queues, and recent activity at a glance.",
    buildingBlocks: ["KPI stat cards", "Trend or chart slot", "Recent items table", "Quick actions"],
    inAppShell: true,
  },
  list: {
    route: "app/(authenticated)/submissions/page.tsx",
    whenToUse: "Browse and filter collections; primary path into record detail.",
    buildingBlocks: ["Search + filters in URL", "Data table", "Pagination", "Primary create action"],
    inAppShell: true,
  },
  detail: {
    route: "app/(authenticated)/submissions/[id]/page.tsx",
    whenToUse: "Single record with workflow actions, related data, and audit history.",
    buildingBlocks: ["Breadcrumbs", "Title + status", "Tabbed sections", "Sticky action bar"],
    inAppShell: true,
  },
  form: {
    route: "app/(authenticated)/submissions/new/page.tsx",
    whenToUse: "Create or edit with validation; cancel returns to list or detail.",
    buildingBlocks: ["Zod + RHF fields", "Two-column layout", "Sticky footer actions", "Optimistic or draft save"],
    inAppShell: true,
  },
  auth: {
    route: "app/(public)/sign-in/page.tsx",
    whenToUse: "Outside the app shell — OIDC redirect is the default path.",
    buildingBlocks: ["IdP redirect button", "Optional dev login", "Brand panel", "No sidebar"],
    inAppShell: false,
  },
  settings: {
    route: "app/(authenticated)/settings/[section]/page.tsx",
    whenToUse: "Secondary nav for preferences that do not belong in the main module tree.",
    buildingBlocks: ["Section sub-nav", "Form groups", "Save per section", "Danger zone (optional)"],
    inAppShell: true,
  },
  empty: {
    route: "(embedded in list or dashboard)",
    whenToUse: "Replace table body when count is zero — explain next step and offer one primary action.",
    buildingBlocks: ["Illustration or icon", "Short explanation", "Primary CTA", "Optional doc link"],
    inAppShell: true,
  },
};

/** Sample OIDC profile for app shell wireframe */
export const appShellSessionExample = {
  displayName: "Alex Rivera",
  email: "alex.rivera@agency.gov",
};

/** Demo signed-in user for this portal (replace with IdP claims in real apps) */
export const portalSessionUser = {
  displayName: "Joseph Esguerra Padasas",
  email: "joseph.padasas@example.org",
};

/** Default icon library — pairs with shadcn/ui in TECHNOLOGY-STACK.md */
export const iconPackageMeta = {
  name: "lucide-react",
  npm: "https://www.npmjs.com/package/lucide-react",
  docsUrl: "https://lucide.dev/icons/",
  summary:
    "Official React bindings for Lucide: tree-shakable SVG icons, consistent 24×24 grid, stroke-based style. Default for new UIs alongside optional shadcn/ui components.",
  installCommand: "cd frontend\nnpm install lucide-react",
  usageExample: `import { FileText, Plus, Settings } from "lucide-react";

export function NewSubmissionButton() {
  return (
    <button type="button" className="inline-flex items-center gap-2 …">
      <Plus className="size-4 shrink-0" aria-hidden />
      New submission
    </button>
  );
}`,
  facts: [
    { label: "Package", value: "lucide-react" },
    { label: "License", value: "ISC" },
    { label: "Import style", value: "Named ESM per icon" },
    { label: "shadcn/ui", value: "Same icons shadcn uses by default" },
  ],
};

export const iconUsageRules = [
  {
    title: "Inline with text",
    body: "size-4 (16px) beside buttons and labels; size-5 (20px) in sidebar nav; size-6 sparingly for empty states.",
  },
  {
    title: "Stroke",
    body: "Default strokeWidth 2; use 1.75 in dense tables/nav for visual match with this reference.",
  },
  {
    title: "Accessibility",
    body: 'Decorative: aria-hidden on the icon, visible text on the control. Icon-only buttons: aria-label on the button, not the SVG.',
  },
  {
    title: "Loading",
    body: "Loader2 with className=\"size-4 animate-spin\" — do not roll custom spinners per screen.",
  },
  {
    title: "Color",
    body: "Inherit currentColor from parent text; use text-primary for emphasis, text-zinc-500 for muted actions.",
  },
  {
    title: "Do not",
    body: "Mix Heroicons, Font Awesome, or inline one-off SVGs for standard actions — pick Lucide equivalents from the catalog.",
  },
];

export const iconNavMapping = [
  { label: "Dashboard", lucide: "LayoutDashboard", note: "Home / overview routes" },
  { label: "Submissions", lucide: "Inbox", note: "Work queues, transactional lists" },
  { label: "Reports", lucide: "BarChart3", note: "Analytics and exports" },
  { label: "Settings", lucide: "Settings", note: "App and user preferences" },
  { label: "Profile", lucide: "User", note: "Account settings section" },
  { label: "Notifications", lucide: "Bell", note: "Alert preferences" },
  { label: "API keys", lucide: "KeyRound", note: "Integration credentials" },
  { label: "Collapse nav", lucide: "ChevronLeft / PanelLeftClose", note: "Sidebar toggle" },
];

export const iconCatalog = [
  {
    category: "Navigation & layout",
    icons: ["LayoutDashboard", "PanelLeft", "ChevronLeft", "ChevronRight", "Menu", "Home"],
  },
  {
    category: "Actions",
    icons: ["Plus", "Pencil", "Trash2", "Download", "Upload", "Save", "X", "Check"],
  },
  {
    category: "Records & files",
    icons: ["FileText", "Files", "FolderOpen", "Inbox", "Archive", "Paperclip"],
  },
  {
    category: "Status & feedback",
    icons: ["AlertTriangle", "AlertCircle", "Info", "CircleCheck", "CircleX", "Loader2"],
  },
  {
    category: "Users & security",
    icons: ["User", "Users", "Shield", "KeyRound", "LogOut", "Lock"],
  },
  {
    category: "Search & filters",
    icons: ["Search", "Filter", "SlidersHorizontal", "ArrowUpDown", "Calendar"],
  },
];
