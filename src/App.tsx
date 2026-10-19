import { Suspense, lazy } from "react";
import { AppShell } from "./components/AppShell";
import { ChangelogBanner } from "./components/ChangelogBanner";
import { Section } from "./components/Section";
import { TokenExportPanel } from "./components/TokenExportPanel";
import {
  INIT_SETUP_PATH,
  ROOT_PATH,
  colorTokens,
  frontendTree,
  implementationChecklist,
  spacingRadii,
  stackSummary,
  typeScale,
  uxPatterns,
} from "./data/designContent";

const IconsReference = lazy(() => import("./sections/IconsReference").then((m) => ({ default: m.IconsReference })));
const ComponentGallery = lazy(() => import("./sections/ComponentGallery").then((m) => ({ default: m.ComponentGallery })));
const PageTemplates = lazy(() => import("./sections/PageTemplates").then((m) => ({ default: m.PageTemplates })));
const FormPatterns = lazy(() => import("./sections/FormPatterns").then((m) => ({ default: m.FormPatterns })));
const DarkTokensPreview = lazy(() => import("./sections/DarkTokensPreview").then((m) => ({ default: m.DarkTokensPreview })));

function SectionFallback() {
  return <div className="h-24 animate-pulse rounded-2xl bg-zinc-200/60" aria-busy="true" aria-label="Loading section" />;
}

export default function App() {
  return (
    <AppShell>
      <Section
        id="overview"
        title="Overview"
        description="Living catalog of components and page layouts for greenfield systems. Conventions match the init_setup reference architecture: Next.js presentation tier, NestJS API modules, OIDC, and OpenAPI-driven clients."
      >
        <ChangelogBanner />
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {stackSummary.map((card) => (
            <div key={card.label} className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
              <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">{card.label}</p>
              <p className="mt-2 text-sm font-semibold text-zinc-900">{card.value}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 rounded-2xl border border-primary-border bg-primary-muted/60 p-4 sm:p-6">
          <p className="copy-callout w-full max-w-none">
            This portal uses the <strong>app shell</strong> page template (collapsible sidebar + header + scrollable
            main). Architecture docs live in{" "}
            <span className="break-all font-mono text-[0.8125rem] text-primary-subtle sm:break-normal">{INIT_SETUP_PATH}</span>{" "}
            (Init Setup Portal on port <span className="font-mono text-[0.8125rem]">5175</span>). Design reference runs on port{" "}
            <span className="font-mono text-[0.8125rem]">5176</span>.
          </p>
        </div>
      </Section>

      <Section
        id="structure"
        title="Frontend structure"
        description="Mirror API modules in feature folders. Keep ui primitives thin and reusable; put domain logic in hooks and generated API clients."
      >
        <pre className="overflow-x-auto rounded-2xl border border-zinc-200 bg-zinc-950 p-5 font-mono text-[13px] leading-relaxed text-zinc-100">
          <code>{frontendTree}</code>
        </pre>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {[
            "Route segments own loading.tsx, error.tsx, and metadata.",
            "Page headers: title, breadcrumbs, primary action on the right.",
            "Feature components never import another feature's internals.",
            "API types come from OpenAPI codegen — do not hand-copy DTOs.",
          ].map((item) => (
            <li key={item} className="rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-700">
              {item}
            </li>
          ))}
        </ul>
      </Section>

      <Section id="tokens" title="Design tokens" description="Primary accent #006BDF, zinc neutrals, DM Sans + JetBrains Mono.">
        <TokenExportPanel />
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-zinc-500">Color</h3>
            <ul className="space-y-2">
              {colorTokens.map((token) => (
                <li key={token.name} className="flex items-center gap-3 rounded-xl border border-zinc-200 bg-white p-3">
                  <span className="size-10 shrink-0 rounded-lg border border-zinc-200" style={{ background: token.hex }} />
                  <div>
                    <p className="font-medium text-zinc-900">
                      {token.name} <span className="font-mono text-xs font-normal text-zinc-500">{token.hex}</span>
                    </p>
                    <p className="copy-body-tight">{token.usage}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-6">
            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-zinc-500">Typography</h3>
              <ul className="space-y-3 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
                {typeScale.map((row) => (
                  <li key={row.name}>
                    <p className="text-xs font-medium uppercase text-zinc-400">{row.name}</p>
                    <p className={`mt-1 text-zinc-900 ${row.className}`}>{row.sample}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-zinc-500">Spacing & shape</h3>
              <ul className="list-inside list-disc space-y-1 rounded-2xl border border-zinc-200 bg-white p-5 text-sm text-zinc-700 shadow-sm">
                {spacingRadii.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <Suspense fallback={<SectionFallback />}>
          <DarkTokensPreview />
        </Suspense>
      </Section>

      <Section
        id="icons"
        title="Icons"
        description="Default icon library for new frontends: Lucide React — tree-shakable, matches shadcn/ui, used in this shell and page templates."
      >
        <Suspense fallback={<SectionFallback />}>
          <IconsReference />
        </Suspense>
      </Section>

      <Section
        id="components"
        title="Components"
        description="Reference implementations in portal/src/ui/. Copy into new projects or replace with shadcn/ui using the same variants."
      >
        <Suspense fallback={<SectionFallback />}>
          <ComponentGallery />
        </Suspense>
      </Section>

      <Section id="patterns" title="UX patterns" description="Standard behavior for internal admin and partner-facing apps on the default stack.">
        <ul className="grid gap-4 sm:grid-cols-2">
          {uxPatterns.map((pattern) => (
            <li key={pattern.title} className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
              <h3 className="font-semibold text-zinc-900">{pattern.title}</h3>
              <p className="copy-body mt-2">{pattern.body}</p>
            </li>
          ))}
        </ul>
        <div className="mt-8">
          <Suspense fallback={<SectionFallback />}>
            <FormPatterns />
          </Suspense>
        </div>
      </Section>

      <Section
        id="pages"
        title="Page templates"
        description="Wireframes for common routes — the live portal layout follows the app shell template."
      >
        <Suspense fallback={<SectionFallback />}>
          <PageTemplates />
        </Suspense>
      </Section>

      <Section id="checklist" title="Implementation checklist" description="Steps when starting a new frontend in starter-monorepo or a greenfield repo.">
        <div className="grid gap-4 md:grid-cols-3">
          {implementationChecklist.map((block) => (
            <div key={block.phase} className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
              <h3 className="font-semibold text-zinc-900">{block.phase}</h3>
              <ul className="mt-3 list-inside list-disc space-y-1 text-sm text-zinc-600">
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <footer className="rounded-2xl border border-zinc-200 bg-white px-4 py-8 sm:px-6">
        <div className="copy-body-tight mx-auto max-w-2xl text-center text-zinc-500">
          <p>
            Source: <span className="break-all font-mono text-zinc-700 sm:break-normal">{ROOT_PATH}</span>
          </p>
          <p className="mt-2">Keep tokens and templates aligned when init_setup stack defaults change.</p>
        </div>
      </footer>
    </AppShell>
  );
}
