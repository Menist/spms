import {NextResponse} from "next/server";
import {updateArticle} from "@/entities/article/repository";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function PATCH(request: Request, {params}: RouteParams) {
  const {id} = await params;
  const updates = await request.json();
  await updateArticle(id, updates);
  return NextResponse.json({success: true});
}