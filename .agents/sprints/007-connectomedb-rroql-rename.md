# Sprint #007 — ConnectomeDB + rroQL Identity Rename (Phase 1)

> **Goal**: Replace all user-visible "SurrealDB" → "ConnectomeDB" and "SurrealQL" → "rroQL" strings across the codebase. Rename spoke directory. Leave npm package imports intact.
> **Source**: Parking lot #002 (COMMITTED)
> **Priority**: P0

---

## Task 1: Package & HTML Identity

- `package.json` line 5: `"surreal": "2.0.0"` → `"connectomedb": "2.0.0"`
- `index.html` — already says "Cortex DevTools" (OK), theme-color still `#d500c6` (separate styling sprint)

## Task 2: Shell UI Strings (SurrealDB → ConnectomeDB)

Files in `src/shell/`:
- `settings/tabs/Serving.tsx` — "serve SurrealDB" → "serve ConnectomeDB"
- `settings/tabs/About.tsx` — "SurrealDB ${version}", "© SurrealDB Ltd" → DevPulse
- `modals/failed-connect.tsx` — "SurrealDB Cloud" → "ConnectomeDB Cloud"
- `modals/documentation.tsx` — "SurrealDB Documentation" → "ConnectomeDB Documentation"
- `modals/data-export.tsx` — "SurrealDB 3.0", "SurrealDB CLI" → "ConnectomeDB 3.0", "ConnectomeDB CLI"
- `modals/cloud-expired.tsx` — "SurrealDB Cloud" → "ConnectomeDB Cloud"
- `modals/cloud-update-required.tsx` — "SurrealDB Cloud" → "ConnectomeDB Cloud"
- `modals/connections.tsx` — "SurrealDB Cloud" → "ConnectomeDB Cloud"
- `modals/sandbox.tsx` — "learn SurrealQL" → "learn rroQL"
- `hooks/menu.tsx` — "SurrealDB Docs" → "ConnectomeDB Docs"

## Task 3: Shared Util Strings

Files in `src/shared/`:
- `util/versions.tsx` — comments: "SurrealDB 2.0" / "SurrealDB 3.0" → "ConnectomeDB 2.0" / "3.0"
- `util/dataset.tsx` — "SurrealDB", "SurrealQL Basics" → "ConnectomeDB", "rroQL Basics"
- `util/cloud.tsx` — "Explore SurrealDB" → "Explore ConnectomeDB"
- `util/errors.tsx` — GitHub issue URL → update to fork URL
- `util/defaults.tsx` — `surrealdb.com` base URL 
- `util/language.tsx` — comment: "SurrealQL tree" → "rroQL tree"
- `util/schema.tsx` — comment: "SurrealQL format" → "rroQL format"
- `util/random.tsx` — "surreal" color name (cosmetic)

## Task 4: Screen/View UI Strings

Files in `src/screens/connectome/`:
- `toolbar.tsx` — "SurrealDB Cloud", "SurrealDB {version}"
- `views/migration/` — "SurrealDB 3.0" references
- `views/dashboard/` — "SurrealDB Cloud", "SurrealDB {version}"
- `views/functions/ModelPanel/` — "SurrealDB" references  
- `views/graphql/QueryPane/` — "SurrealDB documentation"
- `views/query/ResultPane/` — "SurrealQL query" → "rroQL query"
- `views/parameters/ParametersView/` — "SurrealQL" title
- `views/explorer/ExplorerView/` — "SurrealQL" title
- `pages/Support/` — "SurrealDB Help Centre", "SurrealDB Documentation", "SurrealDB YouTube", "SurrealDB Team"
- `pages/Overview/` — "SurrealDB Cloud" references
- `pages/Referral/` — "SurrealDB Cloud" references

## Task 5: Cloud Module Strings

Files in `src/cloud/`:
- `modals/connect-sdk.tsx` — "SurrealDB Dashboard", "SurrealDB Client SDKs"
- `modals/connect-cli.tsx` — "SurrealDB CLI", "SurrealDB Cloud instance"
- `onboarding/terms-and-conditions.tsx` — "SurrealDB Cloud"
- `api/auth.tsx` — "SurrealDB Cloud"

## Task 6: Components & Providers

- `src/components/CloudSplash/index.tsx` — "SurrealDB Cloud"
- `src/providers/Context/index.tsx` — log messages "SurrealDB Cloud instance"

## Task 7: Code Identifiers (SurrealQL → rroQL)

> **NOTE**: These are internal code identifiers, NOT npm package imports. The `SurrealQL as Wasm` import alias from `@surrealdb/ql-wasm-*` stays as-is because that's the package export name.

- `src/shared/util/surql/surrealql.tsx` → rename file to `rroql.tsx`, rename `SurrealQL` interface → `RroQL`
- `src/shared/util/surql/v2.tsx` — `SurrealQLV2` → `RroQLV2`, log strings
- `src/shared/util/surql/v3.tsx` — `SurrealQLV3` → `RroQLV3`, log strings
- `src/shared/util/surql/index.tsx` — `createSurrealQL` → `createRroQL`
- All files importing `getSurrealQL` — update to `getRroQL`
- `src/screens/connectome/connection/connection.tsx` — `getSurrealQL` function → `getRroQL`

## Task 8: Spoke Directory Rename

- `src/spokes/surrealdb/` → `src/spokes/connectomedb/`
- Update GOVERNANCE.md inside spoke

## Task 9: Governance & Documentation Updates

- Root `GOVERNANCE.md` — update terminology to reference ConnectomeDB
- `src/spokes/connectomedb/GOVERNANCE.md` — full rebrand
- `src/stores/GOVERNANCE.md` — "SurrealDB spoke" → "ConnectomeDB spoke"

---

## Definition of Done

- [ ] Global search for "SurrealDB" in `src/` yields only `@surrealdb/*` package imports and `surrealdb` SDK imports
- [ ] Global search for "SurrealQL" in `src/` yields only `@surrealdb/ql-wasm-*` aliases and the `surrealql` CodeMirror language identifier
- [ ] `src/spokes/connectomedb/` exists, `src/spokes/surrealdb/` does not
- [ ] `pnpm run build` succeeds
- [ ] `tsc --noEmit` passes
