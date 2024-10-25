// export { auth as middleware } from "@acme/auth";

// Or like this if you need to do something here.
// export default auth((req) => {
//   console.log(req.auth) //  { session: { user: { ... } } }
// })
// middleware.ts

import { NextResponse } from "next/server";

export function middleware() {
  // const routes = req.nextUrl.pathname;

  return NextResponse.next();
}

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
