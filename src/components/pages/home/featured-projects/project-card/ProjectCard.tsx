import Image from "next/image";
import styles from "./ProjectCard.module.scss";
import classNames from "classnames/bind";
import TextLink from "@/components/ui/text-link/TextLink";
import { arrowSVG, githubSVG } from "@/constants/icons";
import type { Project } from "@/lib/projects";

const cn = classNames.bind(styles);

type ProjectCardProps = {
  project: Project;
};

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className={cn("project-card")}>
      <div className={cn("preview")}>
        <p className={cn("label")}>{project.isCommercial ? "Commercial Project" : "Personal Project"}</p>
        <Image src={project.image} placeholder="blur" className={cn("photo")} alt={project.imageAlt} />
      </div>
      <div className={cn("content")}>
        <h3 className={cn("title")}>{project.title}</h3>
        <p className={cn("description")}>{project.description}</p>
        <div className={cn("info")}>
          <h4 className={cn("info-title")}>Project Info</h4>
          <dl className={cn("details")}>
            <div className={cn("row")}>
              <dt className={cn("caption")}>Year</dt>
              <dd className={cn("value")}>{project.year}</dd>
            </div>
            <div className={cn("row")}>
              <dt className={cn("caption")}>Role</dt>
              <dd className={cn("value")}>{project.role}</dd>
            </div>
          </dl>
        </div>
        <div className={cn("controls")}>
          <TextLink
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            icon={arrowSVG}
          >
            Live Demo
          </TextLink>
          {!project.isCommercial && (
            <TextLink
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              icon={githubSVG}
            >
              See on Github
            </TextLink>
          )}
        </div>
      </div>
    </div>
  );
}
