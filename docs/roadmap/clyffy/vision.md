# Cortex DevTools — Vision

> **Status**: DRAFT | **Date**: 2026-03-27 | **Classification**: INTERNAL DEVTOOLS — Never public first release
> **Fork Source**: surrealdb/surrealist (React + Mantine + @xyflow/react + Tauri 2 + TanStack Query + Sigma.js + CodeMirror)

---

## Why This Exists

You're building MAESTRO with SurrealDB, Qdrant/Cortex, RRO, and a multi-model inference pipeline. You have **no way to SEE any of it working**.

Cortex DevTools is simultaneously:

1. **A Visual IDE** — Configure pipelines, design schemas, manage collections
2. **A Live Observatory** — Watch data flow through every node in real time
3. **A Step Debugger** — Set breakpoints, inspect I/O at every stage, find problems
4. **A Classroom** — Learn what each subsystem does in industry-standard terminology while building it

**You are user #1.** Future juniors are user #2.

---

## What We're Forking and Why

### Source: surrealdb/surrealist

Surrealist is a React + Mantine + Tauri 2 desktop application that provides a graphical query playground and database explorer for SurrealDB. It already has:

| Capability | What We Get |
|-----------|-------------|
| Tauri 2 desktop shell | Native window management, IPC bridge, filesystem access |
| Tab/panel management | Workspace layout, resizable panels, multi-tab views |
| CodeMirror editors | Syntax-highlighted query editors with autocomplete |
| @xyflow/react | Node-based graph canvas (already integrated at v12.6.3) |
| Sigma.js + Graphology | Network graph visualization for relationships |
| TanStack Query | Server state management with caching |
| Mantine 8 UI | Full component library (buttons, modals, notifications, charts) |
| Feature flags | Runtime feature gating |
| Zustand state management | State stores with immer integration |
| Biome 2.1.2 | Linting, formatting, import organization |

### What We Strip

- Cloud connection management (Surreal Cloud)
- Multi-instance SaaS management
- Auth UI for Surreal Cloud accounts
- Marketing/referral/billing pages
- Intercom integration
- SurrealDB Cloud deploy workflows
- Updater endpoint pointing to `app.surrealdb.com`

### What We Keep and Extend

- SurrealDB query editor → becomes the **SurrealDB spoke**
- Table explorer and schema designer → inherited into SurrealDB spoke
- Graph visualization → shared between SurrealDB spoke and RRO spoke
- @xyflow/react canvas → becomes the **Pipeline Editor** foundation
- Tauri shell → becomes the **Hub**
- All Mantine UI infrastructure → retained until ColdLight migration (Phase 7)

---

## The Users

### User #1: Jesse (You)

- Building MAESTRO from scratch
- Needs to see what the AI pipeline is actually doing
- Needs to configure thresholds, rules, and model selection visually
- Needs to debug when things go wrong (drift, hallucination, bad retrievals)
- Needs to understand what each subsystem does because the architecture is novel

### User #2: Future Junior Developers

- Will inherit this codebase
- Need to understand the full pipeline without reading 50 source files
- Need teaching annotations that explain *why* (not just *what*)
- Need the Learn mode to onboard in days instead of weeks
- Need industry-standard terminology so they can research independently

---

## Core Principle: See Everything, Understand Everything

Every piece of data flowing through MAESTRO must be **visible** in Cortex DevTools. Every decision the system makes must be **explainable**. Every configuration must be **editable**. Every term must be **learnable**.

If you can't see it, you can't debug it.
If you can't understand it, you can't improve it.
If you can't configure it, you can't experiment.
If you can't explain it, a junior can't maintain it.
