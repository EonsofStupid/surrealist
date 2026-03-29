# Cortex DevTools — Architecture

> **Status**: DRAFT | **Date**: 2026-03-27 | **Classification**: INTERNAL DEVTOOLS — Never public first release
> **Fork Source**: surrealdb/surrealist (React + Mantine + @xyflow/react + Tauri 2 + TanStack Query + Sigma.js + CodeMirror)

---

## Hub + Spokes Model

```
┌─────────────────────────────────────────────────────────┐
│                     SHELL (Hub)                         │
│  Tauri 2 desktop shell, tab/panel mgmt, CodeMirror,    │
│  @xyflow/react, Sigma.js, TanStack Query, feature flags│
├─────────┬──────────┬──────────┬──────────┬──────────────┤
│ SurrealDB│  Qdrant  │   RRO    │ Pipeline │   Minions   │
│  Spoke   │  Spoke   │  Spoke   │  Spoke   │   Spoke     │
└─────────┴──────────┴──────────┴──────────┴──────────────┘
        ▲                  ▲                  ▲
        │     shared/bridge/ (Tauri IPC)      │
        │     shared/ stores (Zustand)        │
        ▼                  ▼                  ▼
┌─────────────────────────────────────────────────────────┐
│                   RUST BRIDGE                           │
│  src-tauri/src/ — Tauri commands + event emitters       │
└─────────────────────────────────────────────────────────┘
```

---

## Directory Structure

```
src/
├── shared/                         # Shared utilities, types, bridge
│   ├── bridge/                     # Tauri IPC abstraction layer
│   ├── components/                 # Shared Mantine components
│   ├── hooks/                      # Shared React hooks
│   ├── stores/                     # Shared Zustand stores
│   ├── types/                      # Shared TypeScript types
│   ├── terminology/                # Terminology engine (cross-spoke)
│   └── GOVERNANCE.md
├── spokes/
│   ├── surrealdb/                  # ~80% inherited from Surrealist
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── stores/
│   │   ├── types/
│   │   ├── terminology/            # Spoke-specific term overrides
│   │   ├── index.ts                # Barrel export
│   │   ├── Root.tsx                # Spoke root component
│   │   └── GOVERNANCE.md
│   ├── qdrant/                     # Built new
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── stores/
│   │   ├── types/
│   │   ├── terminology/            # Spoke-specific term overrides
│   │   ├── index.ts
│   │   ├── Root.tsx
│   │   └── GOVERNANCE.md
│   ├── rro/                        # Built new
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── stores/
│   │   ├── types/
│   │   ├── terminology/            # Spoke-specific term overrides
│   │   ├── index.ts
│   │   ├── Root.tsx
│   │   └── GOVERNANCE.md
│   ├── pipeline/                   # @xyflow/react canvas, all new logic
│   │   ├── components/
│   │   ├── nodes/                  # 30+ custom node type components
│   │   ├── edges/                  # Custom edge renderers
│   │   ├── modes/                  # configure/, observe/, debug/, learn/
│   │   ├── hooks/
│   │   ├── stores/
│   │   ├── types/
│   │   ├── terminology/            # Spoke-specific term overrides
│   │   ├── index.ts
│   │   ├── Root.tsx
│   │   └── GOVERNANCE.md
│   └── minions/                    # Built new
│       ├── components/
│       ├── hooks/
│       ├── stores/
│       ├── types/
│       ├── terminology/            # Spoke-specific term overrides
│       ├── index.ts
│       ├── Root.tsx
│       └── GOVERNANCE.md
└── shell/                          # Forked Surrealist shell (Hub)
    ├── components/                 # Shell-level chrome (titlebar, tabs, sidebar)
    ├── router/                     # Spoke router
    ├── stores/                     # Shell-level stores
    ├── startup/                    # App initialization
    └── GOVERNANCE.md
```

---

## Spoke Isolation Rules

1. **A spoke imports from `shared/` and itself ONLY** — never from another spoke
2. Cross-spoke communication goes through `shared/bridge/` (Tauri IPC) or shared Zustand stores in `shared/stores/`
3. Each spoke has its own `GOVERNANCE.md` registry
4. Each spoke has its own `components/`, `hooks/`, `stores/`, `types/`
5. Each spoke exports a single `Root.tsx` component and a barrel `index.ts`
6. The shell's spoke router mounts each spoke's `Root.tsx` by active tab selection

---

## Rust Bridge — Tauri IPC

### Commands (React → Rust)

| Command | Spoke | Purpose |
|---------|-------|---------|
| `surreal_query` | SurrealDB | Execute SurrealQL query against connected instance |
| `qdrant_search` | Qdrant | Run vector search against Qdrant collection |
| `rro_inspect` | RRO | Inspect RRO structure and complexity scores |
| `pipeline_config` | Pipeline | Read/write pipeline node configuration |
| `pipeline_step` | Pipeline | Step-through in debug mode |
| `minion_status` | Minions | Get current status of all 8 minion agents |

### Events (Rust → React)

| Event | Spoke | Purpose |
|-------|-------|---------|
| `pipeline:progress` | Pipeline | Overall pipeline execution progress |
| `pipeline:node_active` | Pipeline | A specific node is currently processing |
| `pipeline:error` | Pipeline | Error occurred at a specific node |
| `minion:note` | Minions | A minion agent emitted a note/observation |
| `rro:escalated` | RRO | A query escalated from Qdrant to SurrealDB graph |

---

## Technology Stack (Inherited + New)

| Layer | Technology | Version | Source |
|-------|-----------|---------|--------|
| Runtime | Tauri 2 | 2.4.0 | Inherited |
| Frontend Framework | React | 18.2.0 | Inherited |
| Build Tool | Vite | 5.4.15 | Inherited |
| UI Library | Mantine | 8.3.14 | Inherited (→ ColdLight Phase 7) |
| Node Graph | @xyflow/react | 12.6.3 | Inherited |
| Network Graph | Sigma.js + Graphology | 3.0.0 / 0.25.4 | Inherited |
| Code Editor | CodeMirror 6 | 6.x | Inherited |
| Server State | TanStack Query | 5.37.1 | Inherited |
| Client State | Zustand + Immer | 4.5.0 / 10.0.2 | Inherited |
| Validation | Valibot | 1.2.0 | Inherited |
| Linter/Formatter | Biome | 2.1.2 | Inherited |
| Package Manager | pnpm | 9.15.4 | Migrated |
| Backend | Rust (Tauri) | 2021 edition | Inherited |
| TypeScript | strict mode | 5.1.6+ | Inherited |
