import { NextResponse } from "next/server";
import { getOrderById } from "@/lib/services/orders";

type OrderByIdRouteProps = {
  params: { id: string };
};

export async function GET(_: Request, { params }: OrderByIdRouteProps) {
  const order = getOrderById(params.id);

  if (!order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  return NextResponse.json({ order });
}
