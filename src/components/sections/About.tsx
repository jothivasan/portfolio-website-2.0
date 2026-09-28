import * as React from "react";
import { motion, useReducedMotion } from "motion/react";

const principles = [
  {
    title: "Clarity",
    description:
      "The interface, the code, and the product decision should be understandable without unnecessary complexity.",
  },
  {
    title: "Reliability",
    description:
      "A polished screen means little if the system behind it is fragile. I build for real use, edge cases, and change.",
  },
  {
    title: "Momentum",
    description:
      "Reusable patterns and practical automation help teams move faster without turning speed into technical debt.",
  },
];

const getExperienceLabel = () => {
  const start = new Date("2024-08-01T00:00:00");
  const today = new Date();
  const totalMonths =
    (today.getFullYear() - start.getFullYear()) * 12 +
    today.getMonth() -
    start.getMonth() +
    1;
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  if (years === 0) return `${months} months`;
  if (months === 0) return `${years}+ years`;
  return `${years}+ years`;
};

const About: React.FC = () => {
  const reduceMotion = useReducedMotion();
  const reveal = reduceMotion
    ? { initial: false as const, whileInView: undefined }
    : {
        initial: { opacity: 0, y: 34 },
        whileInView: { opacity: 1, y: 0 },
      };

  return (
    <div className="about-section">
      <div className="about-section__inner">
        <motion.header
          className="about-heading"
          {...reveal}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="about-heading__label">About me</p>
          <h2>
            A developer who cares about the <span>whole product.</span>
          </h2>
          <p className="about-heading__intro">
            I work across interface, systems, and product decisions so the final
            experience feels coherent, not assembled in parts.
          </p>
        </motion.header>

        <div className="about-story">
          <motion.div
            className="about-story__lead"
            {...reveal}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          >
            <p>
              I’m Jothivasan. I turn complex product requirements into clear,
              dependable experiences that hold together from the first
              interaction to the final implementation.
            </p>
          </motion.div>

          <motion.div
            className="about-story__detail"
            {...reveal}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.75,
              delay: reduceMotion ? 0 : 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <p>
              My strongest work lives where engineering and product thinking
              meet. I enjoy shaping the interface, understanding the data and
              workflows behind it, and finding the small decisions that make a
              product faster and easier to use.
            </p>
            <p>
              I specialize in the React ecosystem, but I don’t treat the
              frontend as an isolated layer. Good software comes from connecting
              thoughtful design, maintainable architecture, performance, and a
              clear understanding of what people are trying to accomplish.
            </p>
            <div className="about-story__links">
              <a href="#projects">See selected work <span aria-hidden="true">↓</span></a>
              <a
                href="https://linkedin.com/in/jothivasan/"
                target="_blank"
                rel="noreferrer"
              >
                Connect on LinkedIn <span aria-hidden="true">↗</span>
              </a>
            </div>
          </motion.div>
        </div>

        <div className="about-dashboard">
          <div className="about-dashboard__statement">
            <div className="about-dashboard__label">
              <span>How I approach the work</span>
              <i aria-hidden="true" />
            </div>
            <p>
              Make it clear. Make it resilient. Then remove everything that gets
              in the user’s way.
            </p>
            <div className="about-dashboard__coordinates">
              <span>12.9716° N · 80.2454° E</span>
              <strong>Chennai, Tamil Nadu</strong>
            </div>
          </div>

          <div className="about-dashboard__facts">
            <div>
              <span className="eyebrow">Experience</span>
              <strong>{getExperienceLabel()}</strong>
              <p>Building production web products since August 2024.</p>
            </div>
            <div>
              <span className="eyebrow">Specialization</span>
              <strong>Full stack</strong>
              <p>React-led products supported by practical backend systems.</p>
            </div>
            <div>
              <span className="eyebrow">Availability</span>
              <strong>Open</strong>
              <p>Available for meaningful product and engineering work.</p>
            </div>
          </div>
        </div>

        <section className="about-values" aria-labelledby="values-title">
          <motion.div
            className="about-values__heading"
            {...reveal}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <p>What guides the work</p>
            <h3 id="values-title">The standards behind every build.</h3>
          </motion.div>
          <div className="about-values__list">
            {principles.map((principle, index) => (
              <motion.article
                key={principle.title}
                initial={reduceMotion ? false : { opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.45 }}
                transition={{
                  duration: 0.65,
                  delay: reduceMotion ? 0 : index * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <span className="about-values__signal" aria-hidden="true" />
                <h4>{principle.title}</h4>
                <p>{principle.description}</p>
              </motion.article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
