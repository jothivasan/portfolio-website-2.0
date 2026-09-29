import { ArrowUp, ArrowUpRight, Code, GithubLogo, LinkedinLogo, PenNib } from "@phosphor-icons/react";
import { motion, useReducedMotion } from "motion/react";
import "../../styles/footer.css";

const navigation = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Writing", href: "#writing" },
  { label: "Contact", href: "/contact" },
];

const profiles = [
  { label: "Blog", href: "https://blogs.jothivasan.dev", icon: PenNib },
  { label: "LinkedIn", href: "https://linkedin.com/in/jothivasan/", icon: LinkedinLogo },
  { label: "GitHub", href: "https://github.com/jothivasan", icon: GithubLogo },
  { label: "LeetCode", href: "https://leetcode.com/u/Jothivasan28/", icon: Code },
];

export default function Footer() {
  const reduced = useReducedMotion();
  const year = new Date().getFullYear();

  return (
    <footer className="closing" aria-labelledby="closing-title">
      <div className="closing__inner">
        <div className="closing__prelude">
          <span className="closing__eyebrow">ONE LAST THING</span>
          <span className="closing__location">Chennai, India <span aria-hidden="true">↗</span></span>
        </div>

        <motion.div
          className="closing__invitation"
          initial={reduced ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 id="closing-title" className="closing__title">
            <span>Let’s make</span>
            something <span className="closing__accent">matter.</span>
          </h2>
          <motion.a
            className="closing__hello"
            href="/contact"
            aria-label="Say hello — visit the contact page"
            whileHover={reduced ? undefined : { y: -4 }}
            whileTap={reduced ? undefined : { scale: 0.97 }}
            transition={{ duration: 0.25 }}
          >
            <ArrowUpRight weight="light" aria-hidden="true" />
            <span>Say hello</span>
          </motion.a>
          <div className="closing__message">
            <p>Thoughtful ideas deserve thoughtful execution.<br />Bring yours. Let’s build it together.</p>
          </div>
        </motion.div>

        <div className="closing__directory">
          <div className="closing__signature">
            <a className="closing__brand" href="#hero" aria-label="Jothivasan — back to introduction">
              Jothivasan<span aria-hidden="true">*</span>
            </a>
            <p>Full Stack Developer.<br />Fast, thoughtful products. Built with intention.</p>
          </div>
          <div className="closing__connections">
            <nav className="closing__navigation" aria-label="Footer navigation">
              {navigation.map((item) => (
                <a className="closing__link" key={item.label} href={item.href}>{item.label}</a>
              ))}
            </nav>
            <nav className="closing__profiles" aria-label="Find Jothivasan elsewhere">
              {profiles.map(({ label, href, icon: Icon }) => (
                <motion.a key={label} href={href} target="_blank" rel="noreferrer"
                  whileHover={reduced ? undefined : { y: -2 }}
                  transition={{ duration: 0.2 }}>
                  <Icon className="closing__profile-icon" size={18} aria-hidden="true" />
                  <span>{label}</span>
                  <ArrowUpRight className="closing__external" size={13} aria-hidden="true" />
                </motion.a>
              ))}
            </nav>
          </div>
        </div>

        <div className="closing__colophon">
          <div className="closing__credits">
            <span>© {year} Jothivasan. All rights reserved.</span>
            <span>Built with React · TypeScript · Tailwind CSS</span>
          </div>
          <div className="closing__details">
            <a className="closing__link" href="/Jothivasan_FullStackDeveloper_Resume.pdf" target="_blank" rel="noreferrer">Résumé <ArrowUpRight aria-hidden="true" /></a>
            <a className="closing__link" href="https://blogs.jothivasan.dev/privacy" target="_blank" rel="noreferrer">Privacy <ArrowUpRight aria-hidden="true" /></a>
          </div>
          <a className="closing__top" href="#hero"><span>Back to top</span><span className="closing__top-icon"><ArrowUp size={17} aria-hidden="true" /></span></a>
        </div>
      </div>
    </footer>
  );
}
