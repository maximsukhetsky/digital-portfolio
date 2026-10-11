import type { ComponentProps } from "react";
import classNames from "classnames/bind";
import styles from "./Textarea.module.scss";

const cn = classNames.bind(styles);

type TextareaProps = ComponentProps<"textarea"> & {
  hasError?: boolean;
};

export default function Textarea({ hasError = false, className, ...rest }: TextareaProps) {
  return (
    <textarea
      className={cn("textarea", { "textarea--error": hasError }, className)}
      aria-invalid={hasError}
      {...rest}
    />
  );
}
