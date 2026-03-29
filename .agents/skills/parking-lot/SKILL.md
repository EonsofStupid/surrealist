---
name: parking-lot
description: Discussion protocol for conflicts, design decisions, and ambiguity. Items are discussed — not solved — until committed to a sprint.
---

# Parking Lot Skill

## Purpose

The Parking Lot is where **all** conflicts, design decisions, ambiguities, and open questions go before any code is written. It is a discussion space, not a solution space. The goal is to surface options, weigh trade-offs, and reach a committed decision that can then be authored into a sprint.

## When to Enter the Parking Lot

- A conflict is detected between new work and existing code
- A design decision has more than one viable approach
- An ambiguity exists in the requirements or specification
- A biome/tsc warning needs to be classified as real issue vs false positive
- An import is unused but the source feature may not exist yet
- Any deviation from the roadmap is being considered

## Protocol

### Step 1: Create a Parking Lot Item

Create a new file under `.agents/parking-lot/` using the naming convention:

```
.agents/parking-lot/{NNN}-{short-description}.md
```

Where `{NNN}` is a zero-padded sequential number.

### Step 2: Define the Problem

The parking lot item MUST contain:

1. **What**: Describe the conflict, decision, or ambiguity in plain language
2. **Where**: Cite the exact file(s), line range(s), and current code involved
3. **Why**: Explain why this cannot be resolved without discussion
4. **Context**: Link to any relevant roadmap docs, governance registries, or prior parking lot items

### Step 3: Present Options

Present **2-4 options** as multiple choice. Each option MUST include:

- **Description**: What this option does
- **Pros**: Why this is a good choice
- **Cons**: Why this is a bad choice
- **Impact**: What other files, spokes, or systems are affected
- **Effort**: Rough estimate (trivial / small / medium / large)

### Step 4: Discuss

- The user (Jesse) reviews the options
- Questions are asked and answered
- Additional options may be added
- Options may be refined based on discussion

### Step 5: Commit Decision

Once a decision is made:

1. Mark the parking lot item as `COMMITTED` with the chosen option
2. Record the date and rationale for the decision
3. The committed decision becomes a sprint task (see Sprint Authoring Skill)
4. The parking lot item is NOT deleted — it serves as a decision log

## Exit Criteria

- A parking lot item is COMMITTED with a clear decision
- The decision has been transferred to a sprint task
- No code has been written during the parking lot process

## Rules

1. **No code is written while in the parking lot** — discussion only
2. **Never skip the parking lot for conflicts** — if you detect a conflict, STOP and enter parking lot
3. **Multiple choice is mandatory** — never present a single option
4. **COSTAR must be satisfied** — if context is missing, use the COSTAR Compliance Skill to fill gaps before proceeding
5. **Decisions are permanent** — once committed, a decision can only be reversed by opening a NEW parking lot item explaining why
