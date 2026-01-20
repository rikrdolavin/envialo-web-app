"use server";

import {
  API_AUTH_ACTIVATE_USER,
  API_AUTH_CHANGE_PASSWORD,
  API_AUTH_FORGOT_PASSWORD,
  API_AUTH_LOGIN,
  API_AUTH_REGISTER,
} from "@/constants/auth/endpoints";
import { createSession } from "@/lib/session";
import { doFetch } from "@/lib/utils";
import {
  ChangePasswordRequest,
  LoginRequest,
  LoginResponse,
  SignUpRequest,
  SignupResponse,
} from "@/models/auth";
import { ApiResponse } from "@/types/api";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const loginAction = async (body: LoginRequest) => {
  try {
    const loginResponse: LoginResponse = await doFetch({
      endpoint: API_AUTH_LOGIN,
      data: body,
      method: "POST",
      apiBase: process.env.API_BASE_URL2,
    });

    if (loginResponse.success === false) {
      return loginResponse;
    }

    const session = await createSession({
      userId: loginResponse.data.id,
      email: loginResponse.data.email,
    });

    const cookieStore = await cookies();

    // // Guardar cookie de sesión JWT propia
    cookieStore.set("session", session, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
      sameSite: "lax",
      path: "/",
    });

    // Guardar access_token en cookie HttpOnly
    cookieStore.set("access_token", loginResponse.data.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 2, // 2 horas, ajustar según expiración del token
      sameSite: "lax",
      path: "/",
    });

    // Guardar refresh_token en cookie HttpOnly
    cookieStore.set("refresh_token", loginResponse.data.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 7 dias, ajustar según expiración del token
      sameSite: "lax",
      path: "/",
    });

    return loginResponse;
  } catch (err) {
    console.error(err);
    return {
      status: "ERROR",
      success: false,
      httpStatus: 500,
      data: null,
    };
  }
};

export const signupAction = async (body: SignUpRequest) => {
  try {
    const signupResponse: SignupResponse = await doFetch({
      endpoint: API_AUTH_REGISTER,
      data: body,
      method: "POST",
      apiBase: process.env.API_BASE_URL2,
    });

    if (signupResponse.success === false) {
      return signupResponse;
    }
  } catch (err) {
    console.error(err);
    return err;
  }

  redirect("/auth/activate-account");
};

export const activeAccountAction = async (token: string) => {
  const url = process.env.API_BASE_URL2 + API_AUTH_ACTIVATE_USER;

  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({ token }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    return {
      status: "ERROR",
      success: false,
      httpStatus: 500,
      data: null,
    };
  }
};

export const forgotPasswordAction = async (email: string) => {
  try {
    const forgotPasswordResponse = await doFetch({
      endpoint: API_AUTH_FORGOT_PASSWORD,
      data: { email },
      method: "POST",
      apiBase: process.env.API_BASE_URL2,
    });

    if (forgotPasswordResponse.success === false) {
      return forgotPasswordResponse;
    }
  } catch (err) {
    console.error(err);
    return err;
  }

  redirect("/auth/forgot-password/verify-email");
};

export const changePasswordAction = async (body: ChangePasswordRequest) => {
  let response: ApiResponse;
  try {
    response = await doFetch({
      endpoint: API_AUTH_CHANGE_PASSWORD,
      data: body,
      method: "POST",
      apiBase: process.env.API_BASE_URL2,
    });
  } catch (err) {
    console.error(err);
    return err;
  }

  if (response.success === false && response.errorCode === "MSG25") {
    redirect("/auth/forgot-password?reason=expired");
  }

  return response;
};
