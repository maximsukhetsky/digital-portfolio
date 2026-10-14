---
name: review-pr
description: Code review of current changes. Use for reviewing PRs or staged changes.
allowed-tools: Bash, Read, Grep.
---

## Code Review

### 1. Gather context
- `git diff HEAD~1 --stat` — list of files
- `git diff HEAD~1` — detailed diff

### 2. Automated checks

- `pnpm run typecheck`
- `pnpm run lint`
- `pnpm run smoke`

Specify the file and line number if errors are found.

### 3. Manual analysis by category

- 🔴 **Blockers** — bugs, security issues, broken API
- 🟡 **Improvements** — convention violations, complex logic
- 🟢 **Nitpicks** — style, naming (optional to fix)

### 4. Summary

Format: `✅ APPROVE` / `🔄 NEEDS CHANGES` / `❌ REJECT`