import {Client} from "@/entities/client/model";
import {imcComputersClient} from "@/entities/client/data/imc-computers";

const clients: Client[] = [
  imcComputersClient,
];

export function getClients(): Client[] {
  return clients;
}