import type { MouseEventHandler } from "react";
import classNames from "classnames/bind";
import Button from "@/components/ui/button/Button";
import styles from "./BurgerButton.module.scss";

const cn = classNames.bind(styles);

type BurgerButtonProps = {
  isOpen: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

export default function BurgerButton({ isOpen, onClick }: BurgerButtonProps) {
  return (
    <Button
      onClick={onClick}
      className={cn("burger", { open: isOpen })}
      aria-label={isOpen ? "Close menu" : "Open menu"}
      aria-expanded={isOpen}
    >
      <span className={cn("line")} />
      <span className={cn("line")} />
    </Button>
  );
}
