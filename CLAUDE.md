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

### General

- Use TypeScript for all application code.
- Prefer Server Components by default.
- Use `"use client"` only when client-side interactivity or browser APIs are required.
- Keep components small and focused on a single responsibility.
- Prefer reusable components over duplicated UI logic.
- Keep business logic separate from presentation when appropriate.
- Follow the existing project structure and conventions before introducing new patterns.
- Do not add dependencies unless they are actually necessary.
- Avoid unnecessary abstractions.
- Avoid premature optimization.
- Do not introduce code that is not required for the current task.
- Preserve existing functionality unless the task explicitly requires changing it.
- Prefer the smallest change that solves the problem.
- Do not modify unrelated files.
- Use a mobile-first approach when building the architecture.
- Don't use `useEffect` unnecessarily; use it only when a specific subscription is required or to handle a side effect.
- Do not use single-line arrow functions.

### Imports

- Use named type imports from React with `import type`, such as `ReactNode` instead of `React.ReactNode`. Apply this convention consistently in new code.

### Event Handler Naming

Use consistent naming conventions for event handlers:

- Use `on<Event>` for event handler props passed into a component, e.g. `onClick`, `onSubmit`, `onChange`.
- Use `handle<Event>` for internal event handler functions, e.g. `handleClick`, `handleSubmit`, `handleChange`.

### Props Ordering

When defining component props or passing props to JSX elements, keep them ordered from most important to least important:

1. **Core/content props** — props that define the component's primary purpose or content (`children`, `label`, `title`, `value`, `items`, etc.).
2. **Variant/configuration props** — props that define the component's type, appearance, or main configuration (`variant`, `size`, `type`, etc.).
3. **Boolean/state props** — boolean props that control the component's state or behavior (`disabled`, `loading`, `open`, `active`, `required`, etc.).
4. **Event/callback props** — event handlers and callbacks (`onClick`, `onChange`, `onSubmit`, `onClose`, etc.).
5. **Styling props** — styling and layout-related props, with `className` first (`className`, `style`, etc.).
6. **Accessibility props** — accessibility-related attributes (`aria-*`, `role`, etc.).
7. **Technical/HTML attributes** — remaining technical or native attributes (`id`, `data-*`, `tabIndex`, etc.).

`key` always comes first, before all other props.

Keep the ordering consistent across the codebase. Do not order props alphabetically unless explicitly required by the project.

When several props have the same priority, keep their existing logical order rather than reordering them unnecessarily.

## Components

- Organize component files according to their logical ownership and hierarchy.
- Nest child components inside the directory of the component they belong to.
- For example, if `NavLink` is an internal part of `SiteNav`, and `SiteNav` is an internal part of `SiteHeader`, use the following structure:
  `site-header/site-nav/SiteNav.tsx`
  `site-header/site-nav/nav-link/NavLink.tsx`
- Name component directories in kebab-case (`site-header/`, `nav-link/`); component files stay in PascalCase (`SiteHeader.tsx`).
- Keep each component's styles next to its component file.
- Do not nest components that are independent, reusable across unrelated components, or part of a shared component library.

## Styles

### SCSS

- Use `@use` or `@forward` for style imports, never `@import`.
- Import the variables partial with the `v` namespace: `@use "@/styles/variables" as v;` (or `@use "./variables" as v;` inside `src/styles/`), then reference variables as `v.$text-font`.
- Set fonts only through the variables `v.$heading-font` and `v.$text-font`, never with font names or `var(--heading-font)` / `var(--text-font)` directly.
- Set text sizing through the typography mixin: `@use "@/styles/typography" as t;`, then `@include t.text($size, $line-height, $weight)` (last two optional). A `px` line-height is converted to a unitless ratio; a unitless one is output as is. The mixin does not set `font-family`.
- Use the full property name. For example, use `background-color: #000` instead of `background: #000`.

### Responsive Design

- Write styles mobile-first with `min-width` breakpoints only: `@use "@/styles/breakpoints" as bp;`.
- Base styles target mobile (0–767px).
- Use `@include bp.from(tablet) { ... }` for ≥ 768px.
- Use `@include bp.from(desktop) { ... }` for ≥ 1024px.
- Never hardcode breakpoint widths in `@media`.

### CSS/SCSS Declaration Order

Group CSS/SCSS declarations by logical purpose. Prefer the following order when applicable:

1. **Positioning**
    - `position`
    - `inset`
    - `top`
    - `right`
    - `bottom`
    - `left`
    - `z-index`

