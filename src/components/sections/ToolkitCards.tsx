import { Code, Database, GitBranch, Sparkle } from "@phosphor-icons/react";
import "../../styles/toolkit-cards.css";

const toolkits = [
  {
    title: "Interface", icon: Code, description: "Design & interaction",
    skills: ["React", "TypeScript", "Vite", "JavaScript", "HTML / CSS", "Tailwind CSS", "Bootstrap"],
  },
  {
    title: "Systems", icon: Database, description: "Data & APIs",
    skills: ["Node.js", "Express", "REST APIs", "PostgreSQL", "Supabase", "File workflows"],
  },
  {
    title: "Delivery", icon: GitBranch, description: "State & shipping",
    skills: ["Zustand", "Redux", "Git / GitHub", "Dokploy", "n8n", "Jira"],
  },
  {
    title: "Creative tools", icon: Sparkle, description: "Ideas & experiments",
    skills: ["Figma", "VS Code", "Claude Code", "Codex", "Antigravity", "Lovable", "Google Stitch", "Google Flow"],
  },
];

export default function ToolkitCards() {
  return (
    <div className="toolkit-cards">
      {toolkits.map(({ title, icon: Icon, description, skills }, index) => (
        <article className="toolkit-card" key={title} data-reveal>
          <div className="toolkit-card__top">
            <span className="toolkit-card__icon"><Icon size={22} aria-hidden="true" /></span>
            <span className="toolkit-card__number" aria-hidden="true">0{index + 1}</span>
          </div>
          <h4>{title}</h4>
          <p className="toolkit-card__description">{description}</p>
          <ul className="toolkit-card__tools" aria-label={`${title} tools`}>
            {skills.map((skill) => <li key={skill}>{skill}</li>)}
          </ul>
        </article>
      ))}
    </div>
  );
}
