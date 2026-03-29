# Sprint #003 — Architecture Scaffolding (Phase 1)

> **Goal**: Establish the strict filesystem boundaries for the Hub & Spokes architecture without moving any executable code yet.
> **Source**: `docs/roadmap/clyffy/architecture.md`
> **Priority**: P0
> **Scope**: Directories and Governance files only. Zero source code changes.

---

## Why

As a senior developer establishing a foundation, you **never** move code before the target boundaries exist. If we move code now, imports break randomly. By creating the directories and their respective `GOVERNANCE.md` files first, we lay the contractual groundwork. Every subsequent sprint will move files *into* these pre-governed buckets.

---

## Task 1: Create the Hub Directory (Shell)

#### `src/shell/`
- **Action**: Create the `src/shell/` directory.
- **Action**: Create `src/shell/GOVERNANCE.md`
- **Content required in Governance**:
  - Scope: The Tauri app window, global state, titlebars, and Spoke Router.
  - Rules: Shell can import from `src/shared/`. Shell CANNOT import from `src/spokes/` (it dynamic-imports them or renders their exposed `Root.tsx`).

---

## Task 2: Create the Shared Foundation Directory

#### `src/shared/`
- **Action**: Create the `src/shared/` directory.
- **Action**: Create `src/shared/GOVERNANCE.md`
- **Content required in Governance**:
  - Scope: Universal utilities, theme configs, cross-spoke generic UI components (like `CodeEditor`).
  - Rules: Shared code CANNOT import from `src/shell/`. Shared code CANNOT import from `src/spokes/`. It must be completely independent.

---

## Task 3: Create the Spokes Directory

#### `src/spokes/`
- **Action**: Create the `src/spokes/` directory.
- **Action**: Create the `src/spokes/surrealdb/` directory.
- **Action**: Create `src/spokes/surrealdb/GOVERNANCE.md`
- **Content required in Governance**:
  - Scope: All legacy Surrealist query playground logic.
  - Rules: SurrealDB spoke can import from `src/shared/`. It CANNOT import from `src/shell/` or any other spoke.

---

## Task 4: Prevent TypeScript/Vite Regressions

#### `tsconfig.json` & `vite.config.ts`
- **Action**: Verify that the `~/` path alias maps safely to `src/`.
- **Rationale**: Since `~/` maps to `src/`, moving files into `src/shell/` means their imports will just change from `~/components/` to `~/shell/components/`. We must explicitly confirm aliases are properly rooted before moving files in Sprint #004.

---

## Definition of Done (Rigorous Checklist)

- [ ] Directory `src/shell/` exists.
- [ ] Directory `src/shared/` exists.
- [ ] Directory `src/spokes/` exists.
- [ ] Directory `src/spokes/surrealdb/` exists.
- [ ] `src/shell/GOVERNANCE.md` is populated with strict import rules.
- [ ] `src/shared/GOVERNANCE.md` is populated with strict import rules.
- [ ] `src/spokes/surrealdb/GOVERNANCE.md` is populated with strict import rules.
- [ ] `pnpm run build` completely passes (0 regressions introduced by empty folders).
- [ ] `npx tsc --noEmit` completely passes.
- [ ] `npx @biomejs/biome check .` completely passes.
