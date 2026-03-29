---
description: Author a sprint from committed parking lot decisions
---

# /sprint

Author a sprint from committed parking lot decisions or roadmap phases.

## Steps

1. Read the Sprint Authoring Skill:
// turbo
```
cat .agents/skills/sprint-authoring/SKILL.md
```

2. Identify the source — which parking lot items or roadmap phases are feeding this sprint.

3. For each file that will be touched:
// turbo
   - Read the current file content
   - Cite exact line ranges and current code
   - Write the target code

4. Check for conflicts:
   - If any conflict detected → enter `/parking-lot`

5. Identify the next sprint number:
// turbo
```
ls .agents/sprints/
```

6. Create the sprint document under `.agents/sprints/{NNN}-{name}.md`

7. Present the sprint to the user for review before execution.
