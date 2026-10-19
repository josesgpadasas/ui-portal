import { Layers, LocateFixed, MapPin } from "lucide-react";
import { useState } from "react";
import { MiniPageHeader } from "../components/MiniPageHeader";
import { templateGisHeight, useTemplatePreviewSize } from "../components/TemplatePreviewContext";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import GisMapCanvas from "./GisMapCanvas";

const layers = [
  { id: "parcels", label: "Land parcels", count: 1240, on: true },
  { id: "permits", label: "Active permits", count: 86, on: true },
  { id: "flood", label: "Flood hazard", count: null, on: false },
];

export function GisMapTemplateDemo() {
  const [layerState, setLayerState] = useState(layers);
  const size = useTemplatePreviewSize();
  const expanded = size === "modal";

  return (
    <div className={`flex ${templateGisHeight(size)} min-h-0 flex-col text-sm`}>
      <MiniPageHeader
        breadcrumbs={["Operations", "GIS"]}
        title="Asset map"
        description="Vector tiles · WGS84 · PostGIS"
        actions={
          <>
            <Button size="sm" variant="secondary">
              Export
            </Button>
            <Button size="sm">Add record</Button>
          </>
        }
      />

      <div className="flex min-h-0 flex-1 overflow-hidden">
        <aside className="hidden w-48 shrink-0 flex-col border-r border-zinc-200 bg-zinc-50/90 md:flex">
          <div className="border-b border-zinc-200 px-2.5 py-1.5">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-zinc-500">Layers</p>
          </div>
          <ul className="min-h-0 flex-1 space-y-0.5 overflow-y-auto p-1.5">
            {layerState.map((layer) => (
              <li key={layer.id}>
                <label className="flex cursor-pointer items-start gap-2 rounded-md px-2 py-1.5 hover:bg-white">
                  <input
                    type="checkbox"
                    className="mt-0.5 size-3.5 rounded border-zinc-300 text-primary"
                    checked={layer.on}
                    onChange={() =>
                      setLayerState((prev) =>
                        prev.map((row) => (row.id === layer.id ? { ...row, on: !row.on } : row)),
                      )
                    }
                  />
                  <span className="min-w-0 leading-snug">
                    <span className="block text-xs font-medium text-zinc-900">{layer.label}</span>
                    {layer.count != null ? (
                      <span className="text-[10px] text-zinc-500">{layer.count.toLocaleString()} features</span>
                    ) : (
                      <span className="text-[10px] text-zinc-500">Overlay</span>
                    )}
                  </span>
                </label>
              </li>
            ))}
          </ul>
        </aside>

        <div className="relative min-h-0 min-w-0 flex-1 bg-zinc-200">
          <div className="absolute inset-0 min-h-[12rem]">
            <GisMapCanvas />
          </div>

          <div className="pointer-events-none absolute left-2 top-2 z-10 flex flex-wrap gap-1.5 sm:left-3 sm:top-3">
            <span className="pointer-events-auto">
              <Badge tone="accent">
                <MapPin className="mr-0.5 inline size-3" aria-hidden />
                <span className="text-[11px]">3 selected</span>
              </Badge>
            </span>
          </div>

          <div className="absolute bottom-2 left-2 z-10 flex gap-1 md:hidden">
            <Button size="sm" variant="secondary" className="size-8 p-0" aria-label="Layers">
              <Layers className="size-4" aria-hidden />
            </Button>
            <Button size="sm" variant="secondary" className="size-8 p-0" aria-label="Locate me">
              <LocateFixed className="size-4" aria-hidden />
            </Button>
          </div>

          <div
            className={`absolute z-10 rounded-lg border border-zinc-200 bg-white/95 shadow-md backdrop-blur-sm ${
              expanded
                ? "bottom-3 right-3 w-[min(100%,15rem)] p-3"
                : "bottom-2 right-2 w-[min(calc(100%-1rem),11.5rem)] p-2 sm:bottom-3 sm:right-3"
            }`}
          >
            <p className="text-[10px] font-semibold uppercase tracking-wide text-zinc-500">Feature</p>
            <p className="mt-0.5 font-mono text-xs font-semibold text-primary">PAR-1092</p>
            <p className="mt-0.5 text-[11px] leading-snug text-zinc-600">Residential · Quezon City</p>
            {expanded ? (
              <div className="mt-2">
                <Button size="sm" variant="secondary" className="h-8 w-full text-xs">
                  Open detail
                </Button>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <footer className="flex shrink-0 items-center justify-between gap-2 border-t border-zinc-200 bg-zinc-50 px-2.5 py-1 text-[10px] leading-none text-zinc-500">
        <span className="min-w-0 truncate">MapLibre · react-map-gl · © OSM</span>
        <span className="shrink-0 font-mono tabular-nums text-zinc-600">z11 · EPSG:4326</span>
      </footer>
    </div>
  );
}
