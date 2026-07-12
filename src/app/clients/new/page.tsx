"use client";

import {useState} from "react";
import {useRouter} from "next/navigation";
import {getClients, createClient} from "@/entities/client/repository";
import Link from "next/link";

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

export default function NewClientPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [phone, setPhone] = useState("");
  const [contactReason, setContactReason] = useState("");

  function handleCreate() {
    const existingIds = getClients().map((c) => c.id);
    const newId = generateUniqueId(name, existingIds);

    createClient({
      id: newId,
      name,
      contactPerson,
      phone,
      contactDate: new Date().toISOString().slice(0, 10),
      contactReason,
    });

    router.push(`/clients/${newId}`);
  }

  return (
    <main>
      <h1>Новый клиент</h1>

      <p className="meta back-link"><Link href="/clients">← Все клиенты</Link></p>

      <div className="card" style={{display: "flex", flexDirection: "column", gap: "8px"}}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Название компании"
          style={{padding: "8px"}}
        />
        <input
          type="text"
          value={contactPerson}
          onChange={(e) => setContactPerson(e.target.value)}
          placeholder="Контактное лицо"
          style={{padding: "8px"}}
        />
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Телефон"
          style={{padding: "8px"}}
        />
        <input
          type="text"
          value={contactReason}
          onChange={(e) => setContactReason(e.target.value)}
          placeholder="Причина обращения"
          style={{padding: "8px"}}
        />
      </div>

      <div style={{marginTop: "16px"}}>
        <button onClick={handleCreate} disabled={!name}>Создать клиента</button>
      </div>
    </main>
  );
}