import { systemMappingRows, type SystemMappingRow } from "../data/systemMapping";
import { downloadTextFile } from "./tokenExport";

export type SystemMappingFile = {
  $comment: string;
  version: number;
  updated: string;
  openapiSpec: string;
  rows: SystemMappingRow[];
};

export function buildSystemMappingJson(rows: SystemMappingRow[] = systemMappingRows) {
  const payload: SystemMappingFile = {
    $comment: "Traceability registry: API modules, OpenAPI tags, frontend features, routes, and nav.",
    version: 1,
    updated: new Date().toISOString().slice(0, 10),
    openapiSpec: "backend/openapi.yaml",
    rows,
  };
  return JSON.stringify(payload, null, 2);
}

export function downloadSystemMappingTemplate() {
  downloadTextFile("system-mapping.template.json", buildSystemMappingJson(), "application/json");
}
