# GOVERNANCE REGISTRY — Stores (src/stores/)

> **Boundary**: `src/stores/` | **Date**: 2026-03-27

---

## Scope

Governs the 7 Zustand state stores. In Phase 1, stores will be triaged: some move to `src/shell/stores/`, some to `src/shared/stores/`, some to spoke-specific `stores/` directories.

## Current Store Inventory

| Store | File | Purpose | Phase 1 Destination |
|-------|------|---------|-------------------|
| Cloud | `cloud.tsx` | Surreal Cloud state | STRIP (not needed) |
| Config | `config.tsx` | App configuration | Shell |
| Database | `database.tsx` | SurrealDB connection state | SurrealDB spoke |
| Deploy | `deploy.tsx` | Cloud deployment state | STRIP (not needed) |
| Interface | `interface.tsx` | UI layout/panel state | Shell |
| Query | `query.tsx` | Active query state | SurrealDB spoke |
| Sidekick | `sidekick.tsx` | AI assistant state | Shell (→ Clyffy) |

## Zustand Store Pattern

```typescript
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface StoreState {
  // State shape
}

export const useStoreName = create<StoreState>()(
  immer((set, get) => ({
    // Initial state + actions
  }))
);
```

## Cross-Store Dependencies

- Stores should minimize cross-references
- When a store needs data from another store, use `get()` from within actions
- After Phase 1 restructure: cross-spoke store access goes through `src/shared/stores/` only

## False Positive Registry

| ID | File | Rule | Reason | Date |
|----|------|------|--------|------|
| _No entries yet_ | | | | |
