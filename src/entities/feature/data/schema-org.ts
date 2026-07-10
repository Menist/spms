import type { Feature } from "../model";

export const schemaOrgFeature: Feature = {
  id: "schema-org",
  name: 'schema.org',
  description: 'Внедрение микроразметки Schema.org для улучшения понимания содержимого сайта поисковыми системами.',
  category: 'SEO',
  status: 'included',
  estimatedHours: {min: 2, max: 4},
  priceRange: {min: 50, max: 100},
  comment: 'Тип разметки подбирается индивидуально в зависимости от типа контента.',
  articleId: 'schema-org-explained'
};