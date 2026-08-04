"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { clearToken, getStoredUser } from "@/lib/auth-client";
import { trackAdobeAuthEvent } from "@/lib/adobe";

export default function SignOutButton() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignOut = async () => {
    if (isLoading) {
      return;
    }

    setIsLoading(true);

    const user = getStoredUser() || undefined;

    try {
      await trackAdobeAuthEvent("logout", user);
    } catch (error) {
      // Sign-out must still complete if Adobe tracking is blocked or unavailable.
      console.error("Adobe logout event failed", error);
    } finally {
      clearToken();
      setIsLoading(false);
      router.push("/");
    }
  };

  return (
    <button
      type="button"
      onClick={handleSignOut}
      disabled={isLoading}
      className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {isLoading ? "Signing out..." : "Sign out"}
    </button>
  );
}