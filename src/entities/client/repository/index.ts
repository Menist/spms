import {prisma} from "@/shared/lib/prisma";
import type {Client} from "@/entities/client/model";

function toClient(row: {
  id: string;
  name: string;
  contactPerson: string;
  phone: string;
  contactDate: Date;
  contactReason: string;
}): Client {
  return {
    id: row.id,
    name: row.name,
    contactPerson: row.contactPerson,
    phone: row.phone,
    contactDate: row.contactDate.toISOString().slice(0, 10),
    contactReason: row.contactReason,
  };
}

export async function getClients(): Promise<Client[]> {
  const rows = await prisma.client.findMany();
  return rows.map(toClient);
}

export async function getClientById(id: string): Promise<Client | undefined> {
  const row = await prisma.client.findUnique({where: {id}});
  return row ? toClient(row) : undefined;
}

export async function createClient(client: Client): Promise<void> {
  await prisma.client.create({
    data: {
      id: client.id,
      name: client.name,
      contactPerson: client.contactPerson,
      phone: client.phone,
      contactDate: new Date(client.contactDate),
      contactReason: client.contactReason,
    },
  });
}

export async function updateClient(id: string, updates: Partial<Client>): Promise<void> {
  await prisma.client.update({
    where: {id},
    data: {
      ...(updates.name !== undefined && {name: updates.name}),
      ...(updates.contactPerson !== undefined && {contactPerson: updates.contactPerson}),
      ...(updates.phone !== undefined && {phone: updates.phone}),
      ...(updates.contactReason !== undefined && {contactReason: updates.contactReason}),
      ...(updates.contactDate !== undefined && {contactDate: new Date(updates.contactDate)}),
    },
  });
}

export async function deleteClient(id: string): Promise<void> {
  await prisma.client.delete({where: {id}});
}