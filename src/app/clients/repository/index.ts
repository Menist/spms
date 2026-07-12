import {Client} from "@/entities/client/model";
import {imcComputersClient} from "@/entities/client/data/imc-computers";
import {loadFromStorage, saveToStorage} from "@/shared/lib/local-storage";

const STORAGE_KEY = "spms:clients";

const seedClients: Client[] = [
  imcComputersClient,
];

function readClients(): Client[] {
  return loadFromStorage<Client>(STORAGE_KEY, seedClients);
}

function writeClients(clients: Client[]): void {
  saveToStorage<Client>(STORAGE_KEY, clients);
}

export function getClients(): Client[] {
  return readClients();
}

export function getClientById(id: string): Client | undefined {
  return readClients().find((client) => client.id === id);
}

export function createClient(client: Client): void {
  writeClients([...readClients(), client]);
}

export function updateClient(id: string, updates: Partial<Client>): void {
  const clients = readClients().map((client) =>
    client.id === id ? {...client, ...updates} : client
  );
  writeClients(clients);
}

export function deleteClient(id: string): void {
  writeClients(readClients().filter((client) => client.id !== id));
}