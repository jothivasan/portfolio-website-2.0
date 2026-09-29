import { useCallback, useEffect, useRef } from "react";
import { flushSync } from "react-dom";
import gsap from "gsap";

type ThemeTransition = {
  ready: Promise<void>;
  finished: Promise<void>;
  skipTransition: () => void;
};

/** Snapshot both palettes, then let GSAP reveal the new viewport from the control. */
export function useThemeReveal(commitTheme: () => void) {
  const busy = useRef(false);
  const cancel = useRef<(() => void) | null>(null);
  useEffect(() => () => cancel.current?.(), []);

  return useCallback(async (button: HTMLButtonElement) => {
    if (busy.current) return;
    const root = document.documentElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) {
      commitTheme();
      return;
    }

    busy.current = true;
    let tween: gsap.core.Tween | undefined;
    let transition: ThemeTransition | undefined;
    let committed = false;
    let disposed = false;
    const commit = () => {
      if (committed || disposed) return;
      committed = true;
      flushSync(commitTheme);
    };
    const finishAnimation = () => {
      tween?.progress(1);
      transition?.skipTransition();
    };
    const cleanup = () => {
      tween?.kill();
      root.classList.remove("theme-revealing");
      for (const property of ["--theme-reveal-x", "--theme-reveal-y", "--theme-reveal-radius"]) {
        root.style.removeProperty(property);
      }
      window.removeEventListener("resize", finishAnimation);
      reduced.removeEventListener("change", finishAnimation);
      busy.current = false;
      cancel.current = null;
    };
    cancel.current = () => {
      finishAnimation();
      disposed = true;
      cleanup();
    };

    try {
      const { left, top, width, height } = button.getBoundingClientRect();
      const x = left + width / 2;
      const y = top + height / 2;
      const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y)) + 2;
      root.style.setProperty("--theme-reveal-x", `${x}px`);
      root.style.setProperty("--theme-reveal-y", `${y}px`);
      root.style.setProperty("--theme-reveal-radius", "0px");
      root.classList.add("theme-revealing");
      window.addEventListener("resize", finishAnimation);
      reduced.addEventListener("change", finishAnimation);

      const viewDocument = document as Document & {
        startViewTransition?: (update: () => void) => ThemeTransition;
      };
      if (viewDocument.startViewTransition) {
        transition = viewDocument.startViewTransition(commit);
        // Handle skipped snapshots (e.g. a tab becoming hidden) without rejection leaks.
        void transition.finished.catch(() => {});
        await transition.ready;
        if (disposed) return;
        tween = gsap.to(root, {
          "--theme-reveal-radius": `${radius}px`,
          duration: 0.85,
          ease: "power3.inOut",
        });
        await tween;
        transition.skipTransition();
        await transition.finished;
      } else {
        // Older browsers retain a smooth transition without requiring a DOM clone.
        const body = document.body;
        const originalOpacity = body.style.opacity;
        try {
          tween = gsap.to(body, { opacity: 0, duration: 0.18, ease: "power1.in" });
          await tween;
          if (disposed) return;
          commit();
          tween = gsap.to(body, { opacity: 1, duration: 0.28, ease: "power1.out" });
          await tween;
        } finally {
          body.style.opacity = originalOpacity;
        }
      }
    } catch {
      transition?.skipTransition();
      commit();
    } finally {
      cleanup();
    }
  }, [commitTheme]);
}
