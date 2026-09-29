import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowRight, ArrowUpRight, Check, Copy, GithubLogo, LinkedinLogo, Code, CircleNotch } from "@phosphor-icons/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { capturePortfolioEvent } from "../components/common/Analytics";
import { CONTACT_COOLDOWN_MS, readLastSubmission, rememberSubmission, sendContactMessage } from "../services/contact";
import "../styles/contact-page.css";

type SubmitState = "idle" | "submitting" | "success" | "error";
const profiles = [
  { label: "LinkedIn", href: "https://linkedin.com/in/jothivasan/", icon: LinkedinLogo },
  { label: "GitHub", href: "https://github.com/jothivasan", icon: GithubLogo },
  { label: "LeetCode", href: "https://leetcode.com/u/Jothivasan28/", icon: Code },
];

export default function ContactPage() {
  const reduced = useReducedMotion();
  const [state, setState] = useState<SubmitState>("idle");
  const [feedback, setFeedback] = useState("");
  const [messageLength, setMessageLength] = useState(0);
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">("idle");
  const startedAt = useRef(Date.now());
  const lastSubmission = useRef(readLastSubmission());
  const pending = useRef(false);
  const request = useRef<AbortController | null>(null);
  const successTitle = useRef<HTMLHeadingElement>(null);
  const errorMessage = useRef<HTMLParagraphElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const firstField = useRef<HTMLInputElement>(null);
  const focusOnReset = useRef(false);

  useEffect(() => () => request.current?.abort(), []);
  useEffect(() => {
    if (state === "success") successTitle.current?.focus({ preventScroll: true });
    if (state === "error") errorMessage.current?.focus({ preventScroll: true });
    if (state === "idle" && focusOnReset.current) {
      firstField.current?.focus();
      focusOnReset.current = false;
    }
  }, [state]);
  useEffect(() => {
    if (copyState === "idle") return;
    const timer = window.setTimeout(() => setCopyState("idle"), 3500);
    return () => window.clearTimeout(timer);
  }, [copyState]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("Jothivasan2001@gmail.com");
      setCopyState("copied");
    } catch { setCopyState("error"); }
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (pending.current) return;
    const payload = new FormData(event.currentTarget);
    if (payload.get("botcheck") || Date.now() - startedAt.current < 1200) {
      setFeedback("Please wait a moment, then try again.");
      setState("error");
      return;
    }
    const latest = Math.max(lastSubmission.current, readLastSubmission());
    if (Date.now() - latest < CONTACT_COOLDOWN_MS) {
      setFeedback("Your previous note was sent. Please wait a minute before sending another.");
      setState("error");
      return;
    }
    // Native constraints cover length/type; trim to reject whitespace-only notes too.
    if (String(payload.get("name")).trim().length < 2 || String(payload.get("message")).trim().length < 20) {
      setFeedback("Please include your name and a message of at least 20 meaningful characters.");
      setState("error");
      return;
    }
    pending.current = true;
    setState("submitting");
    setFeedback("");
    const controller = new AbortController();
    request.current = controller;
    let timedOut = false;
    const timeout = window.setTimeout(() => { timedOut = true; controller.abort(); }, 20_000);
    try {
      await sendContactMessage(payload, controller.signal);
      lastSubmission.current = Date.now();
      rememberSubmission(lastSubmission.current);
      formRef.current?.reset();
      setMessageLength(0);
      setState("success");
      capturePortfolioEvent("portfolio_contact_submitted", { company_provided: Boolean(String(payload.get("company") ?? "").trim()) });
    } catch {
      if (controller.signal.aborted && !timedOut) return;
      setFeedback(timedOut
        ? "The connection took too long. Your note is still here. Please try again or email me directly."
        : "Your note couldn’t be sent. Your details are still here. Please try again or email me directly.");
      setState("error");
    } finally {
      window.clearTimeout(timeout);
      pending.current = false;
      request.current = null;
    }
  };

  const reveal = (delay = 0) => ({
    initial: reduced ? false as const : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduced ? 0 : 0.65, delay: reduced ? 0 : delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <div className="contact-page">
      <div className="contact-page__inner">
        <div className="contact-page__layout">
          <div className="contact-page__story">
            <motion.p className="contact-page__eyebrow" {...reveal(0.05)}>A NEW CONVERSATION</motion.p>
            <h1 className="contact-page__title" aria-label="Good things start with hello.">
              {["Good things", "start with", "hello."].map((line, index) => (
                <span className="contact-page__line" key={line} aria-hidden="true">
                  <motion.span className={index === 2 ? "contact-page__hello" : undefined}
                    initial={reduced ? false : { y: "108%" }} animate={{ y: 0 }}
                    transition={{ duration: reduced ? 0 : 0.8, delay: reduced ? 0 : 0.1 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}>
                    {line}
                  </motion.span>
                </span>
              ))}
            </h1>
            <motion.p className="contact-page__intro" {...reveal(0.3)}>
              Have something in mind? A product to build, a problem to untangle, or a team to join. I’d love to hear about it.
            </motion.p>
          </div>

          <motion.div className="contact-letter" {...reveal(0.2)}>
            <div className="contact-letter__address"><span>TO: JOTHIVASAN</span><span>LET’S MAKE IT HAPPEN <ArrowUpRight aria-hidden="true" /></span></div>
            <div className="contact-letter__body">
              <AnimatePresence initial={false}>
                {state === "success" ? (
                  <motion.div key="success" className="contact-letter__success" {...reveal()}>
                    <span className="contact-letter__check"><Check weight="bold" size={32} aria-hidden="true" /></span>
                    <p className="contact-page__eyebrow">DELIVERED. THANK YOU.</p>
                    <h2 ref={successTitle} tabIndex={-1}>A good beginning.</h2>
                    <p>Your note is in my inbox. I’ll read it and get back to you, usually within 1–2 days.</p>
                    <a className="contact-letter__return" href="/">Back to the portfolio<ArrowRight aria-hidden="true" /></a>
                    <button className="contact-letter__another" type="button" onClick={() => {
                      focusOnReset.current = true;
                      startedAt.current = Date.now();
                      setFeedback("");
                      setState("idle");
                    }}>Send another note</button>
                  </motion.div>
                ) : (
                  <form ref={formRef} onSubmit={submit} aria-labelledby="contact-form-title" aria-busy={state === "submitting"}>
                    <div className="contact-letter__heading"><h2 id="contact-form-title">A note to my inbox.</h2><p>A few details. A little possibility.</p></div>
                    <fieldset disabled={state === "submitting"}>
                      <legend className="contact-page__sr">Your contact details and message</legend>
                      <div className="contact-letter__pair">
                        <label className="contact-letter__field"><span>Your name <small>Required</small></span><input ref={firstField} name="name" autoComplete="name" required minLength={2} maxLength={80} placeholder="Alex Morgan" /></label>
                        <label className="contact-letter__field"><span>Email address <small>Required</small></span><input name="email" type="email" inputMode="email" autoComplete="email" required maxLength={160} placeholder="alex@company.com" /></label>
                      </div>
                      <label className="contact-letter__field"><span>Company or project <small>Optional</small></span><input name="company" autoComplete="organization" maxLength={120} placeholder="Where you’re making things happen" /></label>
                      <label className="contact-letter__field"><span>What’s on your mind? <small>Required</small></span><textarea name="message" required minLength={20} maxLength={2000} rows={4} placeholder="The idea, the challenge, or just a little about you…" aria-describedby="contact-message-hint" onChange={event => setMessageLength(event.target.value.length)} /><span id="contact-message-hint" className="contact-letter__hint"><span>At least 20 characters</span><span>{messageLength} / 2000</span></span></label>
                      <div className="contact-letter__trap" aria-hidden="true"><label>Leave this empty<input name="botcheck" tabIndex={-1} autoComplete="off" /></label></div>
                      <motion.button className="contact-letter__submit" type="submit"
                        whileHover={reduced ? undefined : { y: -2 }} whileTap={reduced ? undefined : { scale: 0.99 }}>
                        <span>{state === "submitting" ? "Sending your note…" : "Send your note"}</span>
                        <span className="contact-letter__submit-icon">{state === "submitting" ? <CircleNotch className="contact-letter__spinner" aria-hidden="true" /> : <ArrowUpRight aria-hidden="true" />}</span>
                      </motion.button>
                    </fieldset>
                    <p className="contact-letter__response">Usually replies in 1–2 days.</p>
                    <p className="contact-letter__privacy">Your details are only used to reply to your enquiry. <a href="https://blogs.jothivasan.dev/privacy" target="_blank" rel="noreferrer">Privacy policy<ArrowUpRight aria-hidden="true" /></a></p>
                  </form>
                )}
              </AnimatePresence>
              <div className="contact-letter__feedback" aria-live="polite" aria-atomic="true">
                {state === "submitting" && <span className="contact-page__sr">Sending your note. Please wait.</span>}
                {state === "error" && <p ref={errorMessage} tabIndex={-1}>{feedback} <a href="mailto:Jothivasan2001@gmail.com">Email Jothivasan<ArrowUpRight aria-hidden="true" /></a></p>}
              </div>
            </div>
          </motion.div>
          <motion.aside className="contact-page__direct" aria-label="Direct contact information" {...reveal(0.4)}>
            <div className="contact-page__email-row">
              <span className="contact-page__eyebrow">MORE OF AN EMAIL PERSON?</span>
              <a className="contact-page__email" href="mailto:Jothivasan2001@gmail.com">Jothivasan2001@gmail.com<ArrowUpRight aria-hidden="true" /></a>
              <button className="contact-page__copy" type="button" onClick={copyEmail}>
                {copyState === "copied" ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
                {copyState === "copied" ? "Copied to clipboard" : "Copy email address"}
              </button>
              <span className="contact-page__sr" role="status">{copyState === "copied" ? "Email address copied." : ""}</span>
              {copyState === "error" && <p className="contact-page__copy-error" role="status">Copy unavailable. Use the email link above.</p>}
            </div>
            <div className="contact-page__coordinates">
              <div><span className="contact-page__eyebrow">BASED IN</span><p>Chennai, India</p></div>
              <div><span className="contact-page__eyebrow">A DIRECT LINE</span><a href="tel:+919994497540">+91 99944 97540<ArrowUpRight aria-hidden="true" /></a></div>
            </div>
            <nav className="contact-page__socials" aria-label="Social profiles">
              {profiles.map(({ label, href, icon: Icon }) => (
                <a href={href} key={label} target="_blank" rel="noreferrer"><Icon size={17} aria-hidden="true" />{label}<ArrowUpRight size={12} aria-hidden="true" /></a>
              ))}
            </nav>
          </motion.aside>
        </div>

      </div>
    </div>
  );
}
