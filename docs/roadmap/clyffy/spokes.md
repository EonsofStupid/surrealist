# Cortex DevTools — Spoke Specifications

> **Status**: DRAFT | **Date**: 2026-03-27 | **Classification**: INTERNAL DEVTOOLS — Never public first release
> **Fork Source**: surrealdb/surrealist (React + Mantine + @xyflow/react + Tauri 2 + TanStack Query + Sigma.js + CodeMirror)

---

## SurrealDB Spoke

**Inheritance**: ~80% from Surrealist

### What We Inherit
- Query editor (CodeMirror with SurrealQL syntax)
- Table explorer
- Schema designer
- Graph visualization (Sigma.js)
- Record link navigation

### What We Add
- Teaching annotations on every schema concept
- Terminology engine integration (see [terminology-engine.md](./terminology-engine.md))
- Rust bridge integration via `surreal_query` command
- Graph viz reuse for RRO entity relationships

### What We Strip
- Cloud connection management
- Multi-instance SaaS management
- Auth UI for Surreal Cloud
- Intercom integration

---

## Qdrant Spoke

**Inheritance**: Built new

### Search Playground — The Killer Teaching Feature

User types a query → system shows **every step**:

#### Step 1 — Embedding
> "The 0.6B embedder converts your text into a 384-dimensional vector."

Shows: model name, dimensions, processing time, truncated vector output.

#### Step 2 — Search
> "Qdrant compares your vector against all stored vectors using cosine similarity."

Shows: collection name, points searched, time, algorithm (HNSW).

#### Step 3 — Results
Ranked results with similarity scores.
> "Scores above 0.85 are strong matches."

#### Step 4 — Reranking
> "The reranker reads each result alongside your query for more accurate scoring."

Shows: model name, reranked order, timing.

The user watches their query transform: **text → vector → search results → reranked output**. They learn the entire retrieval pipeline by watching it work.

### Components
| Component | Purpose |
|-----------|---------|
| Collection Browser | Browse Qdrant collections, view metadata |
| Point Inspector | Inspect individual points (payload, vector) |
| Search Playground | Interactive step-by-step retrieval visualization |
| Index Monitor | HNSW index health, segment info |
| Embedding 2D Viz | UMAP/t-SNE projection of embeddings (P2) |

### Rust Bridge
- `qdrant_search` — Execute vector search with full step telemetry

---

## RRO Spoke

**Inheritance**: Built new

### Tri-Graph View
Interactive @xyflow/react graph showing **entity → sentence → passage** relationships (LinearRAG pattern).
- Nodes colored by type
- Click to inspect full RRO detail
- Shows complexity score per RRO

### Complexity Heatmap
All RROs colored by complexity score:
- **Red** = will escalate to SurrealDB graph traversal
- **Blue** = handled locally by Qdrant vector search
- Visual explanation of the threshold-gated routing

### Escalation Log
Timeline showing:
- Which queries escalated and when
- Why (score breakdown: similarity, complexity, confidence)
- What the graph traversal found that vector search missed
- Teaching annotation per escalation event

### Provenance Chain (P2)
Trace any piece of generated output back through the full pipeline: output → inference → context → retrieval → source document.

### Rust Bridge
- `rro_inspect` — Inspect RRO structure, complexity scores, escalation history

---

## Minions Spoke

**Inheritance**: Built new

### Dashboard
Shows all 8 specialist sub-agents with:
- Current status (idle / active / error)
- Last action timestamp
- Active task description

### The 8 Minions

| Minion | Purpose |
|--------|---------|
| **Guardian** | Safety and boundary enforcement |
| **Enforcer** | Rule compliance checking |
| **Diary** | Interaction logging and journaling |
| **Psych** | Emotional/sentiment analysis |
| **Teacher** | Teaching annotation generation |
| **Scribe** | Documentation and note-taking |
| **Vision** | Visual processing tasks |
| **Researcher** | External knowledge retrieval |

### Note Stream
Live feed of minion observations and decisions:
- Filterable by minion type
- Color-coded by severity
- Teaching annotations on each note type

### Minion Detail Panel (P2)
Deep dive into individual minion:
- Configuration
- Activity history
- Performance metrics

### Rust Bridge
- `minion_status` — Get status of all 8 agents
- `minion:note` event — Real-time note stream
