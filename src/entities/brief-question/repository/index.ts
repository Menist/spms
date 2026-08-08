import {prisma} from "@/shared/lib/prisma";
import type {BriefQuestionOption} from "@/entities/brief-question/model";

export async function getBriefQuestionOptions(questionKey?: string): Promise<BriefQuestionOption[]> {
  return prisma.briefQuestionOption.findMany({
    where: questionKey ? {questionKey} : undefined,
    orderBy: {sortOrder: "asc"},
  });
}

export async function createBriefQuestionOption(data: {
  questionKey: string;
  label: string;
  sortOrder: number;
  isExclusive?: boolean;
  requiresText?: boolean;
}): Promise<void> {
  await prisma.briefQuestionOption.create({data});
}

export async function updateBriefQuestionOption(id: string, updates: {
  label?: string;
  sortOrder?: number;
  isExclusive?: boolean;
  requiresText?: boolean;
}): Promise<void> {
  await prisma.briefQuestionOption.update({
    where: {id},
    data: updates,
  });
}

export async function deleteBriefQuestionOption(id: string): Promise<void> {
  await prisma.briefQuestionOption.delete({where: {id}});
}