import {prisma} from "@/shared/lib/prisma";
import type {ProjectBrief} from "@/entities/project-brief/model";

function toBrief(row: {
  id: string;
  projectId: string;
  pageCountRange: string | null;
  siteSections: string[];
  materials: string[];
  contentOwner: string | null;
  desiredDeadline: string | null;
  additionalNotes: string | null;
}): ProjectBrief {
  return {
    id: row.id,
    projectId: row.projectId,
    pageCountRange: row.pageCountRange ?? undefined,
    siteSections: row.siteSections,
    materials: row.materials,
    contentOwner: (row.contentOwner as ProjectBrief["contentOwner"]) ?? undefined,
    desiredDeadline: row.desiredDeadline ?? undefined,
    additionalNotes: row.additionalNotes ?? undefined,
  };
}

export async function getProjectBriefByProjectId(projectId: string): Promise<ProjectBrief | undefined> {
  const row = await prisma.projectBrief.findUnique({where: {projectId}});
  return row ? toBrief(row) : undefined;
}

export async function createProjectBrief(brief: ProjectBrief): Promise<void> {
  await prisma.projectBrief.create({
    data: {
      id: brief.id,
      projectId: brief.projectId,
      pageCountRange: brief.pageCountRange,
      siteSections: brief.siteSections ?? [],
      materials: brief.materials ?? [],
      contentOwner: brief.contentOwner as any,
      desiredDeadline: brief.desiredDeadline,
      additionalNotes: brief.additionalNotes,
    },
  });
}

export async function updateProjectBrief(id: string, updates: Partial<ProjectBrief>): Promise<void> {
  await prisma.projectBrief.update({
    where: {id},
    data: {
      ...(updates.pageCountRange !== undefined && {pageCountRange: updates.pageCountRange}),
      ...(updates.siteSections !== undefined && {siteSections: updates.siteSections}),
      ...(updates.materials !== undefined && {materials: updates.materials}),
      ...(updates.contentOwner !== undefined && {contentOwner: updates.contentOwner as any}),
      ...(updates.desiredDeadline !== undefined && {desiredDeadline: updates.desiredDeadline}),
      ...(updates.additionalNotes !== undefined && {additionalNotes: updates.additionalNotes}),
    },
  });
}