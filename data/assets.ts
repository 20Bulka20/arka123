/**
 * Аудит материалов АРКА 123.
 * Фото: 22 PNG из drive-download-20261010T104523Z-1-001.zip.
 * Логотипы и реклама: исходные PNG из images/logo и images/advert.
 * Оригиналы лежат в media/originals и не раздаются сайтом.
 * Веб-копии собирает scripts/prepare-media.ts в public/media.
 */

export const brand = {
  name: "АРКА 123",
  slogan: "Встречаемся напротив Библиотеки.",
  /** Мода заливки светлого логотипа logos/1.png. Сжатие PNG размазывает соседние пиксели в #223845–#233a48. */
  color: "#223946",
  address: "Мстиславца, 10",
} as const;

export const WIDTH_STEPS_WIDE = [640, 960, 1280] as const;
export const WIDTH_STEPS_NARROW = [480, 720] as const;

export function targetWidths(sourceWidth: number): number[] {
  const steps: readonly number[] =
    sourceWidth >= 1400 ? WIDTH_STEPS_WIDE : WIDTH_STEPS_NARROW;
  const widths = steps.filter((step) => step < sourceWidth - 8);
  widths.push(sourceWidth);
  return widths;
}

export function mediaSrc(
  folder: MediaFolder,
  slug: string,
  width: number,
  format: "avif" | "webp",
): string {
  return `/media/${folder}/${slug}-${width}.${format}`;
}

export type MediaFolder = "photos" | "logos" | "advert";

export type MediaRole =
  | "hero"
  | "gallery"
  | "space"
  | "background"
  | "location"
  | "context"
  | "brand";

export type AssetIssue =
  | "overlay"
  | "arrow"
  | "duplicate"
  | "mockup"
  | "not-the-hall"
  | "graded"
  | "odd-crop";

export interface MediaAsset {
  id: string;
  source: string;
  slug: string;
  width: number;
  height: number;
  bytes: number;
  subject: string;
  roles: readonly MediaRole[];
  /** false — не ставить в публичные секции, пока нет чистого кадра. */
  publish: boolean;
  issues: readonly AssetIssue[];
  notes: string;
  duplicateOf?: string;
}

/**
 * Текст с плашек. Это утверждения макетов, не проверенные обмеры.
 * Исходник без плашки нужен, прежде чем выносить цифры в интерфейс как факт.
 */
export const unverifiedClaims = [
  {
    claim: "Два арочных окна 4×3 м",
    sources: ["01", "15"],
  },
  {
    claim: "Высота потолка до 4,5 м",
    sources: ["1", "2"],
  },
  {
    claim: "Пол — кварцвинил под паркет",
    sources: ["3"],
  },
  {
    claim: "Стены — декоративная штукатурка и стеновые панели",
    sources: ["3"],
  },
  {
    claim: "Потолок окрашен в антрацит",
    sources: ["3"],
  },
  {
    claim: "Освещение — 33 панели",
    sources: ["3"],
  },
] as const;

/**
 * Объёмная сцена: плотного узлового обхода нет.
 * Есть один пустой зал с нескольких реальных ракурсов, а не сетка перекрывающихся точек.
 * Опорная плата — чистый широкий кадр 6. Детали окон — 7 и 8.
 * Кадры 4, 5 и 6 смотрят на одну стену, но перекрытия редкие: это не повод собирать WebGL-проход.
 */
export const spaceSurvey = {
  approach: "depth-map",
  primaryPlate: "hall-windows-wide",
  windowDetails: ["window-library", "window-plaza"],
  supportingPlates: [
    "hall-windows-portrait",
    "hall-windows-side",
    "hall-back-wall",
    "kitchenette",
  ],
  excludedFromGeometry: [
    "hall-windows-sunset",
    "hall-length-ceiling",
    "hall-towards-windows",
    "hall-materials",
  ],
} as const;

export const originalsRequest = [
  {
    ids: ["01", "1", "2", "3", "15"],
    reason:
      "На кадре впечатана рекламная плашка. Для сайта нужен тот же ракурс без графики.",
  },
  {
    ids: ["19", "20"],
    reason: "Жёлтая стрелка закрывает небо и не доказывает, какое именно здание снимали.",
  },
  {
    ids: ["6", "7", "21"],
    reason:
      "Длинная сторона всех обработанных кадров около 1672 px. Для hero на retina этого мало, если у заказчика есть камерный оригинал.",
  },
] as const;

