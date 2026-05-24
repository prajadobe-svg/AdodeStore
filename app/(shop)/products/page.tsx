import { ProductCard } from "@/components/product-card";
import { products } from "@/lib/data";

export default function ProductsPage() {
  return (
    <div className="container-page py-12">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-4xl font-bold">All products</h1>
          <p className="mt-2 text-slate-600">
            Browse product categories and simulate user intent across listing pages.
          </p>
        </div>
        <div className="card px-4 py-3 text-sm text-slate-600">Filter UI placeholder</div>
      </div>
      <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </div>
  );
}