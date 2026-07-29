import {NextResponse} from "next/server";
import {getFeatures} from "@/entities/feature/repository";
export const dynamic = "force-dynamic";
export async function GET() {
  const features = await getFeatures();
  return NextResponse.json(features);
}