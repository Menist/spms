import type { Feature } from "../model";

export const carouselSliderFeature: Feature = {
  id: "carousel-slider",
  name: "Слайдер/карусель",
  description: "Слайдер для отображения отзывов, портфолио или изображений в ленте.",
  category: "UI",
  status: "optional",
  estimatedHours: {min: 3, max: 6},
  priceRange: {min: 90, max: 180},
  articleId: 'scroll-animations-explained',
  relatedFeatureIds: ['dark-light-theme', 'carousel-slider'],
};