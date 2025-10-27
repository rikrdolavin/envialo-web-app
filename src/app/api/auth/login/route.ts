import { signIn } from "@/lib/auth";
import { LoginRequest } from "@/models/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body: LoginRequest = await request.json();
  try {
    const login = signIn({ data: body });

    return NextResponse.json({ data: login }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: "Internal server error", message: err.message },

      { status: 500 }
    );
  }
}
