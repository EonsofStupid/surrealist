# Connectome

Connectome is the native desktop control surface for RRFlow. It runs as a Tauri application on Windows, macOS, and Linux and connects to a separately deployed RRFlow runtime.

This repository is consumed as `apps/connectome` by the engine repository that is becoming RRFlow. It is not the database engine and it is not an embedded browser panel.

## Current alpha

Connectome currently provides:

- locally persisted RRFlow connection profiles;
- local or remote endpoint probing over HTTP(S) and WebSocket transports;
- root, namespace, database, record-access, token, and anonymous authentication;
- namespace and database selection;
- a SurrealQL query studio with table, graph, JSON, and live-result lenses;
- record and table exploration;
- visual data-model and relationship design;
- authentication, parameter, function, GraphQL, and runtime-diagnostics tools;
- multi-window native desktop operation.

RRFlow currently exposes a SurrealDB-compatible protocol for this control path. That compatibility is an implementation boundary, not the product identity. RRFlow-specific lifecycle, vector, trace, and reasoning-run capabilities will be negotiated through an explicit capability handshake as those engine APIs stabilize.

## Repository boundary

```text
RRFlow engine repository
├── runtime / storage / query execution
├── QORTEX vector internals
└── apps/connectome  ← this repository (git submodule)
```

Connectome visualizes and controls one or more RRFlow instances. Cloud fleet management remains a later layer and is intentionally disabled in the local-first alpha.

## Development

Requirements: Node.js, pnpm 9, and the Tauri 2 platform prerequisites.

```bash
pnpm install --frozen-lockfile
pnpm dev
```

Run the actual desktop shell:

```bash
pnpm tauri:dev
```

Verification:

```bash
pnpm build
cargo check --manifest-path src-tauri/Cargo.toml
```

The production TypeScript/Vite build is green. The inherited whole-repository
Biome assist baseline still reports import-order debt, so CI intentionally uses
the build as its frontend gate until that mechanical cleanup is isolated.

## Packaging

The Tauri bundle configuration emits NSIS installers for Windows, app/DMG bundles for macOS, and AppImage/DEB/RPM packages for Linux. The inherited release workflow already covers macOS x86-64 and ARM64 plus Windows and Linux x86-64; Linux ARM packaging still needs a dedicated runner or cross-compilation pipeline.

## Origin and license

Connectome began from the Surrealist desktop codebase so its mature query, schema, graph, and connection tooling could be preserved while the product evolves around RRFlow. See [LICENSE](LICENSE) and the repository history for attribution.
