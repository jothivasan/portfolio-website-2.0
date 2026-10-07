"use client";

import InternalLink, { MotionLink } from "../common/InternalLink";

import { useRef } from "react";
import { ArrowDown, ArrowRight, ArrowUpRight } from "@phosphor-icons/react";
import { motion, useReducedMotion } from "motion/react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

gsap.registerPlugin(useGSAP);

const profiles = [
  { label: "GitHub", href: "https://github.com/jothivasan" },
  { label: "LinkedIn", href: "https://linkedin.com/in/jothivasan/" },
  { label: "Résumé", href: "/Jothivasan_FullStackDeveloper_Resume.pdf" },
];

export default function Hero({ ready = true, skipIntro = false }: { ready?: boolean; skipIntro?: boolean }) {
  const root = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGSAP(() => {
    if (!ready || skipIntro) return;
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      // `ready` changes only after the loader has cleared the viewport.
      // Explicit start/end states keep the reveal reliable on remounts too.
      gsap.timeline({ defaults: { ease: "power3.out" } })
        .fromTo(".overture-eyebrow", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.55, clearProps: "opacity,transform" })
        .fromTo(".overture-title__line", { opacity: 0, y: 46 }, { opacity: 1, y: 0, duration: 1, stagger: 0.16, clearProps: "opacity,transform" }, 0.12)
        .fromTo(".overture-mark", { scaleX: 0, transformOrigin: "left center" }, { scaleX: 1, duration: 0.85, clearProps: "transform,transformOrigin" }, 0.65)
        .fromTo(".overture-description, .overture-actions, .overture-footer", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.75, stagger: 0.14, clearProps: "opacity,transform" }, 0.7);
    });
    return () => media.revert();
  }, { scope: root, dependencies: [ready, skipIntro], revertOnUpdate: true });

  return (
    <div className={`overture${ready ? "" : " overture--booting"}`} ref={root}>
      <div className="overture-inner">
        <p className="overture-eyebrow">CODE WITH INTENTION · DESIGN WITH PURPOSE</p>
        <h1 className="overture-title" aria-label="I build digital products that feel effortless.">
          <span className="overture-title__line" aria-hidden="true">
            <span className="overture-title__reveal">I build digital products</span>
          </span>
          <span className="overture-title__line overture-title__line--second" aria-hidden="true">
            <span className="overture-title__reveal overture-title__soft">that feel</span>{" "}
            <span className="overture-title__accent">
              <span className="overture-mark" />
              <span className="overture-letters">effortless.</span>
            </span>
          </span>
        </h1>

        <p className="overture-description">
          Full Stack Developer focused on building thoughtful interfaces,{" "}<br className="overture-desktop-break" />
          reliable systems, and products people enjoy using.
        </p>

        <div className="overture-actions">
          <MotionLink className="overture-primary" href="#projects"
            whileHover={reduced ? undefined : { y: -2 }}
            whileTap={reduced ? undefined : { scale: 0.98 }}>
            <span>View My Work</span>
            <motion.span className="overture-primary__icon" aria-hidden="true"
              whileHover={reduced ? undefined : { rotate: -8, scale: 1.05 }}>
              <ArrowRight weight="bold" />
            </motion.span>
          </MotionLink>
          <motion.a className="overture-secondary" href="https://blogs.jothivasan.dev"
            target="_blank" rel="noreferrer"
            whileHover={reduced ? undefined : { y: -2 }}
            whileTap={reduced ? undefined : { scale: 0.98 }}>
            <span>Visit My Blog</span>
            <motion.span className="overture-secondary__icon" aria-hidden="true"
              whileHover={reduced ? undefined : { rotate: 8, scale: 1.05 }}>
              <ArrowUpRight />
            </motion.span>
          </motion.a>
        </div>

        <div className="overture-footer">
          <p className="overture-availability">Chennai, Tamil Nadu, India</p>
          <InternalLink className="overture-scroll" href="#about" aria-label="Scroll to explore">
            <span>SCROLL TO EXPLORE</span><ArrowDown aria-hidden="true" />
          </InternalLink>
          <nav className="overture-socials" aria-label="Profile links">
            {profiles.map(profile => (
              <a key={profile.label} href={profile.href} target={profile.href.startsWith("http") ? "_blank" : undefined} rel={profile.href.startsWith("http") ? "noreferrer" : undefined}>
                {profile.label}<ArrowUpRight aria-hidden="true" />
              </a>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
