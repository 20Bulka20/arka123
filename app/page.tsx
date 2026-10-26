import Image from "next/image";
import { AnimatedLogo, LogoPreloader } from "@/components/brand/AnimatedLogo";
import { ScrollFilm } from "@/components/hero/ScrollFilm";
import { ReviewsSlider } from "@/components/reviews/ReviewsSlider";
import { SpaceSlider } from "@/components/space/SpaceSlider";
import { TariffGrid } from "@/components/tariffs/TariffGrid";
import {
  contact,
  navigation,
  services,
  spaceSpecs,
  useCases,
} from "@/data/content";

export default function Home() {
  return (
    <>
      <LogoPreloader />
      <header className="site-header">
        <AnimatedLogo href="#top" />
        <nav className="desktop-nav" aria-label="Основная навигация">
          {navigation.map((item) => (
            <a href={item.href} key={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      <main id="top">
        <ScrollFilm />

        <section
          className="section intro shell"
          id="about"
          aria-labelledby="about-title"
        >
          <div className="section-index">01 / О пространстве</div>
          <div className="intro-stage">
            <div className="intro-window">
              <Image
                src="/media/photos/window-view-896.webp"
                alt="Вид на Национальную библиотеку через арочное окно"
                fill
                sizes="(max-width: 900px) 100vw, 1480px"
                priority
              />
            </div>
            <div className="intro-copy">
              <h2 id="about-title">
                Архитектура задаёт
                <br />
                <em>другой ритм</em>
                <br />
                встречи
              </h2>
              <p className="lead">
                АРКА 123 — лаконичный зал с естественным светом, характерными
                окнами и видом на город. Чистая основа, которую легко настроить
                под вашу задачу.
              </p>
            </div>
            <figure className="intro-curator">
              <div className="intro-curator-media">
                <Image
                  src="/media/woman/host-without-bg-960.webp"
                  alt="Куратор пространства АРКА 123"
                  fill
                  sizes="(max-width: 900px) 0px, 22rem"
                />
              </div>
            </figure>
          </div>
        </section>

        <section
          className="space-section section"
          id="space"
          aria-labelledby="space-title"
        >
          <div className="shell">
            <div className="section-heading inverse">
              <div className="section-index">02 / Внутри</div>
              <h2 id="space-title">
                Посмотрите на зал
                <br />
                <em>изнутри</em>
              </h2>
              <p>Реальные ракурсы пространства.</p>
            </div>
            <SpaceSlider />
          </div>
        </section>

        <section
          className="section facts-section"
          id="plan"
          aria-label="План и характеристики пространства"
        >
          <div className="shell facts-layout">
            <div className="section-index">03 / Пространство</div>

            <figure className="plan-figure">
              <a
                href="/media/photos/mock-plan-1536.webp"
                target="_blank"
                rel="noreferrer"
              >
                <Image
                  src="/media/photos/mock-plan-1536.webp"
                  alt="Предварительный план пространства АРКА 123"
                  width={1536}
                  height={1024}
                  sizes="(max-width: 900px) 100vw, 1400px"
                  quality={95}
                  unoptimized
                />
              </a>
            </figure>

            <div className="plan-story-list">
              <ul className="space-features">
                {spaceSpecs.map((spec) => (
                  <li key={spec.label}>
                    <span className="space-feature-mark" aria-hidden="true">
                      ✦
                    </span>
                    <span>
                      {spec.label} — {spec.value}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="space-specs-note">
                Некоторые элементы ремонта можно переделать под себя!
              </p>
            </div>
          </div>
        </section>

        <section
          className="section shell"
          id="formats"
          aria-labelledby="formats-title"
        >
          <div className="section-heading">
            <div className="section-index">04 / Форматы</div>
            <h2 id="formats-title">
              Один зал.
              <br />
              <em>Несколько сценариев.</em>
            </h2>
          </div>
          <div className="use-case-grid">
            {useCases.map((item) => (
              <article className="use-case" key={item.number}>
                <span className="case-number">{item.number}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
                <span className="case-capacity">{item.capacity}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="services section" aria-labelledby="services-title">
          <div className="shell services-layout">
            <div className="services-title">
              <div className="section-index">05 / Всё готово</div>
              <h2 id="services-title">
                Внимание
                <br />
                <em>к деталям</em>
              </h2>
              <p>
                Базовые услуги уже заложены в модель. Состав и условия будут
                уточнены перед публикацией.
              </p>
            </div>
            <div className="service-list">
              {services.map((service, index) => (
                <article key={service.title}>
                  <span>0{index + 1}</span>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          className="section tariffs-section"
          id="tariffs"
          aria-labelledby="tariffs-title"
        >
          <div className="shell">
            <div className="section-heading split-heading">
              <div>
                <div className="section-index">06 / Тарифы</div>
                <h2 id="tariffs-title">
                  Выберите
                  <br />
                  <em>свой формат</em>
                </h2>
              </div>
              <p>
                Финальная стоимость зависит от длительности, рассадки и
                дополнительного оборудования.
              </p>
            </div>
            <TariffGrid />
          </div>
        </section>

        <section
          className="section reviews-section"
          id="reviews"
          aria-labelledby="reviews-title"
        >
          <div className="shell">
            <div className="section-heading reviews-heading">
              <div className="section-index">07 / Отзывы</div>
              <h2 id="reviews-title">
                Здесь говорят
                <br />
                <em>по делу</em>
              </h2>
            </div>
            <ReviewsSlider />
          </div>
        </section>

        <section
          className="contact-section section"
          id="contact"
          aria-labelledby="contact-title"
        >
          <div className="shell contact-head">
            <div className="section-index">Контакты</div>
            <h2 id="contact-title">
              Встретимся
              <br />
              <em>в АРКА 123?</em>
            </h2>

            <div className="contact-layout">
              <div className="contact-place">
                <p>{contact.address}</p>
                <p>{contact.landmark}</p>
                <small>
                  Напишите или позвоните — уточним свободное время и подготовим
                  расчёт под ваш сценарий.
                </small>
              </div>

              <div className="contact-links">
                <a href={contact.phoneHref}>{contact.phone}</a>
                <a className="contact-email" href={contact.emailHref}>
                  {contact.email}
                </a>
                <div className="contact-socials" aria-label="Социальные сети">
                  {contact.socials.map((item) => (
                    <a
                      className="contact-social"
                      href={item.href}
                      key={item.label}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={item.label}
                    >
                      <img src={item.icon} alt="" width={28} height={28} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="contact-map">
            <iframe
              title="Карта: Минск, ул. Петра Мстиславца, 10"
              src={`https://yandex.ru/map-widget/v1/?ll=${contact.map.lng}%2C${contact.map.lat}&z=${contact.map.zoom}&pt=${contact.map.lng},${contact.map.lat},pm2rdm&l=map`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="shell footer-top">
          <AnimatedLogo variant="footer" />
          <div>
            <p>{contact.address}</p>
            <span>{contact.landmark}</span>
          </div>
          <div className="footer-contacts">
            <a href={contact.phoneHref}>{contact.phone}</a>
            <a href={contact.emailHref}>{contact.email}</a>
          </div>
        </div>
        <div className="shell footer-bottom">
          <span>© АРКА 123</span>
          <a href="#plan">План пространства</a>
          <a href="#top">Наверх ↑</a>
        </div>
      </footer>
    </>
  );
}
