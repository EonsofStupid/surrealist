---
description: Full lifecycle workflow. Parking Lot → Sprint → Author → Verify.
---

# Full Cycle Workflow

// turbo-all

The complete pipeline for any change to the Cortex DevTools codebase.

## 1. Enter Parking Lot

When a conflict, design decision, or ambiguity is detected:

1. Read `.agents/skills/parking-lot/SKILL.md`
2. Create a parking lot item under `.agents/parking-lot/{NNN}-{description}.md`
3. Present 2-4 multiple-choice options
4. Wait for user decision
5. Mark the item as COMMITTED with the chosen option

**Do NOT proceed to Step 2 until the parking lot item is COMMITTED.**

## 2. Author Sprint

After a parking lot decision is committed:

1. Read `.agents/skills/sprint-authoring/SKILL.md`
2. Read the current source code for every file that will be touched
3. Write sprint tasks citing exact file paths, line ranges, and current code
4. If a conflict is detected → STOP and return to Step 1
5. Create the sprint document under `.agents/sprints/{NNN}-{name}.md`
6. Wait for user review of the sprint

**Do NOT proceed to Step 3 until the sprint is reviewed.**

## 3. Run COSTAR Audit

Before writing any code:

1. Read `.agents/skills/costar-compliance/SKILL.md`
2. Audit all 6 COSTAR dimensions for the current sprint
3. Fill any gaps with multiple-choice questions
4. Document the COSTAR profile

## 4. Author Code

Execute each sprint task in order:

1. Follow the sprint task exactly — file, line range, current→target code
2. Apply Import Safety rules (read `.agents/skills/import-safety/SKILL.md`)
3. If an unused import is detected → triage it (do NOT auto-delete)
4. If a conflict is detected → STOP and return to Step 1

## 5. Verify

After all sprint tasks are complete:

1. Read `.agents/skills/verification/SKILL.md`
2. Run `npx @biomejs/biome check .`
3. Run `npx tsc --noEmit`
4. Address ALL warnings (fix or document as false positive)
5. Update governance registries with any new false positives
6. Write verification report

**The sprint is NOT done until verification passes.**
