import type { Feature } from "../model";

export const staticCachingFeature: Feature = {
  id: "static-caching",
  name: "Кэширование статики",
  description: "Настройка Cache-Control для статических файлов: изображения, шрифты и хешированные CSS/JS — на год, часто обновляемые скрипты — на час.",
  category: "Performance",
  status: "included",
  estimatedHours: {min: 1, max: 2},
  priceRange:{min: 30, max: 60},
  articleId: 'static-caching-explained',
  relatedFeatureIds: ['gzip-brotli-compression', 'cdn-static-files'],
};