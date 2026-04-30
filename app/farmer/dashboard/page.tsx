import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { MetricCard } from "@/components/dashboard/metric-card";
import { ProductVisual } from "@/components/shared/product-visual";
import { getFarmerProducts } from "@/lib/services/catalog";
import { getFarmerDashboardData } from "@/lib/services/dashboard";
import { formatCurrency } from "@/utils/format";

export default async function FarmerDashboardPage() {
  const [dashboardData, farmerProducts] = await Promise.all([
    getFarmerDashboardData(),
    getFarmerProducts("farmer-1"),
  ]);

  return (
    <>
      <Navbar />
      <main className="shell py-10">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="tag-pill">Farmer dashboard</span>
            <h1 className="mt-4 text-4xl font-extrabold">Manage products, stock, orders, and pricing</h1>
            <p className="mt-3 max-w-3xl text-base text-ink-600">
              Seller workspace for catalog operations, order flow, analytics, and price recommendations backed by market data.
            </p>
          </div>
          <button type="button" className="primary-button">
            Add new product
          </button>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {dashboardData.metrics.map((metric) => (
            <MetricCard key={metric.label} {...metric} />
          ))}
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <section className="surface-card p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-2xl font-extrabold">Your products</p>
                <p className="mt-2 text-sm text-ink-500">
                  Update stock, pricing, and merchandising for faster conversion.
                </p>
              </div>
            </div>
            <div className="mt-6 space-y-4">
              {farmerProducts.map((product) => (
                <div key={product.id} className="grid gap-4 rounded-3xl border border-slate-100 p-4 sm:grid-cols-[200px_1fr_auto]">
                  <ProductVisual
                    title={product.name}
                    subtitle={product.unit}
                    palette={product.images[0]}
                    className="h-32"
                  />
                  <div>
                    <p className="text-lg font-bold">{product.name}</p>
                    <p className="mt-2 text-sm text-ink-500">
                      Stock: {product.stock} • Delivery: {product.deliveryTime}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {product.tags.map((tag) => (
                        <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-ink-500">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-left sm:text-right">
                    <p className="text-xl font-extrabold">{formatCurrency(product.price)}</p>
                    <button type="button" className="secondary-button mt-4 rounded-2xl">
                      Update stock
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className="space-y-8">
            <section className="surface-card p-6">
              <p className="text-2xl font-extrabold">Pricing suggestions</p>
              <div className="mt-6 space-y-4">
                {dashboardData.pricingSuggestions.map((suggestion) => (
                  <div key={suggestion.productName} className="rounded-3xl bg-slate-50 p-5">
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-bold">{suggestion.productName}</p>
                      <span className="text-sm font-bold text-brand-700">
                        {suggestion.currentPrice}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-ink-600">{suggestion.mandiSignal}</p>
                    <p className="mt-2 text-sm text-ink-500">{suggestion.recommendation}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="surface-card p-6">
              <p className="text-2xl font-extrabold">Order pipeline</p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {dashboardData.orderPipeline.map((stage) => (
                  <div key={stage.stage} className="rounded-3xl bg-slate-50 p-5">
                    <p className="text-sm text-ink-500">{stage.stage}</p>
                    <p className="mt-2 text-3xl font-extrabold">{stage.count}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
