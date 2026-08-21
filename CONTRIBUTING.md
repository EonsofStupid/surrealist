# Contributing to Connectome

Connectome is the native desktop control surface for RRFlow. Contributions should preserve three canonical boundaries:

- RRFlow owns runtime, storage, query execution, tracing, and lifecycle semantics.
- VyrmQL is the query language exposed by Connectome.
- Connectome is a local-first Tauri application for Windows, macOS, and Linux.

Before opening a pull request, run:

```bash
pnpm install --frozen-lockfile
pnpm build
cargo check --manifest-path src-tauri/Cargo.toml
```

Use [GitHub issues](https://github.com/EonsofStupid/connectome/issues) for bugs and proposals. Keep changes focused, include verification evidence, and update the relevant user-facing documentation when behavior changes.
