"use client";

import {useEffect, useState} from "react";
import {use} from "react";
import {useRouter} from "next/navigation";
import type {ProjectTemplate} from "@/entities/project-template/model";
import type {Feature} from "@/entities/feature/model";
import type {FeatureCategory} from "@/entities/feature/category";
import Link from "next/link";

interface AdminEditTemplatePageProps {
  params: Promise<{ id: string }>;
}

type Selection = "required" | "optional" | "none";

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

export default function AdminEditTemplatePage({params}: AdminEditTemplatePageProps) {
  const {id} = use(params);
  const router = useRouter();

  const [template, setTemplate] = useState<ProjectTemplate | null>(null);
  const [allFeatures, setAllFeatures] = useState<Feature[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selections, setSelections] = useState<Record<string, Selection>>({});

  useEffect(() => {
    async function load() {
      const allTemplates: ProjectTemplate[] = await fetch("/api/project-templates").then((res) => res.json());
      const found = allTemplates.find((t) => t.id === id) ?? null;
      const features: Feature[] = await fetch("/api/features").then((res) => res.json());

      const initialSelections: Record<string, Selection> = {};
      for (const feature of features) {
        if (found?.requiredFeatureIds.includes(feature.id)) {
          initialSelections[feature.id] = "required";
        } else if (found?.optionalFeatureIds.includes(feature.id)) {
          initialSelections[feature.id] = "optional";
        } else {
          initialSelections[feature.id] = "none";
        }
      }

      setTemplate(found);
      setAllFeatures(features);
      setName(found?.name ?? "");
      setDescription(found?.description ?? "");
      setSelections(initialSelections);
      setIsLoaded(true);
    }

    load();
  }, [id]);

  function setSelection(featureId: string, value: Selection) {
    setSelections((current) => ({...current, [featureId]: value}));
  }

  async function handleSave() {
    const requiredFeatureIds = Object.entries(selections)
      .filter(([, value]) => value === "required")
      .map(([featureId]) => featureId);

    const optionalFeatureIds = Object.entries(selections)
      .filter(([, value]) => value === "optional")
      .map(([featureId]) => featureId);

    await fetch(`/api/admin/project-templates/${id}`, {
      method: "PATCH",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({name, description, requiredFeatureIds, optionalFeatureIds}),
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

  const grouped = groupByCategory(allFeatures);

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

      <h2 style={{marginTop: "24px"}}>Состав шаблона</h2>
      <p className="meta">Для каждой функции выбери, как она участвует в этом шаблоне.</p>

      {Object.entries(grouped).map(([category, categoryFeatures]) => (
        <div key={category} className="card">
          <h3>{category}</h3>
          {categoryFeatures.map((feature) => (
            <div key={feature.id} style={{display: "flex", alignItems: "center", gap: "12px", marginTop: "8px"}}>
              <span style={{flex: 1}}>{feature.name}</span>
              {(["required", "optional", "none"] as const).map((option) => (
                <label key={option} className="meta" style={{display: "flex", alignItems: "center", gap: "4px"}}>
                  <input
                    type="radio"
                    name={`feature-${feature.id}`}
                    checked={selections[feature.id] === option}
                    onChange={() => setSelection(feature.id, option)}
                  />
                  {option === "required" ? "Обязательная" : option === "optional" ? "Дополнительная" : "Не входит"}
                </label>
              ))}
            </div>
          ))}
        </div>
      ))}

      <div className="summary" style={{display: "flex", gap: "8px", marginTop: "16px"}}>
        <button onClick={handleSave} disabled={!name}>Сохранить изменения</button>
        <Link href="/admin/project-templates">
          <button type="button">Отмена</button>
        </Link>
      </div>
    </main>
  );
}