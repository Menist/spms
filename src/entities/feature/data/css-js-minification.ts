import type { Feature } from "../model";

export const cssJsMinificationFeature: Feature = {
  id: "css-js-minification",
  name: "Минификация CSS/JS",
  description: "Сжатие CSS и JavaScript файлов для уменьшения объёма передаваемых данных.",
  category: "Performance",
  status: "included",
  estimatedHours: {min: 1, max: 1},
  priceRange:{min: 30, max: 50},
  articleId: 'css-js-minification-explained',
  relatedFeatureIds: ['image-optimization', 'gzip-brotli-compression'],
  implementationResult: "CSS и JavaScript файлы сайта минифицированы, объём передаваемых данных уменьшен.",
};