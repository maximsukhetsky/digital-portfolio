import type { ComponentProps } from "react";
import classNames from "classnames/bind";
import styles from "./Input.module.scss";

const cn = classNames.bind(styles);

type InputProps = ComponentProps<"input"> & {
  hasError?: boolean;
};

export default function Input({ type = "text", hasError = false, className, ...rest }: InputProps) {
  return (
    <input
      type={type}
      className={cn("input", { "input--error": hasError }, className)}
      aria-invalid={hasError}
      {...rest}
    />
  );
}
