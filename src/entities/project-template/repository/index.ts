import {ProjectTemplate} from "@/entities/project-template/model";
import {landingTemplate} from "@/entities/project-template/data/landing";
import {corporateTemplate} from "@/entities/project-template/data/corporate";
import {promoTemplate} from "@/entities/project/project-template/data/promo";

const templates: ProjectTemplate[] = [
  landingTemplate,
  corporateTemplate,
  promoTemplate,
];

export function getProjectTemplates(): ProjectTemplate[] {
  return templates;
}