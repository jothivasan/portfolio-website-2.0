import * as React from "react";
import { useRef, useState } from "react";
import { capturePortfolioEvent } from "../common/Analytics";

type FormState = {
  name: string;
  email: string;
  company: string;
  message: string;
  botcheck: string;
};

type SubmitState = "idle" | "submitting" | "success" | "error";

const initialForm: FormState = {
  name: "",
  email: "",
  company: "",
  message: "",
  botcheck: "",
};

const WEB3FORMS_ACCESS_KEY = "be450410-8797-4e71-aca1-20a023fe0d12";
const SUBMISSION_COOLDOWN_MS = 60_000;

const Arrow = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M5 12h14m-6-6 6 6-6 6" />
  </svg>
);

const Contact: React.FC = () => {
  const [form, setForm] = useState<FormState>(initialForm);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [feedback, setFeedback] = useState("");
  const startedAt = useRef(Date.now());

  const updateField = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (form.botcheck || Date.now() - startedAt.current < 1_200) {
      setSubmitState("error");
      setFeedback("Please wait a moment and try again.");
      return;
    }

    const lastSubmission = Number(
      window.localStorage.getItem("jothivasan-contact-last-submit") ?? 0,
    );
    if (Date.now() - lastSubmission < SUBMISSION_COOLDOWN_MS) {
      setSubmitState("error");
      setFeedback("Your message was already sent. Please wait before sending another.");
      return;
    }

    setSubmitState("submitting");
    setFeedback("Sending your message…");

    const payload = new FormData(event.currentTarget);
    payload.append("access_key", WEB3FORMS_ACCESS_KEY);
    payload.append("subject", "New portfolio enquiry");
    payload.append("from_name", "jothivasan.dev");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: payload,
      });
      const data = (await response.json()) as { success?: boolean; message?: string };

      if (!response.ok || !data.success) {
        throw new Error(data.message || "The message could not be sent.");
      }

      window.localStorage.setItem(
        "jothivasan-contact-last-submit",
        String(Date.now()),
      );
      setForm(initialForm);
      setSubmitState("success");
      setFeedback("Message received. I’ll get back to you shortly.");
      capturePortfolioEvent("portfolio_contact_submitted", {
        company_provided: Boolean(form.company),
      });
    } catch {
      setSubmitState("error");
      setFeedback(
        "Something interrupted the message. You can email me directly instead.",
      );
    }
  };

  const resetForm = () => {
    startedAt.current = Date.now();
    setSubmitState("idle");
    setFeedback("");
  };

  const socials = [
    { label: "LinkedIn", url: "https://linkedin.com/in/jothivasan/" },
    { label: "GitHub", url: "https://github.com/jothivasan" },
    { label: "LeetCode", url: "https://leetcode.com/u/Jothivasan28/" },
  ];

  return (
    <div className="contact-section">
      <div className="contact-section__inner">
        <header className="contact-heading">
          <p className="eyebrow">Contact · Let’s build something useful</p>
          <h2>
            Have a problem worth <span>solving?</span>
          </h2>
        </header>

        <div className="contact-layout">
          <div className="contact-details">
            <p className="contact-details__intro">
              I’m interested in thoughtful product work, ambitious web
              applications, and teams that care about how software is built.
              Tell me what you’re working on.
            </p>

            <div className="contact-details__list">
              <div>
                <span className="eyebrow">Email</span>
                <a href="mailto:Jothivasan2001@gmail.com">
                  Jothivasan2001@gmail.com
                </a>
              </div>
              <div>
                <span className="eyebrow">Phone</span>
                <a href="tel:+919994497540">+91 99944 97540</a>
              </div>
              <div>
                <span className="eyebrow">Based in</span>
                <strong>Chennai, India</strong>
              </div>
            </div>

            <div className="contact-socials">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  {social.label}<span aria-hidden="true">↗</span>
                </a>
              ))}
            </div>

            <div className="contact-availability">
              <i aria-hidden="true" />
              <div>
                <strong>Available for meaningful work</strong>
                <span>Open to product and engineering conversations.</span>
              </div>
            </div>
          </div>

          <div className="contact-card">
            {submitState === "success" ? (
              <div className="contact-success" role="status">
                <span className="contact-success__icon" aria-hidden="true">✓</span>
                <p className="eyebrow">Message received</p>
                <h3>Thanks for reaching out.</h3>
                <p>{feedback}</p>
                <button type="button" onClick={resetForm}>
                  Send another message <span aria-hidden="true">↻</span>
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate={false}>
                <div className="contact-card__top">
                  <p className="eyebrow">Start a conversation</p>
                  <span>Usually replies within 1-2 days</span>
                </div>

                <div className="form-grid">
                  <label>
                    <span>Your name</span>
                    <input
                      required
                      minLength={2}
                      maxLength={80}
                      autoComplete="name"
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={updateField}
                      placeholder="How should I address you?"
                    />
                  </label>
                  <label>
                    <span>Email address</span>
                    <input
                      required
                      maxLength={160}
                      autoComplete="email"
                      inputMode="email"
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={updateField}
                      placeholder="you@company.com"
                    />
                  </label>
                </div>

                <label>
                  <span>Company or project <em>Optional</em></span>
                  <input
                    maxLength={120}
                    autoComplete="organization"
                    type="text"
                    name="company"
                    value={form.company}
                    onChange={updateField}
                    placeholder="What are you building?"
                  />
                </label>

                <label>
                  <span>How can I help?</span>
                  <textarea
                    required
                    minLength={20}
                    maxLength={2000}
                    name="message"
                    rows={6}
                    value={form.message}
                    onChange={updateField}
                    placeholder="A short description of the problem, team, or opportunity…"
                  />
                  <small>{form.message.length}/2000</small>
                </label>

                <label className="contact-honeypot" aria-hidden="true">
                  Leave this field empty
                  <input
                    tabIndex={-1}
                    autoComplete="off"
                    type="text"
                    name="botcheck"
                    value={form.botcheck}
                    onChange={updateField}
                  />
                </label>

                <div className="contact-card__submit">
                  <p>
                    By sending this form, you agree to be contacted about your
                    enquiry.
                  </p>
                  <button
                    type="submit"
                    disabled={submitState === "submitting"}
                  >
                    {submitState === "submitting" ? "Sending…" : "Send message"}
                    {submitState !== "submitting" && <Arrow />}
                  </button>
                </div>

                <p
                  className={`contact-feedback ${submitState === "error" ? "contact-feedback--error" : ""}`}
                  aria-live="polite"
                >
                  {feedback}
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
