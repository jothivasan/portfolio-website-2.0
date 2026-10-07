"use client";

import { createContext, useCallback, useContext, useLayoutEffect, useState, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { MotionConfig } from "motion/react";
import Link from "next/link";
import Navbar from "./Navbar";
import LoadingScreen from "../common/LoadingScreen";
import { useThemeReveal } from "../../hooks/useThemeReveal";
import { getSectionDestination, settleSectionArrival } from "../../utils/sectionNavigation";

type Theme = "light" | "dark";
const IntroContext = createContext({ ready: false, skipIntro: true, arriving: false });
export const usePortfolioIntro = () => useContext(IntroContext);

export default function SiteShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";
  const [theme, setTheme] = useState<Theme>("light");
  const [themeReady, setThemeReady] = useState(false);
  const [intro, setIntro] = useState<"pending" | "loading" | "revealing" | "complete">("pending");
  const [skipIntro, setSkipIntro] = useState(true);
  const [destination, setDestination] = useState<string | null>(null);
  const commitTheme = useCallback(() => setTheme(current => current === "light" ? "dark" : "light"), []);
  const revealTheme = useThemeReveal(commitTheme);
  const revealIntro = useCallback(() => setIntro("revealing"), []);
  const finishIntro = useCallback(() => setIntro("complete"), []);

  useLayoutEffect(() => {
    // The head script already applied the saved/system palette before first paint.
    setTheme(document.documentElement.dataset.theme === "dark" ? "dark" : "light");
    setThemeReady(true);
  }, []);

  useLayoutEffect(() => {
    if (!themeReady) return;
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    try { window.localStorage.setItem("jothivasan-theme", theme); } catch { /* Optional persistence. */ }
  }, [theme, themeReady]);

  useLayoutEffect(() => {
    if (isHome && window.location.hash === "#contact") {
      router.replace("/contact");
      return;
    }
    const hash = window.location.hash;
    const skip = !isHome || Boolean(hash) || window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setSkipIntro(skip);
    setIntro(skip ? "complete" : "loading");
    const target = isHome ? getSectionDestination(hash) : null;
    setDestination(target);
    if (target) return settleSectionArrival(target, () => setDestination(null));
  }, [isHome, pathname, router]);

  const ready = intro === "complete" || !isHome;
  return (
    <MotionConfig reducedMotion="user">
      <IntroContext.Provider value={{ ready, skipIntro, arriving: Boolean(destination) }}>
        {isHome && (intro === "loading" || intro === "revealing") && <LoadingScreen onReveal={revealIntro} onComplete={finishIntro} />}
        <div className="site-shell" inert={!ready ? true : undefined}>
          <Link className="skip-link" href="#main-content">Skip to main content</Link>
          <Navbar key={pathname} isInnerPage={!isHome} theme={theme} onToggleTheme={revealTheme} />
          {destination && <p className="section-arrival-status" role="status">Opening {destination === "projects" ? "Work" : destination}…</p>}
          {children}
        </div>
      </IntroContext.Provider>
    </MotionConfig>
  );
}
