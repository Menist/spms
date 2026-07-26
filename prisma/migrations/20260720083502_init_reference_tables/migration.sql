-- CreateEnum
CREATE TYPE "FeatureCategory" AS ENUM ('SEO', 'Security', 'Analytics', 'UI', 'Content', 'Performance', 'Accessibility', 'Infrastructure');

-- CreateEnum
CREATE TYPE "FeatureStatus" AS ENUM ('included', 'optional', 'notRequired');

-- CreateTable
CREATE TABLE "KnowledgeArticle" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "KnowledgeArticle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Feature" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" "FeatureCategory" NOT NULL,
    "status" "FeatureStatus" NOT NULL,
    "estimatedHoursMin" INTEGER,
    "estimatedHoursMax" INTEGER,
    "priceMin" INTEGER,
    "priceMax" INTEGER,
    "comment" TEXT,
    "implementationResult" TEXT,
    "articleId" TEXT,

    CONSTRAINT "Feature_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeatureRelation" (
    "featureId" TEXT NOT NULL,
    "relatedFeatureId" TEXT NOT NULL,

    CONSTRAINT "FeatureRelation_pkey" PRIMARY KEY ("featureId","relatedFeatureId")
);

-- CreateTable
CREATE TABLE "ProjectTemplate" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "ProjectTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TemplateFeature" (
    "templateId" TEXT NOT NULL,
    "featureId" TEXT NOT NULL,
    "isRequired" BOOLEAN NOT NULL,

    CONSTRAINT "TemplateFeature_pkey" PRIMARY KEY ("templateId","featureId")
);

-- AddForeignKey
ALTER TABLE "Feature" ADD CONSTRAINT "Feature_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "KnowledgeArticle"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeatureRelation" ADD CONSTRAINT "FeatureRelation_featureId_fkey" FOREIGN KEY ("featureId") REFERENCES "Feature"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeatureRelation" ADD CONSTRAINT "FeatureRelation_relatedFeatureId_fkey" FOREIGN KEY ("relatedFeatureId") REFERENCES "Feature"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TemplateFeature" ADD CONSTRAINT "TemplateFeature_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "ProjectTemplate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TemplateFeature" ADD CONSTRAINT "TemplateFeature_featureId_fkey" FOREIGN KEY ("featureId") REFERENCES "Feature"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
