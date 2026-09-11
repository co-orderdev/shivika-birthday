import {
  useEffect,
  useRef,
  useState,
  type MouseEvent
} from "react";
import { motion, useReducedMotion } from "framer-motion";
import { videos, type VideoAsset } from "../data/media";
import { VideoModal } from "./VideoModal";

type VideoCardProps = {
  video: VideoAsset;
  index: number;
  onOpen: (video: VideoAsset) => void;
};

function VideoCard({ video, index, onOpen }: VideoCardProps) {
  const cardRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const handleMouseMove = (event: MouseEvent<HTMLElement>) => {
  const card = event.currentTarget;
  const rect = card.getBoundingClientRect();

  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  const rotateX = ((y / rect.height) - 0.5) * -8;
  const rotateY = ((x / rect.width) - 0.5) * 8;

  card.style.setProperty("--tilt-x", `${rotateX}deg`);
  card.style.setProperty("--tilt-y", `${rotateY}deg`);
};

const handleMouseLeave = (event: MouseEvent<HTMLElement>) => {
  const card = event.currentTarget;

  card.style.setProperty("--tilt-x", "0deg");
  card.style.setProperty("--tilt-y", "0deg");
};

  useEffect(() => {
    const node = cardRef.current;

    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin: "180px 0px" }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const element = videoRef.current;

    if (!element) {
      return;
    }

    if (!isVisible) {
      element.pause();
    }
  }, [isVisible]);

  return (
    <motion.article
      ref={cardRef}
      className={`video-card video-card-${(index % 6) + 1}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
      whileInView={
        shouldReduceMotion
        ? undefined
        : { opacity: 1, y: 0 }
    }
    viewport={{ once: true, amount: 0.05 }}
    transition={{
    duration: 0.3,
    ease: "easeOut"
}}
    
      whileHover={
  shouldReduceMotion
    ? undefined
    : {
        y: -12,
        scale: 1.08,
        rotate: 0,
        zIndex: 50
      }
}
    >
      <button
        type="button"
        className="video-card-button"
        onClick={() => onOpen(video)}
        aria-label={`Play video: ${video.title}`}
      >
        <div className="video-thumbnail">
          <video
            ref={videoRef}
            src={isVisible ? video.src : undefined}
            poster={video.poster}
            muted
            loop
            playsInline
            preload="none"
            aria-hidden="true"
          />
          <span className="video-shade" />
          <span className="play-button" aria-hidden="true">
            ▶
          </span>
          <span className="video-number">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <div className="video-card-copy">
          <strong>{video.title}</strong>
          <span>{video.caption}</span>
        </div>
      </button>
    </motion.article>
  );
}

export function VideoMemories() {
  const [selectedVideo, setSelectedVideo] = useState<VideoAsset | null>(null);

  return (
    <>
      <section
        className="videos-section section-shell"
        aria-labelledby="videos-title"
      >
        <div className="section-heading section-heading-centered">
          <p className="eyebrow">Memories in motion</p>
          <h2 id="videos-title">Little Moments, Big Memories</h2>
          <p>
            Every little moment became a memory. Tap any frame to let it play.
          </p>
        </div>

        <div className="video-field">
          {videos.map((video, index) => (
            <VideoCard
              key={video.id}
              video={video}
              index={index}
              onOpen={setSelectedVideo}
            />
          ))}
        </div>
      </section>

      <VideoModal
        video={selectedVideo}
        onClose={() => setSelectedVideo(null)}
      />
    </>
  );
}