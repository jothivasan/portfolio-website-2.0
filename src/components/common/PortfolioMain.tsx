"use client";

import type { ReactNode } from "react";
import Hero from "../sections/Hero";
import { usePortfolioIntro } from "../layout/SiteShell";

export function HomeHero() {
  const { ready, skipIntro } = usePortfolioIntro();
  return <section id="hero" aria-label="Introduction"><Hero ready={ready} skipIntro={skipIntro} /></section>;
}

export default function PortfolioMain({ children }: { children: ReactNode }) {
  const { arriving } = usePortfolioIntro();
  return <main id="main-content" tabIndex={-1} className={arriving ? "section-arrival-pending" : undefined} aria-busy={arriving || undefined}>{children}</main>;
}
