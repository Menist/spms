"use client";

import {useEffect, useState} from "react";
import {use} from "react";
import {useRouter} from "next/navigation";
import {getProjectById, updateProject} from "@/entities/project/repository";
import {getFeatures} from "@/entities/feature/repository";
import type {Project} from "@/entities/project/model";
import type {Feature} from "@/entities/feature/model";
import type {FeatureCategory} from "@/entities/feature/category";
import type {Client} from "@/entities/client/model";
import Link from "next/link";
import {getClients} from "@/entities/client/repository";

interface EditProjectPageProps {
  params: Promise<{ id: string }>;
}

function groupByCategory(features: Feature[]): Record<FeatureCategory, Feature[]> {
  const result = {} as Record<FeatureCategory, Feature[]>;

  for (const feature of features) {
    if (!result[feature.category]) {
      result[feature.category] = [];
    }
    result[feature.category].push(feature);
  }

  return result;
}

export default function EditProjectPage({params}: EditProjectPageProps) {
  const {id} = use(params);
  const router = useRouter();


  const [project, setProject] = useState<Project | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [featureIds, setFeatureIds] = useState<string[]>([]);
  const [projectName, setProjectName] = useState("");
  const [clientId, setClientId] = useState("");
  const [clients, setClients] = useState<Client[]>([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    const found = getProjectById(id) ?? null;
    setProject(found);
    setFeatureIds(found?.featureIds ?? []);
    setProjectName(found?.name ?? "");
    setClientId(found?.clientId ?? "");
    setComment(found?.comment ?? "");
    setClients(getClients());
    setIsLoaded(true);
  }, [id]);

  function toggleFeature(featureId: string) {
    setFeatureIds((current) =>
      current.includes(featureId)
        ? current.filter((f) => f !== featureId)
        : [...current, featureId]
    );
  }

  function handleSave() {
    updateProject(id, {name: projectName, clientId, comment, featureIds});
    router.push(`/projects/${id}?saved=true`);
  }

  if (!isLoaded) {
    return <main><p className="meta">Загрузка...</p></main>;
  }

  if (!project) {
    return (
      <main>
        <h1>Проект не найден</h1>
        <p className="meta back-link"><Link href="/projects">Вернуться к списку проектов</Link></p>
      </main>
    );
  }

  const allFeatures = getFeatures();
  const grouped = groupByCategory(allFeatures);

  return (
    <main>
      <h1>Редактирование: {project.name}</h1>

      <p className="meta back-link"><Link href={`/projects/${project.id}`}>← К проекту</Link></p>

      <div className="card">
        <h2>Комментарий проекта</h2>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Например: клиент требует интеграцию с CRM"
          rows={3}
          style={{width: "100%", padding: "8px", marginTop: "8px", fontFamily: "inherit"}}
        />
      </div>

      {Object.entries(grouped).map(([category, categoryFeatures]) => (
        <div key={category} className="card">
          <h2>{category}</h2>
          {categoryFeatures.map((feature) => (
            <label key={feature.id} className="checkbox-row">
              <input
                type="checkbox"
                checked={featureIds.includes(feature.id)}
                onChange={() => toggleFeature(feature.id)}
              />
              {feature.name}
            </label>
          ))}
        </div>
      ))}

      <div className="summary" style={{display: "flex", gap: "8px"}}>
        <button onClick={handleSave}>Сохранить изменения</button>
        <Link href={`/projects/${project.id}`}>
          <button type="button">Отмена</button>
        </Link>
      </div>
    </main>
  );
}