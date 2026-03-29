---
name: sprint-authoring
description: Write sprint tasks verbatim against existing source code. Tasks cite exact files, line ranges, and current code. Conflicts trigger parking lot entry.
---

# Sprint Authoring Skill

## Purpose

Sprint tasks are the bridge between a committed parking lot decision and actual code authoring. Every sprint task is written **verbatim against the existing source** — it must cite the exact file, line range, current code, and the intended change. This ensures there is no drift between what we plan and what we build.

## When to Use

- After a parking lot item is COMMITTED
- When planning a new phase of work from the roadmap
- When implementing a feature that touches existing code

## Protocol

### Step 1: Reference the Source

For every file that will be touched:

1. **Read the current file** — use `view_file` or equivalent
2. **Cite the exact location** — file path, start line, end line
3. **Quote the current code** — the verbatim text that exists right now
4. **Describe the change** — what the code should become

### Step 2: Write the Sprint Task

Each sprint task MUST contain:

```markdown
## Task: {short description}

**Source**: Parking lot item #{NNN} or Roadmap Phase {N}
**Priority**: P0 / P1 / P2
**Spoke**: {spoke name} or Shell or Shared

### Files Affected

#### {filepath}
- **Lines**: {start}-{end}
- **Current code**:
  ```{language}
  {exact current content}
  ```
- **Target code**:
  ```{language}
  {exact target content}
  ```
- **Rationale**: Why this change is being made
```

### Step 3: Conflict Detection

While writing the sprint task, if ANY of the following occur, **STOP and enter the parking lot**:

1. The current code does not match what was expected from the parking lot discussion
2. The change would break an import in another file
3. The change conflicts with a governance registry rule
4. The change requires modifying a file not discussed in the parking lot item
5. An unused import is detected that may reference unimplemented code

### Step 4: Sprint Document

Sprint tasks are collected into a sprint document:

```
.agents/sprints/{NNN}-{sprint-name}.md
```

Each sprint document contains:
- Sprint goal (one sentence)
- Source parking lot items or roadmap phases
- Ordered list of tasks (dependency-aware ordering)
- Definition of done

## Exit Criteria

- All tasks in the sprint reference real, current source code
- No conflicts detected (or all conflicts routed to parking lot)
- The sprint document is reviewed by the user before execution begins

## Rules

1. **Verbatim or nothing** — if you cannot cite the exact current code, you are not ready to write the sprint task
2. **Dependency ordering** — tasks must be ordered so that earlier tasks never break later tasks
3. **One sprint, one goal** — do not mix unrelated changes in the same sprint
4. **Conflicts halt immediately** — do not try to resolve conflicts in the sprint; route them to the parking lot
5. **Never modify a sprint mid-execution** — if changes are needed, create a new parking lot item
