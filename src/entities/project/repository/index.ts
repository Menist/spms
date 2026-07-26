import {prisma} from "@/shared/lib/prisma";
import type {Project, ProjectStage} from "@/entities/project/model";

function toDbStage(stage: ProjectStage | undefined): string | undefined {
  if (!stage) return undefined;
  return stage === "tech-spec" ? "techSpec" : stage;
}

function fromDbStage(stage: string | null): ProjectStage | undefined {
  if (!stage) return undefined;
  return stage === "techSpec" ? "tech-spec" : (stage as ProjectStage);
}

function toProject(row: {
  id: string;
  name: string;
  clientId: string;
  status: string;
  comment: string | null;
  templateId: string | null;
  stage: string | null;
  updatedAt: Date;
  projectFeatures: {featureId: string}[];
}): Project {
  return {
    id: row.id,
    name: row.name,
    clientId: row.clientId,
    status: row.status as Project["status"],
    comment: row.comment ?? undefined,
    templateId: row.templateId ?? undefined,
    stage: fromDbStage(row.stage),
    updatedAt: row.updatedAt.toISOString(),
    featureIds: row.projectFeatures.map((pf) => pf.featureId),
  };
}

export async function getProjects(): Promise<Project[]> {
  const rows = await prisma.project.findMany({
    include: {projectFeatures: true},
  });
  return rows.map(toProject);
}

export async function getProjectById(id: string): Promise<Project | undefined> {
  const row = await prisma.project.findUnique({
    where: {id},
    include: {projectFeatures: true},
  });
  return row ? toProject(row) : undefined;
}

export async function createProject(project: Project): Promise<void> {
  await prisma.project.create({
    data: {
      id: project.id,
      name: project.name,
      clientId: project.clientId,
      status: project.status as any,
      comment: project.comment,
      templateId: project.templateId,
      stage: toDbStage(project.stage) as any,
      projectFeatures: {
        create: project.featureIds.map((featureId) => ({featureId})),
      },
    },
  });
}

export async function updateProject(id: string, updates: Partial<Project>): Promise<void> {
  await prisma.project.update({
    where: {id},
    data: {
      ...(updates.name !== undefined && {name: updates.name}),
      ...(updates.clientId !== undefined && {clientId: updates.clientId}),
      ...(updates.status !== undefined && {status: updates.status as any}),
      ...(updates.comment !== undefined && {comment: updates.comment}),
      ...(updates.templateId !== undefined && {templateId: updates.templateId}),
      ...(updates.stage !== undefined && {stage: toDbStage(updates.stage) as any}),
      ...(updates.featureIds !== undefined && {
        projectFeatures: {
          deleteMany: {},
          create: updates.featureIds.map((featureId) => ({featureId})),
        },
      }),
    },
  });
}

export async function deleteProject(id: string): Promise<void> {
  await prisma.projectBrief.deleteMany({where: {projectId: id}});
  await prisma.projectFeature.deleteMany({where: {projectId: id}});
  await prisma.project.delete({where: {id}});
}