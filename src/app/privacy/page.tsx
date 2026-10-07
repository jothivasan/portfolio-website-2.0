import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import InternalLink from "../../components/common/InternalLink";
import SectionFrame from "../../components/common/SectionFrame";
import Footer from "../../components/layout/Footer";
import { PRIVACY_EMAIL, PRIVACY_SECTIONS, PRIVACY_UPDATED } from "../../data/privacy";
import { pageMetadata } from "../../lib/metadata";
import "../../styles/privacy-page.css";

export const metadata = pageMetadata(
  "Privacy Policy | Jothivasan",
  "How information submitted through Jothivasan’s portfolio is handled, including contact messages, third-party services and browser preferences.",
  "/privacy",
);

export default function PrivacyPage() {
  return <>
    <main id="main-content" tabIndex={-1}>
      <SectionFrame className="privacy-page">
        <div className="privacy-page__inner">
          <div className="privacy-page__topline" data-reveal>
            <InternalLink href="/" className="privacy-page__back">Back to the portfolio <ArrowUpRight aria-hidden="true" /></InternalLink>
            <span className="privacy-page__eyebrow">A NOTE ON PRIVACY</span>
          </div>
          <header className="privacy-page__header" data-reveal>
            <div>
              <h1>Privacy <span>Policy</span></h1>
              <p className="privacy-page__updated">Last updated <time dateTime={PRIVACY_UPDATED.dateTime}>{PRIVACY_UPDATED.label}</time></p>
            </div>
            <p className="privacy-page__intro">How information you submit through this portfolio is handled, and what happens when you get in touch.</p>
          </header>
          <div className="privacy-page__layout">
            <nav className="privacy-page__index" aria-label="Privacy policy contents">
              <p className="privacy-page__eyebrow">ON THIS PAGE</p>
              <ol>
                {PRIVACY_SECTIONS.map((section, index) => <li key={section.id}>
                  <InternalLink href={`#privacy-${section.id}`}><span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>{section.title}</InternalLink>
                </li>)}
              </ol>
            </nav>
            <div className="privacy-page__sections">
              {PRIVACY_SECTIONS.map((section, index) => <section className="privacy-page__section" id={`privacy-${section.id}`} key={section.id} aria-labelledby={`privacy-heading-${section.id}`}>
                <div data-reveal>
                  <div className="privacy-page__section-heading"><span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><h2 id={`privacy-heading-${section.id}`}>{section.title}</h2></div>
                  {section.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
                  {section.links && <ul className="privacy-page__services">{section.links.map(link => <li key={link.href}><a href={link.href}>{link.label}<ArrowUpRight aria-hidden="true" /></a></li>)}</ul>}
                  {section.email && <a className="privacy-page__email" href={`mailto:${PRIVACY_EMAIL}`}>{PRIVACY_EMAIL}<ArrowUpRight aria-hidden="true" /></a>}
                </div>
              </section>)}
            </div>
          </div>
        </div>
      </SectionFrame>
    </main>
    <Footer />
  </>;
}
