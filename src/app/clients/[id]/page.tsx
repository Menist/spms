import {getClients} from "@/entities/client/repository";
import {notFound} from "next/navigation";

interface ClientPageProps {
  params: Promise<{ id: string }>;
}

export default async function ClientPage({params}: ClientPageProps) {
  const {id} = await params;
  const client = getClients().find((c) => c.id === id);

  if (!client) {
    notFound();
  }

  return (
    <main>
      <h1>{client.name}</h1>
      <p>Контактное лицо: {client.contactPerson}</p>
      <p>Телефон: {client.phone}</p>
      <p>Дата обращения: {client.contactDate}</p>
      <p>Причина обращения: {client.contactReason}</p>
    </main>
  );
}