import {
  BarChart3,
  Bell,
  ChevronRight,
  FilePen,
  Inbox,
  KeyRound,
  LayoutDashboard,
  LayoutTemplate,
  LogIn,
  Map,
  PanelLeft,
  Settings,
  User,
} from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { BrandLogo } from "../components/BrandLogo";
import { CollapsibleSidebar } from "../components/CollapsibleSidebar";
import { MiniPageBody, MiniPageHeader } from "../components/MiniPageHeader";
import { CodeBlock } from "../components/CodeBlock";
import { CopyInstallPath } from "../components/CopyInstallPath";
import { PreviewFrame } from "../components/PreviewFrame";
import { SectionToc } from "../components/SectionToc";
import {
  TemplatePreviewSizeProvider,
  templateAuthMinHeight,
  templateEmptyHeight,
  templateMainHeight,
  useTemplatePreviewSize,
} from "../components/TemplatePreviewContext";
import { TemplatePreviewModal } from "../components/TemplatePreviewModal";
import {
  appShellSessionExample,
  gisStackMeta,
  pageTemplateDetails,
  pageTemplateMeta,
  type PageTemplateId,
} from "../data/designContent";
import { GisMapTemplateDemo } from "./GisMapTemplateDemo";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";

const iconClass = "size-5 shrink-0";

const templateIcons: Record<PageTemplateId, typeof LayoutDashboard> = {
  shell: PanelLeft,
  dashboard: LayoutDashboard,
  list: Inbox,
  detail: LayoutTemplate,
  form: FilePen,
  auth: LogIn,
  settings: Settings,
  empty: Inbox,
  gis: Map,
};

const shellNavItems = [
  { label: "Dashboard", icon: <LayoutDashboard className={iconClass} strokeWidth={1.75} aria-hidden /> },
  { label: "Submissions", icon: <Inbox className={iconClass} strokeWidth={1.75} aria-hidden />, active: true },
  { label: "Reports", icon: <BarChart3 className={iconClass} strokeWidth={1.75} aria-hidden /> },
  { label: "Settings", icon: <Settings className={iconClass} strokeWidth={1.75} aria-hidden /> },
];

function ShellDemo() {
  const size = useTemplatePreviewSize();
  return (
    <div className={`flex ${templateMainHeight(size)} min-h-0 overflow-hidden text-sm`}>
      <CollapsibleSidebar
        brand="System Name"
        brandMonogram="SN"
        items={shellNavItems}
        user={{
          displayName: appShellSessionExample.displayName,
          email: appShellSessionExample.email,
        }}
      />
      <div className="flex min-w-0 flex-1 flex-col">
        <MiniPageHeader
          eyebrow="Submissions"
          title="Queue"
          actions={
            <>
              <Button size="sm" variant="secondary">
                Export
              </Button>
              <Button size="sm">New</Button>
            </>
          }
        />
        <MiniPageBody className="p-4 text-zinc-600">
          Main content scrolls here — mount list, dashboard, form, or detail templates inside this region.
        </MiniPageBody>
      </div>
    </div>
  );
}

