import {prisma} from "@/shared/lib/prisma";
import type {ProjectTemplate} from "@/entities/project-template/model";

export async function getProjectTemplates(): Promise<ProjectTemplate[]> {
  const rows = await prisma.projectTemplate.findMany({
    include: {templateFeatures: true},
  });

  return rows.map((row) => ({
    id: row.id,
    name: row.name,
    description: row.description,
    requiredFeatureIds: row.templateFeatures
      .filter((tf) => tf.isRequired)
      .map((tf) => tf.featureId),
    optionalFeatureIds: row.templateFeatures
      .filter((tf) => !tf.isRequired)
      .map((tf) => tf.featureId),
  }));
}