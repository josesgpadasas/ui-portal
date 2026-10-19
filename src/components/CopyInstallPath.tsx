import { useState } from "react";
import { Button } from "../ui/Button";

type Props = {
  label: string;
  portalPath: string;
  targetPath: string;
  initSetupHint?: string;
};

export function CopyInstallPath({ label, portalPath, targetPath, initSetupHint }: Props) {
  const [copied, setCopied] = useState<"target" | "portal" | null>(null);

  async function copy(kind: "target" | "portal", text: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(kind);
      window.setTimeout(() => setCopied(null), 2000);
    } catch {
      setCopied(null);
    }
  }

  return (
    <div className="mt-3 rounded-xl border border-zinc-200 bg-zinc-50 p-3 text-xs">
      <p className="font-medium text-zinc-800">{label}</p>
      <div className="mt-2 space-y-2 font-mono text-[11px] text-zinc-600">
        <p>
          <span className="text-zinc-500">Copy to </span>
          <span className="text-primary-subtle">{targetPath}</span>
        </p>
        <p>
          <span className="text-zinc-500">Source </span>
          {portalPath}
        </p>
        {initSetupHint ? <p className="font-sans text-zinc-500">{initSetupHint}</p> : null}
      </div>
      <div className="mt-2 flex flex-wrap gap-2">
        <Button size="sm" variant="secondary" onClick={() => copy("target", targetPath)}>
          {copied === "target" ? "Copied path" : "Copy target path"}
        </Button>
        <Button size="sm" variant="ghost" onClick={() => copy("portal", portalPath)}>
          {copied === "portal" ? "Copied" : "Copy portal path"}
        </Button>
      </div>
    </div>
  );
}
