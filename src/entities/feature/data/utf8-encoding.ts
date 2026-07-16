import type { Feature } from "../model";

export const utf8EncodingFeature: Feature = {
  id: "utf8-encoding",
  name: "Кодировка UTF-8",
  description: "Принудительная установка кодировки UTF-8 для всех файлов и явное указание charset в HTML-документах.",
  category: "Infrastructure",
  status: "included",
  estimatedHours: {min: 1, max: 1},
  priceRange:{min: 20, max: 30},
  articleId: 'utf8-encoding-explained',
  implementationResult: "Текст на сайте на любом языке отображается корректно, без искажения символов.",
};