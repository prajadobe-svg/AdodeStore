import { createHmac } from "crypto";
import { DEMO_USER_EMAIL, AuthPayload, DemoUser } from "./auth";

const SECRET = process.env.AUTH_SECRET || "dev-auth-secret";
const TOKEN_TTL_SECONDS = 60 * 60;

function base64UrlEncode(value: string | Buffer) {
  return Buffer.from(value)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function base64UrlDecode(value: string) {
  const padded = value.padEnd(value.length + ((4 - (value.length % 4)) % 4), "=");
  return Buffer.from(padded.replace(/-/g, "+").replace(/_/g, "/"), "base64").toString();
}

function sign(payload: string) {
  return base64UrlEncode(createHmac("sha256", SECRET).update(payload).digest());
}

export function createBearerToken(email: string) {
  const payload: AuthPayload = {
    email,
    name: "Demo User",
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + TOKEN_TTL_SECONDS,
  };
  const payloadString = JSON.stringify(payload);
  const encodedPayload = base64UrlEncode(payloadString);
  const signature = sign(encodedPayload);

  return `${encodedPayload}.${signature}`;
}

export function verifyBearerToken(token: string): AuthPayload | null {
  const [encodedPayload, signature] = token.split(".");
  if (!encodedPayload || !signature) {
    return null;
  }

  const expectedSignature = sign(encodedPayload);
  if (signature !== expectedSignature) {
    return null;
  }

  try {
    const payloadString = base64UrlDecode(encodedPayload);
    const payload = JSON.parse(payloadString) as AuthPayload;

    if (!payload.email || !payload.name || !payload.exp || !payload.iat) {
      return null;
    }

    if (payload.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

export function getDemoUser(): DemoUser {
  return {
    email: DEMO_USER_EMAIL,
    name: "Demo User",
  };
}
