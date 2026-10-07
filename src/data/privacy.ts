// Keep policy copy and the reviewed date together when the portfolio's practices change.
// Confirm inbox retention and the production hosting provider before adding specifics.
export const PRIVACY_UPDATED = { dateTime: "2026-10-07", label: "7 October 2026" };
export const PRIVACY_EMAIL = "Jothivasan2001@gmail.com";

export const PRIVACY_SECTIONS = [
  {
    id: "information", title: "Information I collect",
    paragraphs: ["The contact form asks for your name, email address and message. Your company or project name is optional. If you email me directly, I receive your email address and whatever you choose to share."],
  },
  {
    id: "use", title: "How I use the information",
    paragraphs: ["I use the details you send to understand your enquiry, reply to you and continue the conversation about your project or opportunity."],
  },
  {
    id: "submissions", title: "Contact form submissions",
    paragraphs: ["When you press “Send your note”, the form sends your details to Web3Forms to deliver your enquiry. This portfolio does not save your message in its own application database.", "Your browser stores the time of your last successful submission to enforce a one-minute cooldown. It does not store the form’s name, email or message in local storage."],
  },
  {
    id: "communication", title: "Email / communication",
    paragraphs: ["Replies and direct emails are handled through the Gmail address listed below. Please share only the information needed for the conversation. Clicking an email link opens your email application; it does not send an email automatically."],
  },
  {
    id: "services", title: "Third-party services",
    paragraphs: ["Web3Forms handles contact form delivery. Google handles email sent to my Gmail address. These providers process information under their own policies, which you can read here.", "Links to my blog, projects and social profiles take you to separate websites with their own privacy practices."],
    links: [
      { label: "Web3Forms privacy", href: "https://web3forms.com/privacy" },
      { label: "Google privacy", href: "https://policies.google.com/privacy" },
    ],
  },
  {
    id: "analytics", title: "Cookies and analytics",
    paragraphs: ["The portfolio uses local storage to remember your light or dark theme and the contact form cooldown. You can clear this information through your browser settings.", "This portfolio does not use analytics tracking or session recording."],
  },
  {
    id: "retention", title: "Data retention",
    paragraphs: ["Enquiry emails may remain in the email conversation. Retention also depends on the services handling the information; their policies explain their own storage practices. Contact me to ask about a particular message or request its deletion.", "Browser preferences and the submission timestamp remain in local storage until cleared or replaced."],
  },
  {
    id: "security", title: "Data security",
    paragraphs: ["The contact form sends submissions to Web3Forms over HTTPS. Your message is handled through the form and email providers rather than a database in this portfolio. No online transmission or storage method can guarantee complete security."],
  },
  {
    id: "requests", title: "Your rights / requests",
    paragraphs: ["You can email me to ask what information I hold from our correspondence, correct it or request deletion. Depending on where you live, you may have additional privacy rights. I may need to confirm the request comes from you before sharing or changing personal information."],
  },
  {
    id: "changes", title: "Changes to this policy",
    paragraphs: ["If the portfolio’s information handling changes, I’ll update this page and the date above. This policy covers the portfolio; my separate blog and other linked websites may have different policies."],
  },
  {
    id: "contact", title: "Contact",
    paragraphs: ["For a privacy question or a request about information you’ve shared, email me directly. A short description of your request and the approximate date of our conversation will help me find it."],
    email: true,
  },
];
