import type { DemoUser } from "./auth";

type AamSignalValue = string | number | boolean;

type Alloy = (
  command: "sendEvent",
  options: Record<string, unknown>
) => Promise<unknown>;

declare global {
  interface Window {
    alloy?: Alloy;
  }
}

const ALLOY_WAIT_MS = 5_000;

async function getAlloy(): Promise<Alloy> {
  if (typeof window === "undefined") {
    throw new Error("Adobe Web SDK can only be called in the browser.");
  }

  const startedAt = Date.now();

  while (!window.alloy && Date.now() - startedAt < ALLOY_WAIT_MS) {
    await new Promise((resolve) => {
      window.setTimeout(resolve, 50);
    });
  }

  if (!window.alloy) {
    throw new Error(
      "Adobe Web SDK did not load. Check the Adobe Tags embed code, Web SDK extension, and published library."
    );
  }

  return window.alloy;
}

function createIdentityMap(
  user: DemoUser | undefined,
  authenticatedState: "authenticated" | "loggedOut"
) {
  if (!user) {
    return undefined;
  }

  if (!user.id || !user.id.trim()) {
    throw new Error(
      "Cannot send an Adobe event for an authenticated user without a stable internal user ID."
    );
  }

  return {
    prajStoreCrmId: [
      {
        // Never send the email address or bearer token as the CRMID.
        id: user.id,
        authenticatedState,
        primary: authenticatedState === "authenticated",
      },
    ],
  };
}

export async function sendAdobeEvent({
  eventType,
  user,
  aamSignals,
  xdm = {},
  authenticatedState = "authenticated",
}: {
  eventType: string;
  user?: DemoUser;
  aamSignals: Record<string, AamSignalValue>;
  xdm?: Record<string, unknown>;
  authenticatedState?: "authenticated" | "loggedOut";
}) {
  const alloy = await getAlloy();
  const identities = createIdentityMap(user, authenticatedState);

  const eventXdm: Record<string, unknown> = {
    ...xdm,
    eventType,
  };

  if (identities) {
    eventXdm.identityMap = identities;
  }

  return alloy("sendEvent", {
    xdm: eventXdm,
    data: {
      __adobe: {
        audiencemanager: aamSignals,
      },
    },
  });
}

export function trackAdobeAuthEvent(
  eventName: "login" | "logout",
  user?: DemoUser
) {
  return sendAdobeEvent({
    eventType: `commerce.${eventName}`,
    user,
    authenticatedState:
      eventName === "login" ? "authenticated" : "loggedOut",
    aamSignals: {
      c_store_event: eventName,
      c_authenticated: eventName === "login" ? "true" : "false",
    },
  });
}