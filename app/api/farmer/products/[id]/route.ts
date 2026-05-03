import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { productStockUpdateSchema } from "@/lib/schemas";
import { ensureSeedData } from "@/lib/services/seed";
import { ProductModel } from "@/models/Product";

type FarmerProductRouteProps = {
  params: { id: string };
};

export async function PATCH(request: NextRequest, { params }: FarmerProductRouteProps) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Please sign in first." }, { status: 401 });
  }

  if (!["farmer", "admin"].includes(session.user.role)) {
    return NextResponse.json({ error: "Seller access only." }, { status: 403 });
  }

  const body = await request.json();
  const parsed = productStockUpdateSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please enter a valid stock quantity.", issues: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const connection = await connectToDatabase();

  if (!connection) {
    return NextResponse.json(
      { error: "MongoDB is not configured. Add MONGODB_URI to enable stock updates." },
      { status: 500 },
    );
  }

  await ensureSeedData();

  const existingProduct = await ProductModel.findOne({ id: params.id });

  if (!existingProduct) {
    return NextResponse.json({ error: "Product not found." }, { status: 404 });
  }

  if (
    session.user.role !== "admin" &&
    session.user.farmerId &&
    existingProduct.farmerId !== session.user.farmerId
  ) {
    return NextResponse.json({ error: "You can only update your own products." }, { status: 403 });
  }

  existingProduct.stock = parsed.data.stock;
  await existingProduct.save();

  return NextResponse.json({
    message: "Stock updated successfully.",
    product: {
      ...existingProduct.toObject(),
      harvestDate: existingProduct.harvestDate?.toISOString?.() ?? new Date().toISOString(),
    },
  });
}
