import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { products } from "@/lib/data";

export default function HomePage() {
  return (
    <div>
      <section className="bg-slate-950 text-white">
        <div className="container-page grid gap-12 py-20 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="mb-4 inline-flex rounded-full bg-white/10 px-4 py-2 text-sm">
              Adobe AEP + Target demo store
            </span>
            <h1 className="max-w-xl text-4xl font-bold tracking-tight sm:text-6xl">
              Build journeys, track behavior, and personalize experiences.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-slate-300">
              A polished ecommerce frontend with product views, cart actions,
              and checkout steps ready for behavioral tracking.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/products" className="btn-primary bg-white text-slate-950 hover:bg-slate-200">
                Shop products
              </Link>
              <Link href="/checkout" className="btn-secondary border-white/20 bg-transparent text-white hover:bg-white/10">
                Go to checkout
              </Link>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="card p-6">
              <p className="text-sm text-slate-500">Tracked events</p>
              <p className="mt-2 text-3xl font-bold">Page views</p>
            </div>
            <div className="card p-6">
              <p className="text-sm text-slate-500">Tracked events</p>
              <p className="mt-2 text-3xl font-bold">Product views</p>
            </div>
            <div className="card p-6">
              <p className="text-sm text-slate-500">Tracked events</p>
              <p className="mt-2 text-3xl font-bold">Add to cart</p>
            </div>
            <div className="card p-6">
              <p className="text-sm text-slate-500">Tracked events</p>
              <p className="mt-2 text-3xl font-bold">Purchases</p>
            </div>
          </div>
        </div>
      </section>

      <section className="container-page py-16">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold">Featured products</h2>
            <p className="mt-2 text-slate-600">
              Use these cards to simulate browsing behavior and recommendation logic.
            </p>
          </div>
          <Link href="/products" className="hidden text-sm font-semibold text-slate-900 sm:block">
            View all
          </Link>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {products.slice(0, 4).map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}