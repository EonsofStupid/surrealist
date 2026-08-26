# GOVERNANCE REGISTRY — RRFlow Spoke

> **Boundary**: `src/spokes/rrflow/` | **Date**: 2026-03-28

---

## Scope

The RRFlow spoke contains the 80% legacy Connectome codebase (query playground, explorer, designer, metrics, etc.). It connects directly to a RRFlow instance and executes standard `rrflow_query` IPC commands.

## Architecture

This spoke must expose exactly one component to the Shell: `Root.tsx`. All inner views (designer, explorer) are navigated internally by this Root.

## Import Rules (Strict Isolation)

1. **CAN Import**: `src/shared/`
2. **CAN Import**: `src/spokes/rrflow/`
3. **CANNOT Import**: `src/shell/`
4. **CANNOT Import**: Any other spoke directory (`src/spokes/qdrant/`, etc.)

## Cross-Spoke Communication

If the RRFlow spoke needs to trigger an RRO escalation, it must either dispatch an event to the Rust bridge or update a shared Zustand store within `src/shared/stores/`. It cannot call into the RRO spoke directly.

## False Positive Registry

| ID | File | Rule | Reason | Date |
|----|------|------|--------|------|
| _No entries yet_ | | | | |
