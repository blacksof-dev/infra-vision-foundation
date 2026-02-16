import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const token = req.nextauth.token;

    // 🛑 If user is logged in and tries to access /login
    if (pathname === "/login" && token) {
      return NextResponse.redirect(new URL("/admin/admin-list", req.url)); // or home
    }
    if (pathname === "/admin" && token) {
      return NextResponse.redirect(new URL("/admin/admin-list", req.url));
    }
    if (pathname === "/admin" && !token) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
    if (pathname === "/admin/loing" && token) {
      return NextResponse.redirect(new URL("/admin/admin-list", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: () => true, // allow all routes by default
    },
  }
);
