import { notFound } from "next/navigation";
import { products } from "@/lib/data";
import { AddToCartButton } from "@/components/add-to-cart-button";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);

  if (!product) notFound();

  return (
    <div className="container-page py-12">
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="card flex min-h-[420px] items-center justify-center bg-slate-100 p-8 text-center text-slate-400">
          Product image placeholder
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            {product.category}
          </p>
          <h1 className="mt-2 text-4xl font-bold">{product.name}</h1>
          <p className="mt-4 text-lg text-slate-600">{product.description}</p>
          <div className="mt-6 flex items-center gap-3">
            <span className="text-3xl font-bold">${product.price}</span>
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-700">
              In stock
            </span>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <AddToCartButton productSlug={product.slug} />
            <a className="btn-secondary" href="/checkout">
              Buy now
            </a>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <div className="card p-4">
              <p className="text-sm text-slate-500">Behavior</p>
              <p className="mt-1 font-semibold">Product view</p>
            </div>
            <div className="card p-4">
              <p className="text-sm text-slate-500">Intent</p>
              <p className="mt-1 font-semibold">Add to cart</p>
            </div>
            <div className="card p-4">
              <p className="text-sm text-slate-500">Conversion</p>
              <p className="mt-1 font-semibold">Purchase</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}