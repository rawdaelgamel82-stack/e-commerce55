import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
  const sessionToken =
    request.cookies.get("next-auth.session-token")?.value ||
    request.cookies.get("__Secure-next-auth.session-token")?.value;

  if (sessionToken) {
    if (
      request.nextUrl.pathname === "/Login" ||
      request.nextUrl.pathname == "/Register"
    ) {
      return NextResponse.redirect(new URL("/", request.url));
    } else {
      return NextResponse.next();
    }
  } else {
    if (request.nextUrl.pathname == "/cart") {
      return NextResponse.redirect(new URL("/Login", request.url));
    } else {
      return NextResponse.next();
    }
  }
}
export const config = {
  matcher: ["/cart/:path*", "/Login", "/Register"],
};
