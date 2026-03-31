# Sprint #006 — Connectome Branding

> **Goal**: Rename all application-level identity tokens from "Surrealist" to **"Connectome"**.
> **Priority**: P0
> **Scope**: Component names, file names, UI labels, and entrypoint references.

---

## Task 1: Rename Startup Entrypoints

- **Action**: Rename `src/startup/surrealist.tsx` to `src/startup/connectome.tsx`.
- **Action**: Update `package.json` build scripts and `tauri.conf.json` to reference the new entrypoint.

## Task 2: Global Component & Logic Rename

- **Action**: Replace `Surrealist` (PascalCase) with `Connectome`.
- **Action**: Replace `surrealist` (lowercase) with `connectome`.
- **Exceptions**: Maintain `SurrealDB` references where they refer to the database spoke, but rename the *viewer* instances.

## Task 3: UI Label Refresh

- **Action**: Update all visible text strings that mention "Surrealist" to "Connectome".

---

## Definition of Done

- [ ] File `src/startup/connectome.tsx` exists and is the main entrypoint.
- [ ] Global search for "Surrealist" (case-insensitive) yields only legacy/vender results.
- [ ] `pnpm run build` succeeds.
- [ ] `tauri dev` launches with the new title.
