---
description: Enter the parking lot for a conflict, decision, or ambiguity
---

# /parking-lot

Quick entry into the parking lot discussion protocol.

## Steps

1. Read the Parking Lot Skill:
// turbo
```
cat .agents/skills/parking-lot/SKILL.md
```

2. Identify the next available parking lot item number:
// turbo
```
ls .agents/parking-lot/
```

3. Create the parking lot item with the problem, options, and context.

4. Present the options to the user and wait for a decision.

5. Once committed, the item feeds into `/sprint`.
