# Sprint #006 — Connectome Branding

> **Goal**: Rename all application-level identity tokens from "Connectome" to **"Connectome"**.
> **Priority**: P0
> **Scope**: Component names, file names, UI labels, and entrypoint references.

---

## Task 1: Rename Startup Entrypoints

- **Action**: Rename `src/startup/connectome.tsx` to `src/startup/connectome.tsx`.
- **Action**: Update `package.json` build scripts and `tauri.conf.json` to reference the new entrypoint.

## Task 2: Global Component & Logic Rename

- **Action**: Replace `Connectome` (PascalCase) with `Connectome`.
- **Action**: Replace `connectome` (lowercase) with `connectome`.
- **Exceptions**: Maintain `RRFlow` references where they refer to the database spoke, but rename the *viewer* instances.

## Task 3: UI Label Refresh

- **Action**: Update all visible text strings that mention "Connectome" to "Connectome".

---

## Definition of Done

- [ ] File `src/startup/connectome.tsx` exists and is the main entrypoint.
- [ ] Global search for "Connectome" (case-insensitive) yields only legacy/vender results.
- [ ] `pnpm run build` succeeds.
- [ ] `tauri dev` launches with the new title.
