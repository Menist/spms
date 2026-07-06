import type { Feature } from "../model";

export const robotsTxtFeature: Feature = {
  id: "robots-txt",
  name: 'robots.txt',
  description: 'Настройка файла robots.txt для управления индексацией веб-сайта поисковыми системами.',
  category: 'SEO',
  status:'included',
  estimatedHours: {min:1, max:2},
  comment: 'Настраивается индивидуально в зависимости от структуры веб-сайта.'
};