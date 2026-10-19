/** Cross-layer system mapping — extend per product; export as system-mapping.json in repos. */
export type SystemMappingRow = {
  id: string;
  domain: string;
  nestModule: string;
  openApiTag: string;
  apiBasePath: string;
  featureFolder: string;
  nextRoutes: string[];
  pageTemplates: ("list" | "detail" | "form" | "dashboard" | "settings" | "empty")[];
  navLabel?: string;
  lucideIcon?: string;
  entities: string[];
  notes?: string;
};

export const systemMappingTooling = {
  diagram: "Mermaid (architecture + traceability views)",
  registry: "system-mapping.json (versioned beside OpenAPI)",
  apiTruth: "OpenAPI 3.x tags + operationIds",
  codegen: "openapi-typescript / NestJS Swagger → frontend client",
  validation: "CI diff: mapping ids ↔ OpenAPI tags ↔ feature folder names",
} as const;

export const systemMappingPrinciples = [
  "One row per bounded context / API module — not per screen.",
  "featureFolder and nestModule use the same slug (kebab-case).",
  "OpenAPI tag must match nestModule display name or slug policy documented in the repo.",
  "Every authenticated nav item links to exactly one primary mapping row.",
  "Update mapping in the same PR that adds routes, modules, or tags.",
] as const;

/** Reference rows — replace with your product domains. */
export const systemMappingRows: SystemMappingRow[] = [
  {
    id: "submissions",
    domain: "Submissions",
    nestModule: "submissions",
    openApiTag: "Submissions",
    apiBasePath: "/api/v1/submissions",
    featureFolder: "frontend/src/features/submissions",
    nextRoutes: [
      "app/(authenticated)/submissions/page.tsx",
      "app/(authenticated)/submissions/[id]/page.tsx",
      "app/(authenticated)/submissions/new/page.tsx",
    ],
    pageTemplates: ["list", "detail", "form"],
    navLabel: "Submissions",
    lucideIcon: "Inbox",
    entities: ["Submission", "SubmissionStatus", "Attachment"],
    notes: "Primary work queue; list filters sync to URL searchParams.",
  },
  {
    id: "identity",
    domain: "Identity",
    nestModule: "identity",
    openApiTag: "Identity",
    apiBasePath: "/api/v1/users",
    featureFolder: "frontend/src/features/identity",
    nextRoutes: ["app/(authenticated)/settings/profile/page.tsx"],
    pageTemplates: ["form", "settings"],
    navLabel: "Profile",
    lucideIcon: "User",
    entities: ["User", "Role", "Organization"],
    notes: "OIDC claims for display name; admin user APIs optional.",
  },
  {
    id: "reports",
    domain: "Reports",
    nestModule: "reports",
    openApiTag: "Reports",
    apiBasePath: "/api/v1/reports",
    featureFolder: "frontend/src/features/reports",
    nextRoutes: ["app/(authenticated)/reports/page.tsx"],
    pageTemplates: ["dashboard", "list"],
    navLabel: "Reports",
    lucideIcon: "BarChart3",
    entities: ["ReportDefinition", "ExportJob"],
  },
  {
    id: "platform",
    domain: "Platform",
    nestModule: "platform",
    openApiTag: "Platform",
    apiBasePath: "/api/v1/settings",
    featureFolder: "frontend/src/features/platform",
    nextRoutes: ["app/(authenticated)/settings/[section]/page.tsx"],
    pageTemplates: ["settings"],
    navLabel: "Settings",
    lucideIcon: "Settings",
    entities: ["TenantPreference", "FeatureFlag"],
  },
];

export function buildSystemMappingMermaid(rows: SystemMappingRow[]) {
  const lines = [
    "flowchart LR",
    "  openapi[[OpenAPI spec]]",
    "  nest[NestJS modules]",
    "  client[Generated API client]",
    "  features[feature folders]",
    "  routes[Next.js routes]",
    "  ui[App shell nav]",
    "  openapi --> nest",
    "  openapi --> client",
    "  client --> features",
    "  features --> routes",
    "  routes --> ui",
  ];
  for (const row of rows) {
    const node = row.id.replace(/-/g, "_");
    lines.push(`  ${node}[${row.domain}]`);
    lines.push(`  nest --> ${node}`);
    lines.push(`  ${node} --> features`);
  }
  return lines.join("\n");
}
