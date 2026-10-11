import type { ReactNode } from "react";
import classNames from "classnames/bind";
import styles from "./Label.module.scss";

const cn = classNames.bind(styles);

type LabelProps = {
  children: ReactNode;
  htmlFor: string;
};

export default function Label({ children, htmlFor }: LabelProps) {
  return (
    <label className={cn("label")} htmlFor={htmlFor}>
      {children}
    </label>
  );
}
