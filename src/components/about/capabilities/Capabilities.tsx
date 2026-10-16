import classNames from "classnames/bind";
import styles from "./Capabilities.module.scss";

const cn = classNames.bind(styles);

const SKILLS = [
  "TypeScript",
  "JavaScript",
  "React",
  "Redux Toolkit",
  "MobX",
  "RTK Query",
  "Axios",
  "GraphQL",
  "REST API",
  "HTML",
  "SCSS",
  "CSS Modules",
  "Micro Frontends",
  "Webpack",
  "React Hook Form",
  "Vite",
  "Jest",
];

export default function Capabilities() {
  return (
    <section className={cn("capabilities", "wrapper")}>
      <h2 className={cn("title")}>My Capabilities</h2>
      <div className={cn("content")}>
        <p className={cn("description")}>
          I build with a modern React and TypeScript stack and pick tools for the problem, not the hype. Here are the technologies I use every day to ship scalable, well-tested interfaces.
        </p>
        <ul className={cn("skills")}>
          {SKILLS.map((skill) => (
              <li key={skill} className={cn("skill")}>
                {skill}
              </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
