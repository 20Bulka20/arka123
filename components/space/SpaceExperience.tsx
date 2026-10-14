"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";

const viewpoints = [
  {
    id: "hall",
    label: "Главный зал",
    note: "Два арочных окна и вид на город",
    src: "/media/photos/hall-windows-wide-1672.avif",
    alt: "Широкий вид пустого зала АРКА 123 на два арочных окна",
    orientation: "landscape" as const,
  },
  {
    id: "library",
    label: "Окно на Библиотеку",
    note: "Главный вид бренда через арку",
    src: "/media/photos/window-library-941.avif",
    alt: "Вид на Национальную библиотеку через арочное окно",
    orientation: "portrait" as const,
  },
  {
    id: "plaza",
    label: "Второе окно",
    note: "Площадь и естественный свет",
    src: "/media/photos/window-plaza-941.avif",
    alt: "Второе арочное окно с видом на площадь",
    orientation: "portrait" as const,
  },
  {
    id: "back",
    label: "Дальний торец",
    note: "Часы, колонна и вход в зал",
    src: "/media/photos/hall-back-wall-941.avif",
    alt: "Дальний торец зала с часами и стеклянной дверью",
    orientation: "portrait" as const,
  },
  {
    id: "kitchen",
    label: "Кухонная зона",
    note: "Ниша для кофе-паузы рядом с залом",
    src: "/media/photos/kitchenette-941.avif",
    alt: "Кухонная ниша пространства АРКА 123",
    orientation: "portrait" as const,
  },
] as const;

const modes = [
  {
    id: "empty",
    label: "Пустое пространство",
    note: "Как зал выглядит без рассадки",
  },
  {
    id: "presentation",
    label: "Презентация",
    note: "Экран и ряды для мастер-класса",
  },
  {
    id: "tables",
    label: "Работа за столами",
    note: "Общий стол или островные группы",
  },
] as const;

type ViewpointId = (typeof viewpoints)[number]["id"];
type ModeId = (typeof modes)[number]["id"];

function PresentationLayout() {
  return (
    <svg
      className="space-layout"
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="screenGlow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f4f0e6" stopOpacity="0.92" />
          <stop offset="100%" stopColor="#cfc5b4" stopOpacity="0.75" />
        </linearGradient>
        <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="10" stdDeviation="12" floodOpacity="0.28" />
        </filter>
      </defs>

      <g filter="url(#softShadow)">
        <rect
          x="690"
          y="250"
          width="220"
          height="132"
          rx="6"
          fill="url(#screenGlow)"
          stroke="rgba(255,255,255,0.55)"
          strokeWidth="2"
        />
        <rect x="788" y="382" width="24" height="46" fill="#1a2d36" />
        <ellipse cx="800" cy="434" rx="42" ry="8" fill="rgba(20,42,53,0.35)" />
      </g>

      {[0, 1, 2].map((row) =>
        [-2, -1, 0, 1, 2].map((seat) => {
          const x = 800 + seat * (78 - row * 4);
          const y = 560 + row * 58;
          const scale = 1 - row * 0.06;
          return (
            <g
              key={`${row}-${seat}`}
              transform={`translate(${x} ${y}) scale(${scale})`}
              opacity={0.88 - row * 0.08}
            >
              <ellipse cx="0" cy="18" rx="28" ry="9" fill="rgba(20,42,53,0.22)" />
              <rect
                x="-18"
                y="-6"
                width="36"
                height="22"
                rx="5"
                fill="#203743"
                stroke="rgba(255,255,255,0.28)"
              />
              <rect
                x="-14"
                y="-22"
                width="28"
                height="18"
                rx="6"
                fill="#2c4a58"
                stroke="rgba(255,255,255,0.2)"
              />
            </g>
          );
        }),
      )}

      <text
        x="800"
        y="224"
        textAnchor="middle"
        fill="rgba(255,255,255,0.82)"
        fontSize="18"
        letterSpacing="0.12em"
      >
        ЭКРАН
      </text>
    </svg>
  );
}

function TablesLayout() {
  return (
    <svg
      className="space-layout"
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <filter id="tableShadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="14" stdDeviation="16" floodOpacity="0.3" />
        </filter>
      </defs>

      <g filter="url(#tableShadow)" transform="translate(560 560)">
        <ellipse
          cx="0"
          cy="0"
          rx="170"
          ry="54"
          fill="#d8cbb8"
          stroke="rgba(32,55,67,0.35)"
          strokeWidth="3"
        />
        {[-120, -40, 40, 120].map((x) => (
          <g key={`a-${x}`} transform={`translate(${x} 70)`}>
            <ellipse cx="0" cy="10" rx="22" ry="7" fill="rgba(20,42,53,0.2)" />
            <rect x="-14" y="-8" width="28" height="18" rx="4" fill="#203743" />
          </g>
        ))}
        {[-120, -40, 40, 120].map((x) => (
          <g key={`b-${x}`} transform={`translate(${x} -70)`}>
            <ellipse cx="0" cy="10" rx="22" ry="7" fill="rgba(20,42,53,0.2)" />
            <rect x="-14" y="-8" width="28" height="18" rx="4" fill="#203743" />
          </g>
        ))}
      </g>

      <g filter="url(#tableShadow)" transform="translate(1080 520)">
        <ellipse
          cx="0"
          cy="0"
          rx="118"
          ry="40"
          fill="#cfc1ab"
          stroke="rgba(32,55,67,0.35)"
          strokeWidth="3"
        />
        {[-70, 0, 70].map((x) => (
          <g key={`c-${x}`} transform={`translate(${x} 54)`}>
            <ellipse cx="0" cy="8" rx="18" ry="6" fill="rgba(20,42,53,0.2)" />
            <rect x="-12" y="-7" width="24" height="16" rx="4" fill="#203743" />
          </g>
        ))}
        {[-70, 0, 70].map((x) => (
          <g key={`d-${x}`} transform={`translate(${x} -54)`}>
            <ellipse cx="0" cy="8" rx="18" ry="6" fill="rgba(20,42,53,0.2)" />
            <rect x="-12" y="-7" width="24" height="16" rx="4" fill="#203743" />
          </g>
        ))}
      </g>
    </svg>
  );
}

