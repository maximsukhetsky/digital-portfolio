---
name: create-component
description: Створює компонент для Next.js (App Router) з SCSS-модулем. Аргументи - директорія компонента, назва, тип (server|client)
argument-hint: <directory> <ComponentName> [server|client]
disable-model-invocation: true
allowed-tools: Read, Write, Glob
---

## Create component

Створи компонент `$1` у директорії `$0`. Тип компонента: `$2` (якщо не вказано — server).

### Перед створенням
- Назва має бути в PascalCase. Якщо ні — перетвори й повідом.
- Директорія має бути в kebab-case (`site-header/site-nav`). Якщо ні — перетвори й повідом.
- Якщо `$0/$1.tsx` вже існує — нічого не створюй, зупинись і перепитай.

### Структура

```
$0/
├── $1.tsx
└── $1.module.scss
```

Не створюй `index.ts`.

### Правила
- Компонент створюється без пропсів. Коли пропси знадобляться — додай `type $1Props = { ... }` (через `type`, не `interface`) і деструктуризуй їх у сигнатурі.
- Стилі тільки через SCSS-модуль поруч: `import styles from "./$1.module.scss"`.
- Класи — через `const cn = classNames.bind(styles)`.
- Кореневий клас — назва компонента в kebab-case (`ContactForm` → `contact-form`).
- **client**: першим рядком `"use client";`. Хуки й обробники подій дозволені.
- **server**: без `"use client"`, без хуків і обробників подій. Може бути `async`, якщо потрібні дані.
- Дотримуйся конвенцій з CLAUDE.md (порядок пропсів, `import type`, подвійні лапки, 2 пробіли).

### Шаблон

```tsx
import classNames from "classnames/bind";
import styles from "./$1.module.scss";

const cn = classNames.bind(styles);

export default function $1() {
  return <div className={cn("<kebab-name>")}></div>;
}
```

```scss
.<kebab-name> {
}
```

Після створення коротко виведи список створених файлів.
