import type {Project} from "../model";

export const imcCrmProject: Project = {
  id: "imc-crm",
  name: "Внутренняя CRM для IMC Computers",
  clientId: "imc-computers",
  status: "active",
  featureIds: [
    "ssl-certificate",
    "content-security-policy",
    "security-headers",
    "protected-service-files",

    "css-js-minification",
    "gzip-brotli-compression",

    "utf8-encoding",
    "custom-404-page",

    "adaptive-layout",

    "contact-form",
  ],
};