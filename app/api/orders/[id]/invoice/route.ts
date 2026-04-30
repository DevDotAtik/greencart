import { NextResponse } from "next/server";
import { buildInvoice, getOrderById } from "@/lib/services/orders";

type InvoiceRouteProps = {
  params: { id: string };
};

export async function GET(_: Request, { params }: InvoiceRouteProps) {
  const order = getOrderById(params.id);

  if (!order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  return new NextResponse(buildInvoice(order), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Content-Disposition": `attachment; filename="${params.id}-invoice.txt"`,
    },
  });
}
