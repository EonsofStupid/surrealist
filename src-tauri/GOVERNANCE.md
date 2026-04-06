# GOVERNANCE REGISTRY — Rust Backend (src-tauri/)

> **Boundary**: `src-tauri/` | **Date**: 2026-03-27

---

## Scope

This governance file covers the Tauri 2 Rust backend. All Tauri commands, event emitters, plugin registrations, and Cargo dependencies are governed here.

## Cargo Dependency Rules

- All dependencies are pinned to explicit versions in `Cargo.toml`
- New dependencies require a parking lot discussion before adding
- Platform-specific dependencies use `[target.'cfg(...)'.dependencies]` sections
- Current platform deps: `cocoa`/`objc` (macOS), `openssl` vendored (Linux)

## Tauri Plugin Registration

Currently registered plugins:
- `tauri-plugin-fs` (filesystem access)
- `tauri-plugin-os` (OS info)
- `tauri-plugin-log` (logging)
- `tauri-plugin-shell` (shell commands)
- `tauri-plugin-dialog` (native dialogs)
- `tauri-plugin-process` (process management)
- `tauri-plugin-updater` (auto-update — will need endpoint change)
- `tauri-plugin-deep-link` (URL scheme handling)
- `tauri-plugin-localhost` (local server)
- `tauri-plugin-single-instance` (prevent multiple instances)

## Future Tauri Commands (Phase 1+)

Per the roadmap (`docs/roadmap/clyffy/architecture.md`):
- `surreal_query` — ConnectomeDB spoke
- `qdrant_search` — Qdrant spoke
- `rro_inspect` — RRO spoke
- `pipeline_config` — Pipeline spoke
- `pipeline_step` — Pipeline spoke
- `minion_status` — Minions spoke

## Rust Lint Exceptions

| Rule | Status | Rationale |
|------|--------|-----------|
| _No entries yet_ | | |

## False Positive Registry

| ID | File | Rule | Reason | Date |
|----|------|------|--------|------|
| _No entries yet_ | | | | |
