# Parking Lot #002 — SurrealDB → ConnectomeDB Identity Rename

> **Status**: COMMITTED  
> **Date**: 2026-04-04  
> **Decision**: Option A+D Hybrid — Incremental surgical rename, full replacement as end state  
> **Related**: Sprint 006 (Connectome branding, completed), Styling Audit

---

## Decision

Jesse confirmed: **everything gets renamed eventually**. This is a full fork, not a wrapper. The approach is incremental/surgical execution toward a total identity replacement.

### Committed Terminology Map

| Old | New | Notes |
|-----|-----|-------|
| SurrealDB | ConnectomeDB | Database engine identity |
| SurrealQL | rroQL | Query language — Reasoning Ready Object Query Language |
| Surrealist | Connectome | ✅ Already done (Sprint 006) |
| `@surrealdb/ui` | `@connectomedb/ui` (future) | Fork when DevPulse design system replaces upstream |
| `@surrealdb/codemirror` | `@connectomedb/codemirror` (future) | Fork when rroQL parser diverges |
| `@surrealdb/lezer` | `@connectomedb/lezer` (future) | Fork when rroQL grammar diverges |
| `@surrealdb/ql-wasm` | `@connectomedb/ql-wasm` (future) | Fork when rroQL WASM is built |
| `@surrealdb/cbor` | `@connectomedb/cbor` (future) | Fork when RRO codec diverges |
| `@surrealdb/wasm` | `@connectomedb/wasm` (future) | Fork when engine diverges |
| `surrealdb` (JS SDK) | `connectomedb` (future) | Fork when RRO API diverges |
| `surrealdb.com` URLs | DevPulse docs (future) | Replace when own docs exist |
| `src/spokes/surrealdb/` | `src/spokes/connectomedb/` | Rename in current sprint |

### Execution Phases

**Phase 1 (NOW)**: Surgical UI + Directory rename
- Rename all user-visible "SurrealDB" strings → "ConnectomeDB"
- Rename all "SurrealQL" strings → "rroQL" 
- Rename spoke directory `src/spokes/surrealdb/` → `src/spokes/connectomedb/`
- Update GOVERNANCE docs
- Leave `@surrealdb/*` package imports alone (they still work)
- Document in GOVERNANCE that `@surrealdb/*` imports are EXPECTED legacy deps

**Phase 2 (WITH DESIGN SYSTEM)**: Fork `@surrealdb/ui`
- When DevPulse/Coldlight design system replaces upstream Mantine theme
- Fork and publish as `@connectomedb/ui`
- Mass-rename all imports

**Phase 3 (WITH rroQL)**: Fork parser/WASM packages
- When rroQL grammar diverges from SurrealQL
- Fork lezer, codemirror, ql-wasm packages
- Build rroQL parser

**Phase 4 (WITH ENGINE)**: Fork SDK/engine
- When ConnectomeDB engine diverges from SurrealDB
- Fork core SDK, CBOR codec, WASM engine

---

## Original Analysis

### Category A — UI/Branding Strings (~30-50 files, Phase 1)
User-visible text: "SurrealDB", "SurrealQL", copyright notices, feature labels.

### Category B — npm Package Imports (230+ files, Phase 2-4)
`@surrealdb/ui`, `@surrealdb/codemirror`, `@surrealdb/lezer`, `surrealdb` SDK — real third-party packages. Cannot rename until forked.

### Category C — Technical References (Phase 1 for strings, Phase 3 for code)
- SurrealQL → rroQL (rename in UI strings now, rename in code when parser forks)
- `surreal_query` IPC command → rename when Rust bridge updates

### Category D — Directory Names (Phase 1)
`src/spokes/surrealdb/` → `src/spokes/connectomedb/`

### Category E — URLs (Phase 1 partial, Phase 2+ full)
- `surrealdb.com/docs` → keep until own docs exist, but remove from user-facing labels
- GitHub links → update to `EonsofStupid/surrealist` fork

### Category F — CSS Variables (Phase 2)
`--surreal-*` vars from `@surrealdb/ui` — override at `:root` now, fully replace when package is forked.
