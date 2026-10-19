import { LogOut } from "lucide-react";

export type SidebarUserSessionProps = {
  displayName: string;
  email?: string;
  collapsed: boolean;
  onLogout?: () => void;
};

function initials(displayName: string) {
  return displayName
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function SidebarUserSession({ displayName, email, collapsed, onLogout }: SidebarUserSessionProps) {
  const monogram = initials(displayName) || "?";

  function handleLogout() {
    if (onLogout) {
      onLogout();
      return;
    }
    window.alert("Sign out would redirect to the OIDC end-session endpoint.");
  }

  if (collapsed) {
    return (
      <div className="flex shrink-0 flex-col items-center gap-2.5 border-t border-zinc-200 bg-white/60 px-2 py-3">
        <div
          className="flex size-10 items-center justify-center rounded-full bg-primary-muted text-xs font-semibold text-primary-subtle ring-1 ring-primary-border/60"
          title={displayName}
        >
          {monogram}
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="motion-control flex size-10 items-center justify-center rounded-xl text-zinc-600 hover:bg-white hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
          aria-label={`Sign out (${displayName})`}
          title="Sign out"
        >
          <LogOut className="size-4" strokeWidth={1.75} aria-hidden />
        </button>
      </div>
    );
  }

  return (
    <div className="flex shrink-0 items-center gap-3 border-t border-zinc-200 bg-white/60 px-3 py-3">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary-muted text-xs font-semibold text-primary-subtle ring-1 ring-primary-border/60">
        {monogram}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-zinc-900">{displayName}</p>
        {email ? <p className="truncate text-xs text-zinc-500">{email}</p> : null}
      </div>
      <button
        type="button"
        onClick={handleLogout}
        className="motion-control flex size-10 shrink-0 items-center justify-center rounded-xl border border-transparent text-zinc-600 hover:border-zinc-200 hover:bg-white hover:text-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
        aria-label={`Sign out (${displayName})`}
        title="Sign out"
      >
        <LogOut className="size-4" strokeWidth={1.75} aria-hidden />
      </button>
    </div>
  );
}
