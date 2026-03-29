# Parking Lot Item #001 — Rebrand & Restructure Surrealist → Cortex DevTools

> **Status**: COMMITTED | **Date**: 2026-03-27 | **Committed**: 2026-03-27
> **Source**: Roadmap Phase 1 — `docs/roadmap/clyffy/phases.md`

---

## What

Fork the Surrealist identity to Cortex DevTools and restructure the codebase from its current flat layout into the hub+spokes architecture defined in `docs/roadmap/clyffy/architecture.md`.

## Where

Every file listed in the branding touchpoints table below, plus the entire `src/` directory structure.

## Why

This is the foundational change that transforms this from "Surrealist with some edits" into "Cortex DevTools — a purpose-built devtool for managing Clyffy." Without this, every future sprint will be fighting the wrong identity and wrong directory structure.

## Context

- Full architecture spec: `docs/roadmap/clyffy/architecture.md`
- Store triage: `src/stores/GOVERNANCE.md`
- Screen/view triage: `src/screens/GOVERNANCE.md`
- Component triage: `src/components/GOVERNANCE.md`

---

## Branding Touchpoints

| File | Field | Current Value | Target Value |
|------|-------|--------------|--------------|
| `package.json` | `name` | `surrealist` | `cortex-devtools` |
| `package.json` | `authors` | `["SurrealDB"]` | `["DevPulse / Jesse Hall"]` |
| `tauri.conf.json` | `productName` | `Surrealist` | `Cortex DevTools` |
| `tauri.conf.json` | `identifier` | `com.surrealdb.surrealist` | `app.devpulse.cortex` |
| `tauri.conf.json` | `deep-link.schemes` | `["surrealist"]` | `["cortex"]` |
| `tauri.conf.json` | `updater.endpoints` | `["https://app.surrealdb.com/latest.json"]` | `["https://updates.devpulse.app/cortex/latest.json"]` |
| `Cargo.toml` | `name` | `surrealist` | `cortex-devtools` |
| `Cargo.toml` | `description` | `Powerful graphical SurrealDB...` | `Cortex DevTools — Visual IDE for the MAESTRO pipeline` |
| `Cargo.toml` | `authors` | `["SurrealDB"]` | `["DevPulse / Jesse Hall"]` |
| `Cargo.toml` | `repository` | `surrealdb/surrealist` | `EonsofStupid/surrealist` |
| `index.html` | `<title>` | `Surrealist` | `Cortex DevTools` |
| `vite.config.ts` | `GTM_ID` | `G-PVD8NEJ3Z2` | Remove (internal tool, no analytics) |

---

## Committed Decisions

### A1: Deep Link Scheme → `cortex://`

**Rationale**: Cortex is the **white-label infrastructure layer** — the nucleus/brain wrapper for AI. It is the platform that drives RRO, CAG, RAG, and all the intelligence pipeline. Clyffy is the branded product built ON TOP of Cortex. The deep link scheme belongs to the infrastructure layer, not the brand layer. Other AI products could be built on Cortex in the future — `cortex://` stays correct for all of them.

### B2: Directory Restructure → Incremental (view-by-view)

**Rationale**: Create `src/spokes/`, `src/shared/`, `src/shell/` scaffolding first, then move code view-by-view over Phase 1-2. This keeps the app buildable and runnable at every step. No big-bang risk.

### C2: Updater Endpoint → DevPulse domain

**Rationale**: Set up a proper endpoint at `updates.devpulse.app/cortex/latest.json`. This is an internal devtool but should still have a proper update channel for Jesse's workflow. The endpoint can be a simple static JSON file initially.

---

## White-Label Context

> **Cortex is NOT just a product name.** It is the white-label AI infrastructure layer — the nucleus/brain that powers everything. Think of it as the engine under the hood.
>
> - **Cortex** = the infrastructure (RRO pipeline, CAG, RAG, model orchestration, Tauri IPC bridge)
> - **Clyffy** = the branded AI product that Cortex powers (personality, conversations, learning)
> - **MAESTRO** = the pipeline architecture that Cortex implements
> - **DevPulse** = the developer platform that hosts all of this
>
> This means Cortex DevTools is not "Clyffy's devtool" — it is "the devtool for the Cortex engine that happens to power Clyffy." If someone else builds a different AI brand on Cortex, this same devtool manages their pipeline too.

