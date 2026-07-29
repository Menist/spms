import {NextResponse} from "next/server";
import {getClientById, updateClient, deleteClient} from "@/entities/client/repository";

interface RouteParams {
  params: Promise<{ id: string }>;
}
export const dynamic = "force-dynamic";
export async function GET(request: Request, {params}: RouteParams) {
  const {id} = await params;
  const client = await getClientById(id);

  if (!client) {
    return NextResponse.json({error: "Not found"}, {status: 404});
  }

  return NextResponse.json(client);
}

export async function PATCH(request: Request, {params}: RouteParams) {
  const {id} = await params;
  const updates = await request.json();
  await updateClient(id, updates);
  return NextResponse.json({success: true});
}

export async function DELETE(request: Request, {params}: RouteParams) {
  const {id} = await params;
  await deleteClient(id);
  return NextResponse.json({success: true});
}