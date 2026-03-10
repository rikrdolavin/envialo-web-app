"use server";

import { UPDATE_PASSWORD } from "@/constants/profile/endpoints";
import { doFetch } from "@/lib/utils";
import { UpdatePasswordRequest } from "@/models/profile";
import { cookies } from "next/headers";

export async function updatePasswordAction(
  _prevState: unknown,
  data: UpdatePasswordRequest,
) {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("access_token")?.value;
  try {
    const response = await doFetch({
      endpoint: UPDATE_PASSWORD,
      data,
      method: "POST",
      token,
    });

    if (response.success) {
      // Guardar access_token en cookie HttpOnly
      cookiesStore.set("access_token", response.data.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 2, // 2 horas, ajustar según expiración del token
        sameSite: "lax",
        path: "/",
      });

      // Guardar refresh_token en cookie HttpOnly
      cookiesStore.set("refresh_token", response.data.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7, // 7 dias, ajustar según expiración del token
        sameSite: "lax",
        path: "/",
      });
    }

    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
