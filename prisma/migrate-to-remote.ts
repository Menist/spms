import {PrismaClient} from "@prisma/client";

// Впиши сюда свою локальную строку подключения
const LOCAL_URL = "postgresql://postgres:1488666@localhost:5432/spms?schema=public";
// Впиши сюда строку подключения из Neon
const REMOTE_URL = "postgresql://neondb_owner:npg_Pp3H7LJiZUud@ep-calm-star-axk1cx6i-pooler.c-4.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require";

const local = new PrismaClient({datasources: {db: {url: LOCAL_URL}}});
const remote = new PrismaClient({datasources: {db: {url: REMOTE_URL}}});

async function main() {
  console.log("Начинаем перенос данных...");

  const articles = await local.knowledgeArticle.findMany();
  for (const {id, ...rest} of articles) {
    await remote.knowledgeArticle.upsert({where: {id}, update: rest, create: {id, ...rest}});
  }
  console.log(`✅ Статей перенесено: ${articles.length}`);

  const features = await local.feature.findMany();
  for (const {id, ...rest} of features) {
    await remote.feature.upsert({where: {id}, update: rest, create: {id, ...rest}});
  }
  console.log(`✅ Функций перенесено: ${features.length}`);

  const featureRelations = await local.featureRelation.findMany();
  for (const r of featureRelations) {
    await remote.featureRelation.upsert({
      where: {featureId_relatedFeatureId: {featureId: r.featureId, relatedFeatureId: r.relatedFeatureId}},
      update: {},
      create: r,
    });
  }
  console.log(`✅ Связей между функциями перенесено: ${featureRelations.length}`);

  const templates = await local.projectTemplate.findMany();
  for (const {id, ...rest} of templates) {
    await remote.projectTemplate.upsert({where: {id}, update: rest, create: {id, ...rest}});
  }
  console.log(`✅ Шаблонов перенесено: ${templates.length}`);

  const templateFeatures = await local.templateFeature.findMany();
  for (const tf of templateFeatures) {
    await remote.templateFeature.upsert({
      where: {templateId_featureId: {templateId: tf.templateId, featureId: tf.featureId}},
      update: {isRequired: tf.isRequired},
      create: tf,
    });
  }
  console.log(`✅ Связей шаблон-функция перенесено: ${templateFeatures.length}`);

  const clients = await local.client.findMany();
  for (const {id, ...rest} of clients) {
    await remote.client.upsert({where: {id}, update: rest, create: {id, ...rest}});
  }
  console.log(`✅ Клиентов перенесено: ${clients.length}`);

  const projects = await local.project.findMany();
  for (const {id, ...rest} of projects) {
    await remote.project.upsert({where: {id}, update: rest, create: {id, ...rest}});
  }
  console.log(`✅ Проектов перенесено: ${projects.length}`);

  const projectFeatures = await local.projectFeature.findMany();
  for (const pf of projectFeatures) {
    await remote.projectFeature.upsert({
      where: {projectId_featureId: {projectId: pf.projectId, featureId: pf.featureId}},
      update: {},
      create: pf,
    });
  }
  console.log(`✅ Связей проект-функция перенесено: ${projectFeatures.length}`);

  const briefs = await local.projectBrief.findMany();
  for (const {id, ...rest} of briefs) {
    await remote.projectBrief.upsert({where: {id}, update: rest, create: {id, ...rest}});
  }
  console.log(`✅ Брифов перенесено: ${briefs.length}`);

  console.log("🎉 Все данные успешно перенесены!");
}

main()
  .catch((e) => {
    console.error("❌ Ошибка:", e);
    process.exit(1);
  })
  .finally(async () => {
    await local.$disconnect();
    await remote.$disconnect();
  });