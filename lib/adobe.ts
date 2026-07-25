import { AuthPayload } from "./auth";

export function initAdobeSession(token: string) {
  // Integrate Adobe AEP / Target libraries here.
  // Example: configure the Adobe SDK with the bearer token and any user identity.
  // window.adobeDataLayer = window.adobeDataLayer || [];
  // window.adobeDataLayer.push({ event: "auth-ready", token });
  return { token };
}

export function trackAdobeAuthEvent(eventName: "login" | "logout", token?: string, user?: AuthPayload) {
  // Placeholder for Adobe tag calls or AEP event payloads.
  // Example: send auth event to Adobe Experience Platform.
  console.log("Adobe auth event", eventName, { token, user });
}

export function buildAdobeAuthHeaders(token: string) {
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
}
