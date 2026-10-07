import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import SiteShell from "../components/layout/SiteShell";
import "@fontsource-variable/dm-sans";
import "@fontsource-variable/space-grotesk";
import "@fontsource/dm-mono/400.css";
import "@fontsource/dm-mono/500.css";
import "../index.css";
import "../styles/intro.css";
import "../styles/loading-screen.css";
import "../styles/sections.css";
import "../styles/toolkit-cards.css";
import "../styles/about.css";
import "../styles/contact-page.css";
import "../styles/footer.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://jothivasan.dev"),
  title: "Jothivasan | Full Stack Developer",
  description: "Jothivasan is a product-minded Full Stack Developer in Chennai building fast, thoughtful web experiences with React, TypeScript, Node.js, and modern cloud tools.",
  keywords: ["Jothivasan", "Full Stack Developer", "React Developer", "TypeScript", "Node.js", "Supabase", "Chennai"],
  authors: [{ name: "Jothivasan" }],
  robots: { index: true, follow: true, "max-image-preview": "large" },
  icons: { icon: "/logo.svg", apple: "/logo.svg" },
  alternates: { types: { "application/rss+xml": "https://blogs.jothivasan.dev/rss.xml" } },
};
export const viewport: Viewport = { colorScheme: "light dark", themeColor: "#f3f2ed" };

// Runs before hydration: avoid flashing the wrong palette on refresh or direct entry.
const themeScript = `(function(){var t;try{t=localStorage.getItem('jothivasan-theme')}catch(e){}if(t!=='light'&&t!=='dark')t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';document.documentElement.dataset.theme=t;document.documentElement.style.colorScheme=t})()`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
    <head><script dangerouslySetInnerHTML={{ __html: themeScript }} /></head>
    {/* Browser extensions can inject body attributes before hydration (e.g. cz-shortcut-listen). */}
    <body suppressHydrationWarning><SiteShell>{children}</SiteShell></body>
  </html>;
}
