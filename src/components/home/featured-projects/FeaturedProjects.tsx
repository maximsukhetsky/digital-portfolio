import styles from "./FeaturedProjects.module.scss";
import classNames from "classnames/bind";
import ProjectCard from "./project-card/ProjectCard";
import { PROJECTS } from "@/lib/projects";

const cn = classNames.bind(styles);

export default function FeaturedProjects() {
  const projectsCards = PROJECTS.map((project) => (
    <ProjectCard key={project.id} project={project} />
  ));

  return (
    <section className={cn("featured-projects", "wrapper")}>
      <div className={cn("heading")}>
        <h2 className={cn("title")}>Featured Projects</h2>
        <p className={cn("subtitle")}>Here are some of the selected projects that showcase my passion for front-end development.</p>
      </div>
      <div className={cn("projects-cards")}>{projectsCards}</div>
    </section>
  );
}
