import { NextRequest, NextResponse } from "next/server";
import { getFarmerProducts } from "@/lib/services/catalog";
import { farmerProductSchema } from "@/lib/schemas";

export async function GET() {
  const products = await getFarmerProducts("farmer-1");
  return NextResponse.json({ products });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const parsed = farmerProductSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Product payload is invalid", issues: parsed.error.flatten() },
      { status: 400 },
    );
  }

  return NextResponse.json(
    {
      message: "Product accepted by the farmer API. Persist it to MongoDB in production.",
      product: parsed.data,
    },
    { status: 201 },
  );
}
