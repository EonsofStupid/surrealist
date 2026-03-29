# Cortex DevTools — Terminology Engine

> **Status**: DRAFT | **Date**: 2026-03-27 | **Classification**: INTERNAL DEVTOOLS — Never public first release
> **Fork Source**: surrealdb/surrealist (React + Mantine + @xyflow/react + Tauri 2 + TanStack Query + Sigma.js + CodeMirror)

---

## Overview

The Terminology Engine runs **across ALL spokes**. Every technical term has three disclosure levels. The system learns what the user knows and progressively reveals more advanced explanations.

---

## Three Disclosure Levels

### Level 1: Layman
Plain English explanation. No jargon. First exposure.

> **HNSW**: "A clever way to search millions of vectors fast."

### Level 2: Technical
Industry-standard definition with key parameters.

> **HNSW**: "Hierarchical Navigable Small World graph — proximity graph index with logarithmic search complexity. Builds a multi-layer graph where each layer connects nodes to their nearest neighbors."

### Level 3: Rust Context
Implementation-specific details showing where and how in the codebase.

> **HNSW**: "Qdrant builds this automatically. Config controls `ef_construct` (build quality, higher = slower build, better recall) and `m` (max connections per node, higher = more memory, better quality)."

---

## Progressive Disclosure

From the source specification:

| Familiarity State | Trigger | Display |
|-------------------|---------|---------|
| **New** | First exposure | Full layman explanation inline |
| **Learning** | After 5 exposures | Technical explanation inline |
| **Familiar** | After 20 exposures | Term only, hover tooltip shows technical |
| **Mastered** | _Proposed extension_ | Term only, click to expand (all levels) |

> [!NOTE]
> The source specification defines three thresholds (1, 5, 20). The "Mastered" state is a proposed extension — not yet committed. This will go through the parking lot before implementation.

Familiarity is tracked **per term, per user**. Stored in local IndexedDB (already used by Surrealist via `idb` package).

The system learns what YOU know and stops repeating itself.

---

## Term Database (100+ Planned)

### Retrieval & Search
| Term | Layman |
|------|--------|
| Vector Embedding | "A list of numbers that captures the meaning of text" |
| HNSW | "A clever way to search millions of vectors fast" |
| Cosine Similarity | "How similar two vectors are, from -1 (opposite) to 1 (identical)" |
| Cross-Encoder | "A model that reads two texts together for more accurate comparison" |
| BM25 | "Classic keyword search — counts word frequency and rarity" |
| RRF | "Combines ranked lists from different search methods into one" |
| Reranking | "Re-scoring search results with a more accurate (but slower) model" |

### Inference & Generation
| Term | Layman |
|------|--------|
| KV Cache | "Memory that stores previously computed attention values to avoid recalculation" |
| TTFT | "Time to First Token — how long before the model starts responding" |
| TPS | "Tokens Per Second — how fast the model generates text" |
| Autoregressive | "Generating one word at a time, each word depending on the previous ones" |
| Context Window | "The maximum amount of text the model can read at once" |
| Tokenization | "Splitting text into small pieces (tokens) the model can process" |
| GGUF | "A file format for storing quantized language models" |
| Quantization | "Shrinking a model by using less precise numbers (32-bit → 4-bit)" |
| Attention | "The mechanism that lets the model focus on relevant parts of the input" |
| Transformer | "The neural network architecture behind modern language models" |

### Pipeline & Architecture
| Term | Layman |
|------|--------|
| COSTAR | "A framework for building prompts: Context, Objective, Style, Tone, Audience, Response" |
| Few-Shot | "Giving the model examples of the desired output format" |
| Rumination | "Thinking about intent before processing — like pausing before answering" |
| Trait Switching | "Changing the AI's personality profile based on context" |
| Graph Traversal | "Following connections in a knowledge graph to find related information" |
| Multi-Hop | "Traversing multiple relationship edges to answer complex questions" |
| Complexity Scoring | "Rating how hard a query is to determine the processing path" |
| Threshold Gating | "Using a score cutoff to route queries to fast or thorough processing" |
| CAG | "Cache-Augmented Generation — pre-loading context into the model's KV cache" |
| Prefetch | "Loading data into cache before it's needed" |

### Data Structures
| Term | Layman |
|------|--------|
| RRO | "Reasoning Ready Object — pre-organized knowledge for fast retrieval" |
| LinearRAG | "Entity → Sentence → Passage structure for organized knowledge" |
| Tri-Graph | "Three-level graph: entities, sentences, and passages" |
| Entity | "A specific thing (person, concept, place) mentioned in text" |
| Passage | "A chunk of source text, typically 256-512 tokens" |

---

## Integration Points

- **Pipeline nodes**: Every node shows its term tooltips in all 4 modes
- **Qdrant spoke**: Search playground annotates each step
- **RRO spoke**: Tri-graph view annotates node types and relationships
- **Properties panel**: Every configurable field links to its term
- **Glossary page**: Searchable full glossary accessible from any spoke
- **Cross-spoke linking**: Terms link to the spoke where they're most relevant
