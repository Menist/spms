"use client";

import {useEffect, useState} from "react";
import type {Client} from "@/entities/client/model";
import Link from "next/link";

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    fetch("/api/clients")
      .then((res) => res.json())
      .then((data) => {
        setClients(data);
        setIsLoaded(true);
      });
  }, []);

  return (
    <main>
      <h1>Клиенты</h1>

      <p className="summary">
        <Link href="/clients/new">+ Новый клиент</Link>
      </p>

      {!isLoaded && <p className="meta">Загрузка...</p>}

      <ul>
        {clients.map((client) => (
          <li key={client.id} className="card">
            <Link href={`/clients/${client.id}`}>{client.name}</Link>
            <p className="meta">{client.contactPerson}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}