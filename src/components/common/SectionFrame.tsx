import { useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import "../../styles/sections.css";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/** Scoped animations leave the Hero and its entrance timeline untouched. */
export default function SectionFrame({ children, className = "" }: { children: ReactNode; className?: string }) {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]", root.current).forEach((element) => {
        gsap.from(element, {
          y: 28, opacity: 0, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: element, start: "top 94%", once: true },
          clearProps: "transform,opacity",
        });
      });
    });
    media.add("(min-width: 900px) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      gsap.utils.toArray<HTMLElement>("[data-parallax]", root.current).forEach((element) => {
        gsap.fromTo(element, { y: -12 }, {
          y: 12, ease: "none",
          scrollTrigger: { trigger: element.parentElement, start: "top bottom", end: "bottom top", scrub: 1 },
        });
      });
    });
    // Accordions, font loading, and form feedback can move subsequent sections.
    // Refresh after layout settles, rather than on every animation frame.
    let refreshTimer: ReturnType<typeof setTimeout>;
    const observer = new ResizeObserver(() => {
      clearTimeout(refreshTimer);
      refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 180);
    });
    if (root.current) observer.observe(root.current);
    return () => {
      observer.disconnect();
      clearTimeout(refreshTimer);
      media.revert();
    };
  }, { scope: root });
  return <div ref={root} className={`folio-section ${className}`}>{children}</div>;
}

export function SectionLabel({ number, children }: { number: string; children: ReactNode }) {
  return <p className="folio-label"><span>{number}</span>{children}</p>;
}
