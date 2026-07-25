"use client";

import { useRouter } from "next/navigation";
import { clearToken, getStoredToken } from "@/lib/auth-client";
import { trackAdobeAuthEvent } from "@/lib/adobe";

export default function SignOutButton() {
  const router = useRouter();

  const handleSignOut = () => {
    const token = getStoredToken();
    clearToken();
    trackAdobeAuthEvent("logout", token || undefined);
    router.push("/sign-in");
  };

  return (
    <button
      type="button"
      onClick={handleSignOut}
      className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
    >
      Sign out
    </button>
  );
}
