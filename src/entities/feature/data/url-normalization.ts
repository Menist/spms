import type { Feature } from "../model";

export const urlNormalizationFeature: Feature = {
  id: "url-normalization",
  name: "ЧПУ и нормализация URL",
  description: "Настройка человекопонятных URL, автоматическое добавление слеша в конце адреса и корректная отдача существующих файлов и папок.",
  category: "Infrastructure",
  status: "included",
  estimatedHours: {min: 1, max: 2},
  priceRange:{min: 30, max: 50},
  articleId: 'url-normalization-explained',
  relatedFeatureIds: ['custom-404-page'],
};