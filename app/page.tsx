import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { submission } from "@/data/submission";

export const metadata: Metadata = {
  title: "Тестовое задание · АРКА 123",
  description:
    "Cover-страница тестового задания: что сделано, какие ИИ использованы, lookbook персонажа и видео героя.",
};

function StatusPill({ status }: { status: "done" | "skipped" }) {
  return (
    <span className={`cover-status cover-status--${status}`}>
      {status === "done" ? "Выполнено" : "Не выполнялось"}
    </span>
  );
}

export default function CoverPage() {
  return (
    <main className="cover">
      <header className="cover-hero shell">
        <p className="cover-eyebrow">Тестовое задание · позиция вайбкодера</p>
        <h1>
          {submission.brand}
          <br />
          <em>под ключ</em>
        </h1>
        <p className="cover-lead">{submission.summary}</p>
        <div className="cover-hero-actions">
          <Link className="cover-cta" href={submission.siteHref}>
            Открыть сайт
            <span aria-hidden="true">→</span>
          </Link>
          <a className="cover-cta-ghost" href="#lookbook">
            Lookbook и видео
          </a>
        </div>
        <dl className="cover-meta">
          <div>
            <dt>Время</dt>
            <dd>{submission.timeSpent}</dd>
          </div>
          <div>
            <dt>Стек</dt>
            <dd>Next.js · TypeScript · Tailwind</dd>
          </div>
          <div>
            <dt>Объём</dt>
            <dd>4 из 5 частей задания</dd>
          </div>
        </dl>
      </header>

      <section className="cover-section shell" id="tasks" aria-labelledby="tasks-title">
        <div className="cover-section-head">
          <p className="cover-eyebrow">01 / Что сделано</p>
          <h2 id="tasks-title">Части тестового задания</h2>
        </div>
        <ol className="cover-tasks">
          {submission.tasks.map((task) => (
            <li key={task.id}>
              <div className="cover-task-top">
                <span className="cover-task-num">0{task.id}</span>
                <StatusPill status={task.status} />
              </div>
              <h3>{task.title}</h3>
              <p>{task.detail}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="cover-section shell" id="tools" aria-labelledby="tools-title">
        <div className="cover-section-head">
          <p className="cover-eyebrow">02 / Инструменты</p>
          <h2 id="tools-title">Нейросети и подписки</h2>
          <p>
            Ниже — фактический набор инструментов. Модели внутри Cursor
            менялись по ходу работы; отдельно зафиксированы генераторы
            персонажа и видео.
          </p>
        </div>
        <ul className="cover-tools">
          {submission.tools.map((tool) => (
            <li key={tool.name}>
              <strong>
                {"href" in tool && tool.href ? (
                  <a href={tool.href} target="_blank" rel="noreferrer">
                    {tool.name}
                  </a>
                ) : (
                  tool.name
                )}
              </strong>
              <span>{tool.role}</span>
            </li>
          ))}
        </ul>
        <ul className="cover-stack" aria-label="Технологии сайта">
          {submission.stack.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className="cover-time-note">
          <strong>Затраченное время:</strong> {submission.timeSpent}.{" "}
          {submission.timeNote}
        </p>
      </section>

      <section
        className="cover-section shell"
        id="lookbook"
        aria-labelledby="lookbook-title"
      >
        <div className="cover-section-head">
          <p className="cover-eyebrow">03 / Персонаж</p>
          <h2 id="lookbook-title">Lookbook</h2>
          <p>
            Канонический образ сгенерирован в ChatGPT: строгий графитовый
            костюм и брошь в виде логотипа. Роль — куратор пространства.
          </p>
        </div>
        <figure className="cover-lookbook">
          <Image
            src={submission.lookbook.src}
            alt={submission.lookbook.alt}
            width={submission.lookbook.width}
            height={submission.lookbook.height}
            sizes="(max-width: 1100px) 100vw, 1100px"
            priority={false}
          />
          <figcaption>{submission.lookbook.caption}</figcaption>
        </figure>
      </section>

      <section className="cover-section shell" id="video" aria-labelledby="video-title">
        <div className="cover-section-head">
          <p className="cover-eyebrow">04 / Видео</p>
          <h2 id="video-title">Герой на сайте</h2>
          <p>
            Ролик собран в MiniMax Hailuo AI. На сайте запускается при скролле;
            текст поверх меняется по таймкодам.
          </p>
        </div>
        <figure className="cover-video">
          <video
            controls
            playsInline
            preload="metadata"
            poster={submission.video.poster}
          >
            <source src={submission.video.src} type="video/mp4" />
          </video>
          <figcaption>{submission.video.caption}</figcaption>
        </figure>
      </section>

      <section className="cover-final shell" aria-labelledby="final-title">
        <p className="cover-eyebrow">Результат</p>
        <h2 id="final-title">
          Готовый сайт
          <br />
          <em>АРКА 123</em>
        </h2>
        <p>
          Слоган, логотип, фирменные цвета, прелоадер, персонаж, видео и
          коммерческие блоки собраны в одну адаптивную страницу.
        </p>
        <Link className="cover-cta" href={submission.siteHref}>
          Перейти к сайту
          <span aria-hidden="true">→</span>
        </Link>
      </section>
    </main>
  );
}