export const photos: readonly MediaAsset[] = [
  {
    id: "01",
    source: "01.png",
    slug: "hall-windows-sunset",
    width: 1672,
    height: 941,
    bytes: 1_765_873,
    subject: "Два арочных окна на закате, в левом — Национальная библиотека",
    roles: ["hero"],
    publish: false,
    issues: ["overlay", "graded"],
    notes:
      "Единственный закатный кадр и самый кинематографичный вид на Библиотеку, но справа внизу плашка «4×3 м». Свет и круглая подвеска в правом окне не совпадают с дневными кадрами 6–9. Для геометрии зала не использовать.",
  },
  {
    id: "1",
    source: "1.png",
    slug: "hall-length-ceiling",
    width: 1672,
    height: 941,
    bytes: 1_740_571,
    subject: "Зал вдоль длины, часы слева, стеклянная перегородка в глубине",
    roles: ["space"],
    publish: false,
    issues: ["overlay"],
    notes:
      "Жёлтая размерная линия и плашка «высота потолка до 4,5 метров». Тот же зал, что и на чистых кадрах: часы при взгляде вглубь оказываются слева.",
  },
  {
    id: "2",
    source: "2.png",
    slug: "hall-towards-windows",
    width: 1672,
    height: 941,
    bytes: 1_923_996,
    subject: "Зал в сторону окон, колонна, кухня справа",
    roles: ["space"],
    publish: false,
    issues: ["overlay"],
    notes: "Та же плашка высоты, что на кадре 1. Ракурс полезен, графика мешает.",
  },
  {
    id: "3",
    source: "3.png",
    slug: "hall-materials",
    width: 941,
    height: 1672,
    bytes: 1_893_148,
    subject: "Портрет зала с карточкой отделки поверх пола",
    roles: ["gallery"],
    publish: false,
    issues: ["overlay"],
    notes:
      "Нижняя треть закрыта инфографикой про пол, стены, потолок и свет. Сам интерьер совпадает с чистыми кадрами.",
  },
  {
    id: "4",
    source: "4.png",
    slug: "hall-windows-portrait",
    width: 941,
    height: 1672,
    bytes: 2_039_308,
    subject: "Портрет пустого зала на оба арочных окна",
    roles: ["gallery", "space"],
    publish: true,
    issues: [],
    notes:
      "Чистый дневной кадр. Библиотека читается в одном из окон. Перед туром сверить, слева она или справа, вместе с кадрами 6 и 7.",
  },
  {
    id: "5",
    source: "5.png",
    slug: "hall-windows-side",
    width: 941,
    height: 1672,
    bytes: 2_064_273,
    subject: "Портрет оконной стены ближе к парковке и крану",
    roles: ["gallery", "space"],
    publish: true,
    issues: [],
    notes: "Чистый кадр той же стены, сдвиг вдоль окон. Перекрытие с кадром 6 есть, но редкое.",
  },
  {
    id: "6",
    source: "6.png",
    slug: "hall-windows-wide",
    width: 1672,
    height: 941,
    bytes: 1_971_483,
    subject: "Широкий пустой зал, оба окна, часы на правой стене",
    roles: ["hero", "gallery", "space"],
    publish: true,
    issues: [],
    notes:
      "Главная плата объёмной сцены и внутренний hero. Дневной свет, без плашек. Часы справа — тот же циферблат, что слева на кадре 1, если развернуться.",
  },
  {
    id: "7",
    source: "7.png",
    slug: "window-library",
    width: 941,
    height: 1672,
    bytes: 1_907_502,
    subject: "Крупно одно арочное окно с Национальной библиотекой",
    roles: ["hero", "gallery", "space"],
    publish: true,
    issues: [],
    notes:
      "Лучший кадр обещания бренда: арка и здание библиотеки. Чистый, дневной. Деталь к плате 6, не отдельная комната.",
  },
  {
    id: "8",
    source: "8.png",
    slug: "window-plaza",
    width: 941,
    height: 1672,
    bytes: 2_228_284,
    subject: "Второе арочное окно: площадь, фонтан и проволочная подвеска",
    roles: ["gallery", "space"],
    publish: true,
    issues: [],
    notes:
      "Второе окно зала, не вид на Библиотеку. Подвеска в створке — абстрактная проволока, читаемого слогана на увеличении нет.",
  },
  {
    id: "9",
    source: "9.png",
    slug: "window-parking",
    width: 941,
    height: 1672,
    bytes: 2_238_652,
    subject: "Окно на парковку и кран, вверху та же подвеска",
    roles: ["gallery"],
    publish: true,
    issues: [],
    notes: "Чистая деталь остекления. Солнечные пятна на полу согласуются с кадром 7.",
  },
  {
    id: "10",
    source: "10.png",
    slug: "hall-back-wall",
    width: 941,
    height: 1672,
    bytes: 1_903_341,
    subject: "Торец зала: часы, колонна, белые шкафы и стеклянная дверь",
    roles: ["gallery", "space"],
    publish: true,
    issues: [],
    notes: "Чистый кадр дальней стены. Нужен, чтобы сцена не состояла только из окон.",
  },
  {
    id: "11",
    source: "11.png",
    slug: "kitchenette",
    width: 941,
    height: 1672,
    bytes: 1_809_124,
    subject: "Кухонная ниша с подсветкой и белой стойкой",
    roles: ["gallery", "space"],
    publish: true,
    issues: [],
    notes: "Чистый кадр. Арка вдали подтверждает, что ниша внутри того же зала.",
  },
  {
    id: "12",
    source: "12.png",
    slug: "glass-partition",
    width: 1672,
    height: 941,
    bytes: 1_764_439,
    subject: "Стеклянная перегородка в соседний меблированный офис",
    roles: ["context"],
    publish: true,
    issues: [],
    notes:
      "Пол тот же, но за стеклом чужая мебель. Показывать как границу помещения, не как интерьер АРКА 123.",
  },
  {
    id: "13",
    source: "13.png",
    slug: "corridor-254",
    width: 1672,
    height: 941,
    bytes: 1_727_086,
    subject: "Коридор бизнес-центра, на колонне номер 254",
    roles: ["context"],
    publish: true,
    issues: ["not-the-hall"],
    notes:
      "Мрамор, синяя колонна, другой потолок. Это путь к помещению, не сам зал. Номер 254 виден, но не доказано, что это номер аренды.",
  },
  {
    id: "14",
    source: "14.png",
    slug: "corridor-marble",
    width: 941,
    height: 1672,
    bytes: 1_948_345,
    subject: "Продолжение коридора с мраморным полом",
    roles: ["context"],
    publish: true,
    issues: ["not-the-hall"],
    notes: "Тот же общественный коридор, что кадр 13. В галерею зала не ставить.",
  },
  {
    id: "15",
    source: "15.png",
    slug: "facade-arches-caption",
    width: 1673,
    height: 940,
    bytes: 2_230_466,
    subject: "Фасад с двумя подсвеченными арками и подписью 4×3 м",
    roles: ["location"],
    publish: false,
    issues: ["overlay", "odd-crop"],
    notes:
      "Полезный вид: две неоновые арки сидят над торговым рядом, не на улице. Размер 1673×940 выбивается из сетки 1672×941. Плашка внизу справа.",
  },
  {
    id: "16",
    source: "16.png",
    slug: "facade-promenade",
    width: 1672,
    height: 941,
    bytes: 2_384_293,
    subject: "Променад вдоль фасада с аркадой",
    roles: ["gallery", "location"],
    publish: true,
    issues: [],
    notes: "Чистый подход к зданию. Вывески VARKA на фасаде — соседний ритейл, не наш зал.",
  },
  {
    id: "17",
    source: "17.png",
    slug: "street-corner",
    width: 941,
    height: 1672,
    bytes: 2_464_968,
    subject: "Угол квартала и аркада у основания башни",
    roles: ["background", "location"],
    publish: true,
    issues: [],
    notes: "Чистый общий план. Арки мелкие, для hero зала не подходит.",
  },
  {
    id: "18",
    source: "18.png",
    slug: "facade-stairs",
    width: 941,
    height: 1672,
    bytes: 2_718_800,
    subject: "Угол здания, лестница к входу и вывеска VARKA",
    roles: ["gallery", "location"],
    publish: true,
    issues: [],
    notes: "Чистый кадр входа. Лестница объясняет, что зал выше уличного ритейла.",
  },
  {
    id: "19",
    source: "19.png",
    slug: "complex-arrow",
    width: 1672,
    height: 941,
    bytes: 2_461_100,
    subject: "Дальний вид квартала со стрелкой в небо",
    roles: ["location"],
    publish: false,
    issues: ["arrow"],
    notes:
      "Стрелка указывает на башню, а не на арки. Без чистого кадра легко показать не то здание.",
  },
  {
    id: "20",
    source: "20.png",
    slug: "parking-arrow",
    width: 1672,
    height: 941,
    bytes: 2_318_356,
    subject: "Парковка и тот же квартал, снова со стрелкой",
    roles: ["location"],
    publish: false,
    issues: ["arrow"],
    notes: "Близкий к кадру 19 общий план. Стрелка та же проблема. Точного дубля по файлу нет.",
  },
  {
    id: "21",
    source: "21.png",
    slug: "library-and-building",
    width: 1672,
    height: 941,
    bytes: 2_451_346,
    subject: "Перекрёсток: Национальная библиотека и аркада здания в одном кадре",
    roles: ["hero", "location", "background"],
    publish: true,
    issues: [],
    notes:
      "Главное доказательство слогана с улицы. Библиотека слева, аркада дома справа. Без стрелок и плашек.",
  },
];

