import type { Feature } from "../model";

export const contactFormFeature: Feature = {
  id: "contact-form",
  name: 'Форма обратной связи',
  description: 'Форма для отправки заявок с сайта на почту или в CRM.',
  category: 'Content',
  status: 'optional',
  estimatedHours: {min: 3, max: 6},
  priceRange: {min: 50, max: 100},
  articleId: 'contact-form-explained',
  relatedFeatureIds: ['recaptcha-antispam', 'online-chat', 'location-map'],
  implementationResult: "На сайте работает форма обратной связи, заявки поступают на почту или в CRM компании.",
};