import classNames from "classnames/bind";
import DocumentImage from "@/components/pages/education/document-image/DocumentImage";
import type { EducationEntry } from "@/lib/education/types";
import styles from "./EducationItem.module.scss";

const cn = classNames.bind(styles);

type EducationItemProps = EducationEntry;

export default function EducationItem({
  degree,
  institution,
  location,
  period,
  diploma,
}: EducationItemProps) {
  return (
    <li className={cn("education-item")}>
      <h2 className={cn("degree")}>{degree}</h2>
      <p className={cn("period")}>
        {location} · {period}
      </p>
      <p className={cn("institution")}>{institution}</p>
      {diploma && <DocumentImage {...diploma} alt={`${institution} diploma`} />}
    </li>
  );
}
