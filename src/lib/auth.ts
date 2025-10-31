import { LoginRequest, SignUpRequest } from "@/models/auth";
import { doFetch } from "./utils";
import { API_AUTH_LOGIN, API_AUTH_REGISTER } from "@/constants/auth/endpoints";

export async function signUp({ data }: { data: SignUpRequest }) {
  return await doFetch({
    endpoint: API_AUTH_REGISTER,
    data,
    method: "POST",
  });
}

export async function signIn({ data }: { data: LoginRequest }) {
  return await doFetch({
    endpoint: API_AUTH_LOGIN,
    data,
    method: "POST",
  });
}
