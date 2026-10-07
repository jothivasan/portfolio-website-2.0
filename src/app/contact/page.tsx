import ContactPage from "../../components/contact/ContactPage";
import { pageMetadata } from "../../lib/metadata";
import structuredData from "../../lib/contact-structured-data.json";

export const metadata = pageMetadata(
  "Contact Jothivasan | Start a Conversation",
  "Have a product to build, a problem to untangle, or a team to join? Send a note to Jothivasan, a Full Stack Developer based in Chennai, India.",
  "/contact",
  "Good things start with hello. Get in touch about a project, a challenge, or an opportunity.",
);

export default function ContactRoute() {
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
    <main id="main-content" tabIndex={-1}><ContactPage /></main>
  </>;
}
