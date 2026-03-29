---
description: Run baseline checks to capture the current state of the codebase
---

# /baseline-check

Capture the current state of all warnings and errors in the codebase. This establishes the known starting point before any changes are made.

## Steps

1. Ensure dependencies are installed:
// turbo
```
pnpm install
```

2. Run Biome check and capture output:
// turbo
```
npx @biomejs/biome check . 2>&1
```

3. Run TypeScript check and capture output:
// turbo
```
npx tsc --noEmit 2>&1
```

4. Document all warnings and errors in the root `GOVERNANCE.md` under a "Baseline Audit" section with the date.

5. Any pre-existing warnings from the Surrealist codebase that are acknowledged (not ours to fix yet) should be added to the relevant boundary's False Positive Registry OR noted as "inherited — to be addressed in Phase {N}".
