"use client";

import { useState } from "react";
import { ArrowLeft, ArrowUpRight, Pause, Play } from "@phosphor-icons/react";
import InternalLink from "./InternalLink";
import styles from "./LostPage.module.css";

export default function LostPage() {
  const [paused, setPaused] = useState(false);

  return (
    <main id="main-content" className={`${styles.page} ${paused ? styles.paused : ""}`}>
      <div className={styles.content}>
        <div className={styles.scene} aria-hidden="true">
          <span className={styles.note}>YOU ARE SOMEWHERE HERE</span>
          <svg className={styles.noteLine} viewBox="0 0 100 70" fill="none">
            <path d="M4 4C70 0 15 64 91 61m-10-8 10 8-12 6" />
          </svg>
          <div className={styles.numerals}>
            <span className={styles.four}>4</span>
            <div className={styles.portal}>
              <div className={styles.portalInner}><span>*</span></div>
              <div className={styles.orbit}>
                <svg className={styles.cursor} viewBox="0 0 48 56" fill="none">
                  <path d="M7 5v37l10-9 8 17 9-4-8-16h14L7 5Z" />
                </svg>
              </div>
            </div>
            <span className={`${styles.four} ${styles.lastFour}`}>4</span>
          </div>
          <span className={styles.sparkOne}>+</span>
          <span className={styles.sparkTwo}>+</span>
          <span className={styles.sceneCaption}>WRONG TURN. GOOD COMPANY.</span>
        </div>

        <div className={styles.copy}>
          <p className={styles.eyebrow}>PAGE NOT FOUND</p>
          <h1>Lost in the loop?</h1>
          <p className={styles.description}>Looks like this page wandered off.<br />Let’s get you back to somewhere good.</p>
          <div className={styles.actions}>
            <InternalLink href="/" className={styles.home}>
              <ArrowLeft size={18} aria-hidden="true" /> Back to home
              <span aria-hidden="true">↗</span>
            </InternalLink>
            <InternalLink href="/#projects" className={styles.work}>Explore my work <ArrowUpRight size={18} aria-hidden="true" /></InternalLink>
          </div>
        </div>
      </div>

      <div className={styles.bottomline}>
        <span>Even the best journeys take a wrong turn.</span>
        <button type="button" onClick={() => setPaused(value => !value)} aria-pressed={paused} className={styles.animationToggle}>
          {paused ? <Play size={13} aria-hidden="true" /> : <Pause size={13} aria-hidden="true" />}
          {paused ? "Resume animation" : "Pause animation"}
        </button>
      </div>
    </main>
  );
}
