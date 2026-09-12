import { motion, useReducedMotion } from "framer-motion";
import { pixelMemoryImage } from "../data/media";

export function PixelMemory() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="pixel-section section-shell" aria-labelledby="finale-title">
      <div className="pixel-art-wrap">
        <motion.img
          src={pixelMemoryImage}
          alt="Pixel-art memory of Shivika and her uncle"
          loading="lazy"
          initial={shouldReduceMotion ? false : { scale: 1.04, opacity: 0 }}
          whileInView={shouldReduceMotion ? undefined : { scale: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.2 }}
        />
        <div className="pixel-art-overlay" aria-hidden="true" />
      </div>

      <div className="pixel-copy">
        <p className="eyebrow">A memory to keep</p>
        <h2 id="finale-title">Two Years of Shivika</h2>
        <p>
          From tiny beginnings to a world of smiles, every day with you has
          been a gift.
        </p>
        <div className="final-message">
          <span>Happy 3rd Birthday, Shivika.</span>
          <strong>
            Keep smiling, keep growing, and keep making the world brighter.
          </strong>
        </div>
      </div>

      <div className="pixel-spark pixel-spark-one" aria-hidden="true" />
      <div className="pixel-spark pixel-spark-two" aria-hidden="true" />
      <div className="pixel-spark pixel-spark-three" aria-hidden="true" />
    </section>
  );
}