export const logos: readonly MediaAsset[] = [
  {
    id: "logo-1",
    source: "1.png",
    slug: "lockup-light",
    width: 1774,
    height: 887,
    bytes: 783_262,
    subject: "Горизонтальный логотип, графит на белом",
    roles: ["brand"],
    publish: true,
    issues: [],
    notes:
      "Знак, «АРКА 123» и слоган в две строки. Альфа-канала нет, фон вшит. Это образец пропорций для SVG: арка, цифры, название, слоган.",
  },
  {
    id: "logo-2",
    source: "2.png",
    slug: "mark",
    width: 1254,
    height: 1254,
    bytes: 288_419,
    subject: "Знак: арка и цифры 123",
    roles: ["brand"],
    publish: true,
    issues: [],
    notes:
      "Прозрачный фон. Левая нога арки одновременно ножка цифры 1. Для анимации это один контур, а не арка и цифра по отдельности.",
  },
  {
    id: "logo-3",
    source: "3.png",
    slug: "wordmark",
    width: 2172,
    height: 724,
    bytes: 364_173,
    subject: "Надпись АРКА 123 без знака и слогана",
    roles: ["brand"],
    publish: true,
    issues: [],
    notes: "Прозрачный фон. Отдельного файла только со слоганом нет.",
  },
  {
    id: "logo-4",
    source: "4.png",
    slug: "lockup-dark",
    width: 1774,
    height: 887,
    bytes: 510_106,
    subject: "Тот же горизонтальный логотип белым на чёрном",
    roles: ["brand"],
    publish: true,
    issues: [],
    notes:
      "Инверсия кадра logo-1, не отдельный рисунок. Альфа-канала нет. Пропорции совпадают с светлой версией: 1774×887.",
  },
];

