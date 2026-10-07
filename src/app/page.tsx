import { getExperienceYears } from "../utils/experience";
import About from "../components/sections/About";
import Projects from "../components/sections/Projects";
import Skills from "../components/sections/Skills";
import Writing from "../components/sections/Writing";
import Footer from "../components/layout/Footer";
import PortfolioMain, { HomeHero } from "../components/common/PortfolioMain";
import { pageMetadata } from "../lib/metadata";
import structuredData from "../lib/home-structured-data.json";

export const metadata = pageMetadata(
  "Jothivasan | Full Stack Developer",
  "Jothivasan is a product-minded Full Stack Developer in Chennai building fast, thoughtful web experiences with React, TypeScript, Node.js, and modern cloud tools.",
  "/",
  "I build digital products that work beautifully.",
);

export default function HomePage() {
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
    <PortfolioMain>
      <HomeHero />
      <section id="about" aria-label="About Jothivasan"><About /></section>
      <section id="projects" aria-label="Selected work"><Projects /></section>
      <section id="experience" aria-label="Experience and capabilities"><Skills initialExperienceYears={getExperienceYears()} /></section>
      <section id="writing" aria-label="Latest writing"><Writing /></section>
    </PortfolioMain>
    <Footer />
  </>;
}
