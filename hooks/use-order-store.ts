"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Order } from "@/lib/types";

type OrderStore = {
  recentOrders: Order[];
  prependOrder: (order: Order) => void;
};

export const useOrderStore = create<OrderStore>()(
  persist(
    (set) => ({
      recentOrders: [],
      prependOrder: (order) =>
        set((state) => ({
          recentOrders: [order, ...state.recentOrders].slice(0, 10),
        })),
    }),
    {
      name: "greencart-orders",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
