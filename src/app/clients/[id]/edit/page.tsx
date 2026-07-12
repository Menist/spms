"use client";

import {useEffect, useState} from "react";
import {use} from "react";
import {useRouter} from "next/navigation";
import {getClientById, updateClient} from "@/entities/client/repository";
import type {Client} from "@/entities/client/model";
import Link from "next/link";

interface EditClientPageProps {
  params: Promise<{ id: string }>;
}

export default function EditClientPage({params}: EditClientPageProps) {
  const {id} = use(params);
  const router = useRouter();

  const [client, setClient] = useState<Client | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const [name, setName] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [phone, setPhone] = useState("");
  const [contactReason, setContactReason] = useState("");

  useEffect(() => {
    const found = getClientById(id) ?? null;
    setClient(found);
    setName(found?.name ?? "");
    setContactPerson(found?.contactPerson ?? "");
    setPhone(found?.phone ?? "");
    setContactReason(found?.contactReason ?? "");
    setIsLoaded(true);
  }, [id]);

  function handleSave() {
    updateClient(id, {name, contactPerson, phone, contactReason});
    router.push(`/clients/${id}`);
  }

  if (!isLoaded) {
    return <main><p className="meta">Загрузка...</p></main>;
  }

  if (!client) {
    return (
      <main>
        <h1>Клиент не найден</h1>
        <p className="meta back-link"><Link href="/clients">Вернуться к списку клиентов</Link></p>
      </main>
    );
  }

  return (
    <main>
      <h1>Редактирование: {client.name}</h1>

      <p className="meta back-link"><Link href={`/clients/${client.id}`}>← К клиенту</Link></p>

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

      <div className="summary" style={{display: "flex", gap: "8px"}}>
        <button onClick={handleSave} disabled={!name}>Сохранить изменения</button>
        <Link href={`/clients/${client.id}`}>
          <button type="button">Отмена</button>
        </Link>
      </div>
    </main>
  );
}