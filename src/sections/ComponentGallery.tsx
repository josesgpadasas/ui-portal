import { ArrowDown, ArrowUp } from "lucide-react";
import { useMemo, useState } from "react";
import { CopyInstallPath } from "../components/CopyInstallPath";
import { Dialog } from "../components/Dialog";
import { uiComponentCatalog } from "../data/designContent";
import { Alert } from "../ui/Alert";
import { Badge } from "../ui/Badge";
import { Breadcrumb } from "../ui/Breadcrumb";
import { Button } from "../ui/Button";
import { DropdownDemo } from "../ui/Dropdown";
import { EmptyState } from "../ui/EmptyState";
import { Input } from "../ui/Input";
import { SkeletonTableRows } from "../ui/Skeleton";
import { Tabs } from "../ui/Tabs";
import { useToast } from "../ui/Toast";

type Row = {
  ref: string;
  module: string;
  status: string;
  tone: "warning" | "success" | "accent";
  date: string;
};

const seedRows: Row[] = [
  { ref: "SUB-1042", module: "submissions", status: "Pending review", tone: "warning", date: "Today" },
  { ref: "SUB-1041", module: "submissions", status: "Approved", tone: "success", date: "Yesterday" },
  { ref: "USR-88", module: "identity", status: "Active", tone: "accent", date: "Oct 12" },
  { ref: "SUB-1040", module: "submissions", status: "Draft", tone: "warning", date: "Oct 11" },
];

type SortKey = "ref" | "module" | "date";

