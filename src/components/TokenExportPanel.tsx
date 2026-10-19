import { buildTailwindThemeJson, buildTokensCss, downloadTextFile } from "../lib/tokenExport";
import { Button } from "../ui/Button";

export function TokenExportPanel() {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm sm:p-5">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">Export tokens</h3>
      <p className="copy-body mt-2 w-full max-w-none">
        Generated from this portal&apos;s catalog — paste into a new frontend or compare with init_setup globals.
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <Button size="sm" variant="secondary" onClick={() => downloadTextFile("design-tokens.css", buildTokensCss())}>
          Download tokens.css
        </Button>
        <Button
          size="sm"
          variant="secondary"
          onClick={() => downloadTextFile("tailwind-theme.json", buildTailwindThemeJson(), "application/json")}
        >
          Download tailwind-theme.json
        </Button>
      </div>
    </div>
  );
}
