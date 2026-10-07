"use client";

import Link from "next/link";
import { forwardRef, type ComponentProps } from "react";
import { motion } from "motion/react";

/** Keep native-style smooth section scrolling while using Next for route changes. */
const InternalLink = forwardRef<HTMLAnchorElement, ComponentProps<typeof Link>>(function InternalLink({ onClick, ...props }, ref) {
  return <Link {...props} ref={ref} onClick={event => {
    onClick?.(event);
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || props.target === "_blank") return;
    const destination = new URL(event.currentTarget.href);
    if (destination.pathname !== window.location.pathname || !destination.hash) return;
    const target = document.getElementById(decodeURIComponent(destination.hash.slice(1)));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth", block: "start" });
    if (window.location.hash !== destination.hash) window.history.pushState(null, "", destination.hash);
  }} />;
});

export const MotionLink = motion.create(InternalLink);
export default InternalLink;
