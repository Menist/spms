import type { Feature } from "../model";

export const imageOptimizationFeature: Feature = {
  id: "image-optimization",
  name: "Оптимизация изображений",
  description: "Конвертация изображений в WebP и ленивая загрузка (lazy loading) для ускорения отрисовки страницы.",
  category: "Performance",
  status: "included",
  estimatedHours: {min: 1, max: 3},
  articleId: 'image-optimization-explained',
  priceRange:{min: 50, max: 100}
};