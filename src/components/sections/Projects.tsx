import * as React from "react";
import { useState } from "react";
import { ArrowUpRight, CaretDown } from "@phosphor-icons/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { PROJECTS } from "../../data/projects";

const Projects: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const activeProject = PROJECTS[activeIndex];

  const selectProjectFromKeyboard = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    let nextIndex = index;

    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      nextIndex = (index + 1) % PROJECTS.length;
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      nextIndex = (index - 1 + PROJECTS.length) % PROJECTS.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = PROJECTS.length - 1;
    } else {
      return;
    }

    event.preventDefault();
    setActiveIndex(nextIndex);

    const tabs = event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>(
      '[role="tab"]',
    );
    tabs?.[nextIndex]?.focus();
  };

  return (
    <div className="work-section">
      <div className="work-section__inner">
        <header className="work-heading">
          <h2>Selected work</h2>
          <p>
            Production websites shaped around clear journeys, useful interfaces,
            and dependable delivery.
          </p>
        </header>

        <div className="project-workspace">
          <div className="project-stage">
            <AnimatePresence mode="wait" initial={false}>
              <motion.figure
                id={`project-${activeProject.id}`}
                role="tabpanel"
                aria-labelledby={`project-tab-${activeProject.id}`}
                className="project-stage__figure"
                key={activeProject.id}
                initial={reduceMotion ? false : { opacity: 0, x: 14 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduceMotion ? { opacity: 1 } : { opacity: 0, x: -10 }}
                transition={{
                  duration: reduceMotion ? 0 : 0.32,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <div className="project-stage__media">
                  <img
                    src={activeProject.image}
                    alt={`${activeProject.title} website preview`}
                    width="1600"
                    height="900"
                    loading={activeIndex === 0 ? "eager" : "lazy"}
                    decoding="async"
                  />
                </div>

                <figcaption>
                  <span>{activeProject.category}</span>
                  <span>{activeProject.role}</span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          <aside className="project-browser" aria-label="Project details">
            <div
              className="project-browser__tabs"
              role="tablist"
              aria-label="Choose a project"
            >
              {PROJECTS.map((project, index) => {
                const isActive = index === activeIndex;

                return (
                  <button
                    id={`project-tab-${project.id}`}
                    className="project-browser__tab"
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`project-${project.id}`}
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => setActiveIndex(index)}
                    onKeyDown={(event) =>
                      selectProjectFromKeyboard(event, index)
                    }
                    key={project.id}
                  >
                    <span className="project-browser__thumb" aria-hidden="true">
                      <img src={project.image} alt="" width="192" height="108" />
                    </span>
                    <span className="project-browser__tab-copy">
                      <strong>{project.title}</strong>
                      <small>{project.role}</small>
                    </span>
                  </button>
                );
              })}
            </div>

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                className="project-browser__detail"
                key={activeProject.id}
                initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -8 }}
                transition={{
                  duration: reduceMotion ? 0 : 0.28,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <h3>{activeProject.title}</h3>
                <p>{activeProject.description}</p>

                <p className="project-browser__stack">
                  <strong>Built with</strong>
                  <span>{activeProject.tags.join(", ")}</span>
                </p>

                <details className="project-contribution">
                  <summary>
                    Contribution
                    <CaretDown size={16} weight="bold" aria-hidden="true" />
                  </summary>
                  <ul>
                    {activeProject.responsibilities.map((responsibility) => (
                      <li key={responsibility}>{responsibility}</li>
                    ))}
                  </ul>
                </details>

                <a
                  className="project-browser__link"
                  href={activeProject.link}
                  target="_blank"
                  rel="noreferrer"
                >
                  View live project
                  <ArrowUpRight size={18} weight="bold" aria-hidden="true" />
                </a>
              </motion.div>
            </AnimatePresence>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Projects;
