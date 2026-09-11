import { FlowShaderBackground } from "../components/FlowShaderBackground";
import { Hero } from "../components/Hero";
import { BirthdayCircularGallery } from "../components/CircularMemoryGallery";
import { PhotoGallery } from "../components/PhotoGallery";
import { VideoMemories } from "../components/VideoMemories";
import { PixelMemory } from "../components/PixelMemory";
import { useEffect, useRef, useState } from "react";

export function Birthday() {
    const audioRef = useRef<HTMLAudioElement>(null);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  useEffect(() => {
    const startMusic = () => {
      const audio = audioRef.current;

      if (!audio) {
        return;
      }

      audio.volume = 0.35;

      audio
        .play()
        .then(() => setIsMusicPlaying(true))
        .catch(() => {});

      window.removeEventListener("pointerdown", startMusic);
    };

    window.addEventListener("pointerdown", startMusic, { once: true });

    return () => {
      window.removeEventListener("pointerdown", startMusic);
    };
  }, []);
  return (
    <div className="birthday-site">
      <audio
  ref={audioRef}
  src="music/birthday-music.mp3"
  loop
  preload="auto"
/>
      <FlowShaderBackground />
      <div className="site-vignette" aria-hidden="true" />

      <button
  type="button"
  className="music-toggle"
style={{
  position: "fixed",
  right: "30px",
  bottom: "30px",
  zIndex: 99999,
  display: "block",
  opacity: 1,
  visibility: "visible",
}}
  onClick={() => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    if (audio.paused) {
      audio.play().then(() => setIsMusicPlaying(true));
    } else {
      audio.pause();
      setIsMusicPlaying(false);
    }
  }}
  aria-label={
    isMusicPlaying ? "Pause birthday music" : "Play birthday music"
  }
>
  {isMusicPlaying ? "♫ Music on" : "♫ Music off"}
</button>


      <main>
        <Hero />

        <section
          id="memories"
          className="memories-intro section-shell"
          aria-labelledby="memories-title"
        >
          <div className="section-heading">
            <p className="eyebrow">Chapter one · the photo story</p>
            <h2 id="memories-title">A little life, beautifully lived.</h2>
            <p>
              Ten favorite photographs, circling around the memories we never
              want to forget.
            </p>
          </div>

          <BirthdayCircularGallery />
        </section>

        <PhotoGallery />
        <VideoMemories />
        <PixelMemory />
      </main>

      <footer className="site-footer">
        <span>Made with love by mamu for Shivika</span>
        <span aria-hidden="true">✦</span>
        <span>10th September 2026</span>
      </footer>
    </div>
  );
}