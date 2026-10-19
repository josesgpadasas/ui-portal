import {
  AlertTriangle,
  ArrowRight,
  Bell,
  Check,
  ChevronLeft,
  Download,
  FileText,
  KeyRound,
  LayoutDashboard,
  Loader2,
  LogOut,
  Plus,
  Search,
  Settings,
  Trash2,
  User,
  type LucideIcon,
} from "lucide-react";
import { CodeBlock } from "../components/CodeBlock";
import { SectionToc } from "../components/SectionToc";
import { iconCatalog, iconNavMapping, iconPackageMeta, iconUsageRules } from "../data/designContent";

const tocItems = [
  { id: "icons-package", label: "Package" },
  { id: "icons-install", label: "Install & usage" },
  { id: "icons-sizing", label: "Sizing" },
  { id: "icons-preview", label: "Icon preview" },
  { id: "icons-mapping", label: "Shell mapping" },
  { id: "icons-catalog", label: "Catalog" },
];

const showcaseIcons: { icon: LucideIcon; label: string }[] = [
  { icon: LayoutDashboard, label: "LayoutDashboard" },
  { icon: FileText, label: "FileText" },
  { icon: Search, label: "Search" },
  { icon: Plus, label: "Plus" },
  { icon: Download, label: "Download" },
  { icon: Settings, label: "Settings" },
  { icon: User, label: "User" },
  { icon: Bell, label: "Bell" },
  { icon: KeyRound, label: "KeyRound" },
  { icon: Check, label: "Check" },
  { icon: AlertTriangle, label: "AlertTriangle" },
  { icon: Trash2, label: "Trash2" },
  { icon: LogOut, label: "LogOut" },
  { icon: ArrowRight, label: "ArrowRight" },
  { icon: ChevronLeft, label: "ChevronLeft" },
  { icon: Loader2, label: "Loader2" },
];

export function IconsReference() {
  return (
    <div className="xl:grid xl:grid-cols-[minmax(0,1fr)_11rem] xl:gap-10">
      <div className="min-w-0 space-y-8 sm:space-y-10">
      <div id="icons-package" className="scroll-mt-24 rounded-2xl border border-primary-border bg-primary-muted/40 p-4 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-start sm:justify-between">
          <div className="min-w-0 flex-1">
            <p className="font-mono text-sm font-medium text-primary">{iconPackageMeta.name}</p>
            <p className="copy-body mt-2 text-zinc-700">{iconPackageMeta.summary}</p>
          </div>
          <a
            href={iconPackageMeta.docsUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex shrink-0 items-center justify-center rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white transition hover:bg-primary-hover sm:py-2"
          >
            Browse all icons
          </a>
        </div>
        <dl className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {iconPackageMeta.facts.map((fact) => (
            <div key={fact.label} className="rounded-xl border border-zinc-200 bg-white p-4">
              <dt className="text-xs font-medium uppercase tracking-wide text-zinc-500">{fact.label}</dt>
              <dd className="mt-1 text-sm font-semibold text-zinc-900">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div id="icons-install" className="scroll-mt-24 grid gap-6 lg:grid-cols-2">
        <CodeBlock title="Install (frontend)" code={iconPackageMeta.installCommand} />
        <CodeBlock title="Usage" code={iconPackageMeta.usageExample} />
      </div>

      <div id="icons-sizing" className="scroll-mt-24">
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-zinc-500">Sizing conventions</h3>
        <ul className="grid gap-3 sm:grid-cols-2">
          {iconUsageRules.map((rule) => (
            <li key={rule.title} className="rounded-xl border border-zinc-200 bg-white p-4 text-sm">
              <p className="font-semibold text-zinc-900">{rule.title}</p>
              <p className="copy-body-tight mt-1.5">{rule.body}</p>
            </li>
          ))}
        </ul>
      </div>

      <div id="icons-preview" className="scroll-mt-24">
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-zinc-500">Common set (preview)</h3>
        <ul className="grid grid-cols-4 gap-3 sm:grid-cols-6 md:grid-cols-8">
          {showcaseIcons.map(({ icon: Icon, label }) => (
            <li
              key={label}
              className="flex flex-col items-center gap-2 rounded-xl border border-zinc-200 bg-white p-3 text-center shadow-sm"
            >
              <Icon className="size-5 text-zinc-800" strokeWidth={1.75} aria-hidden />
              <span className="font-mono text-[10px] leading-tight text-zinc-500">{label}</span>
            </li>
          ))}
        </ul>
      </div>

      <div id="icons-mapping" className="scroll-mt-24">
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-zinc-500">App shell mapping</h3>
        <p className="copy-body mb-4 w-full max-w-none">
          Page templates and layout nav use these Lucide names — keep labels and icons consistent across projects.
        </p>
        <div className="overflow-x-auto rounded-2xl border border-zinc-200 bg-white shadow-sm">
          <table className="w-full min-w-[480px] text-left text-sm">
            <thead className="border-b border-zinc-200 bg-zinc-50 text-xs uppercase tracking-wide text-zinc-500">
              <tr>
                <th className="px-4 py-3 font-semibold">Nav label</th>
                <th className="px-4 py-3 font-semibold">Lucide component</th>
                <th className="px-4 py-3 font-semibold">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {iconNavMapping.map((row) => (
                <tr key={row.label} className="hover:bg-zinc-50/80">
                  <td className="px-4 py-3 font-medium text-zinc-900">{row.label}</td>
                  <td className="px-4 py-3 font-mono text-primary">{row.lucide}</td>
                  <td className="px-4 py-3 text-zinc-600">{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div id="icons-catalog" className="scroll-mt-24">
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-zinc-500">Catalog by use case</h3>
        <div className="grid gap-4 md:grid-cols-2">
          {iconCatalog.map((group) => (
            <div key={group.category} className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
              <h4 className="font-semibold text-zinc-900">{group.category}</h4>
              <ul className="mt-3 space-y-1.5 font-mono text-xs text-zinc-600">
                {group.icons.map((name) => (
                  <li key={name}>{name}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      </div>
      <SectionToc items={tocItems} ariaLabel="Icons section" />
    </div>
  );
}
