import { useMemo, useState } from "react";
import { CodeBlock } from "../components/CodeBlock";
import { MermaidDiagram } from "../components/MermaidDiagram";
import { SectionToc } from "../components/SectionToc";
import {
  buildSystemMappingMermaid,
  systemMappingPrinciples,
  systemMappingRows,
  systemMappingTooling,
} from "../data/systemMapping";
import { buildSystemMappingJson, downloadSystemMappingTemplate } from "../lib/systemMappingExport";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";

const tocItems = [
  { id: "mapping-tooling", label: "Recommended tooling" },
  { id: "mapping-diagram", label: "Traceability diagram" },
  { id: "mapping-table", label: "Mapping registry" },
  { id: "mapping-template", label: "JSON template" },
];

export function SystemMappingReference() {
  const [filter, setFilter] = useState("");
  const chart = useMemo(() => buildSystemMappingMermaid(systemMappingRows), []);
  const q = filter.trim().toLowerCase();
  const rows = systemMappingRows.filter(
    (row) =>
      !q ||
      row.domain.toLowerCase().includes(q) ||
      row.nestModule.includes(q) ||
      row.openApiTag.toLowerCase().includes(q) ||
      row.entities.some((e) => e.toLowerCase().includes(q)),
  );

  return (
    <div className="xl:grid xl:grid-cols-[minmax(0,1fr)_11rem] xl:gap-10">
      <div className="min-w-0 space-y-8 sm:space-y-10">
        <div id="mapping-tooling" className="scroll-mt-24 rounded-2xl border border-primary-border bg-primary-muted/35 p-4 sm:p-6">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">Recommended tooling</h3>
          <p className="copy-body mt-2 w-full max-w-none">
            Use <strong className="text-zinc-900">OpenAPI</strong> as the API contract source of truth, a versioned{" "}
            <code className="rounded bg-white px-1 font-mono text-xs ring-1 ring-zinc-200">system-mapping.json</code>{" "}
            registry for cross-layer links, and <strong className="text-zinc-900">Mermaid</strong> for architecture and
            onboarding diagrams generated from the same rows.
          </p>
          <dl className="mt-4 grid gap-3 sm:grid-cols-2">
            {Object.entries(systemMappingTooling).map(([key, value]) => (
              <div key={key} className="rounded-xl border border-zinc-200 bg-white p-3">
                <dt className="text-xs font-medium uppercase tracking-wide text-zinc-500">{key.replace(/([A-Z])/g, " $1")}</dt>
                <dd className="mt-1 text-sm text-zinc-800">{value}</dd>
              </div>
            ))}
          </dl>
          <ul className="copy-body-tight mt-4 list-inside list-disc space-y-1">
            {systemMappingPrinciples.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>

        <div id="mapping-diagram" className="scroll-mt-24">
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-zinc-500">Traceability diagram</h3>
          <p className="copy-body mb-4 w-full max-w-none">
            Generated from mapping rows — keep diagram sources in repo or CI from{" "}
            <code className="font-mono text-xs">system-mapping.json</code>.
          </p>
          <MermaidDiagram chart={chart} />
        </div>

        <div id="mapping-table" className="scroll-mt-24 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm sm:p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">Mapping registry</h3>
              <p className="copy-body-tight mt-1">Module ↔ OpenAPI ↔ feature ↔ routes ↔ nav ↔ templates</p>
            </div>
            <label className="w-full sm:max-w-xs">
              <span className="sr-only">Filter mapping rows</span>
              <input
                type="search"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                placeholder="Filter domain, module, entity…"
                className="h-10 w-full rounded-lg border border-zinc-200 px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </label>
          </div>
          <div className="mt-4 overflow-x-auto rounded-xl border border-zinc-200">
            <table className="w-full min-w-[960px] text-left text-sm">
              <thead className="border-b border-zinc-200 bg-zinc-50 text-xs uppercase tracking-wide text-zinc-500">
                <tr>
                  <th className="px-3 py-3 font-semibold">Domain</th>
                  <th className="px-3 py-3 font-semibold">Nest / OpenAPI</th>
                  <th className="px-3 py-3 font-semibold">API base</th>
                  <th className="px-3 py-3 font-semibold">Feature folder</th>
                  <th className="px-3 py-3 font-semibold">Templates</th>
                  <th className="px-3 py-3 font-semibold">Nav / icon</th>
                  <th className="px-3 py-3 font-semibold">Entities</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {rows.map((row) => (
                  <tr key={row.id} className="align-top hover:bg-zinc-50/80">
                    <td className="px-3 py-3">
                      <p className="font-medium text-zinc-900">{row.domain}</p>
                      <p className="font-mono text-xs text-zinc-500">{row.id}</p>
                    </td>
                    <td className="px-3 py-3">
                      <p className="font-mono text-xs text-primary-subtle">{row.nestModule}</p>
                      <p className="text-xs text-zinc-600">{row.openApiTag}</p>
                    </td>
                    <td className="px-3 py-3 font-mono text-xs text-zinc-700">{row.apiBasePath}</td>
                    <td className="px-3 py-3 font-mono text-[11px] leading-snug text-zinc-700">{row.featureFolder}</td>
                    <td className="px-3 py-3">
                      <div className="flex flex-wrap gap-1">
                        {row.pageTemplates.map((tpl) => (
                          <Badge key={tpl} tone="accent">
                            {tpl}
                          </Badge>
                        ))}
                      </div>
                    </td>
                    <td className="px-3 py-3 text-xs text-zinc-700">
                      {row.navLabel ? (
                        <>
                          <span className="font-medium text-zinc-900">{row.navLabel}</span>
                          {row.lucideIcon ? (
                            <span className="mt-0.5 block font-mono text-zinc-500">{row.lucideIcon}</span>
                          ) : null}
                        </>
                      ) : (
                        "—"
                      )}
                    </td>
                    <td className="px-3 py-3 font-mono text-[11px] text-zinc-600">{row.entities.join(", ")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {rows.length === 0 ? <p className="copy-body mt-3">No rows match your filter.</p> : null}
        </div>

        <div id="mapping-template" className="scroll-mt-24 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">JSON template</h3>
            <Button size="sm" variant="secondary" onClick={downloadSystemMappingTemplate}>
              Download system-mapping.template.json
            </Button>
          </div>
          <CodeBlock title="system-mapping.json (excerpt)" code={buildSystemMappingJson().split("\n").slice(0, 36).join("\n") + "\n  …\n}"} />
        </div>
      </div>
      <SectionToc items={tocItems} ariaLabel="System mapping section" />
    </div>
  );
}
