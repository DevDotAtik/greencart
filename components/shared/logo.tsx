import Link from "next/link";
import { Leaf } from "lucide-react";

export function Logo() {
  return (
    <Link href="/" className="inline-flex items-center gap-3">
      <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-500 text-white shadow-soft">
        <Leaf className="h-5 w-5" />
      </span>
      <span>
        <span className="block text-lg font-extrabold tracking-tight">Krishi Bazaar</span>
        <span className="block text-xs text-ink-500">Direct farmer marketplace</span>
      </span>
    </Link>
  );
}
