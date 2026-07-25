"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getStoredUser } from "@/lib/auth-client";

export default function AccountPage() {
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
      <h1 className="text-4xl font-bold">Account</h1>
      <p className="mt-4 text-slate-600">Welcome back, {user.name}.</p>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="card p-6">
          <p className="text-sm text-slate-500">Signed-in user</p>
          <p className="mt-2 text-xl font-semibold">{user.email}</p>
        </div>
        <div className="card p-6">
          <p className="text-sm text-slate-500">Tracking state</p>
          <p className="mt-2 text-xl font-semibold">Known identity</p>
        </div>
      </div>
    </div>
  );
}