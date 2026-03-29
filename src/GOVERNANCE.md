# GOVERNANCE REGISTRY — Frontend (src/)

> **Boundary**: `src/` | **Date**: 2026-03-27

---

## Scope

This governance file covers the entire `src/` directory — all frontend TypeScript/React code. In Phase 1, when the directory restructures into `src/shell/`, `src/shared/`, and `src/spokes/`, this file migrates and each new boundary gets its own `GOVERNANCE.md`.

## Component Naming Conventions

- Components use PascalCase directory names (e.g., `CodeEditor/`, `DataTable/`)
- Each component directory contains an `index.tsx` entry point
- SCSS modules use `.module.scss` suffix (e.g., `style.module.scss`)
- Props interfaces are named `{ComponentName}Props`

## Store Patterns

- State management uses Zustand with Immer (`use-immer`)
- Store files are named `{domain}.tsx` (e.g., `config.tsx`, `database.tsx`)
- Stores export both the store hook and selector hooks

## Import Safety Rules

Per the Import Safety Skill (`.agents/skills/import-safety/SKILL.md`):

- Unused imports are NOT auto-deleted
- Each unused import is triaged individually
- 9/10 rule applies: assume unfinished work until proven otherwise

## Path Alias

- `~/` maps to `./src/` (configured in `tsconfig.json` and `vite.config.ts`)
- All imports within `src/` should use the `~/` alias

## False Positive Registry

| ID | File | Rule | Reason | Date |
|----|------|------|--------|------|
| _No entries yet_ | | | | |
