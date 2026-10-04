import type { ComponentProps, ReactNode } from "react";
import Link from "next/link";
import classNames from "classnames/bind";
import styles from "./TextLink.module.scss";

const cn = classNames.bind(styles);

type TextLinkProps = ComponentProps<typeof Link> & {
  children: ReactNode;
  icon?: ReactNode;
};

export default function TextLink({ children, icon, className, ...rest }: TextLinkProps) {
  return (
    <Link className={cn("text-link", className)} {...rest}>
      {children}
      {icon && <span className={cn("icon")}>{icon}</span>}
    </Link>
  );
}
