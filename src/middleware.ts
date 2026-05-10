import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifySession } from "./lib/session";

export async function middleware(request: NextRequest) {
  const isAuthPage = request.nextUrl.pathname === "/admin/login";

  if (request.nextUrl.pathname.startsWith("/admin")) {
    const sessionCookie = request.cookies.get("admin_session");

    let isAuthed = false;

    if (sessionCookie?.value) {
      const payload = await verifySession(sessionCookie.value);
      if (payload) {
        isAuthed = true;
      }
    }

    if (!isAuthed && !isAuthPage) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    if (isAuthed && isAuthPage) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
