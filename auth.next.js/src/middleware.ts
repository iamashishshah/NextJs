import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  console.log(request.nextUrl);
  // console.log("Look how path looks like", path);

  const isPublicPath = path === "/login" || path === "/signup";

  const token = request.cookies.get("token")?.value || "";

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/profile", request.nextUrl));
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/signup", request.nextUrl));
  }
}

export const config = {
  matcher: ["/", "/profile/:path*", "/login", "/signup", "/tempuser"],
};
