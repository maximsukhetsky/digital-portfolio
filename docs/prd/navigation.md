# PRD: Site navigation with mobile burger menu

## 1. Goal and scope

- Below the `tablet` breakpoint, the navigation collapses into a burger menu.
- From `tablet` up, the navigation stays inline, as it is today.
- Work is limited to `src/components/site-header/`, plus one new global partial for breakpoints (`src/styles/_breakpoints.scss`).
- The existing architecture does not change: `src/app/layout.tsx`, `src/lib/navigation.ts` (`NAV_ITEMS`), `src/components/ui/button/` and the global `.wrapper` stay as they are.
- No new dependencies.

### Current state

- `SiteHeader.tsx` is a Server Component. It renders the logo and a `<nav>` with one `NavLink` per `NAV_ITEMS` entry, using `classnames/bind`.
- `NavLink.tsx` is a Client Component that sets `aria-current="page"` from `usePathname()`.
- `scripts/smoke.test.mjs` asserts exactly one `aria-current="page"` link per page. The navigation must therefore be rendered **once**, with no duplicated mobile copy.

## 2. Breakpoint convention (project-wide)

- New partial `src/styles/_breakpoints.scss`, imported with the `bp` namespace: `@use "@/styles/breakpoints" as bp;`.
- Mobile-first, `min-width` only:

| Name | Range | How to target |
|---|---|---|
| `mobile` | 0–767px | Base styles, no media query |
| `tablet` | ≥ 768px | `@include bp.from(tablet) { ... }` |
| `desktop` | ≥ 1024px | `@include bp.from(desktop) { ... }` |

- An unknown name fails the build with `@error`. A `max-width` mixin is intentionally not provided.

```scss
@use "sass:map";

$breakpoints: (
  tablet: 768px,
  desktop: 1024px,
);

@mixin from($name) {
  @if not map.has-key($breakpoints, $name) {
    @error "bp.from(): unknown breakpoint `#{$name}`. Use: #{map.keys($breakpoints)}.";
  }

  @media (min-width: map.get($breakpoints, $name)) {
    @content;
  }
}
```

- When this is implemented, add a rule to the Styles section of `CLAUDE.md` describing the convention.

## 3. File structure (`src/components/site-header/`)

| File | Kind | Responsibility |
|---|---|---|
| `SiteHeader.tsx` | Server | Logo and `<SiteNav />` |
| `SiteHeader.module.scss` | Styles | `.header` and `.logo` only; `.nav` moves to `SiteNav.module.scss`, `.link` to `NavLink.module.scss` |
| `site-nav/SiteNav.tsx` | `"use client"` | Menu state; renders `BurgerButton` and the single `<nav>` with `NavLink`s |
| `site-nav/SiteNav.module.scss` | Styles | Mobile panel, inline layout from `tablet`, scroll lock |
| `site-nav/burger-button/BurgerButton.tsx` | Component | Wraps `ui/button/Button`; two-line icon (`<span className={cn("line")} />` ×2); receives `isOpen` and `onClick` |
| `site-nav/burger-button/BurgerButton.module.scss` | Styles | Lines, open/close animation, hidden from `tablet` |
| `site-nav/nav-link/NavLink.tsx` | Client, no directive | Takes `isMenuOpen` (adds its own `open` class) and an optional `onClick` |
| `site-nav/nav-link/NavLink.module.scss` | Styles | Link typography, staggered reveal on `.link.open`, reset from `tablet` |

`SiteNav.tsx` is the only `"use client"` entry. `NavLink` and `BurgerButton` take function props (`onClick`), so they must not have the directive: an entry file's props must be serializable (TS71007). They become client code because only `SiteNav` imports them.

## 4. Behavior

- **Plain local state, no `useEffect`, no `pathname`.** `SiteNav` keeps a single boolean:

  ```tsx
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen((open) => !open);
  const close = () => setIsOpen(false);
  ```

- The burger button calls `toggle`.
- Every `NavLink` in the panel gets `onClick={close}`, so clicking any menu link closes the menu, including the link to the current page.
- The logo cannot be clicked while the menu is open, because the panel covers it (see section 9). No extra handling is needed for it.
- **Accepted limitation:** browser back/forward (including the mobile swipe gesture) does not close the menu. `SiteHeader` lives in `layout.tsx` and does not remount on navigation, so the menu stays open over the new page until the user taps the close button.
- **Escape does not close the menu.** No `useEffect`, no `keydown` listeners.
- From `tablet` up, the burger button is hidden and the `<nav>` is always visible inline. CSS does this regardless of `isOpen`.
- The open state reaches the styles through a class: `cn("nav", { open: isOpen })`, `cn("burger", { open: isOpen })`.

## 5. Burger icon and animation

Two lines. No SVG, no libraries, only CSS transitions driven by the `.open` class.

**Closed:** the top line is 24px wide and the bottom line 14px, aligned right. The lines are 8px apart.

**Opening (two-step, the signature motion):**

1. **Converge** (0–200ms): both lines slide to the center, and the bottom line stretches to 24px.
2. **Snap rotate** (200–500ms): the lines rotate to `45deg` / `-45deg` with an overshooting easing, `cubic-bezier(.68, -.6, .32, 1.6)`, so the cross clicks into place.

**Closing:** the same steps in reverse. The lines un-rotate first, then separate. The order flips because `.line` and `.open .line` set different `transition-delay` values.

```scss
.line {
  position: absolute;
  top: 50%;
  right: 0;
  width: 24px;
  height: 2px;
  margin-top: -1px;
  border-radius: 2px;
  background: #C7C7C7;
  transition:
    translate 0.2s ease 0.3s,
    width 0.2s ease 0.3s,
    rotate 0.3s cubic-bezier(.68, -.6, .32, 1.6) 0s;

  &:nth-child(1) {
    translate: 0 -4px;
  }

  &:nth-child(2) {
    translate: 0 4px;
    width: 14px;
  }
}

