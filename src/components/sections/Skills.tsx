import { useEffect, useState } from "react";
import { ArrowUpRight, Plus } from "@phosphor-icons/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import SectionFrame, { SectionLabel } from "../common/SectionFrame";
import { EXPERIENCES } from "../../data";
import ToolkitCards from "./ToolkitCards";

const impacts = [
  { value: "~50%", label: "less file storage", detail: "Encryption & compression workflows" },
  { value: "35%", label: "faster initial load", detail: "Lazy loading, splitting & caching" },
  { value: "React", label: "from the foundations", detail: "Interfaces, APIs & responsive systems" },
];
const companyName = (name: string) => name.toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
const PROFESSIONAL_START = Date.UTC(2024, 7, 1); // First full-time role: August 2024.
const getExperienceYears = () => {
  const today = new Date();
  const elapsedDays = (Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()) - PROFESSIONAL_START) / 86_400_000;
  return (Math.max(0, elapsedDays) / 365.2425).toFixed(1);
};

export default function Skills() {
  const [open, setOpen] = useState<string | null>(EXPERIENCES[0].id);
  const [experienceYears, setExperienceYears] = useState(getExperienceYears);
  const reduced = useReducedMotion();
  useEffect(() => {
    const timer = window.setInterval(() => setExperienceYears(getExperienceYears()), 60 * 60 * 1000);
    return () => window.clearInterval(timer);
  }, []);
  return (
    <SectionFrame className="folio-experience">
      <div className="folio-container">
        <div className="folio-section-top" data-reveal><SectionLabel number="03">Experience & craft</SectionLabel><a className="folio-text-link" href="/Jothivasan_FullStackDeveloper_Resume.pdf" target="_blank" rel="noreferrer">View résumé <ArrowUpRight aria-hidden="true" /></a></div>
        <div className="experience-composition">
          <header className="experience-intro" data-reveal><h2 className="folio-title">Learning.<br />Building.<br /><span>Making an impact.</span></h2><p className="folio-body">Growing through real products, real teams, and problems worth figuring out.</p><div className="experience-range"><span className="folio-mono">THE JOURNEY SO FAR</span><strong>2023 <span aria-hidden="true">—</span> Now</strong><div className="experience-range__tenure"><strong>{experienceYears}</strong><span>years<small>of professional experience</small></span></div></div></header>
          <div className="experience-timeline" aria-label="Career history">
            {EXPERIENCES.map((experience, index) => {
              const expanded = open === experience.id;
              return <article className={`experience-entry ${expanded ? "is-open" : ""}`} key={experience.id} data-reveal>
                <span className="experience-entry__dot" aria-hidden="true" />
                <h3><button id={`career-toggle-${experience.id}`} className="experience-entry__toggle" type="button" aria-expanded={expanded} aria-controls={`career-panel-${experience.id}`} onClick={() => setOpen(expanded ? null : experience.id)}>
                  <span><span className="folio-mono">{experience.period}{index === 0 && <span className="experience-current">Current</span>}</span><strong>{companyName(experience.company)}</strong><span className="experience-entry__role">{experience.role}</span></span>
                  <span className="experience-entry__plus"><Plus size={20} aria-hidden="true" /></span>
                </button></h3>
                <div id={`career-panel-${experience.id}`} role="region" aria-labelledby={`career-toggle-${experience.id}`}>
                  <AnimatePresence initial={false}>
                    {expanded && <motion.div className="experience-entry__expand" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: reduced ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}>
                      <div className="experience-impact"><strong>{impacts[index].value}</strong><div><span>{impacts[index].label}</span><small>{impacts[index].detail}</small></div></div>
                      <ul>{experience.description.map(item => <li key={item}>{item}</li>)}</ul>
                    </motion.div>}
                  </AnimatePresence>
                </div>
              </article>;
            })}
          </div>
        </div>
        <div className="capabilities-heading" data-reveal><h3>The tools behind the work.</h3><span className="folio-mono">A practical, evolving toolkit</span></div>
        <ToolkitCards />
      </div>
    </SectionFrame>
  );
}
