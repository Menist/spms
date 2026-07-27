import {prisma} from "@/shared/lib/prisma";
import type {Feature} from "@/entities/feature/model";

export async function getFeatures(): Promise<Feature[]> {
  const rows = await prisma.feature.findMany({
    include: {
      relatedFeatures: true,
    },
  });

  return rows.map((row) => ({
    id: row.id,
    name: row.name,
    description: row.description,
    category: row.category,
    status: row.status,
    estimatedHours: row.estimatedHoursMin != null && row.estimatedHoursMax != null
      ? {min: row.estimatedHoursMin, max: row.estimatedHoursMax}
      : undefined,
    priceRange: row.priceMin != null && row.priceMax != null
      ? {min: row.priceMin, max: row.priceMax}
      : undefined,
    comment: row.comment ?? undefined,
    articleId: row.articleId ?? undefined,
    implementationResult: row.implementationResult ?? undefined,
    relatedFeatureIds: row.relatedFeatures.map((r) => r.relatedFeatureId),
  }));
}

export async function updateFeature(id: string, updates: {
  description?: string;
  estimatedHoursMin?: number;
  estimatedHoursMax?: number;
  priceMin?: number;
  priceMax?: number;
  comment?: string;
  implementationResult?: string;
}): Promise<void> {
  await prisma.feature.update({
    where: {id},
    data: {
      ...(updates.description !== undefined && {description: updates.description}),
      ...(updates.estimatedHoursMin !== undefined && {estimatedHoursMin: updates.estimatedHoursMin}),
      ...(updates.estimatedHoursMax !== undefined && {estimatedHoursMax: updates.estimatedHoursMax}),
      ...(updates.priceMin !== undefined && {priceMin: updates.priceMin}),
      ...(updates.priceMax !== undefined && {priceMax: updates.priceMax}),
      ...(updates.comment !== undefined && {comment: updates.comment}),
      ...(updates.implementationResult !== undefined && {implementationResult: updates.implementationResult}),
    },
  });
}