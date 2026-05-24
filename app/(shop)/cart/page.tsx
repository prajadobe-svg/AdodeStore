import Link from "next/link";

const items = [
  { name: "Aurora Headphones", price: 199 },
  { name: "Pulse Watch", price: 249 },
];

export default function CartPage() {
  return (
    <div className="container-page py-12">
      <h1 className="text-4xl font-bold">Your cart</h1>
      <div className="mt-8 grid gap-8 lg:grid-cols-[1.5fr_1fr]">
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.name} className="card flex items-center justify-between p-5">
              <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-slate-500">Qty 1</p>
              </div>
              <p className="font-semibold">${item.price}</p>
            </div>
          ))}
        </div>
        <aside className="card p-6">
          <h2 className="text-xl font-bold">Order summary</h2>
          <div className="mt-4 space-y-3 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>$448</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>$12</span>
            </div>
            <div className="flex justify-between border-t pt-3 text-base font-bold">
              <span>Total</span>
              <span>$460</span>
            </div>
          </div>
          <Link href="/checkout" className="btn-primary mt-6 w-full">
            Proceed to checkout
          </Link>
        </aside>
      </div>
    </div>
  );
}