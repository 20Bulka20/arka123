import Image from "next/image";
import {
  AnimatedLogo,
  LogoPreloader,
} from "@/components/brand/AnimatedLogo";
import { ScrollFilm } from "@/components/hero/ScrollFilm";
import { SpaceExperience } from "@/components/space/SpaceExperience";
import {
  contact,
  facts,
  gallery,
  navigation,
  reviews,
  services,
  tariffs,
  useCases,
} from "@/data/content";

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20">
      <path d="M3 10h13m-5-5 5 5-5 5" />
    </svg>
  );
}

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
        <a className="header-cta" href="#contact">
          Обсудить событие
          <ArrowIcon />
        </a>
      </header>

      <main id="top">
        <ScrollFilm />

        <section className="section intro shell" id="about" aria-labelledby="about-title">
          <div className="section-index">01 / О пространстве</div>
          <div className="intro-copy">
            <h2 id="about-title">
              Архитектура задаёт
              <br />
              <em>другой ритм</em> встречи
            </h2>
            <p className="lead">
              АРКА 123 — лаконичный зал с естественным светом, характерными
              окнами и видом на город. Чистая основа, которую легко настроить
              под вашу задачу.
            </p>
          </div>
          <div className="facts" aria-label="Кратко о пространстве">
            {facts.map((fact) => (
              <div className="fact" key={fact.label}>
                <strong>{fact.value}</strong>
                <span>{fact.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section
          className="host-section section"
          id="host"
          aria-labelledby="host-title"
        >
          <div className="shell host-layout">
            <div className="host-media">
              <Image
                src="/media/woman/host-full-960.avif"
                alt="Фирменная героиня АРКА 123 в графитовом костюме"
                fill
                sizes="(max-width: 768px) 100vw, 48vw"
              />
              <div className="host-portrait" aria-hidden="true">
                <Image
                  src="/media/woman/host-portrait-960.avif"
                  alt=""
                  fill
                  sizes="(max-width: 768px) 38vw, 16vw"
                />
              </div>
              <span className="host-mark">123</span>
            </div>

            <div className="host-copy">
              <div className="section-index">02 / Герой пространства</div>
              <p className="eyebrow">Хозяйка АРКА 123</p>
              <h2 id="host-title">
                Встречает.
                <br />
                <em>Показывает. Помогает.</em>
              </h2>
              <p className="lead">
                Фирменная героиня — спокойный куратор пространства. Она
                знакомит гостей с залом, помогает выбрать формат и делает
                строгий архитектурный образ бренда человечнее.
              </p>
              <div className="host-detail">
                <span>Фирменная деталь</span>
                <p>
                  Брошь повторяет знак арочного окна и связывает персонажа с
                  айдентикой АРКА 123.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="space-section section" id="space" aria-labelledby="space-title">
          <div className="shell">
            <div className="section-heading inverse">
              <div className="section-index">03 / Внутри</div>
              <h2 id="space-title">
                Посмотрите на зал
                <br />
                <em>изнутри</em>
              </h2>
              <p>
                Обход по реальным ракурсам зала: окна, торец и кухонная зона.
                Переключайте сценарии рассадки поверх исходной архитектуры.
              </p>
            </div>
            <SpaceExperience />
          </div>
        </section>

        <section className="section shell" id="formats" aria-labelledby="formats-title">
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

        <section className="section shell" id="tariffs" aria-labelledby="tariffs-title">
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
          <div className="tariff-grid">
            {tariffs.map((tariff) => (
              <article className={`tariff ${tariff.featured ? "featured" : ""}`} key={tariff.name}>
                <p className="tariff-eyebrow">{tariff.eyebrow}</p>
                <h3>{tariff.name}</h3>
                <p className="tariff-description">{tariff.description}</p>
                <div className="price">
                  <strong>{tariff.price}</strong>
                  <span>{tariff.unit}</span>
                </div>
                <ul>
                  {tariff.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
                <a href="#contact">
                  Запросить расчёт
                  <ArrowIcon />
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="gallery-section section" id="gallery" aria-labelledby="gallery-title">
          <div className="shell">
            <div className="section-heading inverse split-heading">
              <div>
                <div className="section-index">07 / Галерея</div>
                <h2 id="gallery-title">
                  Свет.
                  <br />
                  <em>Арки. Город.</em>
                </h2>
              </div>
              <p>Реальные кадры пространства и маршрута к нему.</p>
            </div>
            <div className="gallery-grid">
              {gallery.map((item, index) => (
                <figure
                  className={`gallery-item gallery-${index + 1} ${item.orientation}`}
                  key={item.slug}
                >
                  <Image
                    src={`/media/photos/${item.slug}-${item.width}.avif`}
                    alt={item.alt}
                    fill
                    sizes={
                      item.orientation === "landscape"
                        ? "(max-width: 768px) 100vw, 66vw"
                        : "(max-width: 768px) 100vw, 34vw"
                    }
                  />
                  <figcaption>
                    <span>0{index + 1}</span>
                    {item.alt}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section className="section shell" id="reviews" aria-labelledby="reviews-title">
          <div className="section-heading">
            <div className="section-index">08 / Отзывы</div>
            <h2 id="reviews-title">
              Здесь говорят
              <br />
              <em>по делу</em>
            </h2>
          </div>
          <div className="review-grid">
            {reviews.map((review) => (
              <figure className="review" key={review.author}>
                <span>Макет отзыва</span>
                <blockquote>«{review.quote}»</blockquote>
                <figcaption>
                  <strong>{review.author}</strong>
                  <small>{review.context}</small>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="contact-section" id="contact" aria-labelledby="contact-title">
          <div className="contact-media">
            <Image
              src="/media/photos/library-and-building-1672.avif"
              alt="Национальная библиотека и здание с аркадой"
              fill
              sizes="100vw"
            />
          </div>
          <div className="shell contact-card">
            <p className="eyebrow light">Мстиславца, 10 · Минск</p>
            <h2 id="contact-title">
              Встретимся
              <br />
              <em>в АРКА 123?</em>
            </h2>
            <p>
              Расскажите о событии — уточним свободное время и подготовим
              расчёт под ваш сценарий.
            </p>
            <form className="contact-form">
              <label>
                <span>Имя</span>
                <input name="name" type="text" placeholder="Как к вам обращаться?" />
              </label>
              <label>
                <span>Телефон или почта</span>
                <input name="contact" type="text" placeholder="+375 или email" />
              </label>
              <button type="button">
                Оставить заявку
                <ArrowIcon />
              </button>
            </form>
            <small>Демо-форма: отправка будет подключена после согласования контактов.</small>
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
          <a href="#top">Наверх ↑</a>
        </div>
      </footer>
    </>
  );
}
