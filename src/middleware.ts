import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: any) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname;

  // Check if the path is the login page and redirect to home
  if (path === "/login") {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  // Protect dashboard routes
  if (path.startsWith("/dashboard")) {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    // Redirect to home if not authenticated
    if (!token) {
      const url = request.nextUrl.clone();
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

// Define which paths this middleware should run on
export const config = {
  matcher: ["/login", "/dashboard/:path*"],
};
