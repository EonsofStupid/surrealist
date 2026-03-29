---
description: Run verification checks (Biome + tsc + warnings + governance)
---

# /verify

Run the full verification suite and address all warnings.

## Steps

1. Read the Verification Skill:
// turbo
```
cat .agents/skills/verification/SKILL.md
```

2. Run Biome check:
// turbo
```
npx @biomejs/biome check .
```

3. Run TypeScript check:
// turbo
```
npx tsc --noEmit
```

4. For each warning:
   - Read the Import Safety Skill if it is an unused import warning
   - Determine: real issue or false positive
   - Fix real issues
   - Document false positives in the boundary's GOVERNANCE.md

5. Update governance registries with any new false positive entries.

6. Write verification report summarizing results.
