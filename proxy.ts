import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/workspace/:path*"]
};

export function proxy(request: NextRequest) {
  const expectedToken = process.env.DEMO_SESSION_TOKEN ?? "matrix-demo-session";
  const session = request.cookies.get("matrix_session")?.value;

  if (session !== expectedToken) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}
