import * as React from "react";
import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

type KineticLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  label: string;
  variant: "primary" | "secondary";
  icon: React.ReactNode;
};

gsap.registerPlugin(useGSAP);

const KineticLink: React.FC<KineticLinkProps> = ({
  label,
  variant,
  icon,
  className = "",
  ...props
}) => {
  const root = useRef<HTMLAnchorElement>(null);
  const moveX = useRef<ReturnType<typeof gsap.quickTo> | null>(null);
  const moveY = useRef<ReturnType<typeof gsap.quickTo> | null>(null);

  const { contextSafe } = useGSAP(
    () => {
      if (!root.current) return;

      moveX.current = gsap.quickTo(root.current, "x", {
        duration: 0.5,
        ease: "power3.out",
      });
      moveY.current = gsap.quickTo(root.current, "y", {
        duration: 0.5,
        ease: "power3.out",
      });
    },
    { scope: root },
  );

  const prefersReducedMotion = () =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const resetMotion = () => {
      if (!media.matches || !root.current) return;
      const fill = root.current.querySelector(".kinetic-button__fill");
      const label = root.current.querySelector(".kinetic-button__label-track");
      const icon = root.current.querySelector(".kinetic-button__icon");
      const targets = [root.current, fill, label, icon].filter(Boolean);
      gsap.killTweensOf(targets);
      gsap.set(root.current, { x: 0, y: 0 });
      gsap.set(fill, { scaleX: 0 });
      gsap.set(label, { yPercent: 0 });
      gsap.set(icon, { x: 0, rotate: 0 });
    };
    media.addEventListener("change", resetMotion);
    return () => media.removeEventListener("change", resetMotion);
  }, []);

  const activate = contextSafe((event?: React.PointerEvent<HTMLAnchorElement>) => {
    if (!root.current || prefersReducedMotion()) return;
    if (event && event.pointerType !== "mouse") return;

    const fill = root.current.querySelector<HTMLElement>(".kinetic-button__fill");
    const labelTrack = root.current.querySelector<HTMLElement>(".kinetic-button__label-track");
    const iconWrap = root.current.querySelector<HTMLElement>(".kinetic-button__icon");
    if (!fill || !labelTrack || !iconWrap) return;

    const bounds = root.current.getBoundingClientRect();
    const entersFromLeft = !event || event.clientX <= bounds.left + bounds.width / 2;
    gsap.killTweensOf([fill, labelTrack, iconWrap]);
    gsap.set(fill, { transformOrigin: entersFromLeft ? "left center" : "right center" });
    gsap
      .timeline({ defaults: { ease: "power3.out" } })
      .to(fill, { scaleX: 1, duration: 0.42 }, 0)
      .to(labelTrack, { yPercent: -50, duration: 0.42 }, 0.02)
      .to(iconWrap, { x: 3, rotate: -8, duration: 0.38 }, 0.03);
  });

  const deactivate = contextSafe((event?: React.PointerEvent<HTMLAnchorElement>) => {
    if (!root.current || prefersReducedMotion()) return;

    const fill = root.current.querySelector<HTMLElement>(".kinetic-button__fill");
    const labelTrack = root.current.querySelector<HTMLElement>(".kinetic-button__label-track");
    const iconWrap = root.current.querySelector<HTMLElement>(".kinetic-button__icon");
    if (!fill || !labelTrack || !iconWrap) return;

    const bounds = root.current.getBoundingClientRect();
    const exitsFromLeft = Boolean(event && event.clientX <= bounds.left + bounds.width / 2);
    gsap.killTweensOf([fill, labelTrack, iconWrap]);
    gsap.set(fill, { transformOrigin: exitsFromLeft ? "left center" : "right center" });
    gsap
      .timeline({ defaults: { ease: "power3.out" } })
      .to(fill, { scaleX: 0, duration: 0.38 }, 0)
      .to(labelTrack, { yPercent: 0, duration: 0.38 }, 0)
      .to(iconWrap, { x: 0, rotate: 0, duration: 0.34 }, 0);
    gsap.to(root.current, { x: 0, y: 0, duration: 0.5, ease: "power3.out" });
  });

  const trackPointer = contextSafe((event: React.PointerEvent<HTMLAnchorElement>) => {
    if (!root.current || prefersReducedMotion() || event.pointerType !== "mouse") return;
    const bounds = root.current.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    moveX.current?.(x * 10);
    moveY.current?.(y * 7);
  });

  return (
    <a
      {...props}
      ref={root}
      className={`button kinetic-button kinetic-button--${variant} ${className}`.trim()}
      onPointerEnter={activate}
      onPointerMove={trackPointer}
      onPointerLeave={deactivate}
      onFocus={() => activate()}
      onBlur={() => deactivate()}
    >
      <span className="kinetic-button__fill" aria-hidden="true" />
      <span className="kinetic-button__label-window" aria-hidden="true">
        <span className="kinetic-button__label-track">
          <span>{label}</span>
          <span>{label}</span>
        </span>
      </span>
      <span className="visually-hidden">{label}</span>
      <span className="kinetic-button__icon" aria-hidden="true">
        {icon}
      </span>
    </a>
  );
};

export default KineticLink;
