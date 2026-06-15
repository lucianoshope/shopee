import { cookies } from "next/headers";

export const SESSION_COOKIE = "admin_session";

// token guardado no cookie quando o login é correto.
// Defina ADMIN_SESSION_SECRET no Railway (string aleatória). Se faltar, cai no
// ADMIN_PASSWORD como fallback (menos ideal, mas funciona pro MVP).
export function sessionToken(): string {
  return process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || "dev-secret";
}

export function checkPassword(password: string): boolean {
  const expected = process.env.ADMIN_PASSWORD || "admin";
  return password === expected;
}

export function isAuthenticated(): boolean {
  return cookies().get(SESSION_COOKIE)?.value === sessionToken();
}
