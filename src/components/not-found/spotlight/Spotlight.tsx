"use client";

import type { PointerEvent } from "react";
import styles from "./Spotlight.module.scss";
import classNames from "classnames/bind";

const cn = classNames.bind(styles);

const DIGITS = "404";

export default function Spotlight() {
  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const { currentTarget, clientX, clientY } = event;
    const rect = currentTarget.getBoundingClientRect();

    currentTarget.style.setProperty("--x", `${clientX - rect.left}px`);
    currentTarget.style.setProperty("--y", `${clientY - rect.top}px`);
  };

  return (
    <div onPointerMove={handlePointerMove} className={cn("spotlight")} aria-hidden="true">
      <span className={cn("digits")}>{DIGITS}</span>
      <span className={cn("digits", "digits--lit")}>{DIGITS}</span>
    </div>
  );
}
