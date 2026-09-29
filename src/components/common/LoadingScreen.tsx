import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import "../../styles/loading-screen.css";

gsap.registerPlugin(useGSAP);

interface LoadingScreenProps {
  onReveal: () => void;
  onComplete: () => void;
}

const fragments = [
  { viewBox: "0 0 80 80", x: -42, y: -30, rotation: -18 },
  { viewBox: "80 0 80 80", x: 35, y: -38, rotation: 14 },
  { viewBox: "0 80 80 80", x: -30, y: 38, rotation: 12 },
  { viewBox: "80 80 80 80", x: 42, y: 28, rotation: -16 },
];
const starPath = "M80 29V131 M36 54.5L124 105.5 M36 105.5L124 54.5";

/** A small assembly, not a simulated measure of network progress. */
export default function LoadingScreen({ onReveal, onComplete }: LoadingScreenProps) {
  const root = useRef<HTMLDivElement>(null);
  const skip = useRef<() => void>(() => {});

  useGSAP((_context, contextSafe) => {
    const element = root.current;
    if (!element) return;
    let disposed = false;
    let exiting = false;
    let entrance: gsap.core.Timeline | undefined;
    let restoreFocus = false;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const finish = contextSafe(() => {
      if (exiting || disposed) return;
      exiting = true;
      restoreFocus = element.contains(document.activeElement);
      entrance?.kill();
      onReveal();
      gsap.timeline({
        onComplete: () => {
          // Remove the overlay and release the page together.
          onComplete();
          if (restoreFocus) requestAnimationFrame(() => document.getElementById("main-content")?.focus({ preventScroll: true }));
        },
      })
        .to(".assembly-loader__composition", { y: -24, opacity: 0, duration: reducedMotion.matches ? 0 : 0.3, ease: "power2.in" })
        .to(element, { clipPath: "inset(0 0 100% 0)", duration: reducedMotion.matches ? 0 : 0.75, ease: "expo.inOut" }, 0);
    });
    skip.current = finish;

    const start = contextSafe(() => {
      if (disposed || exiting || entrance) return;
      if (reducedMotion.matches) { finish(); return; }
      const pieces = element.querySelectorAll(".assembly-loader__fragment");
      fragments.forEach((fragment, index) => {
        gsap.set(pieces[index], { x: fragment.x, y: fragment.y, rotation: fragment.rotation, opacity: 0 });
      });
      entrance = gsap.timeline({ onComplete: finish });
      entrance
        .fromTo(".assembly-loader__copy > span", { yPercent: 110, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, stagger: 0.09, duration: 0.8, ease: "power4.out" }, 0)
        .to(pieces, { opacity: 1, duration: 0.35, stagger: 0.07 }, 0.04)
        .to(pieces, { x: 0, y: 0, rotation: 0, duration: 0.95, stagger: 0.075, ease: "expo.inOut" }, 0.3)
        .to(".assembly-loader__registration", { opacity: 0, scale: 0.88, duration: 0.45 }, 0.9)
        // Swap the four clipped star fragments for one identical, whole star.
        // The lime tiles stay fixed while only the star winds up and spins.
        .addLabel("assembled", 1.5)
        .set(".assembly-loader__fragment svg", { visibility: "hidden" }, "assembled")
        .set(".assembly-loader__star", { autoAlpha: 1 }, "assembled")
        .to(".assembly-loader__star", { rotation: -12, scale: 0.94, duration: 0.28, ease: "power2.inOut" }, "assembled+=0.12")
        .addLabel("spin")
        .to(".assembly-loader__star", { rotation: 360, scale: 1, duration: 1.4, ease: "power3.inOut" })
        .addLabel("settled")
        .to(".assembly-loader__status-track", { yPercent: -50, duration: 0.45, ease: "power3.inOut" })
        .to({}, { duration: 0.35 });
    });

    // Font readiness is bounded: a slow font must never trap a visitor here.
    const fontDeadline = window.setTimeout(start, 700);
    void document.fonts.ready.then(start);
    const failSafe = window.setTimeout(finish, 6000);
    const onMotionChange = () => { if (reducedMotion.matches) finish(); };
    reducedMotion.addEventListener("change", onMotionChange);

    const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") finish(); };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      disposed = true;
      skip.current = () => {};
      window.clearTimeout(fontDeadline);
      window.clearTimeout(failSafe);
      reducedMotion.removeEventListener("change", onMotionChange);
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, { scope: root });

  return (
    <div className="assembly-loader" ref={root} aria-label="Welcome to Jothivasan’s portfolio">
      <header className="assembly-loader__header">
        <span className="assembly-loader__wordmark">jothivasan<span>*</span></span>
        <span className="assembly-loader__edition">INDEPENDENT MIND.<br />THOUGHTFUL WORK.</span>
      </header>
      <div className="assembly-loader__composition" aria-hidden="true">
        <div className="assembly-loader__float">
          <div className="assembly-loader__registration"><i /><i /><i /><i /></div>
          <div className="assembly-loader__mark">
            {fragments.map(({ viewBox }, index) => (
              <div className="assembly-loader__fragment" key={index}>
                <svg viewBox={viewBox} fill="none">
                  <path d={starPath} stroke="currentColor" strokeWidth="19" />
                </svg>
              </div>
            ))}
            <div className="assembly-loader__star">
              <svg viewBox="0 0 160 160" fill="none">
                <path d={starPath} stroke="currentColor" strokeWidth="19" />
              </svg>
            </div>
          </div>
        </div>
        <p className="assembly-loader__eyebrow">A LITTLE INTENTION. EVERY DETAIL.</p>
        <h2 className="assembly-loader__title">
          <span className="assembly-loader__copy"><span>Thoughtfully</span></span>
          <span className="assembly-loader__copy assembly-loader__copy--soft"><span>put together.</span></span>
        </h2>
        <div className="assembly-loader__status">
          <span className="assembly-loader__status-dot" />
          <div className="assembly-loader__status-window">
            <div className="assembly-loader__status-track"><span>Finding the rhythm</span><span>Everything in place</span></div>
          </div>
        </div>
      </div>
      <p className="visually-hidden" role="status">Preparing the portfolio.</p>
      <footer className="assembly-loader__footer">
        <span>DESIGN MEETS DEVELOPMENT</span>
        <button type="button" onClick={() => skip.current()} aria-label="Skip introduction">Enter portfolio <span aria-hidden="true">↗</span></button>
      </footer>
    </div>
  );
}
