import type { Feature } from "../model";

export const protectedServiceFilesFeature: Feature = {
  id: "protected-service-files",
  name: "Защита служебных файлов",
  description: "Запрет прямого доступа к служебным и скрытым файлам сайта (.env, .git, .sql, .log и др.).",
  category: "Security",
  status: "included",
  estimatedHours: {min: 1, max: 1},
  articleId: 'protected-service-files-explained',
  priceRange: {min: 30, max: 50},
  relatedFeatureIds: ['security-headers'],
};