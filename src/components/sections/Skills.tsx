import * as React from "react";
import { useState } from "react";
import { DownloadSimple } from "@phosphor-icons/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { EXPERIENCES } from "../../data";

const capabilityGroups = [
  {
    title: "Frontend systems",
    skills: [
      "React.js",
      "Vite",
      "TypeScript",
      "JavaScript",
      "HTML",
      "CSS",
      "Tailwind CSS",
      "Bootstrap",
    ],
  },
  {
    title: "Backend and data",
    skills: [
      "Node.js",
      "Express.js",
      "REST APIs",
      "PostgreSQL",
      "Supabase",
      "File workflows",
    ],
  },
  {
    title: "State and delivery",
    skills: ["Zustand", "Redux", "Git", "GitHub", "Dokploy", "n8n", "Jira"],
  },
  {
    title: "Design and AI workflow",
    skills: [
      "Figma",
      "VS Code",
      "Antigravity",
      "Claude Code",
      "Codex",
      "Lovable.dev",
      "Google Stitch",
      "Google Flow",
    ],
  },
];

const formatCompany = (company: string) =>
  company
    .toLowerCase()
    .replace(/\b\w/g, (character) => character.toUpperCase());

const Skills: React.FC = () => {
  const [activeExperience, setActiveExperience] = useState(0);
  const reduceMotion = useReducedMotion();
  const selectedExperience = EXPERIENCES[activeExperience];

  const selectExperienceFromKeyboard = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    let nextIndex = index;

    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      nextIndex = (index + 1) % EXPERIENCES.length;
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      nextIndex = (index - 1 + EXPERIENCES.length) % EXPERIENCES.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = EXPERIENCES.length - 1;
    } else {
      return;
    }

    event.preventDefault();
    setActiveExperience(nextIndex);

    const tabs = event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>(
      '[role="tab"]',
    );
    tabs?.[nextIndex]?.focus();
  };

  return (
    <div className="experience-section">
      <div className="experience-section__inner">
        <header className="experience-heading">
          <div>
            <h2>Work that shipped</h2>
            <p>
              Product engineering, performance work, and automation delivered
              inside real teams.
            </p>
          </div>
          <a
            href="/Jothivasan_FullStackDeveloper_Resume.pdf"
            target="_blank"
            rel="noreferrer"
          >
            Download résumé
            <DownloadSimple size={18} weight="bold" aria-hidden="true" />
          </a>
        </header>

        <div className="experience-workspace">
          <section className="career-ledger" aria-label="Career history">
            <div
              className="career-ledger__tabs"
              role="tablist"
              aria-label="Choose an experience"
            >
              {EXPERIENCES.map((experience, index) => {
                const isActive = index === activeExperience;

                return (
                  <button
                    id={`experience-tab-${experience.id}`}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`experience-${experience.id}`}
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => setActiveExperience(index)}
                    onKeyDown={(event) =>
                      selectExperienceFromKeyboard(event, index)
                    }
                    key={experience.id}
                  >
                    <strong>{formatCompany(experience.company)}</strong>
                    <span>{experience.period}</span>
                  </button>
                );
              })}
            </div>

            <AnimatePresence mode="wait" initial={false}>
              <motion.article
                id={`experience-${selectedExperience.id}`}
                className="career-ledger__detail"
                role="tabpanel"
                aria-labelledby={`experience-tab-${selectedExperience.id}`}
                key={selectedExperience.id}
                initial={reduceMotion ? false : { opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduceMotion ? { opacity: 1 } : { opacity: 0, x: -10 }}
                transition={{
                  duration: reduceMotion ? 0 : 0.3,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <header>
                  <span>{selectedExperience.period}</span>
                  <h3>{selectedExperience.role}</h3>
                  <p>{formatCompany(selectedExperience.company)}</p>
                </header>

                <ul>
                  {selectedExperience.description.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </motion.article>
            </AnimatePresence>
          </section>

          <section className="capability-index" aria-labelledby="capabilities-title">
            <header>
              <h3 id="capabilities-title">Capabilities</h3>
              <p>A practical stack chosen around the product.</p>
            </header>

            <div className="capability-index__groups">
              {capabilityGroups.map((group) => (
                <article key={group.title}>
                  <h4>{group.title}</h4>
                  <p>{group.skills.join(", ")}</p>
                </article>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Skills;
