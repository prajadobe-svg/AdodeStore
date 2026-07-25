"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getStoredUser } from "@/lib/auth-client";

export default function ConfirmationPage() {
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
    <div className="container-page py-20">
      <div className="card mx-auto max-w-2xl p-10 text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-emerald-600">
          Order confirmed
        </p>
        <h1 className="mt-3 text-4xl font-bold">Thank you for your purchase</h1>
        <p className="mt-4 text-slate-600">
          This page is where a purchase event can be sent to Adobe AEP and used for
          conversion reporting and audience activation.
        </p>
        <p className="mt-6 text-sm text-slate-600">
          Signed in as <span className="font-semibold text-slate-900">{user.email}</span>
        </p>
        <Link href="/products" className="btn-primary mt-8">
          Continue shopping
        </Link>
      </div>
    </div>
  );
}