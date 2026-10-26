"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";

const slides = [
  {
    src: "/media/photos/hall-windows-wide-1672.webp",
    alt: "Широкий вид пустого зала АРКА 123 на два арочных окна",
    label: "Главный зал",
    orientation: "landscape" as const,
  },
  {
    src: "/media/photos/window-library-941.webp",
    alt: "Вид на Национальную библиотеку через арочное окно",
    label: "Окно на Библиотеку",
    orientation: "portrait" as const,
  },
  {
    src: "/media/photos/window-plaza-941.webp",
    alt: "Второе арочное окно с видом на площадь",
    label: "Второе окно",
    orientation: "portrait" as const,
  },
  {
    src: "/media/photos/hall-back-wall-941.webp",
    alt: "Дальний торец зала с часами и стеклянной дверью",
    label: "Дальний торец",
    orientation: "portrait" as const,
  },
  {
    src: "/media/photos/kitchenette-941.webp",
    alt: "Кухонная ниша пространства АРКА 123",
    label: "Кухонная зона",
    orientation: "portrait" as const,
  },
  {
    src: "/media/photos/facade-promenade-1672.webp",
    alt: "Аркада и променад у здания на Мстиславца, 10",
    label: "Фасад",
    orientation: "landscape" as const,
  },
] as const;

export function SpaceSlider() {
  const [index, setIndex] = useState(0);
  const dragOrigin = useRef<number | null>(null);

  const goTo = useCallback((next: number) => {
    setIndex(((next % slides.length) + slides.length) % slides.length);
  }, []);

  const step = useCallback(
    (direction: -1 | 1) => {
      setIndex((current) => (current + direction + slides.length) % slides.length);
    },
    [],
  );

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") step(-1);
      if (event.key === "ArrowRight") step(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [step]);

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).closest("button")) return;
    dragOrigin.current = event.clientX;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (dragOrigin.current === null) return;
    const delta = event.clientX - dragOrigin.current;
    dragOrigin.current = null;
    if (Math.abs(delta) < 48) return;
    step(delta < 0 ? 1 : -1);
  };

  return (
    <div className="space-slider">
      <div
        className="space-slider-frame"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => {
          dragOrigin.current = null;
        }}
      >
        {slides.map((item, itemIndex) => (
          <div
            className={`space-slider-slide${itemIndex === index ? " is-active" : ""}`}
            key={item.src}
            aria-hidden={itemIndex !== index}
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              sizes="(max-width: 900px) 100vw, 1672px"
              quality={95}
              unoptimized
              priority={itemIndex === 0}
              draggable={false}
            />
          </div>
        ))}

      </div>

      <div className="space-slider-toolbar">
        <button
          className="space-slider-nav"
          type="button"
          aria-label="Предыдущий кадр"
          onClick={() => step(-1)}
        >
          ←
        </button>

        <div className="space-slider-dots" role="tablist" aria-label="Кадры пространства">
          {slides.map((item, itemIndex) => (
            <button
              key={item.src}
              type="button"
              role="tab"
              aria-selected={itemIndex === index}
              aria-label={item.label}
              className={itemIndex === index ? "is-active" : undefined}
              onClick={() => goTo(itemIndex)}
            />
          ))}
        </div>

        <button
          className="space-slider-nav"
          type="button"
          aria-label="Следующий кадр"
          onClick={() => step(1)}
        >
          →
        </button>
      </div>
    </div>
  );
}
