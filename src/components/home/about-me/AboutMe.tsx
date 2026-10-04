import Image from "next/image";
import heroPhoto from "@/assets/images/hero-photo.webp";
import TextLink from "@/components/ui/text-link/TextLink";
import styles from "./AboutMe.module.scss";
import classNames from "classnames/bind";

const cn = classNames.bind(styles);

export default function AboutMe() {
  return (
    <section className={cn("about-me", "wrapper")}>
      <h2 className={cn("title")}>About me</h2>
      <p className={cn("description")}>I’m a Frontend Engineer with 5+ years of commercial experience building web applications with React, TypeScript, and JavaScript.</p>
      <p className={cn("description")}>I enjoy working on complex interfaces, designing reusable solutions, and turning challenging requirements into reliable, scalable products. I’ve worked with Micro Frontends, complex data-driven features, API integrations, and performance optimization, while taking ownership of features from planning to production.</p>
      <p className={cn("description")}>I’m always curious about better ways to build software and continuously explore new technologies and tools, including AI-assisted development.</p>
      <div className={cn("photo-box")}>
        <Image src={heroPhoto} placeholder="blur" className={cn("photo")} alt="Maxim Sukhetsky" />
      </div>
      <TextLink href="/about">More about me</TextLink>
    </section>
  );
}
