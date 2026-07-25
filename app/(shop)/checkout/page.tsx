"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getStoredUser } from "@/lib/auth-client";

export default function CheckoutPage() {
  const [user, setUser] = useState<{ email: string; name: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = getStoredUser();
    if (!storedUser) {
      router.push("/sign-in");
      return;
    }

    setUser(storedUser);
  }, [router]);

  if (!user) {
    return null;
  }

  return (
    <div className="container-page py-12">
      <h1 className="text-4xl font-bold">Checkout</h1>
      <p className="mt-4 text-slate-600">You're signed in as {user.name}. Complete your purchase below.</p>
      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <form className="card space-y-4 p-6">
          <div>
            <label className="text-sm font-semibold">Email</label>
            <input
              className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-3"
              placeholder="you@example.com"
              value={user.email}
              readOnly
            />
          </div>
          <div>
            <label className="text-sm font-semibold">Shipping address</label>
            <input
              className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-3"
              placeholder="Street, city, pincode"
            />
          </div>
          <div>
            <label className="text-sm font-semibold">Payment method</label>
            <select className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-3">
              <option>Credit card</option>
              <option>UPI</option>
              <option>Wallet</option>
            </select>
          </div>
          <Link href="/confirmation" className="btn-primary w-full">
            Place order
          </Link>
        </form>
        <aside className="card p-6">
          <h2 className="text-xl font-bold">Purchase flow</h2>
          <ul className="mt-4 space-y-3 text-sm text-slate-600">
            <li>Begin checkout</li>
            <li>Enter shipping details</li>
            <li>Complete payment</li>
            <li>Fire purchase event</li>
          </ul>
        </aside>
      </div>
    </div>
  );
}