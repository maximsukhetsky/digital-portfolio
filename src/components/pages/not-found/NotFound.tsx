import classNames from "classnames/bind";
import ActionPanel from "@/components/ui/action-panel/ActionPanel";
import { arrowSVG } from "@/constants/icons";
import Spotlight from "./spotlight/Spotlight";
import styles from "./NotFound.module.scss";

const cn = classNames.bind(styles);

export default function NotFound() {
  return (
    <section className={cn("not-found", "wrapper")}>
      <Spotlight />
      <h1 className={cn("title")}>Page not found</h1>
      <p className={cn("description")}>
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <ActionPanel hideSocials label="Back to Home" href="/" icon={arrowSVG} />
    </section>
  );
}