.open .line {
  translate: 0 0;
  width: 24px;
  transition-delay: 0s, 0s, 0.2s;

  &:nth-child(1) {
    rotate: 45deg;
  }

  &:nth-child(2) {
    rotate: -45deg;
  }
}

@media (prefers-reduced-motion: reduce) {
  .line {
    transition: none;
  }
}
```

- The button's hit area is at least 44×44px, with the lines centered inside it.
- Use the individual `translate` / `rotate` properties, not `transform`, so each one can have its own delay.


## 6. Mobile panel animation

All motion lasts **500ms**, the same as the icon, so the button and the panel move as one gesture. CSS transitions only, driven by `.nav.open`.

**Opening:**

1. **Circular reveal** (0–500ms): the panel grows out of the burger button as an expanding circle, `clip-path: circle(0 at <button center>)` → `circle(150vmax at <button center>)`, with `cubic-bezier(.77, 0, .18, 1)`.
2. **Staggered links** (100–500ms): each link slides up 24px and fades in. Each one starts 50ms after the previous one (300ms per link), so the last link lands exactly at 500ms.

**Closing:** the links fade out together (150ms), then the circle collapses back into the button. The panel switches to `visibility: hidden` only after the transition ends.

```scss
// Center of the burger button: wrapper padding (16px) + half the button (22px)
// from the right, header padding-top (32px) + half the row height (16px) from the top.
$origin: calc(100% - 38px) 48px;

.nav {
  position: fixed;
  inset: 0;
  z-index: 2;
  visibility: hidden;
  clip-path: circle(0 at $origin);
  background: #0A0A0A;
  transition:
    clip-path 0.35s cubic-bezier(.77, 0, .18, 1) 0.15s,
    visibility 0s linear 0.5s;

  &.open {
    visibility: visible;
    clip-path: circle(150vmax at $origin);
    transition:
      clip-path 0.5s cubic-bezier(.77, 0, .18, 1),
      visibility 0s;
  }
}

