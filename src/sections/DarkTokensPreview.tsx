import { darkColorTokens } from "../data/designContent";

export function DarkTokensPreview() {
  return (
    <div id="tokens-dark" className="scroll-mt-24 mt-8 rounded-2xl border border-zinc-800 bg-zinc-950 p-4 text-zinc-100 sm:p-6">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-400">Dark mode preview</h3>
      <p className="mt-2 text-sm leading-relaxed text-zinc-400">
        Use <code className="rounded bg-zinc-900 px-1 font-mono text-xs">class=&quot;dark&quot;</code> on{" "}
        <code className="font-mono text-xs">html</code> or respect{" "}
        <code className="font-mono text-xs">prefers-color-scheme</code>. Keep primary readable on elevated surfaces.
      </p>
      <ul className="mt-4 grid gap-2 sm:grid-cols-2">
        {darkColorTokens.map((token) => (
          <li key={token.name} className="flex items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-900 p-3">
            <span className="size-10 shrink-0 rounded-lg border border-zinc-700" style={{ background: token.hex }} />
            <div>
              <p className="font-medium text-zinc-100">
                {token.name} <span className="font-mono text-xs font-normal text-zinc-500">{token.hex}</span>
              </p>
              <p className="text-xs text-zinc-400">{token.usage}</p>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          className="rounded-lg bg-[#3b9eff] px-4 py-2 text-sm font-medium text-zinc-950"
        >
          Primary action
        </button>
        <button type="button" className="rounded-lg border border-zinc-600 px-4 py-2 text-sm text-zinc-200">
          Secondary
        </button>
      </div>
    </div>
  );
}
