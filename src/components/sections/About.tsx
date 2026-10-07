import InternalLink from "../common/InternalLink";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import SectionFrame from "../common/SectionFrame";
import SectionLabel from "../common/SectionLabel";

const principles = [
  {
    title: "Clarity",
    text: "Start with the problem. Make the interface intuitive and the code easy for the next person to understand.",
  },
  {
    title: "Engineering",
    text: "Build solid foundations. Consider performance, edge cases, and maintainability from the beginning.",
  },
  {
    title: "Product thinking",
    text: "Look beyond the component. Connect each technical decision to what someone actually needs to do.",
  },
  {
    title: "Continuous improvement",
    text: "Ship, listen, refine. Turn what I learn into better patterns and a more useful next release.",
  },
];

const snapshot = [
  {
    label: "Experience",
    value: "Building since 2023",
    detail: "From design to development",
  },
  {
    label: "Specialization",
    value: "React & TypeScript",
    detail: "Interfaces backed by reliable systems",
  },
  {
    label: "Current focus",
    value: "Products & automation",
    detail: "Full Stack Developer at Mulecraft India",
  },
  {
    label: "Location",
    value: "Chennai, India",
    detail: "Rooted here. Thinking beyond.",
  },
];

/** An open schematic: the interface and the system share one product centre. */
function ProductSchematic() {
  return (
    <figure
      className="about-system"
      data-reveal
      aria-label="A product connects user needs, thoughtful interfaces, and dependable systems, with learning feeding back into the process."
    >
      <div className="about-system__drawing" aria-hidden="true">
        <svg viewBox="0 0 480 340" fill="none">
          <path className="about-system__guide" d="M240 8V332M16 170H464" />
          <circle className="about-system__orbit" cx="240" cy="170" r="139" />
          <ellipse
            className="about-system__orbit"
            cx="240"
            cy="170"
            rx="210"
            ry="89"
            transform="rotate(-28 240 170)"
          />
          <ellipse
            className="about-system__orbit"
            cx="240"
            cy="170"
            rx="210"
            ry="89"
            transform="rotate(28 240 170)"
          />
          <path
            className="about-system__accent"
            d="M117 105A139 139 0 0 1 363 105"
          />
          <circle className="about-system__node" cx="117" cy="105" r="5" />
          <circle className="about-system__node" cx="363" cy="235" r="5" />
          <circle className="about-system__core" cx="240" cy="170" r="53" />
        </svg>
        <span className="about-system__centre">
          The
          <br />
          product
        </span>
        <span className="about-system__label about-system__label--top">
          Human needs
        </span>
        <span className="about-system__label about-system__label--left">
          Interface
        </span>
        <span className="about-system__label about-system__label--right">
          Systems
        </span>
        <span className="about-system__label about-system__label--bottom">
          Build. Learn. Refine.
        </span>
      </div>
    </figure>
  );
}

function ExperienceSnapshot() {
  return (
    <section className="about-snapshot" aria-label="Experience at a glance">
      <dl>
        {snapshot.map((item) => (
          <div key={item.label} data-reveal>
            <dt className="folio-mono">{item.label}</dt>
            <dd>
              {item.value}
              <span>{item.detail}</span>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function WorkingPrinciples() {
  return (
    <section className="about-practice" aria-labelledby="about-practice-title">
      <header data-reveal>
        <p className="folio-mono">01 / The approach</p>
        <h3 id="about-practice-title">
          How I think.
          <br />
          <span>How I work.</span>
        </h3>
        <p className="folio-body">
          A few principles behind the decisions, big and small.
        </p>
      </header>
      <div className="about-practice__list">
        {principles.map((principle, index) => (
          <article
            className="about-practice__item"
            key={principle.title}
            data-reveal
          >
            <span className="folio-mono">0{index + 1}</span>
            <h4>{principle.title}</h4>
            <p>{principle.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default function About() {
  return (
    <SectionFrame className="folio-about">
      <div className="folio-container">
        <div className="about-topline" data-reveal>
          <SectionLabel number="01">About me</SectionLabel>
          <span className="folio-mono">Chennai, India</span>
        </div>
        <div className="about-editorial-hero">
          <header className="about-editorial-hero__heading" data-reveal>
            <p className="about-role">
              Jothivasan <span>/ Full Stack & Frontend Developer</span>
            </p>
            <h2 className="folio-title">
              Thoughtful interfaces.
              <br />
              <span>Solid foundations.</span>
            </h2>
          </header>
          <div className="about-editorial-hero__intro" data-reveal>
            <p>
              I build digital products with care for the people using them—and
              the systems that keep them running.
            </p>
            <p className="folio-body">
              My starting point is understanding the problem. From there, I
              bring together clear interfaces, dependable engineering, and the
              small details that make a product feel right.
            </p>
            <InternalLink className="folio-text-link" href="#projects">
              View my work <ArrowUpRight aria-hidden="true" />
            </InternalLink>
          </div>
          <ProductSchematic />
        </div>
        <ExperienceSnapshot />
        <WorkingPrinciples />
        <section
          className="about-personal"
          aria-labelledby="about-personal-title"
        >
          <div data-reveal>
            <p className="folio-mono">02 / Beyond the code</p>
            <h3 id="about-personal-title">
              Always a student.
              <br />
              <span>Always a builder.</span>
            </h3>
          </div>
          <div className="about-personal__copy" data-reveal>
            <p>
              Curiosity is the common thread. I like taking an unfamiliar idea,
              figuring out how it works, and turning it into something useful.
            </p>
            <p>
              Building products keeps me learning. Writing and sharing what I
              learn helps me make sense of it—and leaves something useful for
              the next person.
            </p>
            <InternalLink className="folio-text-link" href="#writing">
              Notes from the process <ArrowUpRight aria-hidden="true" />
            </InternalLink>
          </div>
        </section>
      </div>
    </SectionFrame>
  );
}
