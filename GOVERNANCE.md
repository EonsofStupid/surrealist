# GOVERNANCE REGISTRY — Cortex DevTools (Root)

> **Status**: ACTIVE | **Date**: 2026-03-27 | **Classification**: INTERNAL DEVTOOLS

---

## Ownership & Identity

| Property | Value |
|----------|-------|
| **Project** | Cortex DevTools |
| **Owner** | Jesse Hall (Hades) |
| **Platform** | DevPulse.App |
| **AI Product** | Clyffy.ai — The AI managed by this devtool |
| **Data Architecture** | RROFlow.ai — Reasoning Ready Object pipeline |
| **Fork Source** | surrealdb/surrealist |
| **Classification** | INTERNAL DEVTOOLS — Never public first release |
| **Purpose** | Visual IDE, live observatory, step debugger, and classroom for Clyffy's MAESTRO pipeline |

### Brand Network

| Brand | Role |
|-------|------|
| **DevPulse.App** | Platform — the parent app ecosystem |
| **Clyffy.ai** | The AI — this devtool exists to manage, observe, debug, and teach Clyffy's internals |
| **RROFlow.ai** | Data architecture — Reasoning Ready Objects, the knowledge pipeline |
| **Effing.ai Network** | Developer network |
| **AngryVibes Network** | Community network |

### What This Tool IS

Cortex DevTools is the control plane for the **Cortex engine**. It is simultaneously:

1. **Visual IDE** — Configure pipelines, design schemas, manage collections
2. **Live Observatory** — Watch data flow through every node in real time
3. **Step Debugger** — Set breakpoints, inspect I/O, find problems
4. **Classroom** — Learn what each subsystem does in industry-standard terminology

**User #1**: Jesse (you) — building MAESTRO, needs to see everything working
**User #2**: Future junior developers — need to inherit this codebase and understand it

### White-Label Architecture

> **Cortex is NOT just a product name.** It is the white-label AI infrastructure layer — the nucleus/brain that powers everything.

| Layer | What It Is | Example |
|-------|-----------|---------|
| **Cortex** | The infrastructure — RRO pipeline, CAG, RAG, model orchestration, Tauri IPC bridge | The engine under the hood |
| **Clyffy** | The branded AI product that Cortex powers — personality, conversations, learning | Jesse's AI, built on Cortex |
| **MAESTRO** | The pipeline architecture that Cortex implements | The blueprint Cortex follows |
| **DevPulse** | The developer platform that hosts all of this | The parent ecosystem |

Cortex DevTools is "the devtool for the Cortex engine." If someone else builds a different AI brand on Cortex, this same devtool manages their pipeline too. The `cortex://` deep link scheme reflects this — it belongs to the infrastructure layer, not any specific brand.

---

## Agent Workflow Protocol

All changes to this codebase follow the **Parking Lot → Sprint → Author → Verify** pipeline:

1. **Parking Lot** — Conflicts, design decisions, ambiguity enter here first. Discussed, not solved. Multiple options presented. See `.agents/skills/parking-lot/SKILL.md`
2. **Sprint** — Committed decisions from parking lot become sprint tasks. Tasks are written verbatim against existing source code. See `.agents/skills/sprint-authoring/SKILL.md`
3. **Author** — Code is written per sprint tasks. COSTAR compliance enforced. Import safety rules apply. See `.agents/skills/costar-compliance/SKILL.md` and `.agents/skills/import-safety/SKILL.md`
4. **Verify** — Biome checks, tsc checks, all warnings addressed. False positives documented here. See `.agents/skills/verification/SKILL.md`

---

## Biome Rule Overrides (Acknowledged)

The following Biome rules are intentionally disabled in `biome.json`. Each has been reviewed and acknowledged in this governance registry rather than silently re-enabled.

| Rule | Status | Rationale |
|------|--------|-----------|
| `a11y/useSemanticElements` | `off` | Desktop app — not a public web page. Devtool UI uses custom components extensively. |
| `suspicious/noExplicitAny` | `off` | Inherited from Surrealist. Parking lot item — should be progressively tightened as we refactor. |
| `suspicious/noThenProperty` | `off` | SurrealDB SDK uses `.then` patterns on result objects. Cannot remove without breaking SDK usage. |
| `suspicious/noMisleadingCharacterClass` | `off` | Inherited. Used in SurrealQL regex patterns. |
| `suspicious/noArrayIndexKey` | `off` | Inherited. Used in list rendering where items lack stable IDs. Should be revisited per-component. |
| `style/noUnusedTemplateLiteral` | `off` | The `urql` schema parser triggers this. |
| `style/useImportType` | `off` | Inherited. TypeScript `import type` enforcement conflicts with some patterns. |
| `correctness/noUnusedImports` | `warn` | Warning, not error. Subject to Import Safety Skill rules — unused imports are NOT removed until source is verified to exist. |

---

## Baseline Audit

> **Date**: 2026-03-28

The initial fork was validated for build stability and baseline lint status:
- **Package Manager Migration**: Migrated to `pnpm` (with strictly local `store-dir` and `node-linker=hoisted`) due to Windows bundling failure with `bun`.
- **Inherited Fixes**: Resolved TS2322 block in `src/util/mantine.tsx`.
- **Biome Baseline**: 1,108 formatting errors autofixed. 0 runtime/logic warnings remaining.
- **TypeScript Baseline**: `tsc --noEmit` cleanly passes with 0 errors.
- **Tauri Build**: `pnpm run build` succeeds cleanly.

The codebase starts entirely green for Phase 1.

---

## False Positive Registry (Global)

| ID | File | Rule | Reason | Date |
|----|------|------|--------|------|
| _No entries yet. Entries are added after verification confirms a warning is a false positive._ | | | | |

---

## Boundary Governance Index

| Boundary | File | Scope |
|----------|------|-------|
| Root (this file) | `GOVERNANCE.md` | Project identity, agent protocol, biome overrides, global false positives |
| Frontend | `src/GOVERNANCE.md` | Component naming, store patterns, import safety |
| Backend | `src-tauri/GOVERNANCE.md` | Cargo deps, Tauri plugins, Rust lint exceptions |
| Components | `src/components/GOVERNANCE.md` | Folder structure, props naming, re-exports |
| Stores | `src/stores/GOVERNANCE.md` | Zustand patterns, state shape, cross-store deps |
| Screens | `src/screens/GOVERNANCE.md` | View registration, routing, terminology |

---

## Terminology

This project uses **platform-aligned terminology**. See `docs/roadmap/clyffy/terminology-engine.md` for the full glossary and progressive disclosure system.

Key terms used in governance:
- **Spoke** — A hypermodular feature directory under `src/spokes/` (future structure)
- **Hub/Shell** — The Tauri desktop shell that hosts all spokes
- **Bridge** — Tauri IPC layer between React frontend and Rust backend
- **SSOT** — Single Source of Truth (e.g., pipeline config is SSOT, visual graph is projection)
- **COSTAR** — Context, Objective, Style, Tone, Audience, Response — the framework for completeness
