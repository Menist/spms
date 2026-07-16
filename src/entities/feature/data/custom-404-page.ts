import type { Feature } from "../model";

export const custom404PageFeature: Feature = {
  id: "custom-404-page",
  name: "Кастомная страница 404",
  description: "Индивидуальная страница ошибки 404 вместо стандартной страницы сервера.",
  category: "Infrastructure",
  status: "included",
  estimatedHours: {min: 1, max: 2},
  priceRange:{min: 30, max: 60},
  articleId: 'custom-404-page-explained',
  relatedFeatureIds: ['url-normalization'],
  implementationResult: "При переходе по несуществующему адресу посетитель видит индивидуальную страницу 404 с подсказкой, что делать дальше.",
};