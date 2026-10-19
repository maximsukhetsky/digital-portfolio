import classNames from "classnames/bind";
import type { Recommendation } from "@/lib/experience/types";
import styles from "./RecommendationCard.module.scss";

const cn = classNames.bind(styles);

type RecommendationCardProps = Recommendation;

export default function RecommendationCard({ name, initials, headline, relationship, date, text, linkedinUrl }: RecommendationCardProps) {
  return (
    <li className={cn("recommendation-card")}>
      <div className={cn("author")}>
        <span className={cn("avatar")}>{initials}</span>
        <div className={cn("info")}>
          <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className={cn("name")}>
            {name}
          </a>
          <p className={cn("headline")}>{headline}</p>
          <p className={cn("meta")}>
            {date} · {relationship}
          </p>
        </div>
      </div>
      <blockquote className={cn("text")}>
        {text.map((paragraph) => (
          <p key={paragraph} className={cn("paragraph")}>
            {paragraph}
          </p>
        ))}
      </blockquote>
    </li>
  );
}
