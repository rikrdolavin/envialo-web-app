import { ApiResponse } from "@/types/api";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse extends ApiResponse {
  data: LoginResponseData;
}

export interface LoginResponseData {
  id: string;
  email: string;
  accessToken: string;
  refreshToken: string;
}

export interface SignUpRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  repeatPassword: string;
}

export interface SignupResponse extends ApiResponse {
  data: null;
}
