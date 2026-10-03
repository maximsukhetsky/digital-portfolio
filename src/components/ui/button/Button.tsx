import type { ComponentProps, MouseEventHandler, ReactNode } from "react";
import classNames from "classnames/bind";
import styles from "./Button.module.scss";

const cn = classNames.bind(styles);

type ButtonProps = ComponentProps<"button"> & {
  children: ReactNode;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

export default function Button({ children, type = "button", onClick, className, ...rest }: ButtonProps) {
  return (
    <button type={type} onClick={onClick} className={cn("button", className)} {...rest}>
      {children}
    </button>
  );
}
