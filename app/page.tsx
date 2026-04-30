import Link from "next/link";
import { ArrowRight, BadgeIndianRupee, CloudSun, ShieldCheck, Tractor } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ProductCard } from "@/components/products/product-card";
import { ProductVisual } from "@/components/shared/product-visual";
import { SectionHeading } from "@/components/shared/section-heading";
import { farmers } from "@/lib/mock-data";
import { getCropInsights, getHomePageData } from "@/lib/services/dashboard";
import {
  getCategories,
  getFeaturedProducts,
  getTrendingProducts,
} from "@/lib/services/catalog";
import { formatCurrency } from "@/utils/format";

export default async function HomePage() {
  const [featuredProducts, trendingProducts, categoryList, homeData] = await Promise.all([
    getFeaturedProducts(),
    getTrendingProducts(),
    getCategories(),
    getHomePageData(),
  ]);

  const cropInsights = getCropInsights();

  return (
    <>
      <Navbar />
      <main>
        <section className="shell pt-8 sm:pt-10">
          <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="surface-card overflow-hidden p-8 sm:p-10">
              <div className="flex flex-wrap gap-3">
                <span className="tag-pill">Fresh farm produce</span>
                <span className="tag-pill bg-ocean text-sky-700">Live mandi insights</span>
                <span className="tag-pill bg-orange-50 text-orange-700">Retail + wholesale</span>
              </div>
              <div className="mt-8 max-w-2xl space-y-5">
                <h1 className="font-serif text-5xl font-bold leading-tight sm:text-6xl">
                  Buy direct from farmers with marketplace-grade convenience.
                </h1>
                <p className="max-w-xl text-base leading-7 text-ink-600 sm:text-lg">
                  GreenCart connects households, retailers, and wholesalers to
                  verified growers with fair pricing, live government market
                  data, and fast fulfilment-ready commerce flows.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/products" className="primary-button">
                  Shop marketplace
                </Link>
                <Link href="/farmer/dashboard" className="secondary-button">
                  Start selling
                </Link>
              </div>
              <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {homeData.stats.map((stat) => (
                  <div key={stat.label} className="rounded-3xl bg-slate-50 p-4">
                    <p className="text-2xl font-extrabold">{stat.value}</p>
                    <p className="mt-2 text-sm text-ink-500">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-6">
              <ProductVisual
                title="Government mandi rates, decoded for buyers and sellers."
                subtitle="Powered by cached data.gov.in integrations with fast fallback data so the dashboard stays useful in every environment."
                palette="from-brand-100 via-white to-ocean"
                className="h-[290px]"
              />
              <div className="surface-card grid gap-4 p-6 sm:grid-cols-2">
                <div className="rounded-3xl bg-slate-50 p-5">
                  <ShieldCheck className="h-5 w-5 text-brand-600" />
                  <p className="mt-4 text-lg font-bold">Verified sellers</p>
                  <p className="mt-2 text-sm text-ink-500">
                    Farmer KYC, product quality checks, and admin moderation.
                  </p>
                </div>
                <div className="rounded-3xl bg-slate-50 p-5">
                  <Tractor className="h-5 w-5 text-brand-600" />
                  <p className="mt-4 text-lg font-bold">Farmer dashboard</p>
                  <p className="mt-2 text-sm text-ink-500">
                    Manage stock, orders, sales, and pricing suggestions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="shell mt-20">
          <SectionHeading
            eyebrow="Categories"
            title="Shop by farm category"
            description="A familiar ecommerce browsing experience tuned for fresh produce, staples, and agri supplies."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {categoryList.map((category) => (
              <Link
                key={category.id}
                href={`/products?category=${category.slug}`}
                className="surface-card block p-6 hover:-translate-y-1"
              >
                <ProductVisual
                  title={category.name}
                  subtitle={category.description}
                  palette={category.accent}
                  className="h-48"
                />
              </Link>
            ))}
          </div>
        </section>

        <section className="shell mt-20">
          <SectionHeading
            eyebrow="Trending"
            title="Products shoppers are picking fast"
            description="Designed like a modern marketplace grid with quick add-to-cart actions, discounts, ratings, and delivery cues."
          />
          <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {trendingProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        <section className="shell mt-20">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
            <div>
              <SectionHeading
                eyebrow="Best farmer deals"
                title="Featured by trusted growers"
                description="Handpicked offers from verified farms with transparent seller details and better direct margins."
              />
              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                {featuredProducts.slice(0, 4).map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <SectionHeading
                eyebrow="Top sellers"
                title="Verified farmer storefronts"
                description="Farmers get modern storefronts, demand visibility, and admin verification support."
              />
              {farmers.map((farmer) => (
                <div key={farmer.id} className="surface-card p-5">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-lg font-bold">{farmer.farmName}</p>
                      <p className="mt-1 text-sm text-ink-500">
                        {farmer.name} • {farmer.district}, {farmer.state}
                      </p>
                    </div>
                    <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-bold text-brand-700">
                      {farmer.rating.toFixed(1)} rating
                    </span>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {farmer.speciality.map((item) => (
                      <span
                        key={item}
                        className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-ink-500"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                  <p className="mt-4 text-sm text-ink-500">
                    Usually responds {farmer.responseTime}. Selling for {farmer.yearsActive}+ years.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="shell mt-20">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="surface-card p-6">
              <div className="flex items-center justify-between gap-4">
                <SectionHeading
                  eyebrow="Live market pulse"
                  title="Government mandi rates"
                  description="Cached data.gov.in mandi snapshots translated into practical widgets for procurement teams and farmers."
                />
                <BadgeIndianRupee className="hidden h-10 w-10 text-brand-500 sm:block" />
              </div>
              <div className="mt-6 space-y-3">
                {homeData.mandiRates.map((rate) => (
                  <div
                    key={`${rate.commodity}-${rate.market}`}
                    className="grid gap-3 rounded-3xl border border-slate-100 bg-slate-50 p-4 sm:grid-cols-[1fr_auto]"
                  >
                    <div>
                      <p className="font-bold">{rate.commodity}</p>
                      <p className="mt-1 text-sm text-ink-500">
                        {rate.market}, {rate.state}
                      </p>
                    </div>
                    <div className="text-left sm:text-right">
                      <p className="text-lg font-extrabold">
                        {formatCurrency(rate.modalPrice / 100)}
                      </p>
                      <p className="text-xs text-ink-500">
                        Min {formatCurrency(rate.minPrice / 100)} • Max {formatCurrency(rate.maxPrice / 100)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="surface-card p-6">
                <div className="flex items-center gap-3">
                  <CloudSun className="h-6 w-6 text-sky-500" />
                  <p className="text-xl font-extrabold">Weather and crop insights</p>
                </div>
                <div className="mt-6 grid gap-4">
                  {homeData.weatherInsights.map((insight) => (
                    <div key={insight.title} className="rounded-3xl bg-slate-50 p-5">
                      <div className="flex items-end justify-between gap-3">
                        <p className="font-bold">{insight.title}</p>
                        <p className="text-2xl font-extrabold text-brand-700">{insight.value}</p>
                      </div>
                      <p className="mt-2 text-sm leading-6 text-ink-500">{insight.note}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="surface-card p-6">
                <p className="text-xl font-extrabold">Crop intelligence widgets</p>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {cropInsights.map((insight) => (
                    <div key={insight.title} className="rounded-3xl bg-slate-50 p-5">
                      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-ink-400">
                        {insight.title}
                      </p>
                      <p className="mt-3 text-2xl font-extrabold">{insight.value}</p>
                      <p className="mt-2 text-sm text-ink-500">{insight.note}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="shell mt-20">
          <div className="surface-card flex flex-col items-start justify-between gap-6 overflow-hidden bg-gradient-to-r from-brand-500 to-brand-600 p-8 text-white lg:flex-row lg:items-center">
            <div>
              <p className="font-serif text-3xl font-bold">Ready for buyers, retailers, and farmer collectives.</p>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-white/80">
                The project ships with App Router pages, API routes, Mongo models,
                auth, dashboard scaffolding, and Vercel-ready conventions.
              </p>
            </div>
            <Link href="/products" className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-brand-700">
              Explore catalog
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
