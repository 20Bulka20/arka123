"use client";

import { useEffect, useRef, useState } from "react";

export function ScrollFilm() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const [activeChapter, setActiveChapter] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;

    if (!section || !video) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let playing = false;

    const syncCopy = () => {
      const time = video.currentTime;
      const nextChapter = time < 1.65 ? 0 : time < 3.45 ? 1 : 2;
      setActiveChapter((current) =>
        current === nextChapter ? current : nextChapter,
      );

      if (progressRef.current && Number.isFinite(video.duration)) {
        progressRef.current.style.transform = `scaleX(${
          video.ended ? 1 : time / video.duration
        })`;
      }
    };

    const reset = () => {
      video.pause();
      video.currentTime = 0.01;
      playing = false;
      setActiveChapter(0);
      if (progressRef.current) {
        progressRef.current.style.transform = "scaleX(0)";
      }
      section.removeAttribute("data-started");
    };

    const playFromStart = () => {
      if (reducedMotion) return;
      playing = true;
      section.dataset.started = "true";
      video.currentTime = 0;
      setActiveChapter(0);
      void video.play().catch(() => {
        playing = false;
        section.removeAttribute("data-started");
      });
    };

    const onEnded = () => {
      playing = false;
      syncCopy();
    };

    const onScroll = () => {
      if (reducedMotion) return;

      const bounds = section.getBoundingClientRect();
      const inHero =
        bounds.top < window.innerHeight * 0.45 && bounds.bottom > 160;

      if (!inHero) {
        if (playing || video.currentTime > 0.05) reset();
        return;
      }

      if (!playing) playFromStart();
    };

    video.pause();
    video.currentTime = 0.01;
    video.addEventListener("timeupdate", syncCopy);
    video.addEventListener("ended", onEnded);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      video.removeEventListener("timeupdate", syncCopy);
      video.removeEventListener("ended", onEnded);
      window.removeEventListener("scroll", onScroll);
      section.removeAttribute("data-started");
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="hero scroll-film"
      aria-labelledby="hero-title"
    >
      <div className="scroll-film__stage">
        <video
          ref={videoRef}
          className="scroll-film__video"
          muted
          playsInline
          preload="auto"
          poster="/media/woman/woman-greet-poster.webp"
          aria-hidden="true"
          tabIndex={-1}
        >
          <source
            src="/media/woman/woman-greet-2k.mp4"
            type="video/mp4"
          />
        </video>

        <div className="scroll-film__shade" aria-hidden="true" />

        <div className="scroll-film__copy shell">
          <div
            className={`scroll-film__chapter scroll-film__chapter--intro ${
              activeChapter === 0 ? "is-active" : ""
            }`}
            aria-hidden={activeChapter !== 0}
          >
            <p className="eyebrow light">Пространство для встреч · Минск</p>
            <h1 id="hero-title">
              Встречаемся
              <br />
              напротив <em>Библиотеки.</em>
            </h1>
          </div>

          <div
            className={`scroll-film__chapter scroll-film__chapter--metric ${
              activeChapter === 1 ? "is-active" : ""
            }`}
            aria-hidden={activeChapter !== 1}
          >
            <strong>123</strong>
            <div>
              <span>м²</span>
              <p>для мастер-классов, семинаров и ваших идей</p>
            </div>
          </div>

          <div
            className={`scroll-film__chapter scroll-film__chapter--windows ${
              activeChapter === 2 ? "is-active" : ""
            }`}
            aria-hidden={activeChapter !== 2}
          >
            <p className="eyebrow light">Главное преимущество</p>
            <h2>
              Две арки.
              <br />
              <em>Один особенный вид.</em>
            </h2>
          </div>
        </div>

        <div className="scroll-film__scroll-cue" aria-hidden="true">
          <span>Листайте, чтобы начать</span>
          <i />
        </div>

        <div className="scroll-film__progress" aria-hidden="true">
          <span ref={progressRef} className="scroll-film__progress-fill" />
        </div>
      </div>
    </section>
  );
}
