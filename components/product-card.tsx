import Link from "next/link";
import type { Product } from "@/lib/data";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.slug}`} className="card group overflow-hidden">
      <div className="aspect-square bg-slate-100 p-8 text-center text-sm text-slate-400 transition group-hover:bg-slate-200">
        Product image
      </div>
      <div className="p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          {product.category}
        </p>
        <h3 className="mt-2 text-lg font-semibold">{product.name}</h3>
        <p className="mt-2 line-clamp-2 text-sm text-slate-600">{product.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-lg font-bold">${product.price}</span>
          <span className="text-sm text-slate-500">View details</span>
        </div>
      </div>
    </Link>
  );
}