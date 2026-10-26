export type NavigationItem = {
  label: string;
  href: `#${string}`;
};

export type UseCase = {
  number: string;
  title: string;
  description: string;
  capacity: string;
};

export type Service = {
  title: string;
  description: string;
};

export type Tariff = {
  name: string;
  eyebrow: string;
  price: string;
  unit: string;
  description: string;
  features: readonly string[];
  featured?: boolean;
};

export type GalleryItem = {
  slug: string;
  alt: string;
  orientation: "landscape" | "portrait";
  width: 1672 | 941;
};

export type Review = {
  quote: string;
  author: string;
  context: string;
  isPlaceholder: true;
};

export const navigation: readonly NavigationItem[] = [
  { label: "О пространстве", href: "#about" },
  { label: "Форматы", href: "#formats" },
  { label: "Тарифы", href: "#tariffs" },
  { label: "Галерея", href: "#gallery" },
  { label: "Контакты", href: "#contact" },
];

export const useCases: readonly UseCase[] = [
  {
    number: "01",
    title: "Презентация",
    description:
      "Сфокусированный свет, экран и свободная линия взгляда для продукта, лекции или камерной премьеры.",
    capacity: "Фронтальная рассадка",
  },
  {
    number: "02",
    title: "Переговоры",
    description:
      "Один общий стол для стратегической сессии, совета команды или встречи с партнёрами.",
    capacity: "Общий стол",
  },
  {
    number: "03",
    title: "Воркшоп",
    description:
      "Гибкая расстановка небольшими группами для практики, обсуждений и совместной работы.",
    capacity: "Островная рассадка",
  },
];

export const services: readonly Service[] = [
  {
    title: "Подготовка зала",
    description: "Соберём выбранную рассадку до прихода команды.",
  },
  {
    title: "Техника",
    description: "Поможем подготовить показ материалов и рабочее подключение.",
  },
  {
    title: "Кофе-пауза",
    description: "Кухонная зона рядом с залом для спокойных перерывов.",
  },
  {
    title: "Сопровождение",
    description: "Куратор пространства встретит гостей и останется на связи.",
  },
];

export const tariffs: readonly Tariff[] = [
  {
    name: "Встреча",
    eyebrow: "Короткий формат",
    price: "по запросу",
    unit: "до 3 часов",
    description: "Для переговоров, записи интервью или рабочей сессии.",
    features: [
      "Подготовка пространства",
      "Базовое оборудование",
      "Куратор на связи",
    ],
  },
  {
    name: "Событие",
    eyebrow: "Основной формат",
    price: "по запросу",
    unit: "до 8 часов",
    description: "Для презентации, лекции, воркшопа или закрытого события.",
    features: [
      "Выбранная рассадка",
      "Техническая подготовка",
      "Время на монтаж",
    ],
    featured: true,
  },
  {
    name: "Свой сценарий",
    eyebrow: "Индивидуально",
    price: "обсудим",
    unit: "под вашу задачу",
    description:
      "Если событию нужен особый тайминг, зонирование или сопровождение.",
    features: ["Персональный расчёт", "Гибкий график", "Дополнительные услуги"],
  },
];

export const gallery: readonly GalleryItem[] = [
  {
    slug: "hall-windows-wide",
    alt: "Светлый зал АРКА 123 с двумя арочными окнами",
    orientation: "landscape",
    width: 1672,
  },
  {
    slug: "window-library",
    alt: "Вид на Национальную библиотеку через арочное окно",
    orientation: "portrait",
    width: 941,
  },
  {
    slug: "kitchenette",
    alt: "Кухонная ниша пространства",
    orientation: "portrait",
    width: 941,
  },
  {
    slug: "hall-back-wall",
    alt: "Дальний торец зала с часами и стеклянной дверью",
    orientation: "portrait",
    width: 941,
  },
  {
    slug: "facade-promenade",
    alt: "Аркада и променад у здания на Мстиславца, 10",
    orientation: "landscape",
    width: 1672,
  },
];

export const reviews: readonly Review[] = [
  {
    quote:
      "Здесь появится отзыв организатора после первого согласованного кейса. Мы не подменяем реальные рекомендации вымышленными.",
    author: "Будущий резидент",
    context: "Место для подтверждённого отзыва",
    isPlaceholder: true,
  },
  {
    quote:
      "Можно рассказать о свете, работе команды и впечатлении гостей — коротко и только от имени реального клиента.",
    author: "Будущий организатор",
    context: "Место для подтверждённого отзыва",
    isPlaceholder: true,
  },
];

export const contact = {
  address: "Минск, ул. Петра Мстиславца, 10",
  landmark: "напротив Национальной библиотеки",
  phone: "+375 (00) 000-00-00",
  phoneHref: "tel:+375000000000",
  email: "hello@arka123.by",
  emailHref: "mailto:hello@arka123.by",
} as const;
