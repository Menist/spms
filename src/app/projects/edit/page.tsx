"use client";

import {useEffect, useState} from "react";
import {use} from "react";
import {useRouter} from "next/navigation";
import {getProjectById, updateProject} from "@/entities/project/repository";
import {getFeatures} from "@/entities/feature/repository";
import {getClients} from "@/entities/client/repository";
import type {Project} from "@/entities/project/model";
import type {Feature} from "@/entities/feature/model";
import type {FeatureCategory} from "@/entities/feature/category";
import type {Client} from "@/entities/client/model";
import Link from "next/link";

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

  useEffect(() => {
    const found = getProjectById(id) ?? null;
    setProject(found);
    setFeatureIds(found?.featureIds ?? []);
    setProjectName(found?.name ?? "");
    setClientId(found?.clientId ?? "");
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
    updateProject(id, {name: projectName, clientId, featureIds});
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
        <h2>Название проекта</h2>
        <input
          type="text"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          style={{width: "100%", padding: "8px", marginTop: "8px"}}
        />
      </div>

      <div className="card">
        <h2>Клиент</h2>
        {clients.length === 0 && <p className="meta">Пока нет ни одного клиента.</p>}
        {clients.map((client) => (
          <label key={client.id} className="checkbox-row">
            <input
              type="radio"
              name="client"
              checked={clientId === client.id}
              onChange={() => setClientId(client.id)}
            />
            {client.name}
          </label>
        ))}
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
        <button onClick={handleSave} disabled={!projectName}>Сохранить изменения</button>
        <Link href={`/projects/${project.id}`}>
          <button type="button">Отмена</button>
        </Link>
      </div>
    </main>
  );
}