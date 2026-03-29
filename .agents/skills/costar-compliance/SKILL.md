---
name: costar-compliance
description: COSTAR gap-fill protocol. Context, Objective, Style, Tone, Audience, Response must all be satisfied. Multiple choice used to fill gaps — never assume.
---

# COSTAR Compliance Skill

## Purpose

COSTAR ensures that every piece of work has complete context before execution begins. When gaps exist, we present multiple-choice options to fill them — we never assume. This prevents drift, misalignment, and wasted work.

## What is COSTAR?

| Letter | Meaning | Question It Answers |
|--------|---------|-------------------|
| **C** | Context | What is the background? What exists today? What problem are we solving? |
| **O** | Objective | What are we trying to achieve? What is the definition of done? |
| **S** | Style | What conventions, patterns, or design systems must we follow? |
| **T** | Tone | What is the priority — speed, safety, teaching clarity, performance? |
| **A** | Audience | Who will read/use/maintain this? Jesse? Future juniors? The AI? |
| **R** | Response | What form should the output take? Code? Document? Config? Sprint task? |

## When to Use

- Before starting any sprint task
- Before writing any code
- Before creating any documentation
- Before making any design decision in the parking lot
- Whenever you realize you are about to ASSUME something

## Protocol

### Step 1: COSTAR Audit

For the current task, check each COSTAR dimension:

```
[ ] C — Context: Do I know the full background?
[ ] O — Objective: Do I know the exact goal?
[ ] S — Style: Do I know the patterns to follow?
[ ] T — Tone: Do I know the priority?
[ ] A — Audience: Do I know who this is for?
[ ] R — Response: Do I know what form the output takes?
```

### Step 2: Identify Gaps

Any unchecked item is a **gap**. Gaps must be filled before proceeding.

### Step 3: Fill Gaps with Multiple Choice

For each gap, present **2-3 options** to the user. Example:

> **Gap: Audience (A)**
>
> Who is the primary audience for this component?
>
> A) Jesse only — internal devtool, no teaching annotations needed
> B) Jesse + future juniors — include teaching annotations inline
> C) All three (Jesse, juniors, Clyffy's Teacher minion) — annotations feed the terminology engine

### Step 4: Record Decisions

Once the user selects an option:

1. Document the full COSTAR profile for this task
2. Include it in the sprint task or parking lot item
3. Reference it during verification to confirm alignment

## Exit Criteria

- All 6 COSTAR dimensions are satisfied (checked)
- All gaps were filled by user decision, not assumption
- The COSTAR profile is documented

## Rules

1. **Never assume** — if you don't know, ask with multiple choice
2. **Multiple choice is mandatory** — do not ask open-ended questions for COSTAR gaps
3. **COSTAR applies to everything** — code, docs, config, sprint tasks, parking lot items
4. **Carry COSTAR forward** — once established for a sprint, it applies to all tasks in that sprint
5. **Update COSTAR if scope changes** — if the objective shifts, re-audit
