import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent
} from "react";
import { motion, useReducedMotion } from "framer-motion";
import { carouselImages, type ImageAsset } from "../data/media";

export type GalleryItem = {
  id: string;
  title: string;
  photo: {
    url: string;
    text: string;
    pos: string;
  };
};

type CircularGalleryProps = {
  items: GalleryItem[];
};

type MemoryCardProps = {
  item: GalleryItem;
  index: number;
  total: number;
  rotation: number;
  onSelect: (item: GalleryItem) => void;
};

function GalleryItemCard({
  item,
  index,
  total,
  rotation,
  onSelect
}: MemoryCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const angle = (index / total) * 360 + rotation;
const radians = (angle * Math.PI) / 180;

const depth = Math.cos(radians);



const scale = 0.72 + Math.max(0, depth + 1) * 0.14;
const opacity = 0.42 + Math.max(0, depth + 1) * 0.27;
const brightness = 0.68 + Math.max(0, depth + 1) * 0.18;

  return (
    <motion.button
      type="button"
      className="memory-card"
      style={
        shouldReduceMotion
          ? {
              transform: `translate(-50%, -50%) rotateY(${angle}deg) translateZ(520px) scale(${scale})`,
              opacity,
              zIndex: Math.round((depth + 1) * 100)
            }
          : {
             transform: `translate(-50%, -50%) rotateY(${angle}deg) translateZ(520px) scale(${scale})`,
              opacity,
              zIndex: Math.round((depth + 1) * 100),
              filter: `brightness(${brightness})`
            }
      }
      onClick={() => onSelect(item)}
      aria-label={`Open memory: ${item.title}`}
      
    >
      <span className="memory-card-image-wrap">
        <img
          src={item.photo.url}
          alt={item.photo.text}
          loading="lazy"
          style={{ objectPosition: item.photo.pos }}
        />
      </span>
      <span className="memory-card-label">{item.title}</span>
    </motion.button>
  );
}

function imageToGalleryItem(image: ImageAsset): GalleryItem {
  return {
    id: image.id,
    title: image.title,
    photo: {
      url: image.src,
      text: image.alt,
      pos: image.position ?? "center"
    }
  };
}

export function CircularMemoryGallery({
  items
}: CircularGalleryProps) {
  const [rotation, setRotation] = useState(0);
  const [selected, setSelected] = useState<GalleryItem | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const lastScroll = useRef(0);
  const dragStart = useRef({ x: 0, rotation: 0 });

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      const section = document.querySelector(".carousel-section");

      if (!section) {
        return;
      }

      const rect = section.getBoundingClientRect();
      const isNearViewport =
        rect.top < window.innerHeight * 0.85 &&
        rect.bottom > window.innerHeight * 0.15;

      if (!isNearViewport) {
        return;
      }

      const delta =
        Math.abs(event.deltaY) > Math.abs(event.deltaX)
          ? event.deltaY
          : event.deltaX;

      if (Math.abs(delta) < 1) {
        return;
      }

      const now = performance.now();

      if (now - lastScroll.current < 8) {
        return;
      }

      lastScroll.current = now;
      setRotation((value) => value - delta * 0.065);
    };

    window.addEventListener("wheel", handleWheel, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    setIsDragging(true);
    dragStart.current = {
      x: event.clientX,
      rotation
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!isDragging) {
      return;
    }

    const delta = event.clientX - dragStart.current.x;
    setRotation(dragStart.current.rotation + delta * 0.32);
  };

  const handlePointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    setIsDragging(false);

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const closeSelected = () => setSelected(null);

  return (
    <>
      <div
        className={`circular-gallery ${isDragging ? "is-dragging" : ""}`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        role="region"
        aria-label="Circular birthday memory gallery"
      >
        <div className="gallery-ring">
          {items.map((item, index) => (
            <GalleryItemCard
              key={item.id}
              item={item}
              index={index}
              total={items.length}
              rotation={rotation}
              onSelect={setSelected}
            />
          ))}
        </div>

        <div className="gallery-center-copy" aria-hidden="true">
          <span>Memory wheel</span>
          <strong>10 little chapters</strong>
          <small>Drag or scroll to wander through them</small>
        </div>
      </div>

      {selected ? (
        <div
          className="memory-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={selected.title}
          onClick={closeSelected}
        >
          <button
            type="button"
            className="lightbox-close"
            onClick={closeSelected}
            aria-label="Close memory preview"
          >
            ×
          </button>

          <div
            className="memory-lightbox-content"
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={selected.photo.url}
              alt={selected.photo.text}
              style={{ objectPosition: selected.photo.pos }}
            />
            <div>
              <p className="eyebrow">A favorite chapter</p>
              <h3>{selected.title}</h3>
              <p>{selected.photo.text}</p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export function BirthdayCircularGallery() {
  const items = useMemo(
    () => carouselImages.map(imageToGalleryItem),
    []
  );

  return <CircularMemoryGallery items={items} />;
}