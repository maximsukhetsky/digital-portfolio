# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Personal digital portfolio site (English content, `<html lang="en">`). Started from `create-next-app` and stripped down to a clean boilerplate: no demo assets, no `public/` directory, no favicon yet.

## Tech Stack

- Next.js
- React
- TypeScript
- SCSS (Sass) with CSS Modules
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
- Use named type imports from React with `import type`, such as `ReactNode` instead of `React.ReactNode`. Apply this convention consistently in new code.

## Styles

- Use `@use` or `@forward` for style imports, never `@import`.
- Import the variables partial with the `v` namespace: `@use "@/styles/variables" as v;` (or `@use "./variables" as v;` inside `src/styles/`), then reference variables as `v.$text-font`.
- Set fonts only through the variables `v.$heading-font` and `v.$text-font`, never with font names or `var(--heading-font)` / `var(--text-font)` directly.

## Commands

Package manager is **pnpm only** (`packageManager: pnpm@11.0.0`); don't use npm/yarn/bun.

```bash
pnpm dev              # dev server at http://localhost:3000
pnpm build            # production build (also type-checks)
pnpm start            # serve the production build
pnpm run lint         # ESLint (next core-web-vitals + typescript); does not check CSS/SCSS
pnpm run typecheck    # tsc --noEmit
```

## Architecture notes

- **App Router under `src/app/`.** The `@/*` path alias maps to `./src/*`.
- **Route types are generated.** `LayoutProps<"/">` in `layout.tsx` is a global type from `.next/types/routes.d.ts`, pulled in by `next-env.d.ts`. If `.next/` is missing (fresh clone or after cleanup), run `pnpm dev` or `pnpm build` once before `typecheck`. `next-env.d.ts` is generated and gitignored; don't edit it.
- **Global styles live in `src/styles/`.** `layout.tsx` imports only `@/styles/globals.scss`, whose first line is `@use "./reset"` (the `src/styles/_reset.scss` partial). Keep new global styles in `globals.scss`, after that `@use`. `src/app/` holds routes only.
- **The reset lives in `@layer reset`.** Every rule in `_reset.scss` sits inside that layer, so any unlayered style (in `globals.scss` or SCSS modules) overrides it no matter the import order or specificity.
- **SCSS modules.** Component styles live next to the component as `Component.module.scss` and are imported as `styles`. Shared SCSS variables live in `src/styles/_variables.scss`; other shared partials (e.g. mixins) go in `src/styles/_*.scss` next to `globals.scss`, created only when first needed.
- **Fonts.** Declared in `src/lib/fonts.ts` via `next/font/google`: Sofia Sans Condensed for headings (`--heading-font`) and Inter for body text (`--text-font`), both variable fonts, `latin` subset only. `layout.tsx` puts both `.variable` classes on `<html>`, so the CSS variables are available from `:root` down. `_variables.scss` wraps them as `$heading-font` / `$text-font` with a `sans-serif` fallback. Headings get their font explicitly in component modules; there is no global `h1`–`h6` font rule. Keep `adjustFontFallback` on (the default) to limit CLS; if a new font has no fallback metrics in Next (build warns `Failed to find font override values`), pick another font or define fallback overrides manually.
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
- Do not add automated signatures to commit messages, including `Generated with Claude Code` or `Co-Authored-By`.
- Use only a meaningful commit message following Conventional Commits.
- Before adding accessibility attributes (such as `aria-label`), please ask and provide a rationale for why they are needed in this specific instance.

## Verification

After making changes, run:

```bash
pnpm run lint
pnpm run typecheck
pnpm build
```

All checks should pass before considering the task complete.