"use client";

import type { CSSProperties } from "react";
import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./PageTitle.module.scss";

const cn = classNames.bind(styles);

// Titles already typed in this tab: revisiting a page via client navigation shows its title at once.
const animatedTitles = new Set<string>();

type PageTitleProps = {
  lines: string[];
  className?: string;
};

export default function PageTitle({ lines, className }: PageTitleProps) {
  const titleText = lines.join(" ");
  const [shouldAnimate] = useState(() => !animatedTitles.has(titleText));

  useEffect(() => {
    animatedTitles.add(titleText);
  }, [titleText]);

  // Character offset of each line, so typing continues across lines.
  const lineOffsets = lines.map((_, index) => {
    return [...lines.slice(0, index).join("")].length;
  });

  return (
    <h1 className={cn("page-title", { "page-title--typing": shouldAnimate }, className)} aria-label={titleText}>
      {lines.map((line, lineIndex) => (
        <span key={line} className={cn("line")} aria-hidden="true">
          {[...line].map((char, charIndex) => (
            <span
              key={charIndex}
              className={cn("char")}
              style={{ "--char-index": lineOffsets[lineIndex] + charIndex } as CSSProperties}
            >
              {char}
            </span>
          ))}
        </span>
      ))}
    </h1>
  );
}
