import Image from "next/image";
import classNames from "classnames/bind";
import portraitNeutral from "@/assets/images/portrait-neutral.webp";
import ActionPanel from "@/components/ui/action-panel/ActionPanel";
import { AUTHOR_NAME } from "@/constants/common";
import { arrowDownSVG } from "@/constants/icons";
import styles from "./HeroSection.module.scss";

const cn = classNames.bind(styles);

export default function HeroSection() {
  return (
    <section className={cn("hero", "wrapper")}>
      <div className={cn("intro")}>
        <h1 className={cn("title")}>
          Hi, I am <br /> {AUTHOR_NAME}.
        </h1>
        <p className={cn("description")}>
          A Kyiv-based Frontend Engineer passionate about building scalable, accessible, and
          user-friendly web applications.
        </p>
        <ActionPanel label="Contact Me" href="/#contact" icon={arrowDownSVG} />
      </div>
      <Image
        src={portraitNeutral}
        placeholder="blur"
        loading="eager"
        className={cn("photo")}
        alt={AUTHOR_NAME}
      />
    </section>
  );
}
