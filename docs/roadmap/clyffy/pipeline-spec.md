# Cortex DevTools — Pipeline Editor Specification

> **Status**: DRAFT | **Date**: 2026-03-27 | **Classification**: INTERNAL DEVTOOLS — Never public first release
> **Fork Source**: surrealdb/surrealist (React + Mantine + @xyflow/react + Tauri 2 + TanStack Query + Sigma.js + CodeMirror)

---

## Overview

The Pipeline Editor is the core spoke. It uses a single @xyflow/react canvas with **four modes** sharing the same node graph. Mode toggle in toolbar. Same data, different interaction model.

---

## Node Types (30+)

### Input Nodes
| Node | ID | Purpose |
|------|----|---------|
| User Input | `user_input` | Entry point for user queries/messages |
| Signal Source | `signal_source` | System-generated signals (timers, triggers) |

### Rumination Nodes
| Node | ID | Purpose |
|------|----|---------|
| Keystroke Layer | `rumination_keystroke` | Real-time keystroke processing |
| Pause Layer | `rumination_pause` | Pause detection for intent analysis |
| Send Layer | `rumination_send` | Explicit send action processing |
| Background Layer | `rumination_background` | Background processing loop |

### Retrieval Nodes
| Node | ID | Purpose |
|------|----|---------|
| Embedder | `embedder` | Text → vector embedding (0.6B model) |
| Qdrant Search | `qdrant_search` | Vector similarity search |
| BM25 Search | `bm25_search` | Keyword-based sparse search |
| RRF Fusion | `rrf_fusion` | Reciprocal Rank Fusion of search results |
| Reranker | `reranker` | Cross-encoder reranking |
| Complexity Scorer | `complexity_scorer` | Determines query complexity score |

### Graph Escalation Nodes
| Node | ID | Purpose |
|------|----|---------|
| SurrealDB Traversal | `surreal_traversal` | Multi-hop graph traversal for complex queries |
| RRO Assembly | `rro_assembly` | Assembles RRO from entity→sentence→passage |

### Context Assembly Nodes
| Node | ID | Purpose |
|------|----|---------|
| COSTAR Builder | `costar_builder` | Assembles Context, Objective, Style, Tone, Audience, Response |
| Context Selector | `context_selector` | Selects relevant context window segments |
| CAG Prefetch | `cag_prefetch` | Cache-Augmented Generation prefetch |

### Inference Nodes
| Node | ID | Purpose |
|------|----|---------|
| Qwen 4B | `qwen_4b` | Primary inference model |
| Minion 0.6B | `minion_0_6b` | Lightweight specialist inference |

### Validation Nodes
| Node | ID | Purpose |
|------|----|---------|
| Anti-Drift Guard | `anti_drift_guard` | Detects personality/style drift |
| Hallucination Check | `hallucination_check` | Cross-references output against sources |
| Output Validator | `output_validator` | Final output quality gate |

### Output Nodes
| Node | ID | Purpose |
|------|----|---------|
| User Output | `user_output` | Final response to user |
| Memory Write | `memory_write` | Persists interaction to memory stores |
| Learning Capture | `learning_capture` | Captures learning events |

### Minion Nodes
| Node | ID | Purpose |
|------|----|---------|
| Guardian | `minion_guardian` | Safety and boundary enforcement |
| Enforcer | `minion_enforcer` | Rule compliance checking |
| Diary | `minion_diary` | Interaction logging and journaling |
| Psych | `minion_psych` | Emotional/sentiment analysis |
| Teacher | `minion_teacher` | Teaching annotation generation |
| Scribe | `minion_scribe` | Documentation and note-taking |
| Vision | `minion_vision` | Visual processing tasks |
| Researcher | `minion_researcher` | External knowledge retrieval |

---

## Four Modes

### Configure Mode

**Interaction model**: Drag-and-drop node placement, edge connection, property editing.

- Nodes are **draggable** on the canvas
- Edges are **connectable** — drag from output handle to input handle
- Properties panel opens per node type (threshold values, model selection, rule config)
- Changes write to pipeline config via Rust bridge (`pipeline_config` command)
- Visual graph is a **projection** of the config — config is SSOT (Single Source of Truth)
- Every property has a **teaching annotation** explaining what it does and why

### Observe Mode

**Interaction model**: Read-only canvas with real-time visual feedback.

- Nodes **pulse** when active (driven by `pipeline:node_active` events)
- Edges **animate** with particles showing data flow direction and volume
- **Timing badges** show real latency per node (ms)
- Live stats per node:
  - Tokens processed
  - Search results count
  - Similarity scores
  - TPS (tokens per second)
  - TTFT (time to first token)
- All driven by real-time Tauri events from the Rust engine

### Debug Mode

**Interaction model**: Interactive breakpoint-based step-through.

- Click nodes to **set breakpoints** (visual indicator)
- **Step through** one query's journey node by node
- At each breakpoint, inspect:
  - **Input data** — what entered this node
  - **Processing logic** — what the node did
  - **Output data** — what left this node
  - **Teaching annotation** — why the system made this decision
- Example annotation: *"This query scored 0.15 — well below the 0.6 escalation threshold, so it goes through fast vector search instead of graph traversal."*

### Learn Mode

**Interaction model**: Guided narrative restructuring of the graph.

Restructures the graph into a **linear narrative** with chapters following data flow:

| Chapter | Content | Nodes Covered |
|---------|---------|---------------|
| 1. Input Processing | How user input is received and analyzed | `user_input`, rumination nodes |
| 2. Retrieval | How relevant information is found | `embedder`, search nodes, `reranker` |
| 3. Context Assembly | How the prompt is built | `costar_builder`, `context_selector`, `cag_prefetch` |
| 4. Inference | How the model generates a response | `qwen_4b`, `minion_0_6b` |
| 5. Validation | How the output is checked | validation nodes |

Each chapter explains:
- **What** (layman understanding)
- **Why** (architectural reasoning)
- **How** (Rust implementation details)
- **Industry term** (standard vocabulary)
