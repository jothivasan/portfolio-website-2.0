import * as React from "react";
import { useEffect, useRef, useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  List,
  Moon,
  Sun,
  X,
} from "@phosphor-icons/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

type NavbarProps = {
  theme: "light" | "dark";
  onToggleTheme: () => void;
};

const navigation = [
  { label: "Work", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "About", href: "#about" },
  { label: "Writing", href: "#writing" },
  { label: "Blog", href: "https://blogs.jothivasan.dev", external: true },
  { label: "Contact", href: "#contact" },
];

const sectionIds = ["hero", "projects", "experience", "about", "writing", "contact"];

const scrollToSection = (
  event: React.MouseEvent<HTMLAnchorElement>,
  href: string,
) => {
  if (!href.startsWith("#")) return;
  event.preventDefault();
  document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
};

const Navbar: React.FC<NavbarProps> = ({ theme, onToggleTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeHref, setActiveHref] = useState("#hero");
  const menuRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    if (isMenuOpen) {
      window.requestAnimationFrame(() => {
        menuRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();
      });
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isMenuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [isMenuOpen]);

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        const current = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (current) setActiveHref(`#${current.target.id}`);
      },
      {
        rootMargin: "-28% 0px -58%",
        threshold: [0, 0.2, 0.5],
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const closeAndNavigate = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    scrollToSection(event, href);
    if (href.startsWith("#")) setActiveHref(href);
    setIsMenuOpen(false);
  };

  return (
    <motion.header
      className={`site-header${isMenuOpen ? " site-header--menu-open" : ""}`}
      initial={reduceMotion ? false : { y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="site-header__inner">
        <a
          className="brand"
          href="#hero"
          onClick={(event) => closeAndNavigate(event, "#hero")}
          aria-label="Jothivasan, home"
        >
          <span className="brand__mark" aria-hidden="true">J</span>
          <span className="brand__label">Jothivasan</span>
        </a>

        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map((item) => {
            const isActive = !item.external && activeHref === item.href;
            return (
              <a
                className={isActive ? "desktop-nav__link desktop-nav__link--active" : "desktop-nav__link"}
                key={item.label}
                href={item.href}
                onClick={(event) => closeAndNavigate(event, item.href)}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noreferrer" : undefined}
                aria-current={isActive ? "location" : undefined}
              >
                <span>{item.label}</span>
                {item.external && <ArrowUpRight aria-hidden="true" />}
              </a>
            );
          })}
        </nav>

        <div className="header-actions">
          <button
            className="theme-button"
            type="button"
            onClick={onToggleTheme}
            aria-label={`Use ${theme === "light" ? "dark" : "light"} theme`}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                className="theme-button__icon"
                key={theme}
                initial={reduceMotion ? false : { rotate: -28, opacity: 0, scale: 0.72 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={reduceMotion ? { opacity: 0 } : { rotate: 28, opacity: 0, scale: 0.72 }}
                transition={{ duration: 0.2 }}
              >
                {theme === "light" ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}
              </motion.span>
            </AnimatePresence>
          </button>
          <button
            className="menu-button"
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={isMenuOpen ? "Close navigation" : "Open navigation"}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={isMenuOpen ? "close" : "open"}
                initial={reduceMotion ? false : { rotate: -35, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={reduceMotion ? { opacity: 0 } : { rotate: 35, opacity: 0 }}
                transition={{ duration: 0.18 }}
              >
                {isMenuOpen ? <X aria-hidden="true" /> : <List aria-hidden="true" />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            ref={menuRef}
            id="mobile-navigation"
            className="mobile-menu"
            initial={reduceMotion ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)", opacity: 1 }}
            animate={{ clipPath: "inset(0 0 0% 0)", opacity: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)", opacity: 1 }}
            transition={{ duration: 0.48, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="mobile-menu__inner">
              <nav aria-label="Mobile navigation">
                {navigation.map((item, index) => (
                  <motion.a
                    className={activeHref === item.href ? "mobile-menu__link--active" : undefined}
                    key={item.label}
                    href={item.href}
                    onClick={(event) => closeAndNavigate(event, item.href)}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noreferrer" : undefined}
                    initial={reduceMotion ? false : { opacity: 0, x: -28 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: reduceMotion ? 0 : 0.12 + index * 0.055 }}
                  >
                    <span>{item.label}</span>
                    {item.external ? <ArrowUpRight aria-hidden="true" /> : <ArrowDownRight aria-hidden="true" />}
                  </motion.a>
                ))}
              </nav>

              <motion.div
                className="mobile-menu__footer"
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: reduceMotion ? 0 : 0.42 }}
              >
                <a href="/Jothivasan_FullStackDeveloper_Resume.pdf" target="_blank" rel="noreferrer">
                  Résumé <ArrowUpRight aria-hidden="true" />
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
