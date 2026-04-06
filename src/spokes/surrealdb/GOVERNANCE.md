# GOVERNANCE REGISTRY — SurrealDB Spoke

> **Boundary**: `src/spokes/connectomedb/` | **Date**: 2026-04-04

---

## Scope

The ConnectomeDB spoke contains the 80% legacy Cortex DevTools codebase (query playground, explorer, designer, metrics, etc.). It connects directly to a ConnectomeDB instance and executes standard `surreal_query` IPC commands.

## Architecture

This spoke must expose exactly one component to the Shell: `Root.tsx`. All inner views (designer, explorer) are navigated internally by this Root.

## Import Rules (Strict Isolation)

1. **CAN Import**: `src/shared/`
2. **CAN Import**: `src/spokes/connectomedb/`
3. **CANNOT Import**: `src/shell/`
4. **CANNOT Import**: Any other spoke directory (`src/spokes/qdrant/`, etc.)

## Cross-Spoke Communication

If the SurrealDB spoke needs to trigger an RRO escalation, it must either dispatch an event to the Rust bridge or update a shared Zustand store within `src/shared/stores/`. It cannot call into the RRO spoke directly.

## False Positive Registry

| ID | File | Rule | Reason | Date |
|----|------|------|--------|------|
| _No entries yet_ | | | | |
