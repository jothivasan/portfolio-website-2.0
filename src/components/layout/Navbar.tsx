import { useCallback, useEffect, useRef, useState, type MouseEvent } from "react";
import { ArrowUpRight, Moon, Sun, X } from "@phosphor-icons/react";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import "../../styles/intro.css";

type NavbarProps = { isContactPage: boolean; theme: "light" | "dark"; onToggleTheme: (button: HTMLButtonElement) => void };
const navigation = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Writing", href: "#writing" },
  { label: "Contact", href: "/contact" },
];
const sectionIds = ["hero", ...navigation.filter(item => item.href.startsWith("#")).map(item => item.href.slice(1))];
const isPlainClick = (event: MouseEvent<HTMLAnchorElement>) =>
  event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey;

export default function Navbar({ theme, onToggleTheme, isContactPage }: NavbarProps) {
  const links = navigation.map(item => ({ ...item, href: isContactPage && item.href.startsWith("#") ? `/${item.href}` : item.href }));
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(isContactPage ? "/contact" : "#hero");
  const [scrolled, setScrolled] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const pendingDestination = useRef<string | null>(null);
  const previousOverflow = useRef("");
  const scrollLocked = useRef(false);
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", value => setScrolled(value > 24));

  const finishClose = useCallback(() => {
    dialogRef.current?.close();
    if (scrollLocked.current) {
      document.body.style.overflow = previousOverflow.current;
      scrollLocked.current = false;
    }
    const href = pendingDestination.current;
    pendingDestination.current = null;
    if (href && !href.startsWith("#")) {
      window.location.assign(href);
    } else if (href) {
      const target = document.getElementById(href.slice(1));
      if (target) {
        target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
        target.scrollIntoView({
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
          block: "start",
        });
        if (window.location.hash !== href) window.history.pushState(null, "", href);
      }
    } else if (window.matchMedia("(max-width: 850px)").matches) {
      toggleRef.current?.focus({ preventScroll: true });
    }
  }, []);

  useEffect(() => { setScrolled(window.scrollY > 24); }, []);

  useEffect(() => {
    if (isContactPage) return;
    const observer = new IntersectionObserver(entries => {
      const current = entries.filter(entry => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (current) setActive(`#${current.target.id}`);
    }, { rootMargin: "-18% 0px -70%", threshold: 0 });
    const observed = new Set<HTMLElement>();
    const observeSections = () => {
      sectionIds.forEach(id => {
        const section = document.getElementById(id);
        if (section && !observed.has(section)) {
          observed.add(section);
          observer.observe(section);
        }
      });
      if (observed.size === sectionIds.length) mutations.disconnect();
    };
    const mutations = new MutationObserver(observeSections);
    const main = document.getElementById("main-content");
    if (main) mutations.observe(main, { childList: true, subtree: true });
    observeSections();
    return () => { observer.disconnect(); mutations.disconnect(); };
  }, [isContactPage]);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 851px)");
    const closeOnResize = () => {
      if (desktop.matches && dialogRef.current?.open) {
        setOpen(false);
        finishClose();
      }
    };
    desktop.addEventListener("change", closeOnResize);
    return () => desktop.removeEventListener("change", closeOnResize);
  }, [finishClose]);

  useEffect(() => () => {
    if (scrollLocked.current) document.body.style.overflow = previousOverflow.current;
  }, []);

  const openMenu = () => {
    if (!dialogRef.current || dialogRef.current.open) return;
    previousOverflow.current = document.body.style.overflow;
    dialogRef.current.showModal();
    scrollLocked.current = true;
    document.body.style.overflow = "hidden";
    setOpen(true);
  };
  const navigateFromMenu = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!isPlainClick(event)) return;
    event.preventDefault();
    pendingDestination.current = href;
    setActive(href);
    setOpen(false);
  };

  return (
    <>
      <motion.header
        className={`editorial-header ${scrolled ? "editorial-header--scrolled" : ""}`}
        initial={reduced ? false : { opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduced ? 0 : 0.45 }}
      >
        <div className="editorial-nav">
          <a className="editorial-wordmark" href={isContactPage ? "/" : "#hero"} aria-label="Jothivasan, home">
            jothivasan<span aria-hidden="true">*</span>
          </a>
          <nav className="editorial-links" aria-label="Main navigation">
            {links.map(item => (
              <a key={item.href} href={item.href} aria-current={active === item.href ? (isContactPage ? "page" : "location") : undefined}>
                <span>{item.label}</span>
                {active === item.href && (
                  <motion.span className="editorial-active" layoutId="editorial-active-link" aria-hidden="true"
                    transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 32 }} />
                )}
              </a>
            ))}
          </nav>
          <div className="editorial-actions">
            <motion.button className="editorial-theme" type="button" onClick={event => onToggleTheme(event.currentTarget)}
              aria-label={`Use ${theme === "light" ? "dark" : "light"} theme`}
              whileTap={reduced ? undefined : { scale: 0.92 }}>
              <AnimatePresence mode="wait" initial={false}>
                <motion.span key={theme} initial={reduced ? false : { rotate: -45, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: reduced ? 0 : 45, opacity: 0 }}
                  transition={{ duration: reduced ? 0 : 0.15 }}>
                  {theme === "light" ? <Moon size={18} aria-hidden="true" /> : <Sun size={18} aria-hidden="true" />}
                </motion.span>
              </AnimatePresence>
            </motion.button>
            <button ref={toggleRef} className="editorial-menu-toggle" type="button" onClick={openMenu}
              aria-haspopup="dialog" aria-controls="editorial-mobile-menu" aria-expanded={open}>
              Menu <span aria-hidden="true"><i /><i /></span>
            </button>
          </div>
        </div>
      </motion.header>

      <dialog id="editorial-mobile-menu" ref={dialogRef} className="editorial-dialog" aria-label="Site navigation"
        onCancel={event => { event.preventDefault(); setOpen(false); }}>
        <AnimatePresence onExitComplete={finishClose}>
          {open && (
            <motion.div className="editorial-menu-panel" key="menu"
              initial={reduced ? false : { opacity: 0, y: -14 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: reduced ? 0 : -10 }} transition={{ duration: reduced ? 0 : 0.22 }}>
              <div className="editorial-menu-top">
                <span className="editorial-wordmark">jothivasan<span aria-hidden="true">*</span></span>
                <button type="button" onClick={() => setOpen(false)} autoFocus aria-label="Close navigation"><X size={24} aria-hidden="true" /></button>
              </div>
              <p className="editorial-menu-label">TAKE A LOOK AROUND</p>
              <nav aria-label="Mobile navigation">
                {links.map((item, index) => (
                  <motion.a key={item.href} href={item.href} aria-current={active === item.href ? (isContactPage ? "page" : "location") : undefined}
                    onClick={event => navigateFromMenu(event, item.href)}
                    initial={reduced ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: reduced ? 0 : 0.3, delay: reduced ? 0 : index * 0.035 }}>
                    <span className="editorial-menu-number">0{index + 1}</span><span>{item.label}</span><ArrowUpRight aria-hidden="true" />
                  </motion.a>
                ))}
              </nav>
              <div className="editorial-menu-bottom">
                <p>Good conversations.<br />Great beginnings.</p>
                <a href="/contact" onClick={event => navigateFromMenu(event, "/contact")}>Say hello <ArrowUpRight aria-hidden="true" /></a>
                <a href="https://blogs.jothivasan.dev" target="_blank" rel="noreferrer">Visit the blog <ArrowUpRight aria-hidden="true" /></a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </dialog>
    </>
  );
}