// NavLink.module.scss: SiteNav passes `isMenuOpen`, NavLink adds its own `.open` class.
.link {
  opacity: 0;

  translate: 0 24px;
  transition: opacity 0.15s ease, translate 0.15s ease;

  &.open {
    opacity: 1;

    translate: 0 0;
    transition-duration: 0.3s;

    @for $i from 1 through 6 {
      &:nth-child(#{$i}) {
        transition-delay: 0.1s + ($i - 1) * 0.05s;
      }
    }
  }
}
```

- `prefers-reduced-motion: reduce` sets `transition: none` on `.nav`, `.nav.open` and `.link`. Each module nests it inside its own rule.
- CSS Modules scope class names per file, so `NavLink.module.scss` cannot target the `.open` class from `SiteNav.module.scss`. That is why the open state reaches the links through a prop.

- `$origin` duplicates header and button sizes. If the header padding or the button size changes, update `$origin` to match.
- The `@for` loop covers up to 6 links (there are 3 today), so adding a nav item needs no style change.
- From `tablet` up, all of this is reset: no `clip-path`, `visibility: visible`, links at `opacity: 1` with no `translate` or transition.

## 7. Scroll lock

While the menu is open, the page underneath does not scroll. This is CSS only, in `SiteNav.module.scss`:

```scss
:global(body):has(.nav.open) {
  overflow: hidden;

  @include bp.from(tablet) {
    overflow: visible;
  }
}
```

- The `tablet` reset matters. If the user opens the menu and then widens the window, `isOpen` stays `true`, and without the reset the page would stay locked on tablet and desktop.

## 8. Accessibility (critical for screen readers only)

Approved scope: only the attributes without which a screen-reader user cannot use the menu.

| What | Where | Why it is critical |
|---|---|---|
| `aria-label={isOpen ? "Close menu" : "Open menu"}` | Burger button | The button contains only two empty decorative `<span>`s. Without a name, a screen reader announces just "button", and the user cannot tell what it does. |
| `aria-expanded={isOpen}` | Burger button | Announces whether the menu is open or closed. Without it, the user does not know that pressing the button changed anything. |
| `visibility: hidden` on the closed panel | CSS, `.nav` | Not an attribute. It removes the hidden links from the accessibility tree and the Tab order. `clip-path` alone only hides them visually, so a screen reader would still read invisible links. |

Intentionally not added:

- `aria-controls`: screen readers support it poorly, and the button already sits right before the `<nav>` in the DOM.
- `aria-hidden` on the lines: the `<span>`s are empty, so there is nothing to announce.
- Focus trap / `inert` on the content under the panel: the logo under the open overlay is still reachable with Tab. This is an accepted limitation for now.

## 9. Layout requirements

- Mobile-first: the base styles describe the mobile panel. `@include bp.from(tablet)` restores today's inline row (`gap: 32px`).
- The mobile panel is a full-screen overlay (`position: fixed; inset: 0; z-index: 2`) on the page background (`#0A0A0A`), with the links stacked vertically. It covers the whole header, logo included.
- The burger / close button sits above the panel (`position: relative; z-index: 3`), so it stays visible and clickable in both states. It stays in the header markup; only the stacking order changes.
- **Markup stays `nav > a`.** No `<ul>/<li>`. The vertical stack on mobile comes from `display: flex; flex-direction: column` on `.nav`.
- From `tablet` up, the panel styles are reset (`position: static`, no `z-index`, no `clip-path`, transparent background, `flex-direction: row`), and the button is hidden.
- Fonts come from `v.$heading-font` / `v.$text-font`, text sizing from `t.text(...)`, and media queries from `bp.from(...)`.

## 10. Decisions

All questions are resolved.

1. **Mobile panel:** a full-screen overlay that covers the header (`z-index: 2`), with the close button above it (`z-index: 3`).
2. **Scroll lock:** yes, CSS only (section 7).
3. **Accessibility:** only the critical attributes (section 8).
4. **Animation:** two-line icon morph (section 5) plus a circular reveal with staggered links (section 6).
5. **Duration:** 500ms for both the icon and the panel.
6. **Markup:** `nav > a`, no `<ul>/<li>`.
7. **Closing:** plain `isOpen` state; browser back/forward does not close the menu (section 4).
8. **Breakpoints:** `tablet` from 768px, `desktop` from 1024px (section 2). These match the Tailwind / Bootstrap convention and keep each main device group in one range: phones in portrait (360–430px) are `mobile`, iPads in portrait (810–834px) are `tablet`. iPad mini in portrait (744px) falls into `mobile` and gets the burger, which is accepted.

## 11. Acceptance criteria

- Below 768px, only the logo and the burger are visible. A click opens or closes the panel, and clicking any link closes it.
- The open panel covers the whole header, logo included. Only the close button stays above it and remains clickable.
- The two lines turn into a cross in two steps (converge, then snap rotate), and closing plays the steps in reverse.
- The panel opens as a circle growing from the button, with the links appearing one after another. Closing reverses it. Everything finishes within 500ms.
- With `prefers-reduced-motion: reduce`, nothing is animated.
- The page does not scroll while the menu is open. From 768px up, scrolling always works.
- A screen reader announces the button as "Open menu" / "Close menu", announces its expanded / collapsed state, and does not read the links while the panel is closed.
- From 768px up, the inline navigation looks as it does today, and the burger is hidden.
- The markup is `nav > a`, and each page has exactly one `aria-current="page"` link, so `pnpm smoke` passes.
- `src/components/site-header/` contains no `useEffect`.
- `pnpm run lint`, `pnpm run typecheck` and `pnpm build` pass.
