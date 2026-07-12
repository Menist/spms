"use client";

import {useEffect, useState} from "react";
import {getClients, createClient} from "@/entities/client/repository";
import {getProjects, createProject} from "@/entities/project/repository";
import {getProjectTemplates} from "@/entities/project-template/repository";
import {getFeatures} from "@/entities/feature/repository";
import type {Client} from "@/entities/client/model";
import {useRouter, useSearchParams} from "next/navigation";

const transliterationMap: Record<string, string> = {
  а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "e", ж: "zh",
  з: "z", и: "i", й: "y", к: "k", л: "l", м: "m", н: "n", о: "o",
  п: "p", р: "r", с: "s", т: "t", у: "u", ф: "f", х: "h", ц: "c",
  ч: "ch", ш: "sh", щ: "sch", ъ: "", ы: "y", ь: "", э: "e", ю: "yu", я: "ya",
};

function transliterate(text: string): string {
  return text
    .toLowerCase()
    .split("")
    .map((char) => transliterationMap[char] ?? char)
    .join("");
}

function toKebabId(text: string): string {
  return transliterate(text)
    .replace(/[^a-z0-9]+/gi, "-")
    .replace(/^-+|-+$/g, "");
}

function generateUniqueId(baseText: string, existingIds: string[]): string {
  const baseId = toKebabId(baseText);
  let finalId = baseId;
  let counter = 2;

  while (existingIds.includes(finalId)) {
    finalId = `${baseId}-${counter}`;
    counter++;
  }

  return finalId;
}

