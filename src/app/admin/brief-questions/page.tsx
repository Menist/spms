"use client";

import {useEffect, useState} from "react";
import type {BriefQuestionOption} from "@/entities/brief-question/model";
import Link from "next/link";

const questionLabels: Record<string, string> = {
  siteSections: "Структура сайта",
  materials: "Материалы",
  pageCount: "Количество страниц",
  deadline: "Срок выполнения",
};

const questionOrder = ["siteSections", "materials", "pageCount", "deadline"];

export default function AdminBriefQuestionsPage() {
  const [options, setOptions] = useState<BriefQuestionOption[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [newLabels, setNewLabels] = useState<Record<string, string>>({});

  async function load() {
    const data: BriefQuestionOption[] = await fetch("/api/brief-questions").then((res) => res.json());
    setOptions(data);
    setIsLoaded(true);
  }

  useEffect(() => {
    load();
  }, []);

  async function handleAdd(questionKey: string) {
    const label = newLabels[questionKey]?.trim();
    if (!label) return;

    const currentCount = options.filter((o) => o.questionKey === questionKey).length;

    await fetch("/api/brief-questions", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({questionKey, label, sortOrder: currentCount}),
    });

    setNewLabels((current) => ({...current, [questionKey]: ""}));
    await load();
  }

  async function handleDelete(id: string) {
    const confirmed = window.confirm("Удалить этот вариант ответа? Действие необратимо.");
    if (!confirmed) return;

    await fetch(`/api/admin/brief-questions/${id}`, {method: "DELETE"});
    await load();
  }

  async function handleToggleFlag(option: BriefQuestionOption, flag: "isExclusive" | "requiresText") {
    await fetch(`/api/admin/brief-questions/${option.id}`, {
      method: "PATCH",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({[flag]: !option[flag]}),
    });
    await load();
  }

  if (!isLoaded) {
    return <main><p className="meta">Загрузка...</p></main>;
  }

  return (
    <main>
      <h1>Справочники: Вопросы брифа</h1>

      <p className="meta back-link"><Link href="/admin">← К справочникам</Link></p>

      {questionOrder.map((questionKey) => {
        const groupOptions = options
          .filter((o) => o.questionKey === questionKey)
          .sort((a, b) => a.sortOrder - b.sortOrder);

        return (
          <div key={questionKey} className="card">
            <h2>{questionLabels[questionKey] ?? questionKey}</h2>

            {groupOptions.map((option) => (
              <div key={option.id} style={{display: "flex", alignItems: "center", gap: "12px", marginTop: "8px"}}>
                <span style={{flex: 1}}>{option.label}</span>

                {questionKey === "materials" && (
                  <label className="meta" style={{display: "flex", alignItems: "center", gap: "4px"}}>
                    <input
                      type="checkbox"
                      checked={option.isExclusive}
                      onChange={() => handleToggleFlag(option, "isExclusive")}
                    />
                    Эксклюзивный (сбрасывает остальные)
                  </label>
                )}

                {questionKey === "deadline" && (
                  <label className="meta" style={{display: "flex", alignItems: "center", gap: "4px"}}>
                    <input
                      type="checkbox"
                      checked={option.requiresText}
                      onChange={() => handleToggleFlag(option, "requiresText")}
                    />
                    Требует ввода текста
                  </label>
                )}

                <button onClick={() => handleDelete(option.id)} className="danger-button">Удалить</button>
              </div>
            ))}

            <div style={{marginTop: "12px", display: "flex", gap: "8px"}}>
              <input
                type="text"
                value={newLabels[questionKey] ?? ""}
                onChange={(e) => setNewLabels((current) => ({...current, [questionKey]: e.target.value}))}
                placeholder="Новый вариант ответа"
                style={{padding: "8px", flex: 1}}
              />
              <button onClick={() => handleAdd(questionKey)}>Добавить</button>
            </div>
          </div>
        );
      })}
    </main>
  );
}