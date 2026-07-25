import { NextRequest, NextResponse } from "next/server";
import { DEMO_USER_EMAIL, DEMO_USER_PASSWORD } from "@/lib/auth";
import { createBearerToken, getDemoUser } from "@/lib/auth-server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const email = String(body.email || "").trim().toLowerCase();
  const password = String(body.password || "").trim();

  if (email !== DEMO_USER_EMAIL || password !== DEMO_USER_PASSWORD) {
    return NextResponse.json(
      { error: "Invalid email or password." },
      { status: 401 }
    );
  }

  const token = createBearerToken(email);
  return NextResponse.json({ ok: true, token, user: getDemoUser() });
}
