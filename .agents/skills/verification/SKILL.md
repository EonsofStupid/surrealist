---
name: verification
description: Third-stage verification skill. Runs Biome checks, tsc checks, addresses ALL warnings. False positives documented in boundary governance registries.
---

# Verification Skill

## Purpose

Verification is the final gate before work is considered complete. It runs automated checks, reviews ALL warnings (not just errors), and ensures nothing has been skipped. This is the skill that enforces quality ownership — we forked this codebase and every warning is now OUR responsibility.

## When to Use

- After any code authoring is complete
- After resolving a debug/error troubleshooting session
- As part of the baseline check workflow
- Before marking any sprint task as done

## Protocol

### Step 1: Run Biome Check

```bash
npx @biomejs/biome check .
```

**Zero tolerance for errors.** All errors must be resolved before proceeding.

**Warnings are reviewed individually:**

For each warning:
1. Read the warning message and the affected code
2. Determine if this is a **real issue** or a **false positive**
3. If real issue → fix it
4. If false positive → document it in the boundary's `GOVERNANCE.md` false positive registry

### Step 2: Run TypeScript Check

```bash
npx tsc --noEmit
```

**All type errors must be resolved.** No exceptions.

### Step 3: Review Unused Imports

For every `noUnusedImports` warning:

1. **Do NOT delete the import immediately**
2. Check if the source file/module the import references exists
3. If the source does NOT exist → this is a signal of **unfinished work** (see Import Safety Skill)
4. If the source DOES exist and the import is truly unused → only then remove it
5. Document the decision in the commit message

### Step 4: Governance Registry Update

For each false positive identified:

1. Add an entry to the relevant boundary's `GOVERNANCE.md` under the "False Positive Registry" table
2. Include: ID, File, Rule, Reason, Date
3. This prevents the same false positive from being re-investigated in future verification passes

### Step 5: Verification Report

After all checks pass, create a verification report:

```markdown
## Verification Report — {sprint/task name}

**Date**: {date}
**Biome**: ✅ {N} errors fixed, {N} warnings addressed, {N} false positives documented
**TypeScript**: ✅ {N} type errors fixed
**Unused Imports**: ✅ {N} removed (source verified), {N} retained (unfinished work)
**Governance**: ✅ {N} false positives added to registries
```

## Exit Criteria

- `biome check .` returns zero errors
- All warnings are either fixed or documented as false positives
- `tsc --noEmit` returns zero errors
- No unused imports were deleted without source verification
- Governance registries are updated

## Rules

1. **All warnings are OUR warnings** — this is a fork, we own everything
2. **Do not skip warnings** — every single warning must be addressed (fix or document)
3. **False positives must be documented** — so we do not keep re-checking them
4. **Unused imports follow Import Safety Skill** — 9/10 times they mean unfinished work
5. **Verification runs on ALL code** — not just code changed in this session
6. **No "it was already like that" excuses** — we forked it, we own it
