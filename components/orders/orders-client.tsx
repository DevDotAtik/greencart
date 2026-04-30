"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import type { Order } from "@/lib/types";
import { products } from "@/lib/mock-data";
import { useOrderStore } from "@/hooks/use-order-store";
import { formatCurrency, formatDate } from "@/utils/format";

type OrdersClientProps = {
  seededOrders: Order[];
};

export function OrdersClient({ seededOrders }: OrdersClientProps) {
  const searchParams = useSearchParams();
  const { recentOrders } = useOrderStore();

  const allOrders = useMemo(() => {
    const seen = new Set<string>();
    return [...recentOrders, ...seededOrders].filter((order) => {
      if (seen.has(order.id)) {
        return false;
      }

      seen.add(order.id);
      return true;
    });
  }, [recentOrders, seededOrders]);

  return (
    <div className="space-y-5">
      {searchParams.get("placed") === "1" ? (
        <div className="rounded-3xl border border-brand-200 bg-brand-50 px-5 py-4 text-sm font-semibold text-brand-700">
          Order placed successfully. Your latest order has been added to the top of this list.
        </div>
      ) : null}

      {allOrders.map((order) => (
        <div key={order.id} className="surface-card p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-lg font-extrabold">{order.id}</p>
              <p className="mt-1 text-sm text-ink-500">
                Placed on {formatDate(order.placedAt)} | Estimated delivery {formatDate(order.estimatedDelivery)}
              </p>
            </div>
            <div className="text-left sm:text-right">
              <p className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-ink-700">
                {order.status}
              </p>
              <p className="mt-2 text-xl font-extrabold">{formatCurrency(order.total)}</p>
            </div>
          </div>
          <div className="mt-5 grid gap-3 text-sm text-ink-600">
            {order.items.map((item) => {
              const product = products.find((candidate) => candidate.id === item.productId);
              return (
                <div key={item.productId} className="flex justify-between gap-4 rounded-2xl bg-slate-50 px-4 py-3">
                  <span>
                    {product?.name ?? item.productId} x {item.quantity}
                  </span>
                  <span>{formatCurrency(item.price * item.quantity)}</span>
                </div>
              );
            })}
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            <button type="button" className="secondary-button rounded-2xl">
              Track order
            </button>
            <button type="button" className="secondary-button rounded-2xl">
              Cancel order
            </button>
            <Link
              href={`/api/orders/${order.id}/invoice`}
              className="primary-button rounded-2xl"
            >
              Download invoice
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
