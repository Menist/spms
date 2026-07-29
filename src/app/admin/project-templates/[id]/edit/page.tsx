"use client";

import {useEffect, useState} from "react";
import {use} from "react";
import {useRouter} from "next/navigation";
import type {ProjectTemplate} from "@/entities/project-template/model";
import Link from "next/link";

interface AdminEditTemplatePageProps {
  params: Promise<{ id: string }>;
}

export default function AdminEditTemplatePage({params}: AdminEditTemplatePageProps) {
  const {id} = use(params);
  const router = useRouter();

  const [template, setTemplate] = useState<ProjectTemplate | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    async function load() {
      const allTemplates: ProjectTemplate[] = await fetch("/api/project-templates").then((res) => res.json());
      const found = allTemplates.find((t) => t.id === id) ?? null;

      setTemplate(found);
      setName(found?.name ?? "");
      setDescription(found?.description ?? "");
      setIsLoaded(true);
    }

    load();
  }, [id]);

  async function handleSave() {
    await fetch(`/api/admin/project-templates/${id}`, {
      method: "PATCH",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({name, description}),
    });
    router.push("/admin/project-templates");
  }

  if (!isLoaded) {
    return <main><p className="meta">Загрузка...</p></main>;
  }

  if (!template) {
    return (
      <main>
        <h1>Шаблон не найден</h1>
        <p className="meta back-link"><Link href="/admin/project-templates">Вернуться к списку</Link></p>
      </main>
    );
  }

  return (
    <main>
      <h1>Редактирование: {template.name}</h1>

      <p className="meta back-link"><Link href="/admin/project-templates">← К списку шаблонов</Link></p>

      <div className="card" style={{display: "flex", flexDirection: "column", gap: "8px"}}>
        <label className="meta">Название</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{padding: "8px"}}
        />

        <label className="meta">Описание</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          style={{padding: "8px", fontFamily: "inherit"}}
        />
      </div>

      <div className="summary" style={{display: "flex", gap: "8px", marginTop: "16px"}}>
        <button onClick={handleSave} disabled={!name}>Сохранить изменения</button>
        <Link href="/admin/project-templates">
          <button type="button">Отмена</button>
        </Link>
      </div>
    </main>
  );
}