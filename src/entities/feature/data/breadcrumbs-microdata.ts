import type { Feature } from "../model";

export const breadcrumbsMicrodataFeature: Feature = {
  id: "breadcrumbs-microdata",
  name: "Микроразметка breadcrumbs",
  description: "Разметка хлебных крошек по стандарту Schema.org для отображения пути страницы в поисковой выдаче.",
  category: "SEO",
  status: "optional",
  estimatedHours: {min: 1, max: 2},
  priceRange: {min: 30, max: 50},
  articleId: 'breadcrumbs-microdata-explained',
  relatedFeatureIds: ['schema-org'],
  implementationResult: "На страницах сайта отображаются хлебные крошки с микроразметкой, путь страницы виден в результатах поиска.",
};