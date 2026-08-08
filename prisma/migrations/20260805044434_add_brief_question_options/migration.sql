-- CreateTable
CREATE TABLE "BriefQuestionOption" (
    "id" TEXT NOT NULL,
    "questionKey" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "isExclusive" BOOLEAN NOT NULL DEFAULT false,
    "requiresText" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "BriefQuestionOption_pkey" PRIMARY KEY ("id")
);
