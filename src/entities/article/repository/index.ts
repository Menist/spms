import {prisma} from "@/shared/lib/prisma";
import type {KnowledgeArticle} from "@/entities/article/model";

export async function getArticles(): Promise<KnowledgeArticle[]> {
  return prisma.knowledgeArticle.findMany();
}