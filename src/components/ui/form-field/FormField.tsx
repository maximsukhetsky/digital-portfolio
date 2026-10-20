import type { ReactNode } from "react";
import classNames from "classnames/bind";
import Label from "@/components/ui/label/Label";
import styles from "./FormField.module.scss";

const cn = classNames.bind(styles);

type FormFieldProps = {
  children: ReactNode;
  label: string;
  error?: string;
  htmlFor: string;
  className?: string;
};

export default function FormField({ children, label, error, htmlFor, className }: FormFieldProps) {
  return (
    <div className={className}>
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
      {error && (
        <span className={cn("error")} role="alert" id={`${htmlFor}-error`}>
          {error}
        </span>
      )}
    </div>
  );
}
