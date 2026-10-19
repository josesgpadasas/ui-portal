import { INIT_SETUP_PORTAL_URL, portalChangelog } from "../data/designContent";

export function ChangelogBanner() {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Alignment changelog</p>
          <p className="mt-1 text-sm font-medium text-zinc-900">
            Last aligned with init_setup:{" "}
            <time dateTime={portalChangelog.alignedWithInitSetup}>{portalChangelog.alignedWithInitSetup}</time>
          </p>
          <p className="copy-body-tight mt-1">{portalChangelog.headline}</p>
        </div>
        <a
          href={INIT_SETUP_PORTAL_URL}
          target="_blank"
          rel="noreferrer"
          className="motion-control shrink-0 rounded-lg border border-primary-border bg-primary-muted px-3 py-2 text-sm font-medium text-primary-subtle hover:bg-primary-muted/80"
        >
          Open Init Setup (5175)
        </a>
      </div>
      <ul className="mt-4 space-y-2 border-t border-zinc-100 pt-4">
        {portalChangelog.entries.map((entry) => (
          <li key={entry.date} className="copy-body-tight flex gap-2">
            <time className="shrink-0 font-mono text-[11px] text-zinc-500" dateTime={entry.date}>
              {entry.date}
            </time>
            <span>{entry.note}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
