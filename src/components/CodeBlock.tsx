import { useState } from "react";

type Props = { title?: string; code: string };

export function CodeBlock({ title, code }: Props) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="overflow-hidden rounded-xl border border-zinc-200 bg-zinc-950">
      {title ? (
        <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-2">
          <span className="text-xs font-medium text-zinc-400">{title}</span>
          <button
            type="button"
            onClick={copy}
            className="motion-control rounded-md px-2 py-1 text-xs font-medium text-primary-soft hover:bg-zinc-800"
          >
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      ) : (
        <div className="flex justify-end border-b border-zinc-800 px-2 py-1">
          <button
            type="button"
            onClick={copy}
            className="motion-control rounded-md px-2 py-1 text-xs font-medium text-primary-soft hover:bg-zinc-800"
          >
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      )}
      <pre className="overflow-x-auto p-4 font-mono text-[13px] leading-relaxed text-zinc-100">
        <code>{code}</code>
      </pre>
    </div>
  );
}