export const adverts: readonly MediaAsset[] = [
  {
    id: "advert-1",
    source: "1 (1).png",
    slug: "brand-mockups",
    width: 1536,
    height: 1024,
    bytes: 2_449_728,
    subject: "Лист мокапов: визитки, значок, кружка, стена ресепшен",
    roles: ["brand"],
    publish: true,
    issues: ["mockup"],
    notes:
      "Сгенерированная раскладка 2×2, не фотография помещения. Годится как образец применения знака. Палитра та же графитово-синяя, фон молочный.",
  },
  {
    id: "advert-2",
    source: "2 (1).png",
    slug: "facade-signage",
    width: 1668,
    height: 943,
    bytes: 2_625_022,
    subject: "Диптих: фасад и крупно знак над аркой",
    roles: ["brand"],
    publish: true,
    issues: ["mockup"],
    notes:
      "На кадрах 16 и 18 этой вывески нет. Правая половина — предложение вывески, не факт монтажа. Подписывать как концепцию.",
  },
  {
    id: "advert-3",
    source: "3 (1).png",
    slug: "facade-signage-copy",
    width: 1668,
    height: 943,
    bytes: 2_625_022,
    subject: "Побайтный дубль advert-2",
    roles: ["brand"],
    publish: false,
    issues: ["duplicate"],
    duplicateOf: "advert-2",
    notes: "SHA-256 совпадает с 2 (1).png. В веб-копии не конвертировать.",
  },
];

export const auditSummary = {
  photoCount: photos.length,
  uniquePhotoHashes: photos.length,
  exactDuplicates: ["advert-3 → advert-2"],
  publishablePhotos: photos.filter((photo) => photo.publish).map((photo) => photo.id),
  heldPhotos: photos.filter((photo) => !photo.publish).map((photo) => photo.id),
  longSidePx: 1672,
} as const;
