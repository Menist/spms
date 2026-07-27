import {NextResponse} from "next/server";
import {updateFeature} from "@/entities/feature/repository";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function PATCH(request: Request, {params}: RouteParams) {
  const {id} = await params;
  const updates = await request.json();
  await updateFeature(id, updates);
  return NextResponse.json({success: true});
}