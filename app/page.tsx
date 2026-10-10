import Image from "next/image";
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

function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <span className="brand-mark" aria-label="АРКА 123">
      <svg aria-hidden="true" viewBox="0 0 36 42">
        <path d="M3 39V18a15 15 0 0 1 30 0v21" />
        <path d="M10 39V17m5 22V17l-5 6m9-1c0-3 2-5 5-5s5 2 5 5c0 5-10 7-10 17h11m-11-17h10" />
      </svg>
      {!compact && <span>АРКА 123</span>}
    </span>
  );
}

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
      <header className="site-header">
        <a className="logo-link" href="#top">
          <BrandMark />
        </a>
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
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-media">
            <Image
              src="/media/photos/hall-windows-wide-1672.avif"
              alt="Зал АРКА 123 с двумя арочными окнами"
              fill
              priority
              sizes="100vw"
            />
            <div className="hero-shade" />
          </div>
          <div className="hero-content shell">
            <p className="eyebrow light">Пространство для встреч · Минск</p>
            <h1 id="hero-title">
              Место, где
              <br />
              <em>встречаются</em> идеи
            </h1>
            <div className="hero-bottom">
              <p>
                Светлое пространство напротив Национальной библиотеки для
                презентаций, переговоров и событий вашего формата.
              </p>
              <a className="round-link" href="#about" aria-label="Узнать о пространстве">
                <ArrowIcon />
              </a>
            </div>
          </div>
        </section>

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

        <section className="space-section section" id="space" aria-labelledby="space-title">
          <div className="shell">
            <div className="section-heading inverse">
              <div className="section-index">02 / Внутри</div>
              <h2 id="space-title">
                Посмотрите на зал
                <br />
                <em>изнутри</em>
              </h2>
              <p>
                Базовый кадр будущей объёмной сцены. Архитектура останется
                неизменной — будут меняться только сценарии использования.
              </p>
            </div>
            <div className="space-stage">
              <Image
                src="/media/photos/hall-windows-wide-1672.avif"
                alt="Панорамный вид пустого зала"
                fill
                sizes="(max-width: 768px) 100vw, 90vw"
              />
              <div className="space-stage-ui">
                <span className="status-dot">Статичный обзор</span>
                <span>Перемещайте курсор</span>
              </div>
              <div className="space-hotspot" aria-hidden="true">
                <span>01</span>
              </div>
            </div>
            <div className="mode-list" aria-label="Будущие режимы пространства">
              <span className="active">Пустое пространство</span>
              <span>Презентация</span>
              <span>Работа за столами</span>
            </div>
          </div>
        </section>

        <section className="section shell" id="formats" aria-labelledby="formats-title">
          <div className="section-heading">
            <div className="section-index">03 / Форматы</div>
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
              <div className="section-index">04 / Всё готово</div>
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
              <div className="section-index">05 / Тарифы</div>
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
                <div className="section-index">06 / Галерея</div>
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
            <div className="section-index">07 / Отзывы</div>
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
          <BrandMark />
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
