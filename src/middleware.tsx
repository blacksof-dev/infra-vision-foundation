import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const token = req.nextauth.token;
 
    if (pathname.startsWith("/admin") && !token) {
      // Allow login page itself
      if (pathname === "/admin/login") {
        return NextResponse.next();
      }

      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
 
    if (pathname === "/admin/login" && token) {
      return NextResponse.redirect(new URL("/admin/admin-list", req.url));
    }
    if (pathname === "/login" && !token) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
    if (pathname === "/login" || (pathname === "/admin" && token)) {
      return NextResponse.redirect(new URL("/admin/admin-list", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: () => true,
    },
  },
);
