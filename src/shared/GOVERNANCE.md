# GOVERNANCE REGISTRY — Shared Boundary

> **Boundary**: `src/shared/` | **Date**: 2026-03-28

---

## Scope

The Shared boundary contains the universal foundation that multiple different spokes and the shell rely upon. This includes fundamental React components (e.g., universal DataTables or CodeEditors), low-level utility functions, theming tokens, and assets.

## Import Rules (Strict Isolation)

1. **CAN Import**: Nothing outside `src/shared/` or standard node_modules.
2. **CANNOT Import**: `src/shell/` (Shared code must be agnostic of the shell that runs it).
3. **CANNOT Import**: `src/spokes/` (Shared code must be agnostic of the specific spoke implementations).

## False Positive Registry

| ID | File | Rule | Reason | Date |
|----|------|------|--------|------|
| _No entries yet_ | | | | |
