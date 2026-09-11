import { useEffect, useRef } from "react";
import type { VideoAsset } from "../data/media";

type VideoModalProps = {
  video: VideoAsset | null;
  onClose: () => void;
};

export function VideoModal({ video, onClose }: VideoModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!video) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    dialogRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [video, onClose]);

  if (!video) {
    return null;
  }

  return (
    <div
      ref={dialogRef}
      className="video-modal"
      role="dialog"
      aria-modal="true"
      aria-label={video.title}
      tabIndex={-1}
      onClick={onClose}
    >
      <button
        type="button"
        className="video-modal-close"
        onClick={onClose}
        aria-label="Close video"
      >
        ×
      </button>

      <div
        className="video-modal-panel"
        onClick={(event) => event.stopPropagation()}
      >
        <video
          src={video.src}
          poster={video.poster}
          controls
          autoPlay
          playsInline
          preload="metadata"
        />
        <div className="video-modal-copy">
          <p className="eyebrow">A memory in motion</p>
          <h3>{video.title}</h3>
          <p>{video.caption}</p>
        </div>
      </div>
    </div>
  );
}