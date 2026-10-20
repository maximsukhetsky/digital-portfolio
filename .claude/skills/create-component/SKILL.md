---
name: create-component
description: Creates a Next.js (App Router) component with an SCSS module. Arguments - component directory, name, type (server|client)
argument-hint: <directory> <ComponentName> [server|client]
disable-model-invocation: true
allowed-tools: Read, Write, Glob
---

## Create component

Create the component `$1` in the directory `$0`. Component type: `$2` (server if not specified).

### Before creating

- The name must be in PascalCase. If it isn't, convert it and say so.
- The directory must be in kebab-case (`site-header/site-nav`). If it isn't, convert it and say so.
- If `$0/$1.tsx` already exists, create nothing, stop and ask.

### Structure

```
$0/
├── $1.tsx
└── $1.module.scss
```

Do not create an `index.ts`.

### Rules

- The component is created without props. When props are needed, add `type $1Props = { ... }` (use `type`, not `interface`) and destructure them in the signature.
- Styles only through the adjacent SCSS module: `import styles from "./$1.module.scss"`.
- Classes through `const cn = classNames.bind(styles)`.
- The root class is the component name in kebab-case (`ContactForm` → `contact-form`).
- **client**: `"use client";` as the first line. Hooks and event handlers are allowed.
- **server**: no `"use client"`, no hooks and no event handlers. May be `async` if it needs data.
- Follow the conventions in CLAUDE.md (props order, `import type`, double quotes, 2-space indentation).

### Template

```tsx
import classNames from "classnames/bind";
import styles from "./$1.module.scss";

const cn = classNames.bind(styles);

export default function $1() {
  return <div className={cn("<kebab-name>")}></div>;
}
```

```scss
.<kebab-name > {
}
```

After creating, briefly list the created files.
