# Cortex DevTools — Phases & Feature Index

> **Status**: DRAFT | **Date**: 2026-03-27 | **Classification**: INTERNAL DEVTOOLS — Never public first release
> **Fork Source**: surrealdb/surrealist (React + Mantine + @xyflow/react + Tauri 2 + TanStack Query + Sigma.js + CodeMirror)

---

## Phase Plan

| Phase | Scope | Duration | Status |
|-------|-------|----------|--------|
| **0** | Foundation infrastructure (agents, skills, governance, docs) | Current | 🔄 In Progress |
| **1** | Shell + SurrealDB spoke (fork, strip, adapt) | 1-2 weeks | ⬜ Not Started |
| **2** | Qdrant spoke (collection browser, search playground) | 1-2 weeks | ⬜ Not Started |
| **3** | Pipeline editor — Configure mode (nodes, edges, properties) | 2-3 weeks | ⬜ Not Started |
| **4** | Pipeline editor — Observe + Debug modes | 2-3 weeks | ⬜ Not Started |
| **5** | RRO Inspector + Minion Monitor | 1-2 weeks | ⬜ Not Started |
| **6** | Learn mode + Terminology engine (100+ terms, familiarity) | 1-2 weeks | ⬜ Not Started |
| **7** | ColdLight migration (replace Mantine, ongoing) | Parallel | ⬜ Not Started |

---

## Phase Details

### Phase 0 — Foundation (Current)
- Agent & skill infrastructure (.agents/ directory)
- Governance registries at every major boundary
- Roadmap documentation (this directory)
- Build environment hardening
- Baseline biome/tsc audit

### Phase 1 — Shell + SurrealDB Spoke
- Fork Surrealist → Cortex DevTools identity
- Strip cloud/SaaS/marketing components
- Reorganize into hub+spokes directory structure
- SurrealDB spoke inherits ~80% of existing code
- Spoke router for tab-based spoke selection
- Teaching annotations on inherited SurrealDB features

### Phase 2 — Qdrant Spoke
- Collection browser component
- Point inspector component
- Search playground with step-by-step visualization
- `qdrant_search` Rust bridge command
- Teaching annotations per search step

### Phase 3 — Pipeline Configure Mode
- Node palette (30+ node types)
- Drag/drop canvas with @xyflow/react
- Edge connection with validation
- Properties panel per node type
- `pipeline_config` Rust bridge command
- Teaching annotations on every property

### Phase 4 — Pipeline Observe + Debug
- Node pulsing animation (observe)
- Edge particle animation (observe)
- Timing badges (observe)
- Breakpoint system (debug)
- Step-through execution (debug)
- I/O inspection panels (debug)
- `pipeline:progress`, `pipeline:node_active`, `pipeline:error` events

### Phase 5 — RRO Inspector + Minion Monitor
- Tri-graph view (entity → sentence → passage)
- Complexity heatmap
- Escalation log/timeline
- `rro_inspect` Rust bridge command
- `rro:escalated` event
- Minion dashboard (8 agents)
- Note stream
- `minion_status` command + `minion:note` event

### Phase 6 — Learn Mode + Terminology Engine
- Linear narrative restructuring of pipeline graph
- Chapter-based walkthrough (5 chapters)
- Term database (100+ terms, 3 levels each)
- Progressive familiarity tracking (IndexedDB)
- Cross-spoke term linking
- Searchable glossary page

### Phase 7 — ColdLight Migration (Parallel)
- Replace Mantine components with ColdLight design system
- Runs in parallel with other phases
- Component-by-component migration

---

## Feature Index

### P0 — Must-Have (13 features)

> [!NOTE]
> Source spec header says "P0 (12)" but enumerates 13 distinct features including RRO detail panel. We capture all enumerated features faithfully.

