import { NextResponse } from "next/server";
import { getOrderById, updateOrderStatus } from "@/lib/services/orders";

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

export async function PATCH(request: Request, { params }: OrderByIdRouteProps) {
  const body = (await request.json()) as { action?: string };

  if (body.action !== "cancel") {
    return NextResponse.json({ error: "Unsupported order action" }, { status: 400 });
  }

  const existingOrder = getOrderById(params.id);

  if (!existingOrder) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  if (["Delivered", "Cancelled"].includes(existingOrder.status)) {
    return NextResponse.json(
      { error: `Order cannot be cancelled once it is ${existingOrder.status.toLowerCase()}.` },
      { status: 400 },
    );
  }

  const order = updateOrderStatus(params.id, "Cancelled");
  return NextResponse.json({ order });
}
