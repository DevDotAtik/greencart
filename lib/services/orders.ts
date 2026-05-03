import { addDays } from "date-fns";
import { COUPONS } from "@/lib/constants";
import { orders, products, users } from "@/lib/mock-data";
import { buildInvoiceText } from "@/lib/order-utils";
import type { Order } from "@/lib/types";

export function calculateOrderSummary(
  items: Array<{ productId: string; quantity: number }>,
  couponCode?: string,
) {
  const subtotal = items.reduce((sum, item) => {
    const product = products.find((candidate) => candidate.id === item.productId);
    return sum + (product?.price ?? 0) * item.quantity;
  }, 0);

  const deliveryCharge = subtotal > 799 ? 0 : 40;
  const discount = couponCode
    ? COUPONS[couponCode.toUpperCase() as keyof typeof COUPONS] ?? 0
    : 0;

  return {
    subtotal,
    deliveryCharge,
    discount,
    total: Math.max(subtotal + deliveryCharge - discount, 0),
  };
}

export function createOrder(payload: {
  customerName: string;
  email: string;
  phone: string;
  addressLine: string;
  city: string;
  state: string;
  pincode: string;
  paymentMode: "COD" | "UPI" | "Razorpay" | "Stripe";
  items: Array<{ productId: string; quantity: number }>;
  couponCode?: string;
}) {
  const summary = calculateOrderSummary(payload.items, payload.couponCode);

  const order: Order = {
    id: `ORD-${Date.now().toString().slice(-6)}`,
    userId: users[0].id,
    items: payload.items.map((item) => {
      const product = products.find((candidate) => candidate.id === item.productId);
      return {
        productId: item.productId,
        quantity: item.quantity,
        price: product?.price ?? 0,
      };
    }),
    ...summary,
    paymentMode: payload.paymentMode,
    status: "Processing",
    placedAt: new Date().toISOString(),
    estimatedDelivery: addDays(new Date(), 3).toISOString(),
    address: {
      id: `addr-${Date.now()}`,
      label: "Delivery",
      recipient: payload.customerName,
      line1: payload.addressLine,
      city: payload.city,
      state: payload.state,
      pincode: payload.pincode,
      phone: payload.phone,
      primary: true,
    },
  };

  orders.unshift(order);
  return order;
}

export function getOrderById(id: string) {
  return orders.find((order) => order.id === id);
}

export function updateOrderStatus(id: string, status: Order["status"]) {
  const order = orders.find((candidate) => candidate.id === id);

  if (!order) {
    return null;
  }

  order.status = status;
  return order;
}

export function buildInvoice(order: Order) {
  return buildInvoiceText(order, products);
}
