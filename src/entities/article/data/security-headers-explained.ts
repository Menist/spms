import type {KnowledgeArticle} from "../model";

export const securityHeadersExplainedArticle: KnowledgeArticle = {
  id: "security-headers-explained",
  title: "Зачем нужны HTTP-заголовки безопасности",
  content: "HTTP-заголовки безопасности (HSTS, X-Frame-Options, X-Content-Type-Options и другие) сообщают браузеру, как безопасно обрабатывать сайт: запрещают встраивание в чужие фреймы, принудительно используют HTTPS и блокируют угадывание типов файлов.",
};