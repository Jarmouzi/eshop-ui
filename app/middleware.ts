// import type { NextRequest } from 'next/server'
// import { NextResponse } from 'next/server'

// export function middleware(request: NextRequest, dest: string) {
//   const url = request.nextUrl.clone()
//   url.pathname = dest
//   return NextResponse.rewrite(url)
// }

import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get("currentUser")?.value;
  //const session = await getSession({ request });
  const isProtectedRoute = ["/payment", "/profile"].includes(
    request.nextUrl.pathname
  );

  // if (currentUser && !request.nextUrl.pathname.startsWith('/dashboard')) {
  //   return Response.redirect(new URL('/dashboard', request.url))
  // }

  if (!currentUser && isProtectedRoute) {
    console.log("Response is redirected by middleware");
    return Response.redirect(new URL("/login", request.url));
  }
}

// export const config = {
//   matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
// };
