"use client";

import Link from "next/link";
import { ShoppingCart, UserCircle2 } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { Logo } from "@/components/shared/logo";
import { SearchBar } from "@/components/shared/search-bar";
import { useCartStore } from "@/hooks/use-cart-store";
import { useI18n } from "@/hooks/use-i18n";

const navItems = [
  { href: "/", key: "navHome" as const },
  { href: "/products", key: "navProducts" as const },
  { href: "/orders", key: "navOrders" as const },
  { href: "/account", key: "navAccount" as const },
];

export function Navbar() {
  const { data: session } = useSession();
  const { items } = useCartStore();
  const { dictionary, language, toggleLanguage } = useI18n();

  return (
    <header className="sticky top-0 z-40 border-b border-white/70 bg-white/90 backdrop-blur-xl">
      <div className="shell flex flex-col gap-4 py-4 lg:flex-row lg:items-center">
        <div className="flex items-center justify-between gap-4 lg:min-w-[220px]">
          <Logo />
          <button
            type="button"
            onClick={toggleLanguage}
            className="rounded-full border border-slate-200 px-3 py-2 text-xs font-bold uppercase tracking-[0.18em] text-ink-600"
          >
            {language === "en" ? "हिंदी" : "EN"}
          </button>
        </div>

        <SearchBar className="lg:flex-1" />

        <nav className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm font-semibold text-ink-600 hover:bg-slate-100 hover:text-ink-900"
            >
              {dictionary[item.key]}
            </Link>
          ))}

          <Link
            href="/cart"
            className="relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-ink-700"
          >
            <ShoppingCart className="h-4 w-4" />
            {items.length ? (
              <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-500 px-1 text-[10px] font-bold text-white">
                {items.length}
              </span>
            ) : null}
          </Link>

          {session?.user ? (
            <button
              type="button"
              onClick={() => signOut({ callbackUrl: "/" })}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-ink-700"
            >
              <UserCircle2 className="h-4 w-4" />
              {session.user.name?.split(" ")[0]}
            </button>
          ) : (
            <Link href="/login" className="primary-button whitespace-nowrap">
              {dictionary.login}
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
