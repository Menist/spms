import type {Feature} from "@/entities/feature/model";
import type {Project} from "@/entities/project/model";

export interface ProjectEstimate {
  featureCount: number;
  hoursMin: number;
  hoursMax: number;
  priceMin: number;
  priceMax: number;
}

export function calculateProjectEstimate(project: Project, allFeatures: Feature[]): ProjectEstimate {
  const projectFeatures = allFeatures.filter((f) => project.featureIds.includes(f.id));

  let hoursMin = 0;
  let hoursMax = 0;
  let priceMin = 0;
  let priceMax = 0;

  for (const feature of projectFeatures) {
    if (feature.estimatedHours) {
      hoursMin += feature.estimatedHours.min;
      hoursMax += feature.estimatedHours.max;
    }
    if (feature.priceRange) {
      priceMin += feature.priceRange.min;
      priceMax += feature.priceRange.max;
    }
  }

  return {
    featureCount: projectFeatures.length,
    hoursMin,
    hoursMax,
    priceMin,
    priceMax,
  };
}