| # | Feature | Phase | Spoke |
|---|---------|-------|-------|
| 1 | Shell fork (identity, strip cloud) | 1 | Shell |
| 2 | Spoke router (tab-based navigation) | 1 | Shell |
| 3 | Terminology panel (inline term display) | 1 | Shared |
| 4 | SurrealDB query editor | 1 | SurrealDB |
| 5 | SurrealDB table explorer | 1 | SurrealDB |
| 6 | Qdrant collection browser | 2 | Qdrant |
| 7 | Qdrant search playground | 2 | Qdrant |
| 8 | Qdrant point inspector | 2 | Qdrant |
| 9 | Pipeline node palette | 3 | Pipeline |
| 10 | Pipeline configure mode | 3 | Pipeline |
| 11 | Pipeline observe mode | 4 | Pipeline |
| 12 | RRO detail panel | 5 | RRO |
| 13 | Rust bridge (invoke + events) | 3 | Shared |

### P1 — Should-Have (14 features)

> [!NOTE]
> Source spec header says "P1 (14)". Enumerating each "+" separated item as a distinct feature yields 15. We list all 15 faithfully; the count discrepancy is in the source and should be resolved in a parking lot discussion.

| # | Feature | Phase | Spoke |
|---|---------|-------|-------|
| 14 | Status bar (connection health) | 1 | Shell |
| 15 | SurrealDB schema designer | 1 | SurrealDB |
| 16 | SurrealDB graph viz | 1 | SurrealDB |
| 17 | SurrealDB teaching annotations | 1 | SurrealDB |
| 18 | Qdrant index monitor | 2 | Qdrant |
| 19 | Qdrant teaching annotations | 2 | Qdrant |
| 20 | RRO tri-graph view | 5 | RRO |
| 21 | RRO escalation log | 5 | RRO |
| 22 | Pipeline timing badges | 4 | Pipeline |
| 23 | Pipeline debug breakpoints | 4 | Pipeline |
| 24 | Pipeline step-through | 4 | Pipeline |
| 25 | Pipeline I/O inspection | 4 | Pipeline |
| 26 | Minion dashboard | 5 | Minions |
| 27 | Minion note stream | 5 | Minions |
| 28 | Terminology glossary + Rust context | 6 | Shared |

### P2 — Nice-to-Have (8 features)

> [!NOTE]
> Source spec header says "P2 (9)". Enumerating each item yields 7 from the source, +1 ColdLight migration we added = 8. The count discrepancy is in the source and should be resolved in a parking lot discussion.

| # | Feature | Phase | Spoke |
|---|---------|-------|-------|
| 29 | Qdrant embedding 2D viz (UMAP/t-SNE) | 2 | Qdrant |
| 30 | RRO complexity heatmap | 5 | RRO |
| 31 | RRO provenance chain | 5 | RRO |
| 32 | Pipeline learn mode narrative | 6 | Pipeline |
| 33 | Minion detail panel | 5 | Minions |
| 34 | Terminology familiarity tracking | 6 | Shared |
| 35 | Terminology cross-spoke linking | 6 | Shared |
| 36 | ColdLight component migration | 7 | Shell |

---

## Feature Count by Spoke

| Spoke | P0 | P1 | P2 | Total |
|-------|----|----|----|----|
| Shell | 2 | 1 | 1 | 4 |
| SurrealDB | 2 | 3 | 0 | 5 |
| Qdrant | 3 | 2 | 1 | 6 |
| Pipeline | 3 | 4 | 1 | 8 |
| RRO | 1 | 2 | 2 | 5 |
| Minions | 0 | 2 | 1 | 3 |
| Shared | 2 | 1 | 2 | 5 |
| **Total** | **13** | **15** | **8** | **36** |

---

## Source Spec Count Discrepancies (Parking Lot)

> [!WARNING]
> The source specification header counts (P0=12, P1=14, P2=9 → total 35) do not match the enumerated features when each "+" separated item is counted individually. Our faithful enumeration yields P0=13, P1=15, P2=8 → total 36 (including ColdLight migration). This discrepancy should be resolved in a parking lot discussion to confirm which items the source intended to group together.
