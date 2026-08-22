# Connectome

Connectome is the native desktop control surface for RRFlow. It runs as a Tauri application on Windows, macOS, and Linux and connects to a separately deployed RRFlow runtime.

This repository is consumed as `apps/connectome` by the engine repository that is becoming RRFlow. It is not the database engine and it is not an embedded browser panel.

## Current alpha

Connectome currently provides:

- locally persisted RRFlow connection profiles;
- local or remote endpoint probing over HTTP(S) and WebSocket transports;
- root, namespace, database, record-access, token, and anonymous authentication;
- namespace and database selection;
- a VyrmQL query studio with table, graph, JSON, and live-result lenses;
- record and table exploration;
- visual data-model and relationship design;
- authentication, parameter, function, GraphQL, and runtime-diagnostics tools;
- a strict `vyrm-diagnostics` v1 client with custom prompt flights, persisted
  past-run replay, reverse/forward transport, scrubbing, 0.5×–8× playback,
  observable event lanes, and a runtime-owned capability/evidence ledger;
- separate project-runtime and optional enterprise-control-plane profiles;
- multi-window native desktop operation.

Connectome uses RRFlow-native runtime and control-plane contracts. A runtime
connection opens one project instance for VyrmQL, data, graph, schema, trace,
and lifecycle work. The optional enterprise control-plane connection manages
fleets, deployments, upgrades, audit activity, and availability policy. There
is no compatibility fallback.

Native diagnostics requests cross the Tauri command boundary instead of relying
on WebView CORS. The transport allowlists only capability, snapshot, flight,
and demo endpoints; caps requests at 128 KiB and responses at 16 MiB; disables
redirects; permits plaintext HTTP only for loopback; and requires HTTPS for a
remote Vyrm instance.

The enterprise contract is deliberately separate from the runtime query
protocol:

- `GET /rrflow/v1/control/handshake` must identify `rrflow-control` protocol
  version `1`;
- `GET /rrflow/v1/control/instances` returns the project runtimes managed by
  that control plane;
- requests use bearer authentication and the `RRFlow-Control-Protocol: 1`
  header;
- an invalid or mismatched handshake is rejected and is never routed into the
  runtime query client.

## Repository boundary

```text
RRFlow engine repository
├── runtime / storage / query execution
├── QORTEX vector internals
└── apps/connectome  ← this repository (git submodule)
```

Connectome visualizes and controls project RRFlow instances. The optional
enterprise profile connects to a distinct control plane for fleet and
deployment management; it does not change or proxy the project-runtime
contract.

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

Connectome preserves a mature desktop query, schema, graph, and connection shell while the product evolves around RRFlow. See [LICENSE](LICENSE), third-party notices, and the repository history for attribution.
