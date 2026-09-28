import * as React from "react";
import { Suspense, useEffect, useState } from "react";
import Navbar from "./components/layout/Navbar";
import Hero from "./components/sections/Hero";
import Analytics from "./components/common/Analytics";

const About = React.lazy(() => import("./components/sections/About"));
const Projects = React.lazy(() => import("./components/sections/Projects"));
const Skills = React.lazy(() => import("./components/sections/Skills"));
const Writing = React.lazy(() => import("./components/sections/Writing"));
const Contact = React.lazy(() => import("./components/sections/Contact"));
const Footer = React.lazy(() => import("./components/layout/Footer"));

type Theme = "light" | "dark";

const getInitialTheme = (): Theme => {
  const savedTheme = window.localStorage.getItem("jothivasan-theme");
  if (savedTheme === "light" || savedTheme === "dark") return savedTheme;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

const App: React.FC = () => {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    window.localStorage.setItem("jothivasan-theme", theme);
  }, [theme]);

  return (
    <div className="site-shell">
      <Analytics />
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <Navbar
        theme={theme}
        onToggleTheme={() =>
          setTheme((current) => (current === "light" ? "dark" : "light"))
        }
      />
      <main id="main-content" role="main">
        <section id="hero" aria-label="Introduction">
          <Hero />
        </section>

        <Suspense fallback={null}>
          <section id="about" aria-label="About Jothivasan">
            <About />
          </section>
          <section id="projects" aria-label="Selected work">
            <Projects />
          </section>
          <section id="experience" aria-label="Experience and capabilities">
            <Skills />
          </section>
          <section id="writing" aria-label="Latest writing">
            <Writing />
          </section>
          <section id="contact" aria-label="Contact Jothivasan">
            <Contact />
          </section>
          <Footer />
        </Suspense>
      </main>
    </div>
  );
};

export default App;
