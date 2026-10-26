"use client";

import { useEffect, useState } from "react";

type AnimatedLogoProps = {
  variant?: "header" | "footer" | "preloader";
  animate?: boolean;
  href?: string;
};

const SESSION_KEY = "arka123:intro-seen";
const MAX_WAIT_MS = 3_500;
/** Logo intro (~0.8s) + at least one full glow loop (~1.8s). */
const MIN_PLAY_MS = 3_000;

/** Arch contour only — digit 1 is filled separately. */
const ARCH_PATH =
  "M252 655V395C252 305 332 230 436 230S620 305 620 395V655H300";

/** Solid digit 1: taller than 2/3 — stem meets the arch baseline. */
const DIGIT_ONE_PATH = "M290 386H355V646H320V408H290Z";

function LogoArtwork({
  className,
  animated = false,
}: {
  className?: string;
  animated?: boolean;
}) {
  const classes = [
    "arka-logo",
    animated ? "arka-logo--animated" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <span
      className={classes}
      role="img"
      aria-label="АРКА 123 — встречаемся напротив Библиотеки"
    >
      {/* Glow behind the mark — soft halo peeks past the ink */}
      <span className="arka-logo__trace-glow" aria-hidden="true">
        <span className="arka-logo__trace-one-clip">
          <svg
            className="arka-logo__trace"
            viewBox="200 160 1360 560"
            preserveAspectRatio="xMidYMid meet"
          >
            <path className="arka-logo__trace-one" d={DIGIT_ONE_PATH} />
          </svg>
        </span>
        <span className="arka-logo__trace-arch-clip">
          <svg
            className="arka-logo__trace"
            viewBox="200 160 1360 560"
            preserveAspectRatio="xMidYMid meet"
          >
            <path className="arka-logo__trace-arch" d={ARCH_PATH} />
          </svg>
        </span>
      </span>
      <span
        className="arka-logo__layer arka-logo__layer--complete"
        aria-hidden="true"
      />
      <span
        className="arka-logo__layer arka-logo__layer--shine"
        aria-hidden="true"
      />
    </span>
  );
}

export function AnimatedLogo({
  variant = "header",
  animate = false,
  href,
}: AnimatedLogoProps) {
  const variantClass =
    variant === "footer"
      ? "arka-logo--footer"
      : variant === "preloader"
        ? "arka-logo--preloader"
        : "arka-logo--header";

  const artwork = <LogoArtwork className={variantClass} animated={animate} />;

  if (href) {
    return (
      <a
        className="logo-link arka-logo-trigger"
        href={href}
        aria-label="АРКА 123 — на главную"
      >
        {artwork}
      </a>
    );
  }

  return artwork;
}

function waitForWindowLoad() {
  if (document.readyState === "complete") return Promise.resolve();

  return new Promise<void>((resolve) => {
    window.addEventListener("load", () => resolve(), { once: true });
  });
}

async function waitForHeroImage() {
  const image = document.querySelector<HTMLImageElement>(".hero-media img");
  if (!image || image.complete) {
    await image?.decode().catch(() => undefined);
    return;
  }

  await new Promise<void>((resolve) => {
    image.addEventListener("load", () => resolve(), { once: true });
    image.addEventListener("error", () => resolve(), { once: true });
  });
}

export function LogoPreloader() {
  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const forceIntro =
      params.has("intro") ||
      params.get("replay") === "1" ||
      params.get("preloader") === "1";

    if (!forceIntro && window.sessionStorage.getItem(SESSION_KEY)) {
      queueMicrotask(() => setVisible(false));
      return;
    }

    if (forceIntro) {
      window.sessionStorage.removeItem(SESSION_KEY);
    }

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const startedAt = performance.now();
    let exitTimer: ReturnType<typeof setTimeout> | undefined;
    let cancelled = false;

    document.body.dataset.preloading = "true";

    const readiness = Promise.all([
      waitForWindowLoad(),
      document.fonts?.ready ?? Promise.resolve(),
      waitForHeroImage(),
    ]);
    const timeout = new Promise<void>((resolve) => {
      window.setTimeout(resolve, MAX_WAIT_MS);
    });

    void Promise.race([readiness, timeout]).then(() => {
      const elapsed = performance.now() - startedAt;
      const remaining = reducedMotion
        ? 0
        : Math.max(0, MIN_PLAY_MS - elapsed);

      exitTimer = setTimeout(() => {
        if (cancelled) return;
        window.sessionStorage.setItem(SESSION_KEY, "true");
        setExiting(true);
        document.body.removeAttribute("data-preloading");
        exitTimer = setTimeout(() => setVisible(false), reducedMotion ? 0 : 760);
      }, remaining);
    });

    return () => {
      cancelled = true;
      clearTimeout(exitTimer);
      document.body.removeAttribute("data-preloading");
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`logo-preloader ${exiting ? "logo-preloader--exiting" : ""}`}
      role="status"
      aria-label="Подготавливаем первый экран"
      aria-live="polite"
    >
      <AnimatedLogo variant="preloader" animate />
      <p className="logo-preloader__meta">Пространство загружается</p>
    </div>
  );
}
