// import { NextResponse } from "next/server";

// export function middleware(request) {
//   console.log(request);

//   // REDIRECT URL
//   return NextResponse.redirect(new URL("/about", request.url));
// }

// // IF THESE ENDPOINTS HIT APPLY THE REDIRECR ABOVE
// export const config = {
//   matcher: ["/account", "/cabins"],
// };

import { auth } from "@/app/_lib/auth";

// NEXTAUTH SETUP SERVES AS A MIDDLEWARE FUNCTION BEFORE HITTING ANY NEXTJS PAGE.JS
export const middleware = auth;

// REQUIRE AUTHENTICATION ON THE MATCHED ROUTE ONLY
export const config = {
  // MULTIPLE SUBROUTES IN ONE GO WITH WILDCARDS
  matcher: ["/account/:path*"],
  // SPECIFY INDIVIDUALLY SUBROUTES
  //   matcher: ["/account", "/account/profile", "/account/reservations"],
};
