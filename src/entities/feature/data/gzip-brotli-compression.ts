import type { Feature } from "../model";

export const gzipBrotliCompressionFeature: Feature = {
  id: "gzip-brotli-compression",
  name: "Сжатие Gzip/Brotli",
  description: "Настройка сжатия HTML, CSS, JavaScript, JSON, XML и шрифтов для уменьшения объёма передаваемых данных.",
  category: "Performance",
  status: "included",
  estimatedHours: {min: 1, max: 1},
  priceRange:{min: 30, max: 50},
  articleId: 'gzip-brotli-compression-explained',
  relatedFeatureIds: ['css-js-minification', 'static-caching'],
  implementationResult: "На сервере настроено сжатие передаваемых файлов, что ускоряет загрузку сайта для пользователей.",
};