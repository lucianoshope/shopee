import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const SESSION_COOKIE = "admin_session";

function token() {
  return process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || "dev-secret";
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // protege /admin (exceto a tela de login)
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const authed = req.cookies.get(SESSION_COOKIE)?.value === token();
    if (!authed) {
      const url = req.nextUrl.clone();
      url.pathname = "/admin/login";
      url.searchParams.set("next", pathname);
      return NextResponse.redirect(url);
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
