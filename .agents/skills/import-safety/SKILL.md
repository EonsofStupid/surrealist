---
name: import-safety
description: Import deletion safeguards. Unused imports are NOT removed until the source is verified to exist. 9 out of 10 times an unused import means unfinished work.
---

# Import Safety Skill

## Purpose

Unused imports are not garbage — they are **signals**. 9 out of 10 times, an unused import means the feature it references was never completed. This skill prevents us from deleting the evidence of unfinished work and then forgetting the feature entirely.

## The Rule

> **Do NOT delete an unused import until you have confirmed that the source it references already exists AND the feature it was meant to support is fully implemented.**

## When to Use

- During verification when `noUnusedImports` warnings appear
- During sprint authoring when reviewing existing code
- During any code review or refactor
- When biome suggests removing an import

## Protocol

### Step 1: Identify the Unused Import

```typescript
// Example: biome warns about unused import
import { PipelineConfig } from "~/spokes/pipeline/types";
// ↑ This is unused — but WHY?
```

### Step 2: Check if the Source Exists

1. Does the file `~/spokes/pipeline/types` exist?
2. Does it export `PipelineConfig`?
3. If NO → the feature is **unimplemented**. The import is a breadcrumb.

### Step 3: Check if the Feature Is Complete

Even if the source file exists, ask:

1. Is `PipelineConfig` used **anywhere** in this file's logic?
2. Was there a TODO or sprint task that intended to use it?
3. Is there a parking lot item related to this feature?

### Step 4: Decision

| Source Exists? | Feature Complete? | Action |
|----------------|-------------------|--------|
| No | No | **DO NOT DELETE.** Create a parking lot item for the missing feature. |
| Yes | No | **DO NOT DELETE.** Author the feature first, then the import becomes used. |
| Yes | Yes | ✅ Safe to delete — the import is genuinely unused. |
| No | N/A | **DO NOT DELETE.** The source file needs to be created first. |

### Step 5: Document

If you retain the import:
- Add a comment: `// TODO: Used by {feature} — see parking lot #{NNN}`
- Create a parking lot item if one doesn't exist

If you delete the import:
- Confirm in the commit message that the source was verified to exist and the feature is complete

## Exit Criteria

- Every unused import warning has been triaged (not just blanket-deleted)
- Retained imports have TODO comments linking to parking lot items
- Deleted imports have source verification documented

## Rules

1. **9/10 rule** — assume the import signals unfinished work until proven otherwise
2. **Never batch-delete** — each unused import is triaged individually
3. **Create the feature, then the import becomes used** — this is the correct resolution
4. **Comments are mandatory** — retained imports must explain why they are kept
5. **Biome's suggestion is not authorization** — biome says "remove this," we say "verify first"
