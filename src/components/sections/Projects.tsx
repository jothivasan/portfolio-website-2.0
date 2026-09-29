import { useState } from "react";
import { ArrowUpRight, CaretLeft, CaretRight } from "@phosphor-icons/react";
import SectionFrame, { SectionLabel } from "../common/SectionFrame";
import { PROJECTS } from "../../data/projects";

export default function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const project = PROJECTS[activeIndex];
  const projectNumber = String(activeIndex + 1).padStart(2, "0");
  const projectCount = String(PROJECTS.length).padStart(2, "0");

  return (
    <SectionFrame className="folio-work">
      <div className="folio-container">
        <div className="folio-section-top" data-reveal><SectionLabel number="02">Selected work</SectionLabel><span className="folio-mono">A few things I’ve put into the world</span></div>
        <header className="folio-heading-row" data-reveal><h2 className="folio-title">From an idea.<br /><span>Into people’s hands.</span></h2><p className="folio-body">Real products, considered interfaces, and the engineering that brings them together.</p></header>
        <div className="work-gallery">
          <article className={`work-card work-card--featured work-card--project-${activeIndex % 3}`} data-reveal>
            <a className="work-card__visual" href={project.link} target="_blank" rel="noreferrer" aria-label={`Visit ${project.title} (opens in a new tab)`}>
              <div className="work-card__topline"><span>SELECTED PROJECT / {projectNumber}</span><span>{project.category.split(" · ")[0].toUpperCase()}</span></div>
              <div className="work-card__screen" data-parallax><div className="work-card__browser" aria-hidden="true"><i /><i /><i /><span>{new URL(project.link).hostname}</span></div><img src={project.image} alt={`${project.title} website`} width="1600" height="900" loading="lazy" decoding="async" /></div>
              <span className="work-card__visit">View live <ArrowUpRight size={18} aria-hidden="true" /></span>
            </a>
            <div className="work-card__content">
              <div className="work-card__heading"><div><p className="folio-mono">{project.category}</p><h3><a href={project.link} target="_blank" rel="noreferrer">{project.title}<ArrowUpRight aria-hidden="true" /></a></h3></div><span className="work-card__index" aria-hidden="true">{projectNumber}</span></div>
              <p className="folio-body">{project.description}</p>
              <div className="folio-tags" aria-label="Technologies">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
              <section className="work-contribution" aria-label="Behind the build"><h4>Behind the build</h4><p className="folio-mono">{project.role}</p><ul>{project.responsibilities.map(item => <li key={item}>{item}</li>)}</ul></section>
            </div>
          </article>
        </div>
        {PROJECTS.length > 1 && <nav className="work-pagination" aria-label="Project navigation">
          <p className="work-pagination__count" role="status" aria-live="polite" aria-atomic="true" aria-label={`Project ${activeIndex + 1} of ${PROJECTS.length}: ${project.title}`}><strong>{projectNumber}</strong><span aria-hidden="true"> / {projectCount}</span></p>
          <div className="work-pagination__buttons">
            <button type="button" onClick={() => setActiveIndex(index => index - 1)} disabled={activeIndex === 0} aria-label="Previous project"><CaretLeft size={26} aria-hidden="true" /></button>
            <button type="button" onClick={() => setActiveIndex(index => index + 1)} disabled={activeIndex === PROJECTS.length - 1} aria-label="Next project"><CaretRight size={26} aria-hidden="true" /></button>
          </div>
        </nav>}
        <div className="work-endnote" data-reveal><span className="folio-status"><i />Always building, always learning.</span><a className="folio-text-link" href="https://github.com/jothivasan" target="_blank" rel="noreferrer">Follow the work on GitHub <ArrowUpRight aria-hidden="true" /></a></div>
      </div>
    </SectionFrame>
  );
}
