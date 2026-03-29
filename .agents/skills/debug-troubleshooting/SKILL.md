---
name: debug-troubleshooting
description: Error diagnosis protocol for systematic debugging. Reproduce, isolate, document. Check governance registries for known false positives before investigating.
---

# Debug & Error Troubleshooting Skill

## Purpose

When something breaks, this skill ensures we diagnose it systematically instead of guessing. Every error is reproduced, isolated to a boundary, and documented so it never surprises us again.

## When to Use

- A build fails
- A runtime error occurs
- A biome/tsc check produces unexpected results
- A feature behaves differently than expected
- A Tauri IPC command fails
- A dependency conflict is detected

## Protocol

### Step 1: Check Governance Registries First

Before investigating ANY warning or error:

1. Check the relevant boundary's `GOVERNANCE.md` for the "False Positive Registry"
2. If there is a matching entry → this is a known false positive, skip it
3. If no match → proceed with diagnosis

This prevents wasting time re-investigating documented false positives.

### Step 2: Reproduce the Error

1. Record the **exact command** that produced the error
2. Record the **exact error message** (full text, not summary)
3. Record the **environment** (OS, Node version, bun version, Rust toolchain)
4. Reproduce the error at least once to confirm it is consistent

### Step 3: Isolate to Boundary

Determine which boundary the error belongs to:

| Symptom | Boundary | Governance File |
|---------|----------|----------------|
| TypeScript error | Frontend (src/) | `src/GOVERNANCE.md` |
| Biome lint error | Frontend (src/) | `src/GOVERNANCE.md` |
| Cargo compile error | Backend (src-tauri/) | `src-tauri/GOVERNANCE.md` |
| Tauri plugin error | Backend (src-tauri/) | `src-tauri/GOVERNANCE.md` |
| Vite build error | Build tooling | `GOVERNANCE.md` (root) |
| bun install error | Dependencies | `GOVERNANCE.md` (root) |
| Runtime React error | Component boundary | `src/components/GOVERNANCE.md` |

### Step 4: Root Cause Analysis

1. **Read the error** — what is it actually saying?
2. **Trace the stack** — where does the error originate?
3. **Check recent changes** — did a recent edit introduce this?
4. **Check dependencies** — is a package version causing this?
5. **Check Windows-specific issues** — path separators, case sensitivity, symlinks

### Step 5: Document the Resolution

After fixing:

1. Add a brief entry to the relevant `GOVERNANCE.md` under a "Known Issues / Resolutions" section
2. If the error was a false positive, add it to the False Positive Registry
3. If the error revealed a missing feature, create a parking lot item

## Exit Criteria

- Error is reproduced, isolated, and resolved
- Resolution is documented in the relevant governance registry
- No recurring false positives are left undocumented

## Rules

1. **Never guess** — reproduce first, then diagnose
2. **Check governance FIRST** — do not waste time re-investigating known issues
3. **Document everything** — future sessions will not have your context
4. **Windows awareness** — path separators (`\` vs `/`), case sensitivity, long path limits are common causes
5. **Isolate before fixing** — know which boundary owns the error before changing code
