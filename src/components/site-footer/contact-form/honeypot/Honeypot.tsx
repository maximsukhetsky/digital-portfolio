import classNames from "classnames/bind";
import Label from "@/components/ui/label/Label";
import Input from "@/components/ui/input/Input";
import { HONEYPOT_FIELD } from "@/lib/contact-form/constants";
import styles from "./Honeypot.module.scss";

const cn = classNames.bind(styles);

export default function Honeypot() {
  return (
    <div className={cn("honeypot")} aria-hidden="true">
      <Label htmlFor={HONEYPOT_FIELD}>Website</Label>
      <Input autoComplete="off" id={HONEYPOT_FIELD} name={HONEYPOT_FIELD} tabIndex={-1} />
    </div>
  );
}
