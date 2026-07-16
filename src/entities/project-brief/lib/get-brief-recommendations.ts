import type {ProjectBrief} from "@/entities/project-brief/model";

export interface BriefRecommendation {
  id: string;
  type: "suggest-feature" | "warning";
  message: string;
  featureId?: string;
}

const MANY_FEATURES_THRESHOLD = 20;

export function getBriefRecommendations(
  brief: ProjectBrief | undefined,
  currentFeatureIds: string[]
): BriefRecommendation[] {
  const recommendations: BriefRecommendation[] = [];

  if (currentFeatureIds.length > MANY_FEATURES_THRESHOLD) {
    recommendations.push({
      id: "many-features",
      type: "warning",
      message: `В проекте уже ${currentFeatureIds.length} функций — большой объём может увеличить бюджет и сроки. Рекомендуем обсудить приоритеты с клиентом.`,
    });
  }

  if (!brief) return recommendations;

  if (brief.contentOwner === "site2u" && !currentFeatureIds.includes("content-population")) {
    recommendations.push({
      id: "content-owner-site2u",
      type: "suggest-feature",
      message: "Наполнение сайта будет выполнять SITE2U.",
      featureId: "content-population",
    });
  }

  const materials = brief.materials ?? [];
  const hasNoMaterials = materials.length === 0 || materials.includes("Ничего не подготовлено");

  if (hasNoMaterials || !materials.includes("Фотографии")) {
    recommendations.push({
      id: "missing-photos",
      type: "warning",
      message: "Клиент не предоставляет фотографии — потребуется согласовать источник изображений для сайта (фотобанк, фотосъёмка клиента).",
    });
  }

  if (hasNoMaterials || !materials.includes("Логотип")) {
    recommendations.push({
      id: "missing-logo",
      type: "warning",
      message: "У клиента нет готового логотипа — уточните, нужна ли разработка логотипа отдельной услугой (не входит в разработку сайта).",
    });
  }

  if (brief.desiredDeadline === "Срочно") {
    recommendations.push({
      id: "urgent-deadline",
      type: "warning",
      message: "Клиент указал срочный срок запуска — оцените реальную возможность выполнения проекта в сжатые сроки.",
    });
  }

  return recommendations;
}