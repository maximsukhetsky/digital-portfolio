import Image from "next/image";
import classNames from "classnames/bind";
import type { Course } from "@/lib/education/types";
import styles from "./CourseCard.module.scss";

const cn = classNames.bind(styles);

type CourseCardProps = Course;

export default function CourseCard({ title, provider, location, period, certificate }: CourseCardProps) {
  return (
    <li className={cn("course-card")}>
      <h3 className={cn("title")}>{title}</h3>
      <p className={cn("provider")}>{provider}</p>
      <p className={cn("meta")}>{location} · {period}</p>
      {certificate && (
        <a href={certificate.url} target="_blank" rel="noopener noreferrer" className={cn("certificate")}>
          <Image
            src={certificate.image}
            width={certificate.width}
            height={certificate.height}
            sizes="(min-width: 648px) 600px, 100vw"
            className={cn("image")}
            alt={`${provider} certificate`}
          />
        </a>
      )}
    </li>
  );
}
