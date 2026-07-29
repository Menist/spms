import {getProjectTemplates} from "@/entities/project-template/repository";
import Link from "next/link";

export default async function AdminProjectTemplatesPage() {
  const templates = await getProjectTemplates();

  return (
    <main>
      <h1>Справочники: Шаблоны проектов</h1>

      <p className="meta back-link"><Link href="/">← На главную</Link></p>

      <ul>
        {templates.map((template) => (
          <li key={template.id} className="card">
            <strong>{template.name}</strong>
            <p className="meta">{template.description}</p>
            <Link href={`/admin/project-templates/${template.id}/edit`}>Редактировать</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}