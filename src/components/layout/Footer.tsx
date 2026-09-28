import * as React from "react";

const navigation = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Writing", href: "#writing" },
  { label: "Contact", href: "#contact" },
];

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__lead">
          <a className="site-footer__brand" href="#hero">
            <span>J</span>
            <strong>Jothivasan</strong>
          </a>
          <p>
            Full Stack Developer building fast, thoughtful products from
            Chennai.
          </p>
          <a className="site-footer__email" href="mailto:Jothivasan2001@gmail.com">
            Jothivasan2001@gmail.com <span aria-hidden="true">↗</span>
          </a>
        </div>

        <div className="site-footer__links">
          <div>
            <p>Navigate</p>
            {navigation.map((item) => (
              <a key={item.label} href={item.href}>{item.label}</a>
            ))}
          </div>
          <div>
            <p>Elsewhere</p>
            <a href="https://blogs.jothivasan.dev" target="_blank" rel="noreferrer">Blog ↗</a>
            <a href="https://linkedin.com/in/jothivasan/" target="_blank" rel="noreferrer">LinkedIn ↗</a>
            <a href="https://github.com/jothivasan" target="_blank" rel="noreferrer">GitHub ↗</a>
            <a href="https://leetcode.com/u/Jothivasan28/" target="_blank" rel="noreferrer">LeetCode ↗</a>
          </div>
          <div>
            <p>Details</p>
            <a href="/Jothivasan_FullStackDeveloper_Resume.pdf" target="_blank" rel="noreferrer">Résumé ↗</a>
            <a href="https://blogs.jothivasan.dev/privacy" target="_blank" rel="noreferrer">Privacy ↗</a>
            <span>Chennai, India</span>
          </div>
        </div>
      </div>

      <div className="site-footer__bottom">
        <span>© {year} Jothivasan. All rights reserved.</span>
        <span>Built with React · TypeScript · Tailwind CSS</span>
        <a href="#hero">Back to top ↑</a>
      </div>
    </footer>
  );
};

export default Footer;