export function SpaceExperience() {
  const labelId = useId();
  const stageRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{
    pointerId: number;
    startX: number;
    startPan: number;
    moved: boolean;
  } | null>(null);

  const [viewpointId, setViewpointId] = useState<ViewpointId>("hall");
  const [mode, setMode] = useState<ModeId>("empty");
  const [pan, setPan] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [autoplay, setAutoplay] = useState(true);

  const viewpointIndex = viewpoints.findIndex((item) => item.id === viewpointId);
  const viewpoint = viewpoints[viewpointIndex] ?? viewpoints[0];
  const activeMode = modes.find((item) => item.id === mode) ?? modes[0];
  const showLayouts = viewpoint.id === "hall" && mode !== "empty";

  const goTo = useCallback(
    (nextId: ViewpointId) => {
      setViewpointId(nextId);
      setPan(0);
      if (nextId !== "hall" && mode !== "empty") {
        setMode("empty");
      }
    },
    [mode],
  );

  const step = useCallback(
    (direction: -1 | 1) => {
      const next =
        (viewpointIndex + direction + viewpoints.length) % viewpoints.length;
      const target = viewpoints[next];
      if (target) {
        goTo(target.id);
      }
    },
    [goTo, viewpointIndex],
  );

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      setReducedMotion(media.matches);
      if (media.matches) {
        setAutoplay(false);
      }
    };
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!autoplay || reducedMotion) return;
    const timer = window.setInterval(() => {
      setViewpointId((current) => {
        const index = viewpoints.findIndex((item) => item.id === current);
        const next = viewpoints[(index + 1) % viewpoints.length];
        return next?.id ?? current;
      });
      setPan(0);
      setMode("empty");
    }, 5200);
    return () => window.clearInterval(timer);
  }, [autoplay, reducedMotion]);

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;
    setAutoplay(false);
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startPan: pan,
      moved: false,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    const delta = event.clientX - drag.startX;
    if (Math.abs(delta) > 6) {
      drag.moved = true;
    }
    const width = stageRef.current?.clientWidth ?? 1;
    setPan(Math.max(-18, Math.min(18, drag.startPan + (delta / width) * 28)));
  };

  const onPointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    const delta = event.clientX - drag.startX;
    dragRef.current = null;
    if (Math.abs(delta) > 90) {
      step(delta < 0 ? 1 : -1);
      return;
    }
    if (!drag.moved) {
      setPan(0);
    }
  };

  return (
    <div className="space-experience">
      <div
        ref={stageRef}
        className={`space-stage space-stage--${viewpoint.orientation}`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        role="region"
        aria-labelledby={labelId}
      >
        <div className="space-plates" style={{ ["--space-pan" as string]: `${pan}%` }}>
          {viewpoints.map((item) => (
            <div
              className={`space-plate ${item.id === viewpoint.id ? "is-active" : ""}`}
              key={item.id}
              aria-hidden={item.id !== viewpoint.id}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 768px) 100vw, 90vw"
                priority={item.id === "hall"}
              />
            </div>
          ))}
        </div>

        {showLayouts && (
          <div className="space-layout-layer" aria-hidden="true">
            {mode === "presentation" ? <PresentationLayout /> : <TablesLayout />}
          </div>
        )}

        <div className="space-stage-ui">
          <span className="status-dot">Обход помещения · {viewpointIndex + 1}/5</span>
          <button
            type="button"
            aria-pressed={autoplay}
            onClick={() => setAutoplay((value) => !value)}
          >
            {autoplay ? "Остановить тур" : "Автотур"}
          </button>
        </div>

        <div className="space-nav">
          <button type="button" onClick={() => step(-1)} aria-label="Предыдущий ракурс">
            ←
          </button>
          <button type="button" onClick={() => step(1)} aria-label="Следующий ракурс">
            →
          </button>
        </div>

        <div className="space-caption">
          <div>
            <strong id={labelId}>{viewpoint.label}</strong>
            <span>{viewpoint.note}</span>
          </div>
          {showLayouts && (
            <p className="space-mode-chip">{activeMode.label}</p>
          )}
        </div>
      </div>

      <div className="space-controls">
        <div
          className="viewpoint-list"
          role="tablist"
          aria-label="Ракурсы помещения"
        >
          {viewpoints.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={item.id === viewpoint.id}
              className={item.id === viewpoint.id ? "active" : ""}
              onClick={() => {
                setAutoplay(false);
                goTo(item.id);
              }}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="mode-list" role="tablist" aria-label="Сценарии использования">
          {modes.map((item) => (
            <button
              className={item.id === mode ? "active" : ""}
              type="button"
              role="tab"
              aria-selected={item.id === mode}
              key={item.id}
              onClick={() => {
                setAutoplay(false);
                setMode(item.id);
                if (item.id !== "empty") {
                  goTo("hall");
                }
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <p className="space-disclaimer">
        Обход собран из реальных кадров зала. Стены, окна и планировка не
        изменены — в сценариях поверх фото появляется только рассадка.
      </p>
    </div>
  );
}