export function ComponentGallery() {
  const { push } = useToast();
  const [modalOpen, setModalOpen] = useState(false);
  const [sortKey, setSortKey] = useState<SortKey>("ref");
  const [sortAsc, setSortAsc] = useState(true);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [showSkeleton, setShowSkeleton] = useState(false);

  const rows = useMemo(() => {
    const sorted = [...seedRows].sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      return sortAsc ? av.localeCompare(bv) : bv.localeCompare(av);
    });
    return sorted;
  }, [sortAsc, sortKey]);

  function toggleSort(key: SortKey) {
    if (sortKey === key) setSortAsc((value) => !value);
    else {
      setSortKey(key);
      setSortAsc(true);
    }
  }

  function toggleRow(ref: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(ref)) next.delete(ref);
      else next.add(ref);
      return next;
    });
  }

  const allSelected = selected.size === rows.length && rows.length > 0;

  return (
    <div className="space-y-8 sm:space-y-10">
      <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm sm:p-6">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">Copy into your repo</h3>
        <p className="copy-body mt-2 w-full max-w-none">
          Target paths mirror init_setup / starter-monorepo frontend layout.
        </p>
        <ul className="mt-4 grid gap-3 lg:grid-cols-2">
          {uiComponentCatalog.map((item) => (
            <li key={item.id} className="rounded-xl border border-zinc-200 p-3">
              <p className="text-sm font-semibold text-zinc-900">{item.name}</p>
              <p className="copy-body-tight mt-0.5">{item.blurb}</p>
              <CopyInstallPath
                label={item.name}
                portalPath={item.portalPath}
                targetPath={item.targetPath}
                initSetupHint={"initSetupHint" in item ? item.initSetupHint : undefined}
              />
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm sm:p-6">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">Buttons</h3>
        <div className="mt-4 flex flex-wrap gap-3">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Delete</Button>
          <Button size="sm" variant="secondary">
            Small
          </Button>
          <Button disabled>Disabled</Button>
          <Button variant="secondary" onClick={() => push({ title: "Saved", description: "Non-blocking toast example", tone: "success" })}>
            Show toast
          </Button>
        </div>
      </div>

      <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm sm:p-6">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">Badges & status</h3>
        <div className="mt-4 flex flex-wrap gap-2">
          <Badge>Draft</Badge>
          <Badge tone="accent">Active</Badge>
          <Badge tone="success">Published</Badge>
          <Badge tone="warning">Pending review</Badge>
          <Badge tone="danger">Rejected</Badge>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm sm:p-6">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">Breadcrumb</h3>
          <div className="mt-4">
            <Breadcrumb
              items={[
                { label: "Submissions", href: "#" },
                { label: "Queue", href: "#" },
                { label: "SUB-1042" },
              ]}
            />
          </div>
        </div>
        <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm sm:p-6">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">Dropdown</h3>
          <div className="mt-4">
            <DropdownDemo />
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm sm:p-6">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">Tabs</h3>
        <div className="mt-4">
          <Tabs
            tabs={[
              { id: "summary", label: "Summary", panel: <p className="copy-body">Record metadata and status timeline.</p> },
              { id: "audit", label: "Audit", panel: <p className="copy-body">Immutable audit events from NestJS.</p> },
              { id: "files", label: "Files", panel: <p className="copy-body">Attachments with virus scan status.</p> },
            ]}
          />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm sm:p-6">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">Form controls</h3>
          <div className="mt-4 space-y-4">
            <Input label="Project name" placeholder="e.g. Permits portal" hint="Shown in the browser tab and audit log." />
            <Input label="Code" defaultValue="PRJ-001" error="Code already exists in this organization." />
          </div>
        </div>
        <div className="space-y-4">
          <Alert title="API contract" variant="info">
            Generate the client from OpenAPI before wiring forms to avoid drift.
          </Alert>
          <Alert title="Request failed" variant="error">
            traceId: 7f3a… — retry or contact support with this ID.
          </Alert>
        </div>
      </div>

      <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">Data table</h3>
          <Button size="sm" variant="ghost" onClick={() => setShowSkeleton((value) => !value)}>
            {showSkeleton ? "Show data" : "Preview skeleton"}
          </Button>
        </div>
        {selected.size > 0 ? (
          <div className="mt-4 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-primary-border bg-primary-muted/40 px-3 py-2">
            <p className="text-sm font-medium text-zinc-900">{selected.size} selected</p>
            <div className="flex gap-2">
              <Button size="sm" variant="secondary">
                Export
              </Button>
              <Button size="sm" variant="danger">
                Delete
              </Button>
            </div>
          </div>
        ) : null}
        <div className="mt-4 overflow-x-auto rounded-xl border border-zinc-200">
          {showSkeleton ? (
            <div className="p-4">
              <SkeletonTableRows />
            </div>
          ) : (
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="border-b border-zinc-200 bg-zinc-50 text-xs uppercase tracking-wide text-zinc-500">
                <tr>
                  <th className="px-4 py-3">
                    <input
                      type="checkbox"
                      className="size-4 rounded border-zinc-300"
                      checked={allSelected}
                      aria-label="Select all rows"
                      onChange={() => setSelected(allSelected ? new Set() : new Set(rows.map((r) => r.ref)))}
                    />
                  </th>
                  <th className="px-4 py-3 font-semibold">
                    <button type="button" className="inline-flex items-center gap-1" onClick={() => toggleSort("ref")}>
                      Reference {sortKey === "ref" ? sortAsc ? <ArrowUp className="size-3" /> : <ArrowDown className="size-3" /> : null}
                    </button>
                  </th>
                  <th className="px-4 py-3 font-semibold">
                    <button type="button" className="inline-flex items-center gap-1" onClick={() => toggleSort("module")}>
                      Module {sortKey === "module" ? sortAsc ? <ArrowUp className="size-3" /> : <ArrowDown className="size-3" /> : null}
                    </button>
                  </th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold">
                    <button type="button" className="inline-flex items-center gap-1" onClick={() => toggleSort("date")}>
                      Updated {sortKey === "date" ? sortAsc ? <ArrowUp className="size-3" /> : <ArrowDown className="size-3" /> : null}
                    </button>
                  </th>
                  <th className="px-4 py-3 font-semibold">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {rows.map((row) => (
                  <tr key={row.ref} className={selected.has(row.ref) ? "bg-primary-muted/30" : "hover:bg-zinc-50/80"}>
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        className="size-4 rounded border-zinc-300"
                        checked={selected.has(row.ref)}
                        aria-label={`Select ${row.ref}`}
                        onChange={() => toggleRow(row.ref)}
                      />
                    </td>
                    <td className="px-4 py-3 font-mono font-medium text-primary">{row.ref}</td>
                    <td className="px-4 py-3 text-zinc-700">{row.module}</td>
                    <td className="px-4 py-3">
                      <Badge tone={row.tone}>{row.status}</Badge>
                    </td>
                    <td className="px-4 py-3 text-zinc-600">{row.date}</td>
                    <td className="px-4 py-3 text-right">
                      <Button variant="ghost" size="sm">
                        Open
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm sm:p-6">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">Empty state</h3>
        <div className="mt-4">
          <EmptyState
            title="No submissions yet"
            description="Create the first record or import from CSV at the integration edge."
          />
        </div>
      </div>

      <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm sm:p-6">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">Dialog</h3>
        <p className="copy-body mt-2 w-full max-w-none">
          Portaled to <code className="font-mono text-xs">document.body</code> — use for destructive confirmation or short forms.
        </p>
        <Button className="mt-4" variant="danger" onClick={() => setModalOpen(true)}>
          Delete record
        </Button>
        <Dialog
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Delete submission?"
          footer={
            <>
              <Button variant="secondary" onClick={() => setModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="danger" onClick={() => setModalOpen(false)}>
                Confirm delete
              </Button>
            </>
          }
        >
          <p className="copy-body">This writes an audit event and cannot be undone from the UI.</p>
        </Dialog>
      </div>
    </div>
  );
}
