import Image from "next/image";
import heroPhoto from "@/assets/images/hero.webp";
import ContactPanel from "./contact-panel/ContactPanel";
import styles from "./HeroSection.module.scss";
import classNames from "classnames/bind";

const cn = classNames.bind(styles);

export default function HeroSection() {
  return (
    <section className={cn("hero", "wrapper")}>
      <div>
        <h1 className={cn("title")}>Hi, I am <br /> Maxim Sukhetsky.</h1>
        <p className={cn("description")}>
          A Kyiv-based Frontend Engineer passionate about building scalable, accessible, and user-friendly web applications.
        </p>
        <ContactPanel />
      </div>
      <Image
        src={heroPhoto}
        placeholder="blur"
        loading="eager"
        className={cn("photo")}
        alt="Maxim Sukhetsky"
      />
    </section>
  );
}
