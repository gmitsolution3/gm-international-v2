// proxy.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// Secret for JWT (from .env)
const secret = process.env.NEXTAUTH_SECRET;

// This function will be called for every request that matches the matcher
export async function proxy(req: NextRequest) {
  const token = await getToken({ req, secret });
  const { pathname } = req.nextUrl;

  // Redirect signed-in users away from sign-in/sign-up pages
  if ((pathname === "/auth/signin" || pathname === "/auth/signup") && token) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // Define protected routes
  const protectedPaths = [
    "/dashboard",
    "/profile",
    "/settings",
    "/user_application_form",
    "/medical-home-page/user-submit-form",
    "/tourist-home-page/package/booking-form",
    "/business-home-page/business-submit-form",
    "/visa/visa_apply",
    "/student-home-page/student-package-offer/user_application_form",
  ];

  const isProtectedPath = protectedPaths.some((path) =>
    pathname.startsWith(path)
  );

  // Block unauthenticated users from protected routes
  if (isProtectedPath && !token) {
    // Attach callbackUrl = current path
    const loginUrl = new URL("/auth/signin", req.url);
    loginUrl.searchParams.set(
      "callbackUrl",
      req.nextUrl.pathname + req.nextUrl.search,
    );
    return NextResponse.redirect(loginUrl);
  }

  // Otherwise continue
  return NextResponse.next();
}

// Matcher for routes to apply the proxy to
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profile/:path*",
    "/settings/:path*",
    "/user_application_form/:path*",
    "/medical-home-page/user-submit-form/:path*",
    "/tourist-home-page/package/booking-form/:path*",
    "/business-home-page/business-submit-form/:path*",
    "/visa/visa_apply/:path*",
    "/student-home-page/student-package-offer/user_application_form/:path*",
  ],
};

