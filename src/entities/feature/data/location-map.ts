import type { Feature } from "../model";

export const locationMapFeature: Feature = {
  id: "location-map",
  name: "Карта на сайте",
  description: "Встроенная карта (Google Maps/Яндекс.Карты) с местоположением компании.",
  category: "Content",
  status: "optional",
  estimatedHours: {min: 1, max: 2},
  priceRange: {min: 30, max: 60},
  articleId: 'location-map-explained',
  relatedFeatureIds: ['contact-form'],
};