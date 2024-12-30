import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";
import { isAuthenticated } from "./lib/services/AuthService";

const allowedOrigins = [
  process.env.API_Domain,
  process.env.AUTH_Domain,
  process.env.STATICS_Domain,
];

const corsOptions = {
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};
const legacyPrefixes = [
  "/payment",
  "/profile",
  "/address",
  "/message",
  "/orders",
  "/support",
];
const authPrefixes = ["/login", "/signup"];

export async function middleware(request: NextRequest) {
  let currentUser: string | undefined = (await cookies()).get(
    "currentUser"
  )?.value;
  if (currentUser && !(await isAuthenticated())) {
    (await cookies()).set("currentUser", "", { expires: new Date(0) });
    currentUser = undefined;
    console.log("currentUser expired!");
  }
  const { pathname } = request.nextUrl;

  // Check the origin from the request
  const origin = request.headers.get("origin") ?? "";
  const isAllowedOrigin = allowedOrigins.includes(origin);

  // Handle preflighted requests
  const isPreflight = request.method === "OPTIONS";

  if (isPreflight) {
    const preflightHeaders = {
      ...(isAllowedOrigin && { "Access-Control-Allow-Origin": origin }),
      ...corsOptions,
    };
    return NextResponse.json({}, { headers: preflightHeaders });
  }

  // Handle simple requests
  const response = NextResponse.next();

  if (isAllowedOrigin) {
    response.headers.set("Access-Control-Allow-Origin", origin);
  }

  Object.entries(corsOptions).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  if (
    !currentUser &&
    legacyPrefixes.some((prefix) => pathname.startsWith(prefix))
  ) {
    return Response.redirect(new URL("/login", request.url));
  }

  if (
    currentUser &&
    authPrefixes.some((prefix) => pathname.startsWith(prefix))
  ) {
    return Response.redirect(new URL("/", request.url));
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|.*\\.png$).*)",
    "/dashboard",
    "/product:path*",
    "/search:path*",
  ],
};
