import { AuthPayload, AUTH_TOKEN_KEY } from "./auth";

function base64UrlDecode(value: string) {
  const padded = value.padEnd(value.length + ((4 - (value.length % 4)) % 4), "=");
  return atob(padded.replace(/-/g, "+").replace(/_/g, "/"));
}

export function getStoredToken() {
  if (typeof window === "undefined") {
    return null;
  }

  return localStorage.getItem(AUTH_TOKEN_KEY);
}

export function saveToken(token: string) {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(AUTH_TOKEN_KEY, token);
}

export function clearToken() {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.removeItem(AUTH_TOKEN_KEY);
}

export function decodeBearerToken(token: string): AuthPayload | null {
  const parts = token.split(".");
  if (parts.length !== 2) {
    return null;
  }

  try {
    const payloadString = base64UrlDecode(parts[0]);
    const payload = JSON.parse(payloadString) as AuthPayload;
    return payload;
  } catch {
    return null;
  }
}

export function getStoredUser() {
  const token = getStoredToken();
  if (!token) {
    return null;
  }

  const user = decodeBearerToken(token);
  if (!user || user.exp < Math.floor(Date.now() / 1000)) {
    clearToken();
    return null;
  }

  return user;
}
