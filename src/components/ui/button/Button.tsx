import type { ComponentProps, ReactNode } from "react";
import classNames from "classnames/bind";
import styles from "./Button.module.scss";

const cn = classNames.bind(styles);

type ButtonProps = ComponentProps<"button"> & {
  children: ReactNode;
};

export default function Button({ children, type = "button", className, ...rest }: ButtonProps) {
  return (
    <button type={type} className={cn("button", className)} {...rest}>
      {children}
    </button>
  );
}
