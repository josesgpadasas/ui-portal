import { useEffect, useId, useRef } from "react";

type Props = {
  chart: string;
  className?: string;
};

export function MermaidDiagram({ chart, className = "" }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const renderId = useId().replace(/:/g, "");

  useEffect(() => {
    let cancelled = false;
    const container = containerRef.current;
    if (!container) return;

    (async () => {
      const mermaid = (await import("mermaid")).default;
      mermaid.initialize({
        startOnLoad: false,
        theme: "base",
        securityLevel: "strict",
        themeVariables: {
          fontFamily: "DM Sans, system-ui, sans-serif",
          primaryColor: "#e6f2ff",
          primaryTextColor: "#18181b",
          primaryBorderColor: "#006bdf",
          lineColor: "#71717a",
          tertiaryColor: "#fafafa",
        },
      });

      try {
        const { svg } = await mermaid.render(`mermaid-${renderId}`, chart);
        if (!cancelled) {
          container.innerHTML = svg;
          container.setAttribute("aria-busy", "false");
          const svgEl = container.querySelector("svg");
          if (svgEl) {
            svgEl.setAttribute("role", "img");
            svgEl.classList.add("mx-auto", "max-w-full", "h-auto");
          }
        }
      } catch {
        if (!cancelled) {
          container.textContent = "Diagram could not be rendered.";
        }
      }
    })();

    return () => {
      cancelled = true;
      container.innerHTML = "";
    };
  }, [chart, renderId]);

  return (
    <div
      ref={containerRef}
      className={`rounded-xl border border-zinc-200 bg-white p-4 sm:p-6 ${className}`}
      aria-busy="true"
      aria-label="Architecture diagram"
    />
  );
}
