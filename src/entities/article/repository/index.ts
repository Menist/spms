import {prisma} from "@/shared/lib/prisma";
import type {KnowledgeArticle} from "@/entities/article/model";

export async function getArticles(): Promise<KnowledgeArticle[]> {
  return prisma.knowledgeArticle.findMany();
}
export async function updateArticle(id: string, updates: {
  title?: string;
  summary?: string;
  content?: string;
}): Promise<void> {
  await prisma.knowledgeArticle.update({
    where: {id},
    data: {
      ...(updates.title !== undefined && {title: updates.title}),
      ...(updates.summary !== undefined && {summary: updates.summary}),
      ...(updates.content !== undefined && {content: updates.content}),
    },
  });
}