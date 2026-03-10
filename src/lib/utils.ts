import { Locale } from "@/models/language";
import { Rule } from "antd/es/form";
import { HTTP_METHOD } from "next/dist/server/web/http";

export async function doFetch({
  data,
  endpoint,
  method,
  lang,
  apiBase = process.env.API_BASE_URL,
  cache = "no-cache",
  cached,
  token,
}: {
  endpoint: string;
  data: unknown;
  method: HTTP_METHOD;
  token?: string;
  lang?: Locale["locale"];
  apiBase?: string;
  cache?: RequestCache;
  cached?: boolean;
}) {
  const url = apiBase ?? process.env.API_BASE_URL;

  const hasBody = method != "GET";

  try {
    const response = await fetch(`${url}${endpoint}`, {
      method: method,
      body: hasBody ? JSON.stringify(data) : null,
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": lang ?? "",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      ...(cached ? { cache } : {}),
    });

    if (response.status == 204) {
      return { success: true };
    } else {
      return await response.json();
    }
  } catch (error) {
    console.error(error);
    return { success: false, error: error };
  }
}

export function getBackRoute(referer: string | null): string {
  if (!referer) return "";
  try {
    const url = new URL(referer);
    const pathname = url.pathname;
    const parts = pathname.split("/").filter(Boolean);
    if (parts.length > 1) {
      return parts.slice(1).join("/") + url.search;
    }
    return "";
  } catch {
    return "";
  }
}

export function getPasswordRules({
  dictionary,
  type,
  includeRequired = false,
  matchFieldName = "password",
}: {
  dictionary: any;
  type?: "new" | "confirm" | "required-only";
  includeRequired?: boolean;
  matchFieldName?: string;
}): Rule[] {
  const authDict = dictionary.auth_form;
  let toReturn: Rule[] = [];

  switch (type) {
    case "confirm":
      toReturn = toReturn.concat([
        {
          required: true,
          message: authDict.validation.repeat_password,
        },
        ({ getFieldValue }) => ({
          validator(_, value) {
            if (!value || getFieldValue(matchFieldName) === value) {
              return Promise.resolve();
            }
            return Promise.reject(
              new Error(authDict.errors.password_not_matching),
            );
          },
        }),
      ]);
      break;
    case "new":
      toReturn = toReturn.concat([
        {
          min: 8,
          message: authDict.validation.password_validation1,
        },
        {
          pattern: /(?=.*[A-Z])/,
          message: authDict.validation.password_validation2,
        },
        {
          pattern: /(?=.*\d)/,
          message: authDict.validation.password_validation3,
        },
        {
          pattern: /(?=.*[!@#$%^&*(),.?":{}|<>])/,
          message: authDict.validation.password_validation4,
        },
      ]);
      break;
    case "required-only":
      toReturn = [
        {
          required: true,
          message: authDict.validation.password_required,
        },
      ];
      break;
    default:
      break;
  }

  return toReturn.concat(
    includeRequired && type !== "required-only" && type !== "confirm"
      ? [
          {
            required: true,
            message: authDict.validation.password_required,
          },
        ]
      : [],
  );
}
