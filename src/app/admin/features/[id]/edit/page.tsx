"use client";

import {useEffect, useState} from "react";
import {use} from "react";
import {useRouter} from "next/navigation";
import type {Feature} from "@/entities/feature/model";
import Link from "next/link";

interface AdminEditFeaturePageProps {
  params: Promise<{ id: string }>;
}

export default function AdminEditFeaturePage({params}: AdminEditFeaturePageProps) {
  const {id} = use(params);
  const router = useRouter();

  const [feature, setFeature] = useState<Feature | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const [description, setDescription] = useState("");
  const [estimatedHoursMin, setEstimatedHoursMin] = useState("");
  const [estimatedHoursMax, setEstimatedHoursMax] = useState("");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [comment, setComment] = useState("");
  const [implementationResult, setImplementationResult] = useState("");

  useEffect(() => {
    async function load() {
      const allFeatures: Feature[] = await fetch("/api/features").then((res) => res.json());
      const found = allFeatures.find((f) => f.id === id) ?? null;

      setFeature(found);
      setDescription(found?.description ?? "");
      setEstimatedHoursMin(found?.estimatedHours?.min?.toString() ?? "");
      setEstimatedHoursMax(found?.estimatedHours?.max?.toString() ?? "");
      setPriceMin(found?.priceRange?.min?.toString() ?? "");
      setPriceMax(found?.priceRange?.max?.toString() ?? "");
      setComment(found?.comment ?? "");
      setImplementationResult(found?.implementationResult ?? "");
      setIsLoaded(true);
    }

    load();
  }, [id]);

  async function handleSave() {
    await fetch(`/api/admin/features/${id}`, {
      method: "PATCH",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        description,
        estimatedHoursMin: estimatedHoursMin ? Number(estimatedHoursMin) : undefined,
        estimatedHoursMax: estimatedHoursMax ? Number(estimatedHoursMax) : undefined,
        priceMin: priceMin ? Number(priceMin) : undefined,
        priceMax: priceMax ? Number(priceMax) : undefined,
        comment,
        implementationResult,
      }),
    });
    router.push("/admin/features");
  }

  if (!isLoaded) {
    return <main><p className="meta">Загрузка...</p></main>;
  }

  if (!feature) {
    return (
      <main>
        <h1>Функция не найдена</h1>
        <p className="meta back-link"><Link href="/admin/features">Вернуться к списку</Link></p>
      </main>
    );
  }

  return (
    <main>
      <h1>Редактирование: {feature.name}</h1>

      <p className="meta back-link"><Link href="/admin/features">← К списку функций</Link></p>

      <div className="card" style={{display: "flex", flexDirection: "column", gap: "8px"}}>
        <label className="meta">Описание</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          style={{padding: "8px", fontFamily: "inherit"}}
        />

        <label className="meta">Трудоёмкость, часов</label>
        <div style={{display: "flex", gap: "8px"}}>
          <input
            type="number"
            value={estimatedHoursMin}
            onChange={(e) => setEstimatedHoursMin(e.target.value)}
            placeholder="от"
            style={{padding: "8px", width: "100px"}}
          />
          <input
            type="number"
            value={estimatedHoursMax}
            onChange={(e) => setEstimatedHoursMax(e.target.value)}
            placeholder="до"
            style={{padding: "8px", width: "100px"}}
          />
        </div>

        <label className="meta">Стоимость, BYN</label>
        <div style={{display: "flex", gap: "8px"}}>
          <input
            type="number"
            value={priceMin}
            onChange={(e) => setPriceMin(e.target.value)}
            placeholder="от"
            style={{padding: "8px", width: "100px"}}
          />
          <input
            type="number"
            value={priceMax}
            onChange={(e) => setPriceMax(e.target.value)}
            placeholder="до"
            style={{padding: "8px", width: "100px"}}
          />
        </div>

        <label className="meta">Комментарий</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={2}
          style={{padding: "8px", fontFamily: "inherit"}}
        />

        <label className="meta">Результат реализации</label>
        <textarea
          value={implementationResult}
          onChange={(e) => setImplementationResult(e.target.value)}
          rows={2}
          style={{padding: "8px", fontFamily: "inherit"}}
        />
      </div>

      <div className="summary" style={{display: "flex", gap: "8px", marginTop: "16px"}}>
        <button onClick={handleSave}>Сохранить изменения</button>
        <Link href="/admin/features">
          <button type="button">Отмена</button>
        </Link>
      </div>
    </main>
  );
}