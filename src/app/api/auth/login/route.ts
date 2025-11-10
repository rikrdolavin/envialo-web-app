import { signIn } from "@/lib/auth";
import { createSession } from "@/lib/session";
import { LoginRequest, LoginResponse } from "@/models/auth";
import { InternalApiResponse } from "@/types/api";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body: LoginRequest = await request.json();
  try {
    const login = signIn({ data: body });

    const response: LoginResponse = await login;

    const _response: NextResponse<InternalApiResponse> = NextResponse.json({
      status: "OK",
      success: true,
      httpStatus: 200,
      data: {
        user_email: response.email,
      },
    });

    if (!_response) {
      return NextResponse.json(
        {
          status: "UNAUTHORIZED",
          success: false,
          httpStatus: 401,
          data: null,
        },
        { status: 401 },
      );
    }

    const session = await createSession({
      userId: response.userId,
      email: response.email,
    });

    // Guardar cookie de sesión JWT propia
    _response.cookies.set("session", session, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
      sameSite: "lax",
      path: "/",
    });

    // Guardar access_token en cookie HttpOnly
    _response.cookies.set("access_token", response.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60, // 60 minutos, ajustar según expiración del token
      sameSite: "lax",
      path: "/",
    });

    return _response;
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      {
        status: "ERROR",
        success: false,
        httpStatus: 500,
        data: null,
      },
      { status: 500 },
    );
  }
}
