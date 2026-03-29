# Sprint #004 — Core Shell Migration (Phase 1)

> **Goal**: Migrate the root application component, window chrome, and global configuration stores from the legacy flat structure into the strict `src/shell/` boundary.
> **Source**: `docs/roadmap/clyffy/architecture.md`
> **Priority**: P0
> **Scope**: Moving `App/`, `AppTitleBar/`, and Core Stores. Fixing broken imports.

---

## Technical Context

We are moving the "Hub" (the root shell) into its governed boundary. Since we are moving folders one level deeper (e.g., `src/components/App` → `src/shell/components/App`), any relative imports that point **up** and **out** of the moved folder (e.g., `../Scaffold` or `../../Spacer`) will break. To fix this, we will systematically replace those fragile relative paths with the absolute alias `~/components/...`.

---

## Task 1: Move Core Stores to Shell

#### Shell Stores
- **Action**: Move `src/stores/config.tsx` to `src/shell/stores/config.tsx`.
- **Action**: Move `src/stores/interface.tsx` to `src/shell/stores/interface.tsx`.
- **Rationale**: These stores manage the global app configuration and window layouts. They belong to the Hub. Because they strictly use `~/` absolute imports internally, moving them is perfectly safe.

---

## Task 2: Move App & AppTitleBar to Shell

#### Shell Components
- **Action**: Move `src/components/App/` directory to `src/shell/components/App/`.
- **Action**: Move `src/components/AppTitleBar/` directory to `src/shell/components/AppTitleBar/`.

---

## Task 3: Repair `App` Imports

#### `src/shell/components/App/index.tsx`
- **Current code**: `import { Scaffold } from "../Scaffold";`
- **Target code**: `import { Scaffold } from "~/components/Scaffold";`
- **Action**: Find all files inside the newly moved `src/shell/components/App/` directory that import `../` and replace them with `~/components/`.

---

## Task 4: Repair `AppTitleBar` Imports

#### `src/shell/components/AppTitleBar/index.tsx`
- **Current code**:
  ```tsx
  import { ActionButton } from "../ActionButton";
  import { getMenuItems } from "../App/hooks/menu";
  import { Spacer } from "../Spacer";
  ```
- **Target code**:
  ```tsx
  import { ActionButton } from "~/components/ActionButton";
  import { getMenuItems } from "~/shell/components/App/hooks/menu";
  import { Spacer } from "~/components/Spacer";
  ```

---

## Task 5: Remap the Mount Entrypoint

#### `src/startup/surrealist.tsx`
- **Current code**:
  ```tsx
  import { App } from "../components/App";
  ```
- **Target code**:
  ```tsx
  import { App } from "~/shell/components/App";
  ```
- **Action**: Search and replace any other occurrences of `~/stores/config` with `~/shell/stores/config` globally. Search and replace `~/stores/interface` with `~/shell/stores/interface` globally.

---

## Definition of Done

- [ ] Core stores moved to `src/shell/stores/`
- [ ] `App` and `AppTitleBar` moved to `src/shell/components/`
- [ ] Broken relative imports repaired to use `~/` absolute paths
- [ ] Global imports to `~/stores/config` and `~/stores/interface` successfully updated
- [ ] `pnpm run build` cleanly passes (0 regressions).
- [ ] `npx tsc --noEmit` cleanly passes.