export default function NewProjectPage() {
  const router = useRouter();
  const templates = getProjectTemplates();
  const features = getFeatures();
  const searchParams = useSearchParams();

  const [clients, setClients] = useState<Client[]>([]);
  const [clientMode, setClientMode] = useState<"existing" | "new">("existing");

  const [step, setStep] = useState(1);
  const [clientId, setClientId] = useState("");
  const [newClientName, setNewClientName] = useState("");
  const [newClientContactPerson, setNewClientContactPerson] = useState("");
  const [newClientPhone, setNewClientPhone] = useState("");
  const [newClientReason, setNewClientReason] = useState("");

  const [projectName, setProjectName] = useState("");
  const [templateId, setTemplateId] = useState(templates[0]?.id ?? "");
  const [optionalFeatureIds, setOptionalFeatureIds] = useState<string[]>([]);

  useEffect(() => {
    const loadedClients = getClients();
    setClients(loadedClients);

    const clientIdFromUrl = searchParams.get("clientId");
    const matchedClient = loadedClients.find((c) => c.id === clientIdFromUrl);

    if (matchedClient) {
      setClientId(matchedClient.id);
      setClientMode("existing");
    } else {
      setClientId(loadedClients[0]?.id ?? "");
    }
  }, []);

  const selectedTemplate = templates.find((t) => t.id === templateId);

  function toggleOptionalFeature(featureId: string) {
    if (optionalFeatureIds.includes(featureId)) {
      setOptionalFeatureIds(optionalFeatureIds.filter((id) => id !== featureId));
    } else {
      setOptionalFeatureIds([...optionalFeatureIds, featureId]);
    }
  }

  function handleCreateProject() {
    if (!selectedTemplate) return;

    let finalClientId = clientId;

    if (clientMode === "new") {
      const existingClientIds = getClients().map((c) => c.id);
      const newId = generateUniqueId(newClientName, existingClientIds);

      createClient({
        id: newId,
        name: newClientName,
        contactPerson: newClientContactPerson,
        phone: newClientPhone,
        contactDate: new Date().toISOString().slice(0, 10),
        contactReason: newClientReason,
      });

      finalClientId = newId;
    }

    const existingProjectIds = getProjects().map((p) => p.id);
    const newProjectId = generateUniqueId(projectName, existingProjectIds);

    createProject({
      id: newProjectId,
      name: projectName,
      clientId: finalClientId,
      featureIds: [...selectedTemplate.requiredFeatureIds, ...optionalFeatureIds],
      status: "active",
    });

    router.push(`/projects/${newProjectId}?created=true`);
  }

  const canProceedFromStep1 =
    clientMode === "existing" ? Boolean(clientId) : Boolean(newClientName);

  return (
    <main>
      <h1>Новый проект</h1>

      {step === 1 && (
        <div className="card">
          <h2>Шаг 1. Клиент</h2>

          <div className="toggle-group">
            <button
              className={`toggle-button ${clientMode === "existing" ? "toggle-button--active" : ""}`}
              onClick={() => setClientMode("existing")}
            >
              Выбрать существующего
            </button>
            <button
              className={`toggle-button ${clientMode === "new" ? "toggle-button--active" : ""}`}
              onClick={() => setClientMode("new")}
              disabled={newClientName.trim().length > 0}
            >
              Добавить нового
            </button>
          </div>

          {clientMode === "existing" && (
            <>
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
            </>
          )}

          {clientMode === "new" && (
            <div style={{display: "flex", flexDirection: "column", gap: "8px"}}>
              <input
                type="text"
                value={newClientName}
                onChange={(e) => setNewClientName(e.target.value)}
                placeholder="Название компании"
                style={{padding: "8px"}}
              />
              <input
                type="text"
                value={newClientContactPerson}
                onChange={(e) => setNewClientContactPerson(e.target.value)}
                placeholder="Контактное лицо"
                style={{padding: "8px"}}
              />
              <input
                type="text"
                value={newClientPhone}
                onChange={(e) => setNewClientPhone(e.target.value)}
                placeholder="Телефон"
                style={{padding: "8px"}}
              />
              <input
                type="text"
                value={newClientReason}
                onChange={(e) => setNewClientReason(e.target.value)}
                placeholder="Причина обращения"
                style={{padding: "8px"}}
              />
            </div>
          )}

          <div style={{marginTop: "16px"}}>
            <button onClick={() => setStep(2)} disabled={!canProceedFromStep1}>Далее</button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="card">
          <h2>Шаг 2. Название проекта</h2>
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="Например: Сайт для кафе «Ромашка»"
            style={{width: "100%", padding: "8px", marginTop: "8px"}}
          />
          <div style={{marginTop: "16px", display: "flex", gap: "8px"}}>
            <button onClick={() => setStep(1)}>Назад</button>
            <button onClick={() => setStep(3)} disabled={!projectName}>Далее</button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="card">
          <h2>Шаг 3. Тип сайта</h2>
          {templates.map((template) => (
            <label key={template.id} className="checkbox-row">
              <input
                type="radio"
                name="template"
                checked={templateId === template.id}
                onChange={() => setTemplateId(template.id)}
              />
              {template.name} — <span className="meta">{template.description}</span>
            </label>
          ))}
          <div style={{marginTop: "16px", display: "flex", gap: "8px"}}>
            <button onClick={() => setStep(2)}>Назад</button>
            <button onClick={() => setStep(4)}>Далее</button>
          </div>
        </div>
      )}

      {step === 4 && selectedTemplate && (
        <div className="card">
          <h2>Шаг 4. Обязательные функции</h2>
          <p className="meta">Добавляются автоматически для шаблона «{selectedTemplate.name}»:</p>
          <ul style={{marginTop: "8px"}}>
            {selectedTemplate.requiredFeatureIds.map((id) => {
              const feature = features.find((f) => f.id === id);
              return <li key={id} className="meta">✓ {feature?.name ?? id}</li>;
            })}
          </ul>

          <h2 style={{marginTop: "20px"}}>Дополнительные функции</h2>
          {selectedTemplate.optionalFeatureIds.map((id) => {
            const feature = features.find((f) => f.id === id);
            if (!feature) return null;

            return (
              <label key={id} className="checkbox-row">
                <input
                  type="checkbox"
                  checked={optionalFeatureIds.includes(id)}
                  onChange={() => toggleOptionalFeature(id)}
                />
                {feature.name}
              </label>
            );
          })}

          <div style={{marginTop: "16px", display: "flex", gap: "8px"}}>
            <button onClick={() => setStep(3)}>Назад</button>
            <button onClick={handleCreateProject}>Создать проект</button>
          </div>
        </div>
      )}
    </main>
  );
}