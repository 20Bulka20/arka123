"use client";

import { reviews } from "@/data/content";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";

export function ReviewsSlider() {
  const [index, setIndex] = useState(0);
  const dragOrigin = useRef<number | null>(null);
  const total = reviews.length;

  const goTo = useCallback(
    (next: number) => {
      setIndex(((next % total) + total) % total);
    },
    [total],
  );

  const step = useCallback(
    (direction: -1 | 1) => {
      setIndex((current) => (current + direction + total) % total);
    },
    [total],
  );

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest("input, textarea, [contenteditable]")) return;
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
    <div className="review-slider">
      <div
        className="review-slider-frame"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => {
          dragOrigin.current = null;
        }}
      >
        {reviews.map((review, itemIndex) => (
          <figure
            className={`review-slider-slide${itemIndex === index ? " is-active" : ""}`}
            key={review.author}
            aria-hidden={itemIndex !== index}
          >
            <blockquote>«{review.quote}»</blockquote>
            <figcaption>
              <strong>{review.author}</strong>
              <small>{review.context}</small>
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="review-slider-toolbar">
        <button
          className="review-slider-nav"
          type="button"
          aria-label="Предыдущий отзыв"
          onClick={() => step(-1)}
        >
          ←
        </button>

        <div className="review-slider-dots" role="tablist" aria-label="Отзывы">
          {reviews.map((review, itemIndex) => (
            <button
              key={review.author}
              type="button"
              role="tab"
              aria-selected={itemIndex === index}
              aria-label={`Отзыв ${itemIndex + 1}: ${review.author}`}
              className={itemIndex === index ? "is-active" : undefined}
              onClick={() => goTo(itemIndex)}
            />
          ))}
        </div>

        <button
          className="review-slider-nav"
          type="button"
          aria-label="Следующий отзыв"
          onClick={() => step(1)}
        >
          →
        </button>
      </div>
    </div>
  );
}
