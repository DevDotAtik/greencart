"use client";

import { useRouter } from "next/navigation";
import { ShoppingBag } from "lucide-react";
import { useCartStore } from "@/hooks/use-cart-store";
import { cn } from "@/utils/cn";

type AddToCartButtonProps = {
  productId: string;
  quantity?: number;
  buyNow?: boolean;
  className?: string;
};

export function AddToCartButton({
  productId,
  quantity = 1,
  buyNow = false,
  className,
}: AddToCartButtonProps) {
  const router = useRouter();
  const { addItem } = useCartStore();

  return (
    <button
      type="button"
      onClick={() => {
        addItem(productId, quantity);
        if (buyNow) {
          router.push("/checkout");
        }
      }}
      className={cn(
        buyNow ? "primary-button" : "secondary-button",
        "gap-2 rounded-2xl",
        className,
      )}
    >
      <ShoppingBag className="h-4 w-4" />
      {buyNow ? "Buy now" : "Add to cart"}
    </button>
  );
}
