# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Personal digital portfolio site (English content, `<html lang="en">`). Started from `create-next-app` and stripped down to a clean boilerplate: no demo assets, no `public/` directory, no fonts via `next/font`, no favicon yet.

## Tech Stack

- Next.js
- React
- TypeScript
- CSS
- ESLint

## Development Guidelines

- Use TypeScript for all application code.
- Prefer Server Components by default.
- Use `"use client"` only when client-side interactivity or browser APIs are required.
- Keep components small and focused on a single responsibility.
- Prefer reusable components over duplicated UI logic.
- Keep business logic separate from presentation when appropriate.
- Follow the existing project structure and conventions before introducing new patterns.
- Do not add dependencies unless they are actually necessary.

## Commands

Package manager is **pnpm only** (`packageManager: pnpm@11.0.0`); don't use npm/yarn/bun.

```bash
pnpm dev              # dev server at http://localhost:3000
pnpm build            # production build (also type-checks)
pnpm start            # serve the production build
pnpm run lint         # ESLint (next core-web-vitals + typescript); does not check CSS
pnpm run typecheck    # tsc --noEmit
```

## Architecture notes

- **App Router under `src/app/`.** The `@/*` path alias maps to `./src/*`.
- **Route types are generated.** `LayoutProps<"/">` in `layout.tsx` is a global type from `.next/types/routes.d.ts`, pulled in by `next-env.d.ts`. If `.next/` is missing (fresh clone or after cleanup), run `pnpm dev` or `pnpm build` once before `typecheck`. `next-env.d.ts` is generated and gitignored; don't edit it.
- **Global CSS chain.** `layout.tsx` imports only `globals.css`, whose first line is `@import "./reset.css"`. Keep new global styles in `globals.css`, after that `@import`.
- **The reset lives in `@layer reset`.** Every rule in `reset.css` sits inside that layer, so any unlayered style (in `globals.css` or CSS Modules) overrides it no matter the import order or specificity. The reset keeps `padding` on lists and form controls and zeroes only `margin`.
- **Metadata** (`title`, `description`) is defined in `src/app/layout.tsx`.

## Before Making Changes

Before modifying code:

1. Inspect the relevant files and understand the existing implementation.
2. Check related components, styles, types, and data sources.
3. Follow existing project conventions.
4. Prefer the smallest change that solves the problem.
5. Do not modify unrelated files.

## Code Quality

- Avoid unnecessary abstractions.
- Avoid premature optimization.
- Do not introduce code that is not required for the current task.
- Preserve existing functionality unless the task explicitly requires changing it.
- After significant changes, verify the project with linting and/or build checks when appropriate.

## Git

- Do not create commits unless explicitly requested.
- Do not modify Git history.
- Use Conventional Commits with the following types: `feat`, `fix`, `chore`, `refactor`, `test`, `docs`.
- Never push a direct change to `main` branch. Only feature branch via PRs.
- Do not reset, revert, or discard user changes unless explicitly requested.
- Keep commits focused and avoid unrelated changes.

## Verification

After making changes, run:

```bash
pnpm run lint
pnpm run typecheck
pnpm build
```

All checks should pass before considering the task complete.