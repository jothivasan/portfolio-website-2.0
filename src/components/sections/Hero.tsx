import * as React from "react";
import { useRef } from "react";
import { ArrowRight, ArrowUpRight } from "@phosphor-icons/react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import KineticLink from "../common/KineticLink";

gsap.registerPlugin(useGSAP, SplitText);

const Hero: React.FC = () => {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    (_context, contextSafe) => {
      const media = gsap.matchMedia();
      let disposed = false;

      const startAnimation = contextSafe(() => {
        media.add(
          {
            reduceMotion: "(prefers-reduced-motion: reduce)",
            desktop: "(min-width: 768px) and (pointer: fine)",
          },
          (context) => {
            const { reduceMotion, desktop } = context.conditions as {
              reduceMotion: boolean;
              desktop: boolean;
            };

            const shell = root.current;
            const hero = shell?.querySelector<HTMLElement>(".hero");
            const prelude = shell?.querySelector<HTMLElement>(".hero__prelude");
            const preludeWord = shell?.querySelector<HTMLElement>(".hero__prelude-word");
            const accentWord = shell?.querySelector<HTMLElement>(".hero__accent-word");
            const preludeBaseline = shell?.querySelector<HTMLElement>(
              ".hero__prelude-word .hero__baseline-marker",
            );
            const accentBaseline = shell?.querySelector<HTMLElement>(
              ".hero__accent-word .hero__baseline-marker",
            );
            if (
              !shell ||
              !hero ||
              !prelude ||
              !preludeWord ||
              !accentWord ||
              !preludeBaseline ||
              !accentBaseline
            ) return;

            if (reduceMotion) {
              shell.classList.remove("hero-motion-shell--booting");
              gsap.set(prelude, { autoAlpha: 0 });
              return;
            }

            const leadSplits = gsap.utils
              .toArray<HTMLElement>(".hero__lead-text")
              .map((line) =>
                SplitText.create(line, {
                  type: "words",
                  wordsClass: "hero__word",
                  aria: "auto",
                }),
              );

            const preludeSplit = SplitText.create(preludeWord, {
              type: "chars",
              charsClass: "hero__prelude-char",
              ignore: ".hero__prelude-plate, .hero__baseline-marker",
              aria: "hidden",
            });

            const targetRect = accentWord.getBoundingClientRect();
            const preludeBaselineRect = preludeBaseline.getBoundingClientRect();
            const accentBaselineRect = accentBaseline.getBoundingClientRect();
            const baselineOffset = accentBaselineRect.top - preludeBaselineRect.top;

            gsap.set(preludeWord, {
              y: baselineOffset,
              transformOrigin: "left bottom",
            });
            gsap.set(prelude, { autoAlpha: 1 });

            const alignedRect = preludeWord.getBoundingClientRect();
            const travelX = targetRect.left - alignedRect.left;

            gsap.set(accentWord, { autoAlpha: 0 });
            gsap.set(leadSplits[0].words, {
              yPercent: 112,
              rotateX: -28,
              autoAlpha: 0,
            });
            gsap.set(leadSplits[1].words, {
              x: -46,
              y: 12,
              autoAlpha: 0,
            });
            gsap.set(".hero__line-copy", { visibility: "visible" });
            gsap.set(".hero__accent-stroke", {
              scaleX: 0,
              transformOrigin: "left center",
            });

            const timeline = gsap.timeline({
              defaults: { ease: "power4.out" },
              onComplete: () => {
                shell.classList.remove("hero-motion-shell--booting");
                gsap.set(
                  [
                    prelude,
                    preludeWord,
                    ...leadSplits.flatMap((split) => split.words),
                    accentWord,
                  ],
                  { clearProps: "all" },
                );
                gsap.set(prelude, { autoAlpha: 0 });
              },
            });

            timeline
              .from(preludeSplit.chars, {
                yPercent: 125,
                rotateX: -90,
                autoAlpha: 0,
                duration: 0.7,
                stagger: 0.035,
                ease: "back.out(1.7)",
              })
              .addLabel("flight", "+=0.06")
              .to(
                preludeWord,
                {
                  x: travelX,
                  transformOrigin: "left bottom",
                  duration: 1.08,
                  ease: "expo.inOut",
                },
                "flight",
              )
              .to(
                ".hero__prelude-plate",
                {
                  scaleY: 0.17,
                  transformOrigin: "center bottom",
                  duration: 0.78,
                  ease: "expo.inOut",
                },
                "flight+=0.12",
              )
              .to(
                leadSplits[0].words,
                {
                  yPercent: 0,
                  rotateX: 0,
                  autoAlpha: 1,
                  duration: 0.7,
                  stagger: 0.055,
                },
                "flight+=0.08",
              )
              .to(
                leadSplits[1].words,
                {
                  x: 0,
                  y: 0,
                  autoAlpha: 1,
                  duration: 0.62,
                  stagger: 0.07,
                },
                "flight+=0.3",
              )
              .from(
                ".hero__eyebrow",
                { x: -18, autoAlpha: 0, duration: 0.48 },
                "flight+=0.48",
              )
              .set(accentWord, { autoAlpha: 1 }, "flight+=1.06")
              .set(prelude, { autoAlpha: 0 }, "flight+=1.06")
              .to(
                ".hero__accent-stroke",
                { scaleX: 1, duration: 0.58, ease: "expo.out" },
                "flight+=1.01",
              )
              .from(
                ".hero__footer > p",
                { y: 22, autoAlpha: 0, duration: 0.58 },
                "flight+=1.08",
              )
              .from(
                ".hero__actions .button",
                {
                  clipPath: "inset(0 100% 0 0 round 12px)",
                  autoAlpha: 0,
                  duration: 0.62,
                  stagger: 0.09,
                  ease: "expo.out",
                },
                "flight+=1.18",
              )
              .from(
                ".intro-rail > *",
                { y: 10, autoAlpha: 0, duration: 0.44, stagger: 0.08 },
                "flight+=1.34",
              );

            if (!desktop) {
              return () => {
                leadSplits.forEach((split) => split.revert());
                preludeSplit.revert();
              };
            }

            const moveAccentX = gsap.quickTo(accentWord, "x", {
              duration: 0.8,
              ease: "power3.out",
            });
            const moveAccentY = gsap.quickTo(accentWord, "y", {
              duration: 0.8,
              ease: "power3.out",
            });

            const onPointerMove = (event: PointerEvent) => {
              if (timeline.progress() < 1) return;
              const bounds = hero.getBoundingClientRect();
              const x = (event.clientX - bounds.left) / bounds.width - 0.5;
              const y = (event.clientY - bounds.top) / bounds.height - 0.5;
              moveAccentX(x * 10);
              moveAccentY(y * 6);
            };

            const resetPointer = () => {
              moveAccentX(0);
              moveAccentY(0);
            };

            hero.addEventListener("pointermove", onPointerMove);
            hero.addEventListener("pointerleave", resetPointer);

            return () => {
              hero.removeEventListener("pointermove", onPointerMove);
              hero.removeEventListener("pointerleave", resetPointer);
              leadSplits.forEach((split) => split.revert());
              preludeSplit.revert();
            };
          },
        );
      });

      if (document.fonts.status === "loaded") {
        startAnimation();
      } else {
        void document.fonts.ready.then(() => {
          if (!disposed) startAnimation();
        });
      }

      return () => {
        disposed = true;
        media.revert();
      };
    },
    { scope: root },
  );

  return (
    <div className="hero-motion-shell hero-motion-shell--booting" ref={root}>
      <div className="hero__prelude" aria-hidden="true">
        <span className="hero__prelude-word">
          beautifully.
          <span className="hero__baseline-marker" />
          <span className="hero__prelude-plate" />
        </span>
      </div>

      <div className="hero">
        <div className="hero__inner">
          <p className="hero__eyebrow">Product-minded full stack developer</p>

          <h1 aria-label="I build digital products that work beautifully.">
            <span className="hero__line">
              <span className="hero__line-copy">
                <span className="hero__lead-text">I build digital products</span>
              </span>
            </span>
            <span className="hero__line">
              <span className="hero__line-copy">
                <span className="hero__lead-text">that work</span>{" "}
                <em className="hero__accent-word">
                  beautifully.
                  <span className="hero__baseline-marker" />
                  <span className="hero__accent-stroke" aria-hidden="true" />
                </em>
              </span>
            </span>
          </h1>

          <div className="hero__footer">
            <p>
              I turn complex ideas into fast, reliable web products using
              React, TypeScript, Node.js, and modern cloud tools.
            </p>
            <div className="hero__actions">
              <KineticLink
                label="View work"
                variant="primary"
                href="#projects"
                icon={<ArrowRight weight="bold" />}
              />
              <KineticLink
                label="Read writing"
                variant="secondary"
                href="https://blogs.jothivasan.dev"
                target="_blank"
                rel="noreferrer"
                icon={<ArrowUpRight weight="bold" />}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="intro-rail">
        <p className="intro-rail__statement">Building for the web. Writing what I learn.</p>
        <nav aria-label="Profile links">
          <a href="https://linkedin.com/in/jothivasan/" target="_blank" rel="noreferrer">
            LinkedIn <ArrowUpRight aria-hidden="true" />
          </a>
          <a href="https://github.com/jothivasan" target="_blank" rel="noreferrer">
            GitHub <ArrowUpRight aria-hidden="true" />
          </a>
          <a href="/Jothivasan_FullStackDeveloper_Resume.pdf" target="_blank" rel="noreferrer">
            Résumé <ArrowUpRight aria-hidden="true" />
          </a>
        </nav>
      </div>
    </div>
  );
};

export default Hero;
