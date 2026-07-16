import type {Feature} from "../model";

export const contentPopulationFeature: Feature = {
  id: "content-population",
  name: "Наполнение контента",
  description: "Внесение текстов, фотографий и другого контента на страницы сайта силами SITE2U.",
  category: "Content",
  status: "optional",
  estimatedHours: {min: 4, max: 10},
  priceRange: {min: 100, max: 250},
};