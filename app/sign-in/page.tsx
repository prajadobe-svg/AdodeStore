"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { saveToken } from "@/lib/auth-client";
import { initAdobeSession, trackAdobeAuthEvent } from "@/lib/adobe";

const DEMO_USER_EMAIL = "demo.user@company.com";
const DEMO_USER_PASSWORD = "demo123";

export default function SignInPage() {
  const [email, setEmail] = useState(DEMO_USER_EMAIL);
  const [password, setPassword] = useState(DEMO_USER_PASSWORD);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsLoading(true);

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    setIsLoading(false);

    if (!response.ok) {
      setError(data?.error || "Unable to sign in.");
      return;
    }

    if (!data?.token) {
      setError("Missing authentication token.");
      return;
    }

    saveToken(data.token);
    initAdobeSession(data.token);
    trackAdobeAuthEvent("login", data.token, data.user);

    router.push("/account");
  };

  return (
    <div className="container-page py-20">
      <div className="mx-auto max-w-xl space-y-8">
        <div className="space-y-3 text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Secure sign in
          </p>
          <h1 className="text-4xl font-bold">Sign in to your account</h1>
          <p className="text-slate-600">
            Use the demo credentials to access the account and checkout experience.
          </p>
        </div>

        <div className="card p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-semibold">Email</label>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="mt-3 w-full rounded-xl border border-slate-300 px-4 py-3"
                placeholder="you@example.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold">Password</label>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="mt-3 w-full rounded-xl border border-slate-300 px-4 py-3"
                placeholder="Enter password"
                required
              />
            </div>

            {error ? <p className="text-sm text-rose-600">{error}</p> : null}

            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full"
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </button>
          </form>
        </div>

        <div className="space-y-2 rounded-3xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-700">
          <p className="font-semibold">Demo credentials</p>
          <p>Email: <span className="font-medium">{DEMO_USER_EMAIL}</span></p>
          <p>Password: <span className="font-medium">{DEMO_USER_PASSWORD}</span></p>
          <p>
            After signing in, you can access the <Link href="/account" className="font-semibold text-slate-900 underline">account</Link> and <Link href="/checkout" className="font-semibold text-slate-900 underline">checkout</Link> pages.
          </p>
        </div>
      </div>
    </div>
  );
}
