import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isAuthPage = req.nextUrl.pathname.startsWith("/auth");
  const isErrorPage = req.nextUrl.pathname === "/auth/error";
  const isPublicPage = req.nextUrl.pathname === "/" || req.nextUrl.pathname === "/simple-test";

  // Allow unauthenticated access to public pages
  if (isPublicPage) {
    return NextResponse.next();
  }

  // Redirect unauthenticated users to signin (except on auth pages)
  if (!isLoggedIn && !isAuthPage) {
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }

  // Redirect authenticated users away from signin/signup pages (but allow error page)
  if (isLoggedIn && isAuthPage && !isErrorPage) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
