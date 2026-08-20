export const DEMO_USER_ID = "praj-store-demo-user-1002";
export const DEMO_USER_EMAIL = "demo1.user@company.com";
export const DEMO_USER_PASSWORD = "demo123";
export const AUTH_TOKEN_KEY = "authToken";

export type DemoUser = {
  id: string;
  email: string;
  name: string;
};

export type AuthPayload = DemoUser & {
  iat: number;
  exp: number;
};