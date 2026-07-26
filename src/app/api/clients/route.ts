import {NextResponse} from "next/server";
import {getClients, createClient} from "@/entities/client/repository";

export async function GET() {
  const clients = await getClients();
  return NextResponse.json(clients);
}

export async function POST(request: Request) {
  const client = await request.json();
  await createClient(client);
  return NextResponse.json({success: true});
}