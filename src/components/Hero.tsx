import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { heroImages } from "../data/media";
import { BalloonEffect } from "./BalloonEffect";

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [pointer, setPointer] = useState({ x: 0, y: 0 });

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (
      shouldReduceMotion ||
      event.pointerType !== "mouse" ||
      window.innerWidth < 900
    ) {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    setPointer({ x, y });
  };

  const resetPointer = () => setPointer({ x: 0, y: 0 });

  return (
    <section
      ref={heroRef}
      className="hero section-shell"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
      aria-labelledby="birthday-title"
    >
      <div className="hero-grain" aria-hidden="true" />

      <div className="hero-content">
        <motion.p
          className="eyebrow"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          A little celebration for our favorite girl
        </motion.p>

        <motion.h1
          id="birthday-title"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.25 }}
        >
          Happy Birthday
          <span>Shivika</span>
        </motion.h1>

        <motion.p
          className="hero-description"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.48 }}
        >
          Three wonderful years of laughter, love, and little adventures.
        </motion.p>

        <motion.div
          className="hero-actions"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.68 }}
        >
          <a className="button button-primary" href="#memories">
            Explore her story
            <span aria-hidden="true">↓</span>
          </a>
          <BalloonEffect />
        </motion.div>
      </div>

      <div
        className="hero-photo-stage"
        style={
          shouldReduceMotion
            ? undefined
            : {
                transform: `rotateX(${pointer.y * -3}deg) rotateY(${pointer.x * 4}deg)`
              }
        }
        aria-label="Three favorite photographs of Shivika"
      >
        <motion.div
          className="hero-orbit hero-orbit-one"
          animate={
            shouldReduceMotion
              ? undefined
              : { y: [0, -12, 0], rotate: [-3, -1, -3] }
          }
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden="true"
        />

        <motion.div
          className="hero-orbit hero-orbit-two"
          animate={
            shouldReduceMotion
              ? undefined
              : { y: [0, 14, 0], rotate: [4, 2, 4] }
          }
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden="true"
        />

        <motion.figure
          className="hero-photo hero-photo-back hero-photo-left"
          initial={{ opacity: 0, x: -34, rotate: -9 }}
          animate={{ opacity: 1, x: 0, rotate: -8 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <img
            src={heroImages[1].src}
            alt={heroImages[1].alt}
            loading="eager"
          />
          <figcaption>{heroImages[1].title}</figcaption>
        </motion.figure>

        <motion.figure
          className="hero-photo hero-photo-main"
          initial={{ opacity: 0, y: 34, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.35 }}
        >
          <img
            src={heroImages[0].src}
            alt={heroImages[0].alt}
            loading="eager"
          />
          <figcaption>{heroImages[0].title}</figcaption>
        </motion.figure>

        <motion.figure
          className="hero-photo hero-photo-back hero-photo-right"
          initial={{ opacity: 0, x: 34, rotate: 9 }}
          animate={{ opacity: 1, x: 0, rotate: 8 }}
          transition={{ duration: 1, delay: 0.7 }}
        >
          <img
            src={heroImages[2].src}
            alt={heroImages[2].alt}
            loading="eager"
          />
          <figcaption>{heroImages[2].title}</figcaption>
        </motion.figure>
      </div>

      <a className="scroll-cue" href="#memories" aria-label="Scroll to memories">
        <span className="scroll-cue-line" />
        <span>Scroll to explore</span>
      </a>
    </section>
  );
}