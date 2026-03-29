# Sprint #002 — Windows Portability (Bun → PNPM)

> **Goal**: Migrate the package manager from Bun to PNPM and establish a strictly local, symlink-free dependency store for Windows build reliability.
> **Source**: Windows build failure on `tsc && vite build` via Bun
> **Priority**: P0
> **Scope**: Package manager configs, NPM scripts, and Tauri build commands

---

## Technical Context

Windows file systems and Tauri native bundlers struggle with deeply nested symlinked `node_modules` and the `bun` binary pathing. By moving to `pnpm` with `node-linker=hoisted` and a localized `store-dir`, we force a flat, standard `node_modules` directory with the cache fully living inside the project repo. This guarantees 100% portability and unblocks the Tauri build pipeline.

---

## Task 1: Establish Local PNPM Config

#### `.npmrc`
- **Current code**: _File does not exist_
- **Target code**:
  ```ini
  node-linker=hoisted
  store-dir=.pnpm-store
  ```
- **Rationale**: Forces a standard, flat `node_modules` (avoiding Windows symlink limits) and caches all downloaded tarballs inside the project directory for true portability.

---

## Task 2: Standardize `package.json`

#### `package.json`
- **Lines**: 18, 146
- **Current code**:
  ```json
  		"start": "bun run dev",
  ```
  ```json
  	"packageManager": "bun@1.2.8",
  ```
- **Target code**:
  ```json
  		"start": "pnpm run dev",
  ```
  ```json
  	"packageManager": "pnpm@9.15.4",
  ```
- **Rationale**: Formally register PNPM as the engine and update the start script.

---

## Task 3: Update Tauri Build Commands

#### `src-tauri/tauri.conf.json`
- **Lines**: 6-7
- **Current code**:
  ```json
  		"beforeDevCommand": "bun run dev",
  		"beforeBuildCommand": "bun run build",
  ```
- **Target code**:
  ```json
  		"beforeDevCommand": "pnpm run dev",
  		"beforeBuildCommand": "pnpm run build",
  ```
- **Rationale**: Tauri uses these hooks to compile the React frontend before bundling the Rust binary. They must use the correct package manager.

---

## Task 4: Update Documentation & Workflows

#### `docs/roadmap/clyffy/architecture.md`
- **Lines**: 147
- **Current code**:
  ```markdown
  | Package Manager | bun | 1.2.8 | Inherited |
  ```
- **Target code**:
  ```markdown
  | Package Manager | pnpm | 9.15.4 | Migrated |
  ```

#### `.agents/workflows/baseline-check.md`
- **Lines**: 11-13
- **Current code**:
  ```bash
  // turbo
  ```
  bun install
  ```
  ```
- **Target code**:
  ```bash
  // turbo
  ```
  pnpm install
  ```
  ```
- **Rationale**: Keeping governance, workflows, and roadmap docs synchronized with the tech stack.

---

## Definition of Done

- [ ] All 4 tasks executed verbatim
- [ ] `.npmrc` created and configured
- [ ] `bun.lock` (if exists) deleted
- [ ] `pnpm install` successfully downloads to `.pnpm-store` and builds `node_modules`
- [ ] `pnpm run build` succeeds locally on Windows