function DashboardDemo() {
  const size = useTemplatePreviewSize();
  return (
    <div className={`flex ${templateMainHeight(size)} min-h-0 flex-col text-sm`}>
      <MiniPageHeader
        breadcrumbs={["Home", "Dashboard"]}
        title="Operations overview"
        description="Updated 5 minutes ago"
      />
      <MiniPageBody className="space-y-4 p-4">
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { label: "Open submissions", value: "128", delta: "+12 today" },
            { label: "Median review time", value: "1.4d", delta: "Within SLA" },
            { label: "SLA at risk", value: "6", delta: "Needs action", warn: true },
          ].map((kpi) => (
            <div key={kpi.label} className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
              <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">{kpi.label}</p>
              <p className={`mt-1 text-2xl font-semibold tabular-nums ${kpi.warn ? "text-amber-700" : "text-zinc-900"}`}>
                {kpi.value}
              </p>
              <p className={`mt-1 text-xs ${kpi.warn ? "text-amber-700" : "text-zinc-500"}`}>{kpi.delta}</p>
            </div>
          ))}
        </div>
        <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-zinc-200 px-4 py-3">
            <p className="font-medium text-zinc-900">Recent activity</p>
            <button type="button" className="text-xs font-medium text-primary hover:underline">
              View all
            </button>
          </div>
          <ul className="divide-y divide-zinc-100">
            {[
              { ref: "SUB-1042", text: "submitted for review", time: "2m ago" },
              { ref: "SUB-1040", text: "approved", time: "1h ago" },
              { ref: "RPT-88", text: "export completed", time: "3h ago" },
            ].map((row) => (
              <li key={row.ref} className="flex items-center justify-between gap-2 px-4 py-2.5">
                <span className="text-zinc-600">
                  <span className="font-mono text-primary">{row.ref}</span> {row.text}
                </span>
                <span className="shrink-0 text-xs text-zinc-400">{row.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </MiniPageBody>
    </div>
  );
}

function ListDemo() {
  const size = useTemplatePreviewSize();
  return (
    <div className={`flex ${templateMainHeight(size)} min-h-0 flex-col text-sm`}>
      <MiniPageHeader
        breadcrumbs={["Home", "Submissions"]}
        title="All submissions"
        actions={<Button size="sm">New submission</Button>}
      />
      <MiniPageBody className="space-y-3 p-4">
        <div className="flex flex-wrap items-center gap-2 rounded-xl border border-zinc-200 bg-white p-3 shadow-sm">
          <input
            className="h-9 min-w-[180px] flex-1 rounded-lg border border-zinc-200 px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            placeholder="Search reference or applicant…"
            aria-label="Search"
          />
          <select
            className="h-9 rounded-lg border border-zinc-200 bg-white px-2 text-sm"
            aria-label="Status filter"
          >
            <option>All statuses</option>
            <option>Pending</option>
            <option>Approved</option>
          </select>
          <Button size="sm" variant="secondary">
            Reset filters
          </Button>
        </div>
        <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
          <table className="w-full text-left">
            <thead className="border-b border-zinc-200 bg-zinc-50 text-xs uppercase tracking-wide text-zinc-500">
              <tr>
                <th className="px-3 py-2.5 font-semibold">Reference</th>
                <th className="px-3 py-2.5 font-semibold">Applicant</th>
                <th className="px-3 py-2.5 font-semibold">Status</th>
                <th className="px-3 py-2.5 font-semibold">
                  <span className="sr-only">Open</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {[
                { ref: "SUB-1042", name: "M. Santos", status: "Pending", tone: "warning" as const },
                { ref: "SUB-1041", name: "L. Cruz", status: "Approved", tone: "success" as const },
                { ref: "SUB-1040", name: "A. Reyes", status: "Draft", tone: "neutral" as const },
              ].map((row) => (
                <tr key={row.ref} className="hover:bg-zinc-50/80">
                  <td className="px-3 py-2.5 font-mono text-sm text-primary">{row.ref}</td>
                  <td className="px-3 py-2.5 text-zinc-700">{row.name}</td>
                  <td className="px-3 py-2.5">
                    <Badge tone={row.tone}>{row.status}</Badge>
                  </td>
                  <td className="px-3 py-2.5 text-right">
                    <ChevronRight className="ml-auto size-4 text-zinc-400" aria-hidden />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between text-xs text-zinc-500">
          <span>Showing 1–3 of 48</span>
          <div className="flex gap-2">
            <Button size="sm" variant="secondary" disabled>
              Previous
            </Button>
            <Button size="sm" variant="secondary">
              Next
            </Button>
          </div>
        </div>
      </MiniPageBody>
    </div>
  );
}

function DetailDemo() {
  const size = useTemplatePreviewSize();
  return (
    <div className={`flex ${templateMainHeight(size)} min-h-0 flex-col text-sm`}>
      <MiniPageHeader
        breadcrumbs={["Home", "Submissions", "SUB-1042"]}
        title="Building permit application"
        description="Submitted Oct 18, 2026 · Module: submissions"
        actions={
          <>
            <Button size="sm" variant="secondary">
              Assign
            </Button>
            <Button size="sm">Approve</Button>
          </>
        }
      />
      <div className="flex gap-4 border-b border-zinc-200 bg-white px-4">
        {["Overview", "Documents", "History"].map((tab, i) => (
          <button
            key={tab}
            type="button"
            className={`border-b-2 py-3 text-sm font-medium transition ${
              i === 0 ? "border-primary text-primary-subtle" : "border-transparent text-zinc-500 hover:text-zinc-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      <MiniPageBody className="space-y-3 p-4">
        <dl className="grid gap-3 sm:grid-cols-2">
          {[
            { label: "Applicant", value: "Maria Santos" },
            { label: "Location", value: "Lot 12, Barangay Central" },
            { label: "Workflow step", value: "Planning review" },
            { label: "Assignee", value: "Alex Rivera" },
          ].map((field) => (
            <div key={field.label} className="rounded-lg border border-zinc-200 bg-white p-3">
              <dt className="text-xs font-medium uppercase tracking-wide text-zinc-500">{field.label}</dt>
              <dd className="mt-1 font-medium text-zinc-900">{field.value}</dd>
            </div>
          ))}
        </dl>
        <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-3 font-mono text-xs text-zinc-600">
          audit · user-12 approved step &quot;planning&quot; · traceId 8c2f…
        </div>
      </MiniPageBody>
    </div>
  );
}

function FormDemo() {
  const size = useTemplatePreviewSize();
  return (
    <div className={`flex ${templateMainHeight(size)} min-h-0 flex-col text-sm`}>
      <MiniPageHeader
        breadcrumbs={["Home", "Submissions", "New"]}
        title="Create submission"
        description="Required fields marked on save"
      />
      <MiniPageBody className="flex flex-1 flex-col">
        <div className="grid flex-1 gap-4 p-4 md:grid-cols-2">
          <div className="space-y-3">
            <label className="block space-y-1">
              <span className="font-medium text-zinc-900">Title</span>
              <input className="h-10 w-full rounded-lg border border-zinc-200 px-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
            </label>
            <label className="block space-y-1">
              <span className="font-medium text-zinc-900">Description</span>
              <textarea className="min-h-[96px] w-full rounded-lg border border-zinc-200 p-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
            </label>
          </div>
          <div className="space-y-3">
            <label className="block space-y-1">
              <span className="font-medium text-zinc-900">Owner module</span>
              <select className="h-10 w-full rounded-lg border border-zinc-200 px-3">
                <option>submissions</option>
              </select>
            </label>
            <label className="block space-y-1">
              <span className="font-medium text-zinc-900">Effective date</span>
              <input type="date" className="h-10 w-full rounded-lg border border-zinc-200 px-3" />
            </label>
          </div>
        </div>
        <footer className="flex justify-end gap-2 border-t border-zinc-200 bg-white px-4 py-3">
          <Button variant="secondary" size="sm">
            Cancel
          </Button>
          <Button size="sm">Save draft</Button>
        </footer>
      </MiniPageBody>
    </div>
  );
}

function AuthDemo() {
  const size = useTemplatePreviewSize();
  return (
    <div className={`grid ${templateAuthMinHeight(size)} md:grid-cols-2`}>
      <div className="hidden bg-primary p-8 text-white md:flex md:flex-col md:justify-between">
        <BrandLogo className="size-11" letters="SN" title="System Name" />
        <div>
          <p className="text-sm uppercase tracking-wide text-white/80">Standard identity</p>
          <p className="mt-2 text-2xl font-semibold">Sign in with OIDC</p>
          <p className="mt-2 text-sm text-white/80">Keycloak locally · Entra ID in production</p>
        </div>
      </div>
      <div className="flex flex-col justify-center p-8">
        <BrandLogo className="mb-6 size-10 md:hidden" letters="SN" title="System Name" />
        <h2 className="text-xl font-semibold text-zinc-900">Welcome back</h2>
        <p className="mt-1 text-sm text-zinc-600">Prefer redirect to IdP; local form only for edge cases.</p>
        <Button className="mt-6 w-full">Continue with SSO</Button>
        <Button className="mt-2 w-full" variant="secondary">
          Use dev credentials
        </Button>
      </div>
    </div>
  );
}

function SettingsDemo() {
  const size = useTemplatePreviewSize();
  return (
    <div className={`flex ${templateMainHeight(size)} min-h-0 overflow-hidden text-sm`}>
      <CollapsibleSidebar
        brand="Settings"
        compact
        items={[
          { label: "Profile", icon: <User className={iconClass} strokeWidth={1.75} aria-hidden /> },
          { label: "Notifications", icon: <Bell className={iconClass} strokeWidth={1.75} aria-hidden />, active: true },
          { label: "API keys", icon: <KeyRound className={iconClass} strokeWidth={1.75} aria-hidden /> },
        ]}
      />
      <div className="flex min-w-0 flex-1 flex-col">
        <MiniPageHeader title="Notifications" description="Choose how the system contacts you" />
        <MiniPageBody className="space-y-2 p-4">
          {[
            { label: "Email on assignment", checked: true },
            { label: "Daily digest", checked: false },
            { label: "Browser push (optional)", checked: false },
          ].map((row) => (
            <label
              key={row.label}
              className="flex cursor-pointer items-center justify-between rounded-xl border border-zinc-200 bg-white px-4 py-3 shadow-sm"
            >
              <span className="text-zinc-800">{row.label}</span>
              <input type="checkbox" defaultChecked={row.checked} className="size-4 rounded border-zinc-300 text-primary" />
            </label>
          ))}
          <div className="pt-2">
            <Button size="sm">Save preferences</Button>
          </div>
        </MiniPageBody>
      </div>
    </div>
  );
}

function EmptyDemo() {
  const size = useTemplatePreviewSize();
  return (
    <div className={`flex ${templateEmptyHeight(size)} flex-col items-center justify-center bg-[#fafafa] p-8 text-center text-sm`}>
      <div className="flex size-14 items-center justify-center rounded-2xl bg-primary-muted text-primary-subtle" aria-hidden>
        <Inbox className="size-7" strokeWidth={1.75} />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-zinc-900">No submissions yet</h3>
      <p className="mt-2 max-w-sm text-zinc-600">Create the first record or import from a CSV at the integration edge.</p>
      <div className="mt-5 flex flex-wrap justify-center gap-2">
        <Button>Create submission</Button>
        <Button variant="secondary">Import CSV</Button>
      </div>
    </div>
  );
}

const demos: Record<PageTemplateId, () => ReactNode> = {
  shell: ShellDemo,
  dashboard: DashboardDemo,
  list: ListDemo,
  detail: DetailDemo,
  form: FormDemo,
  auth: AuthDemo,
  settings: SettingsDemo,
  empty: EmptyDemo,
  gis: GisMapTemplateDemo,
};

export function PageTemplates() {
  const [active, setActive] = useState<PageTemplateId>("shell");
  const [previewExpanded, setPreviewExpanded] = useState(false);
  const meta = pageTemplateMeta.find((p) => p.id === active) ?? pageTemplateMeta[0];
  const details = pageTemplateDetails[active];
  const Demo = demos[active];
  const ActiveIcon = templateIcons[active];

  const templatePreview = (
    <div key={active} className="motion-content-enter">
      <Demo />
    </div>
  );

  useEffect(() => {
    setPreviewExpanded(false);
  }, [active]);

  const tocItems = [
    { id: "pages-intro", label: "Introduction" },
    { id: "pages-picker", label: "Template picker" },
    { id: "pages-preview", label: "Preview" },
    { id: "pages-guidance", label: "Guidance" },
  ];

  return (
    <div className="xl:grid xl:grid-cols-[minmax(0,1fr)_11rem] xl:gap-10">
      <div className="min-w-0 space-y-8">
      <div id="pages-intro" className="scroll-mt-24 rounded-2xl border border-primary-border bg-primary-muted/30 p-4 sm:p-6">
        <p className="copy-callout w-full max-w-none">
          <strong>App shell</strong> is the outer layout for signed-in users. Other templates render inside its main
          region (except <strong>Sign in</strong>, which stays on a public route). Combine templates with shared
          components from this reference and feature folders aligned to API modules.
        </p>
      </div>

      <div id="pages-picker" className="scroll-mt-24 grid gap-8 xl:grid-cols-[minmax(260px,300px)_1fr]">
        <div className="min-w-0 xl:sticky xl:top-4 xl:self-start">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-zinc-500">Templates</p>
          <ul
            className="flex gap-2 overflow-x-auto pb-1 [-webkit-overflow-scrolling:touch] xl:block xl:space-y-2 xl:overflow-visible xl:pb-0"
            role="tablist"
            aria-label="Page templates"
          >
            {pageTemplateMeta.map((item) => {
              const Icon = templateIcons[item.id];
              const selected = active === item.id;
              return (
                <li key={item.id} className="shrink-0 xl:shrink">
                  <button
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    onClick={() => setActive(item.id)}
                    className={`motion-control w-[min(100vw-2.5rem,17rem)] rounded-xl border px-3 py-3 text-left xl:w-full ${
                      selected
                        ? "border-primary bg-primary-muted/50 ring-1 ring-primary/20"
                        : "border-zinc-200 bg-white hover:border-zinc-300 hover:bg-zinc-50"
                    }`}
                  >
                    <span className="flex items-start gap-2.5">
                      <span
                        className={`flex size-8 shrink-0 items-center justify-center rounded-lg ${
                          selected ? "bg-primary text-white" : "bg-zinc-100 text-zinc-600"
                        }`}
                      >
                        <Icon className="size-4" strokeWidth={1.75} aria-hidden />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-sm font-semibold text-zinc-900">{item.label}</span>
                        <span className="mt-0.5 block text-xs leading-snug text-zinc-500">{item.desc}</span>
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <div id="pages-preview" className="min-w-0 scroll-mt-24 space-y-6">
          <PreviewFrame
            title={meta.label}
            description={meta.desc}
            route={details.route}
            height={active === "gis" ? 480 : 460}
            onExpand={() => setPreviewExpanded(true)}
          >
            {previewExpanded && active === "gis" ? (
              <p className="copy-body-tight px-6 py-16 text-center text-zinc-500">
                The map is in the expanded preview dialog. Close the dialog to show it here again.
              </p>
            ) : previewExpanded ? (
              <p className="copy-body-tight px-6 py-16 text-center text-zinc-500">
                Preview is open in expanded view. Close the dialog to return here.
              </p>
            ) : (
              <TemplatePreviewSizeProvider size="frame">{templatePreview}</TemplatePreviewSizeProvider>
            )}
          </PreviewFrame>

          <TemplatePreviewModal
            open={previewExpanded}
            onClose={() => setPreviewExpanded(false)}
            title={meta.label}
            description={meta.desc}
            route={details.route}
          >
            <TemplatePreviewSizeProvider size="modal">{templatePreview}</TemplatePreviewSizeProvider>
          </TemplatePreviewModal>

          <div id="pages-guidance" key={`${active}-meta`} className="motion-content-enter scroll-mt-24 space-y-4">
          <CopyInstallPath
            label={`${meta.label} route`}
            portalPath={
              active === "gis"
                ? "portal/src/sections/GisMapTemplateDemo.tsx"
                : `portal/src/sections/PageTemplates.tsx (${active} demo)`
            }
            targetPath={details.route}
            initSetupHint="Place under app/ using the authenticated or public layout as noted below."
          />
          {active === "gis" ? (
            <div className="space-y-4 rounded-2xl border border-primary-border bg-primary-muted/25 p-4 sm:p-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Recommended stack</p>
                <p className="mt-1 text-sm font-semibold text-zinc-900">
                  <a href={gisStackMeta.docsUrl} className="text-primary hover:underline" target="_blank" rel="noreferrer">
                    {gisStackMeta.name}
                  </a>
                </p>
                <p className="copy-body mt-2">{gisStackMeta.summary}</p>
                <p className="copy-body-tight mt-2">{gisStackMeta.backendNote}</p>
              </div>
              <div className="grid gap-4 lg:grid-cols-2">
                <CodeBlock title="Install (frontend)" code={gisStackMeta.installCommand} />
                <CodeBlock title="Map component" code={gisStackMeta.usageExample} />
              </div>
              <ul className="space-y-2 text-sm text-zinc-700">
                {gisStackMeta.alternatives.map((alt) => (
                  <li key={alt.name}>
                    <span className="font-medium text-zinc-900">{alt.name}</span> — {alt.when}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2">
                <ActiveIcon className="size-4 text-primary" aria-hidden />
                <h3 className="text-sm font-semibold text-zinc-900">When to use</h3>
              </div>
              <p className="copy-body mt-2">{details.whenToUse}</p>
              <p className="mt-3">
                <Badge tone={details.inAppShell ? "accent" : "neutral"}>
                  {details.inAppShell ? "Inside app shell" : "Public route"}
                </Badge>
              </p>
            </div>
            <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
              <h3 className="text-sm font-semibold text-zinc-900">Building blocks</h3>
              <ul className="mt-3 space-y-1.5">
                {details.buildingBlocks.map((block) => (
                  <li key={block} className="flex gap-2 text-sm text-zinc-600">
                    <span className="text-primary" aria-hidden>
                      ·
                    </span>
                    {block}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          </div>

          <div className="copy-body-tight rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3.5 sm:px-5">
            <p>
              <span className="font-medium text-zinc-800">Next.js mapping: </span>
              Place routes under{" "}
              <code className="rounded bg-white px-1.5 py-0.5 font-mono text-xs ring-1 ring-zinc-200">app/</code>
              {details.inAppShell ? (
                <>
                  {" "}
                  inside your authenticated layout; persist sidebar collapse via{" "}
                  <code className="font-mono text-xs">localStorage</code> or a user preference API.
                </>
              ) : (
                <> without the authenticated layout — redirect to IdP, then return to the app shell.</>
              )}
            </p>
          </div>
        </div>
      </div>
      </div>
      <SectionToc items={tocItems} ariaLabel="Page templates section" />
    </div>
  );
}
