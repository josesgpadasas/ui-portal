# System Design Portal

Interactive reference for **components**, **page layouts**, **icons** ([Lucide React](https://lucide.dev/icons/)), and **frontend conventions** used in new systems. Stack alignment follows `M:\sys_dev\personal\init_setup` (Next.js App Router, React, TypeScript, Tailwind CSS, TanStack Query, React Hook Form + Zod).

## Run locally

```powershell
cd M:\sys_dev\personal\sys_design\portal
npm install
npm run dev
```

Open **http://127.0.0.1:5176** (port **5176** — Init Setup portal uses 5175).

## Build

```powershell
npm run build
npm run preview
```

Static files in `dist/`.

## Quality

```powershell
npm run lint          # ESLint (React, a11y, TypeScript)
npm run format        # Prettier check
npm run test          # Vitest unit tests
npm run test:e2e      # Playwright visual smoke (starts dev server)
npm run test:e2e:update  # Refresh screenshot baselines
```

## Features

- **Copy paths** — component gallery lists portal → `frontend/src/components/ui/` targets
- **Token export** — download generated `design-tokens.css` and `tailwind-theme.json`
- **Dark tokens** — preview palette under Design tokens
- **Deep links** — URL hash tracks the active section (`#components`, etc.)
- **Dialog / Drawer** — portaled overlays shared by gallery and mobile nav

## Using in a new project

1. Copy primitives from this repo into `frontend/src/components/ui/` (or adopt shadcn/ui with the same tokens).
2. Mirror **feature folders** to API modules per `REFERENCE-ARCHITECTURE.md`.
3. Keep OpenAPI-generated clients in `frontend/src/lib/api/`.
