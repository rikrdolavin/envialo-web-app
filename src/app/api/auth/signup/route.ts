import { signUp } from "@/lib/auth";
import { SignupResponse } from "@/models/auth";
import { NextRequest, NextResponse } from "next/server";
import { createSession } from "@/lib/session";

export async function POST(request: NextRequest) {
  const body = await request.json();
  try {
    const response = signUp({ data: body });

    const session = await createSession({ userId: response.user.id });

    const _response = NextResponse.json({ user: response });

    // Guardar cookie de sesión JWT propia
    _response.cookies.set("session", session, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
      sameSite: "lax",
      path: "/",
    });

    // Guardar access_token en cookie HttpOnly
    _response.cookies.set(
      "access_token",
      (response as unknown as SignupResponse).access_token,
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60, // 15 minutos, ajustar según expiración del token
        sameSite: "lax",
        path: "/",
      }
    );

    return NextResponse.json({ data: response }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: "Internal server error", message: err.message },
      { status: 500 }
    );
  }
}
