import { NextResponse } from "next/server";
import { getProductById } from "@/lib/services/catalog";

type ProductByIdRouteProps = {
  params: { id: string };
};

export async function GET(_: Request, { params }: ProductByIdRouteProps) {
  const product = await getProductById(params.id);

  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  return NextResponse.json({ product });
}
