import * as React from "react";
import { Suspense, useCallback, useLayoutEffect, useState } from "react";
import { useThemeReveal } from "./hooks/useThemeReveal";
import Navbar from "./components/layout/Navbar";
import Hero from "./components/sections/Hero";
import Analytics from "./components/common/Analytics";
import LoadingScreen from "./components/common/LoadingScreen";
import { getSectionDestination, settleSectionArrival } from "./utils/sectionNavigation";

const About = React.lazy(() => import("./components/sections/About"));
const Projects = React.lazy(() => import("./components/sections/Projects"));
const Skills = React.lazy(() => import("./components/sections/Skills"));
const Writing = React.lazy(() => import("./components/sections/Writing"));
const ContactPage = React.lazy(() => import("./pages/ContactPage"));
const Footer = React.lazy(() => import("./components/layout/Footer"));
const isContactPage = /^\/contact(?:\/|\/index\.html)?$/.test(window.location.pathname);

const initialDestination = isContactPage ? null : getSectionDestination(window.location.hash);

function SectionArrival({ destination, onReady }: { destination: string; onReady: () => void }) {
  useLayoutEffect(() => settleSectionArrival(destination, onReady), [destination, onReady]);
  return null;
}

type Theme = "light" | "dark";

const getInitialTheme = (): Theme => {
  try {
    const savedTheme = window.localStorage.getItem("jothivasan-theme");
    if (savedTheme === "light" || savedTheme === "dark") return savedTheme;
  } catch { /* Use the system theme when storage is unavailable. */ }
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

const App: React.FC = () => {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const commitTheme = useCallback(() => setTheme(current => current === "light" ? "dark" : "light"), []);
  const revealTheme = useThemeReveal(commitTheme);
  const [intro, setIntro] = useState<"loading" | "revealing" | "complete">(() =>
    isContactPage || window.location.hash || window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "complete" : "loading",
  );
  const revealIntro = useCallback(() => setIntro("revealing"), []);
  const finishIntro = useCallback(() => setIntro("complete"), []);
  const [arriving, setArriving] = useState(Boolean(initialDestination));
  const finishArrival = useCallback(() => setArriving(false), []);

  useLayoutEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    try { window.localStorage.setItem("jothivasan-theme", theme); } catch { /* Theme still works for this visit. */ }
  }, [theme]);

  return (
    <>
      {intro !== "complete" && <LoadingScreen onReveal={revealIntro} onComplete={finishIntro} />}
      <div className="site-shell" inert={intro !== "complete" ? true : undefined}>
        <Analytics />
        <a className="skip-link" href="#main-content">Skip to main content</a>
        <Navbar
          isContactPage={isContactPage}
          theme={theme}
          onToggleTheme={revealTheme}
        />
        {arriving && <p className="section-arrival-status" role="status">Opening {initialDestination === "projects" ? "Work" : initialDestination}…</p>}
        <main id="main-content" tabIndex={-1} className={arriving ? "section-arrival-pending" : undefined} aria-busy={arriving || undefined}>
          {isContactPage ? (
            <Suspense fallback={<p className="page-loading" role="status">Opening a new conversation…</p>}>
              <ContactPage />
            </Suspense>
          ) : (
            <>
              <section id="hero" aria-label="Introduction"><Hero ready={intro === "complete"} /></section>
              <Suspense fallback={null}>
                <section id="about" aria-label="About Jothivasan"><About /></section>
                <section id="projects" aria-label="Selected work"><Projects /></section>
                <section id="experience" aria-label="Experience and capabilities"><Skills /></section>
                <section id="writing" aria-label="Latest writing"><Writing /></section>
                {arriving && initialDestination && <SectionArrival destination={initialDestination} onReady={finishArrival} />}
              </Suspense>
            </>
          )}
        </main>
        {!isContactPage && !arriving && <Suspense fallback={null}><Footer /></Suspense>}
      </div>
    </>
  );
};

export default App;
