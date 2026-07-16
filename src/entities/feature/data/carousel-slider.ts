import type { Feature } from "../model";

export const carouselSliderFeature: Feature = {
  id: "carousel-slider",
  name: "Слайдер/карусель",
  description: "Слайдер для отображения отзывов, портфолио или изображений в ленте.",
  category: "UI",
  status: "optional",
  estimatedHours: {min: 3, max: 6},
  priceRange: {min: 90, max: 180},
  articleId: 'carousel-slider-explained',
  relatedFeatureIds: ['scroll-animations'],
  implementationResult: "На сайте работает слайдер для компактного отображения нескольких изображений или блоков контента в одной области.",
};