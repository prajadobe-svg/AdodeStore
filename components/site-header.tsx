"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import SignOutButton from "@/components/sign-out-button";
import type { DemoUser } from "@/lib/auth";
import {
  AUTH_STATE_CHANGED_EVENT,
  getStoredUser,
} from "@/lib/auth-client";

const nav = [
  { href: "/products", label: "Products" },
  { href: "/cart", label: "Cart" },
  { href: "/account", label: "Account" },
];

export default function SiteHeader() {
  const [user, setUser] = useState<DemoUser | null>(null);

  useEffect(() => {
    const syncUser = () => {
      setUser(getStoredUser());
    };

    syncUser();

    window.addEventListener(AUTH_STATE_CHANGED_EVENT, syncUser);
    window.addEventListener("storage", syncUser);

    return () => {
      window.removeEventListener(AUTH_STATE_CHANGED_EVENT, syncUser);
      window.removeEventListener("storage", syncUser);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between">
        <Link href="/" className="text-lg font-bold">
          AdobeStore
        </Link>

        <div className="flex items-center gap-6">
          <nav className="flex items-center gap-6">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-slate-600 hover:text-slate-900"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {user ? (
            <div className="flex items-center gap-4">
              <span className="hidden rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700 sm:inline-block">
                {user.email}
              </span>
              <SignOutButton />
            </div>
          ) : (
            <Link
              href="/sign-in"
              className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
            >
              Sign in
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}