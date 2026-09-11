import { motion, useReducedMotion } from "framer-motion";
import { galleryImages } from "../data/media";

export function PhotoGallery() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      className="editorial-gallery section-shell"
      aria-labelledby="gallery-title"
    >
      <div className="section-heading section-heading-split">
        <div>
          <p className="eyebrow">The in-between moments</p>
          <h2 id="gallery-title">Little things, deeply loved.</h2>
        </div>
        <p>
          Six more glimpses of the days, expressions, and tiny details that
          make Shivika so wonderfully Shivika.
        </p>
      </div>

      <div className="editorial-grid">
        {galleryImages.map((image, index) => (
          <motion.figure
            key={image.id}
            className={`editorial-card editorial-card-${index + 1}`}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.18 }}
            transition={{
              duration: 0.7,
              delay: shouldReduceMotion ? 0 : index * 0.06
            }}
          >
            <div className="editorial-image-wrap">
              <img src={image.src} alt={image.alt} loading="lazy" />
            </div>
            <figcaption>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <strong>{image.title}</strong>
                <small>{image.caption}</small>
              </div>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}