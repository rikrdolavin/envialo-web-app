import { Locale } from "@/models/language";
import { HTTP_METHOD } from "next/dist/server/web/http";

export async function doFetch({
  data,
  endpoint,
  method,
  lang,
  apiBase = process.env.API_BASE_URL,
  cache = "no-cache",
  cached,
}: {
  endpoint: string;
  data: unknown;
  method: HTTP_METHOD;
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
