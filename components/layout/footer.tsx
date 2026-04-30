import Link from "next/link";

const footerGroups = [
  {
    title: "Marketplace",
    links: [
      { href: "/products", label: "All products" },
      { href: "/farmer/dashboard", label: "Seller dashboard" },
      { href: "/admin", label: "Admin panel" },
    ],
  },
  {
    title: "Support",
    links: [
      { href: "/account", label: "Account" },
      { href: "/orders", label: "Orders" },
      { href: "/checkout", label: "Checkout" },
    ],
  },
  {
    title: "Built for",
    links: [
      { href: "#", label: "Customers" },
      { href: "#", label: "Wholesalers" },
      { href: "#", label: "Retailers" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-slate-200 bg-white">
      <div className="shell grid gap-12 py-14 lg:grid-cols-[1.2fr_repeat(3,1fr)]">
        <div className="space-y-4">
          <p className="font-serif text-3xl font-bold">Buy better. Sell closer to the source.</p>
          <p className="max-w-md text-sm leading-6 text-ink-600">
            GreenCart helps farmers unlock better margins while customers, retailers,
            and wholesalers access fresher produce with full supply visibility.
          </p>
        </div>

        {footerGroups.map((group) => (
          <div key={group.title} className="space-y-4">
            <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-ink-400">
              {group.title}
            </p>
            <div className="space-y-3">
              {group.links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="block text-sm text-ink-600 hover:text-brand-600"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </footer>
  );
}
