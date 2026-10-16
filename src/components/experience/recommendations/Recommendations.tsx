import classNames from "classnames/bind";
import { LINKEDIN_RECOMMENDATIONS_URL, RECOMMENDATIONS } from "@/lib/experience/constants";
import { arrowSVG } from "@/constants/icons";
import TextLink from "@/components/ui/text-link/TextLink";
import RecommendationCard from "./recommendation-card/RecommendationCard";
import styles from "./Recommendations.module.scss";

const cn = classNames.bind(styles);

export default function Recommendations() {
  return (
    <section className={cn("recommendations", "wrapper")}>
      <h2 className={cn("title")}>Recommendations</h2>
      <ul className={cn("cards")}>
        {RECOMMENDATIONS.map((recommendation) => (
          <RecommendationCard key={recommendation.name} {...recommendation} />
        ))}
      </ul>
      <TextLink href={LINKEDIN_RECOMMENDATIONS_URL} target="_blank" rel="noopener noreferrer" icon={arrowSVG}>
        View all on LinkedIn
      </TextLink>
    </section>
  );
}
