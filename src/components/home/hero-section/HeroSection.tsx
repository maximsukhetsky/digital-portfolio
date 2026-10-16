import Image from "next/image";
import portraitNeutral from "@/assets/images/portrait-neutral.webp";
import { AUTHOR_NAME } from "@/constants/common";
import { arrowSVG } from "@/constants/icons";
import ActionPanel from "@/components/ui/action-panel/ActionPanel";
import styles from "./HeroSection.module.scss";
import classNames from "classnames/bind";

const cn = classNames.bind(styles);

export default function HeroSection() {
  return (
    <section className={cn("hero", "wrapper")}>
      <div className={cn("intro")}>
        <h1 className={cn("title")}>Hi, I am <br /> {AUTHOR_NAME}.</h1>
        <p className={cn("description")}>
          A Kyiv-based Frontend Engineer passionate about building scalable, accessible, and user-friendly web applications.
        </p>
        <ActionPanel label="Contact Me" href="/contact" icon={arrowSVG} />
      </div>
      <Image src={portraitNeutral} placeholder="blur" loading="eager" className={cn("photo")} alt={AUTHOR_NAME} />
    </section>
  );
}
