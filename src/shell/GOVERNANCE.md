# GOVERNANCE REGISTRY — Shell Boundary

> **Boundary**: `src/shell/` | **Date**: 2026-03-28

---

## Scope

The Shell (Hub) is the control plane. It contains the Tauri application chrome, the root window management, the spoke router, and all global non-spoke state (e.g., config, sidekick drawer).

## Import Rules (Strict Isolation)

1. **CAN Import**: `src/shared/` (utilities, design system, theme)
2. **CANNOT Import**: `src/spokes/` (The shell must not directly import components from inside a spoke. Spokes are loaded dynamically or via their defined `Root.tsx` contract by the router.)

## False Positive Registry

| ID | File | Rule | Reason | Date |
|----|------|------|--------|------|
| _No entries yet_ | | | | |
