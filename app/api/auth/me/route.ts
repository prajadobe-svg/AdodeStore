import { NextRequest, NextResponse } from "next/server";
import { verifyBearerToken } from "@/lib/auth-server";

export async function GET(request: NextRequest) {
  const authorization = request.headers.get("authorization") || "";
  const parts = authorization.split(" ");

  if (parts.length !== 2 || parts[0]?.toLowerCase() !== "bearer") {
    return NextResponse.json({ error: "Missing or invalid bearer token." }, { status: 401 });
  }

  const payload = verifyBearerToken(parts[1]);
  if (!payload) {
    return NextResponse.json({ error: "Invalid or expired token." }, { status: 401 });
  }

  return NextResponse.json({ ok: true, user: payload });
}
