import { ArrowDownRight, ArrowUpRight, Code, Stack, Cursor } from "@phosphor-icons/react";
import SectionFrame, { SectionLabel } from "../common/SectionFrame";

const principles = [
  { title: "Clarity first.", text: "Interfaces that make sense. Code that the next person can understand." },
  { title: "Built to hold up.", text: "Thoughtful architecture, real-world edge cases, and performance from the start." },
  { title: "Keep moving.", text: "Reusable patterns and practical automation that make the next release easier." },
];

export default function About() {
  return (
    <SectionFrame className="folio-about">
      <div className="folio-container">
        <div className="folio-section-top" data-reveal><SectionLabel number="01">A little about me</SectionLabel><span className="folio-mono">Chennai, Tamil Nadu · India</span></div>
        <div className="about-composition">
          <div className="about-introduction" data-reveal>
            <h2 className="folio-title">An engineer’s mind.<br /><span>A product instinct.</span></h2>
            <p className="about-lead">I’m Jothivasan. I connect the dots between how a product <em>looks</em>, how it <em>works</em>, and how it <em>feels</em>.</p>
            <p className="folio-body">My home is the React ecosystem, but my curiosity goes beyond the interface. From the first interaction to the systems behind it, I build thoughtful software that makes complex things feel simple.</p>
            <a className="folio-text-link" href="#projects">Explore what I build <ArrowDownRight aria-hidden="true" /></a>
          </div>
          <div className="about-blueprint" data-reveal>
            <div className="about-blueprint__top"><span className="folio-mono">The whole-product perspective</span><span aria-hidden="true">↗</span></div>
            <div className="about-blueprint__layers" data-parallax aria-label="My practice connects interface, engineering, and systems">
              <div className="about-layer about-layer--interface"><Cursor size={23} aria-hidden="true" /><span>Thoughtful interface</span><small>01</small></div>
              <div className="about-layer about-layer--code"><Code size={23} aria-hidden="true" /><span>Dependable engineering</span><small>02</small></div>
              <div className="about-layer about-layer--system"><Stack size={23} aria-hidden="true" /><span>Connected systems</span><small>03</small></div>
            </div>
            <div className="about-blueprint__bottom"><span className="folio-status"><i />Full stack. Full picture.</span><span className="folio-mono">React + curiosity</span></div>
          </div>
        </div>
        <div className="about-principles">
          {principles.map((principle, index) => <article key={principle.title} data-reveal><span className="folio-mono">0{index + 1} /</span><h3>{principle.title}</h3><p>{principle.text}</p></article>)}
        </div>
        <div className="about-signoff" data-reveal><span>Good products happen when the details work together.</span><a className="folio-text-link" href="https://linkedin.com/in/jothivasan/" target="_blank" rel="noreferrer">More about me <ArrowUpRight aria-hidden="true" /></a></div>
      </div>
    </SectionFrame>
  );
}