2. **Layout**
    - `display`
    - `flex-*`
    - `grid-*`
    - `align-*`
    - `justify-*`
    - `order`
    - `gap`
    - `overflow`

3. **Dimensions and spacing**
    - `width`
    - `min-width`
    - `max-width`
    - `height`
    - `min-height`
    - `max-height`
    - `margin`
    - `padding`

4. **Typography**
    - `font-*`
    - `line-height`
    - `letter-spacing`
    - `text-*`
    - `white-space`
    - `word-*`

5. **Visual styling**
    - `color`
    - `background-*`
    - `border-*`
    - `border-radius`
    - `box-shadow`
    - `opacity`
    - `visibility`

6. **Effects and interaction**
    - `cursor`
    - `pointer-events`
    - `user-select`
    - `appearance`
    - `transition`
    - `transform`, `translate`, `rotate`, `scale`
    - `clip-path`
    - `animation`

Keep pseudo-elements and state-specific styles after the base declarations. Do not force declarations into a group when doing so would reduce readability.

## Architecture

- **App Router under `src/app/`.** The `@/*` path alias maps to `./src/*`.
- **Route types are generated.** `LayoutProps<"/">` in `layout.tsx` is a global type from `.next/types/routes.d.ts`, pulled in by `next-env.d.ts`.
- If `.next/` is missing (fresh clone or after cleanup), run `pnpm dev` or `pnpm build` once before `typecheck`.
- `next-env.d.ts` is generated and gitignored; don't edit it.

### Global Styles

- Global styles live in `src/styles/`.
- `layout.tsx` imports only `@/styles/globals.scss`.
- The first line of `globals.scss` is `@use "./reset"` (the `src/styles/_reset.scss` partial).
- Keep new global styles in `globals.scss`, after that `@use`.
- `src/app/` holds routes only.

### Reset

- The reset lives in `@layer reset`.
- Every rule in `_reset.scss` sits inside that layer, so any unlayered style in `globals.scss` or SCSS modules overrides it regardless of import order or specificity.

### SCSS Modules

- Component styles live next to the component as `Component.module.scss` and are imported as `styles`.
- Shared SCSS variables live in `src/styles/_variables.scss`.
- Other shared partials (e.g. mixins) go in `src/styles/_*.scss` next to `globals.scss`.
- Create shared partials only when first needed.

### Fonts

- Fonts are declared in `src/lib/fonts.ts` via `next/font/google`.
- Sofia Sans Condensed is used for headings (`--heading-font`).
- Inter is used for body text (`--text-font`).
- Both are variable fonts with the `latin` subset only.
- `layout.tsx` puts both `.variable` classes on `<html>`, so the CSS variables are available from `:root` down.
- `_variables.scss` wraps them as `$heading-font` / `$text-font` with a `sans-serif` fallback.
- Headings get their font explicitly in component modules; there is no global `h1`–`h6` font rule.
- Keep `adjustFontFallback` on (the default) to limit CLS.
- If a new font has no fallback metrics in Next (build warns `Failed to find font override values`), pick another font or define fallback overrides manually.

### Metadata

- `title` and `description` are defined in `src/app/layout.tsx`.

## Accessibility

- Before adding accessibility attributes (such as `aria-label`), ask and provide a rationale for why they are needed in the specific instance.

## Before Making Changes

Before modifying code:

1. Inspect the relevant files and understand the existing implementation.
2. Check related components, styles, types, and data sources.
3. Follow existing project conventions.
4. Prefer the smallest change that solves the problem.
5. Do not modify unrelated files.

## Commands

Package manager is **pnpm only** (`packageManager: pnpm@11.0.0`); don't use npm/yarn/bun.

```bash
pnpm dev              # dev server at http://localhost:3000
pnpm build            # production build (also type-checks)
pnpm start            # serve the production build
pnpm run lint         # ESLint (next core-web-vitals + typescript); does not check CSS/SCSS
pnpm run typecheck    # tsc --noEmit
```

## Git

- Do not create commits unless explicitly requested.
- Do not modify Git history.
- Use Conventional Commits with the following types: `feat`, `fix`, `chore`, `refactor`, `test`, `docs`.
- Never push a direct change to `main` branch. Only feature branches via PRs.
- Do not reset, revert, or discard user changes unless explicitly requested.
- Keep commits focused and avoid unrelated changes.
- Do not add automated signatures to commit messages, including `Generated with Claude Code` or `Co-Authored-By`.
- Use only a meaningful commit message following Conventional Commits.

## Verification

After making changes, run:

```bash
pnpm run lint
pnpm run typecheck
pnpm build
```