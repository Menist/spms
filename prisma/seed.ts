import {getFeatures} from "@/entities/feature/repository";
import {getArticles} from "@/entities/article/repository";
import {getProjectTemplates} from "@/entities/project-template/repository";
import {PrismaClient} from "@prisma/client";
import {getClients} from "@/entities/client/repository";
import {getProjects} from "@/entities/project/repository";

const prisma = new PrismaClient();

async function main() {
  const articles = await getArticles();
  for (const article of articles) {
    await prisma.knowledgeArticle.upsert({
      where: {id: article.id},
      update: {},
      create: {
        id: article.id,
        title: article.title,
        summary: article.summary,
        content: article.content,
      },
    });
  }
  console.log(`Статей загружено: ${articles.length}`);

  const features = await getFeatures();
  for (const feature of features) {
    await prisma.feature.upsert({
      where: {id: feature.id},
      update: {},
      create: {
        id: feature.id,
        name: feature.name,
        description: feature.description,
        category: feature.category as any,
        status: feature.status as any,
        estimatedHoursMin: feature.estimatedHours?.min,
        estimatedHoursMax: feature.estimatedHours?.max,
        priceMin: feature.priceRange?.min,
        priceMax: feature.priceRange?.max,
        comment: feature.comment,
        implementationResult: feature.implementationResult,
        articleId: feature.articleId,
      },
    });
  }
  console.log(`Функций загружено: ${features.length}`);

  for (const feature of features) {
    if (!feature.relatedFeatureIds) continue;
    for (const relatedId of feature.relatedFeatureIds) {
      await prisma.featureRelation.upsert({
        where: {featureId_relatedFeatureId: {featureId: feature.id, relatedFeatureId: relatedId}},
        update: {},
        create: {featureId: feature.id, relatedFeatureId: relatedId},
      });
    }
  }
  console.log("Связи между функциями загружены");

  const templates = getProjectTemplates();
  for (const template of templates) {
    await prisma.projectTemplate.upsert({
      where: {id: template.id},
      update: {},
      create: {
        id: template.id,
        name: template.name,
        description: template.description,
      },
    });

    for (const featureId of template.requiredFeatureIds) {
      await prisma.templateFeature.upsert({
        where: {templateId_featureId: {templateId: template.id, featureId}},
        update: {isRequired: true},
        create: {templateId: template.id, featureId, isRequired: true},
      });
    }

    for (const featureId of template.optionalFeatureIds) {
      await prisma.templateFeature.upsert({
        where: {templateId_featureId: {templateId: template.id, featureId}},
        update: {isRequired: false},
        create: {templateId: template.id, featureId, isRequired: false},
      });
    }
  }
  console.log(`Шаблонов загружено: ${templates.length}`);

  const clients = await getClients();
  for (const client of clients) {
    await prisma.client.upsert({
      where: {id: client.id},
      update: {},
      create: {
        id: client.id,
        name: client.name,
        contactPerson: client.contactPerson,
        phone: client.phone,
        contactDate: new Date(client.contactDate),
        contactReason: client.contactReason,
      },
    });
  }
  console.log(`Клиентов загружено: ${clients.length}`);

  const projects = await getProjects();
  for (const project of projects) {
    await prisma.project.upsert({
      where: {id: project.id},
      update: {},
      create: {
        id: project.id,
        name: project.name,
        status: project.status as any,
        comment: project.comment,
        clientId: project.clientId,
        templateId: project.templateId,
      },
    });

    for (const featureId of project.featureIds) {
      await prisma.projectFeature.upsert({
        where: {projectId_featureId: {projectId: project.id, featureId}},
        update: {},
        create: {projectId: project.id, featureId},
      });
    }
  }
  console.log(`Проектов загружено: ${projects.length}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });