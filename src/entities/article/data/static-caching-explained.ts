import type {KnowledgeArticle} from "../model";

export const staticCachingExplainedArticle: KnowledgeArticle = {
  id: "static-caching-explained",
  title: "Зачем нужно кэширование статики",
  content: "Кэширование статических файлов позволяет браузеру не загружать их заново при повторных визитах, что ускоряет работу сайта для постоянных посетителей.",
  summary: "Ускоряет повторные посещения сайта, избавляя браузер от повторной загрузки одних и тех же файлов.",
};