import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { passcode } = (await request.json().catch(() => ({}))) as {
    passcode?: string;
  };
  const expectedPasscode = process.env.DEMO_PASSCODE ?? "matrix2026";
  const sessionToken = process.env.DEMO_SESSION_TOKEN ?? "matrix-demo-session";

  if (!passcode || passcode !== expectedPasscode) {
    return NextResponse.json(
      { ok: false, message: "访问口令不正确" },
      { status: 401 }
    );
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set("matrix_session", sessionToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8
  });

  return response;
}
