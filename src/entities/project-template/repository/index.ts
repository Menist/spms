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
export async function updateProjectTemplate(id: string, updates: {
  name?: string;
  description?: string;
  requiredFeatureIds?: string[];
  optionalFeatureIds?: string[];
}): Promise<void> {
  await prisma.projectTemplate.update({
    where: {id},
    data: {
      ...(updates.name !== undefined && {name: updates.name}),
      ...(updates.description !== undefined && {description: updates.description}),
    },
  });

  if (updates.requiredFeatureIds !== undefined || updates.optionalFeatureIds !== undefined) {
    await prisma.templateFeature.deleteMany({where: {templateId: id}});

    const requiredIds = updates.requiredFeatureIds ?? [];
    const optionalIds = updates.optionalFeatureIds ?? [];

    await prisma.templateFeature.createMany({
      data: [
        ...requiredIds.map((featureId) => ({templateId: id, featureId, isRequired: true})),
        ...optionalIds.map((featureId) => ({templateId: id, featureId, isRequired: false})),
      ],
    });
  }
}