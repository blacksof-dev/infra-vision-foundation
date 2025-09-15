import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const token = req.nextauth.token;

    // 🛑 If user is logged in and tries to access /login
    if (pathname === "/login" && token) {
      return NextResponse.redirect(new URL("/", req.url)); // or home
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: () => true, // allow all routes by default
    },
  }
);
