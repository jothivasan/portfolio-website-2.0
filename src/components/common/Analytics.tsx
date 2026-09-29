import { useEffect } from "react";

type PostHogClient = typeof import("posthog-js")["default"];
let analyticsClient: PostHogClient | null = null;

export const capturePortfolioEvent = (
  event: string,
  properties: Record<string, string | number | boolean> = {},
) => {
  analyticsClient?.capture(event, properties);
};

const Analytics = () => {
  useEffect(() => {
    const key = import.meta.env.VITE_POSTHOG_KEY;
    if (!key || navigator.doNotTrack === "1") return;

    let cancelled = false;

    void import("posthog-js").then(({ default: posthog }) => {
      if (cancelled) return;
      posthog.init(key, {
        api_host:
          import.meta.env.VITE_POSTHOG_HOST || "https://us.i.posthog.com",
        autocapture: false,
        capture_pageview: false,
        capture_pageleave: true,
        disable_session_recording: true,
        person_profiles: "identified_only",
        persistence: "localStorage",
        respect_dnt: true,
      });
      analyticsClient = posthog;
      posthog.capture("$pageview", {
        $current_url: window.location.href,
        site: "portfolio",
      });
    });

    const trackLink = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const link = target.closest("a");
      if (!link) return;

      const href = link.getAttribute("href") ?? "";
      const label = link.textContent?.trim().replace(/\s+/g, " ").slice(0, 100) ?? "";

      if (href.includes("Jothivasan_FullStackDeveloper_Resume.pdf")) {
        capturePortfolioEvent("portfolio_resume_opened", { label });
      } else if (
        href.includes("teetheaseacademy.com") ||
        href.includes("rightbrains.co.in") ||
        href.includes("geethanjalibuilders.com")
      ) {
        capturePortfolioEvent("portfolio_project_opened", { href, label });
      } else if (href.includes("blogs.jothivasan.dev")) {
        capturePortfolioEvent("portfolio_blog_opened", { href, label });
      } else if (href === "/contact") {
        capturePortfolioEvent("portfolio_contact_intent", { method: "form", label });
      } else if (href.startsWith("mailto:") || href.startsWith("tel:")) {
        capturePortfolioEvent("portfolio_contact_intent", {
          method: href.startsWith("mailto:") ? "email" : "phone",
          label,
        });
      }
    };

    document.addEventListener("click", trackLink);
    return () => {
      cancelled = true;
      document.removeEventListener("click", trackLink);
      analyticsClient = null;
    };
  }, []);

  return null;
};

export default Analytics;
