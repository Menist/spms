import type { Feature } from "../model";

export const cdnStaticFilesFeature: Feature = {
  id: "cdn-static-files",
  name: "CDN для статики",
  description: "Раздача статических файлов (изображения, шрифты, стили) через CDN для ускорения загрузки.",
  category: "Performance",
  status: "optional",
  estimatedHours: {min: 2, max: 4},
  priceRange: {min: 60, max: 120},
  articleId: 'cdn-static-files-explained',
  relatedFeatureIds: ['image-optimization', 'static-caching'],
};