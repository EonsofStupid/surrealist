# GOVERNANCE REGISTRY — Components (src/components/)

> **Boundary**: `src/components/` | **Date**: 2026-03-27

---

## Scope

Governs the 63 shared component directories currently under `src/components/`. In Phase 1, these will be triaged: some move to `src/shell/components/`, some to `src/shared/components/`, some to spoke-specific `components/` directories.

## Component Folder Structure

Every component follows this pattern:
```
ComponentName/
├── index.tsx           # Main component + exports
├── style.module.scss   # Scoped SCSS module (if needed)
└── helpers.tsx         # Helper functions (if needed)
```

## Props Interface Naming

- Props interfaces: `{ComponentName}Props`
- Example: `CodeEditorProps`, `DataTableProps`
- Props are defined in the same file as the component unless shared

## Re-export Rules

- Each component's `index.tsx` is the single entry point
- Parent directories do NOT have barrel `index.ts` files (flat imports from component path)
- Import pattern: `import { ComponentName } from "~/components/ComponentName"`

## Current Component Inventory (63)

Inherited from Surrealist. Full list in `src/components/` directory. Key components for retention:

| Component | Spoke Destination | Notes |
|-----------|------------------|-------|
| CodeEditor | Shared | Used by SurrealDB + Pipeline spokes |
| DataTable | Shared | Used across multiple spokes |
| RelationGraph | Shared | Used by SurrealDB + RRO spokes |
| Sidekick | Shell | AI assistant panel (→ Clyffy integration) |
| App | Shell | Root application component |
| AppTitleBar | Shell | Tauri window titlebar |

## False Positive Registry

| ID | File | Rule | Reason | Date |
|----|------|------|--------|------|
| _No entries yet_ | | | | |
