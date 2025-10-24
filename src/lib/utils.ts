import { Locale } from "@/models/language";
import { HTTP_METHOD } from "next/dist/server/web/http";

export async function doFetch({
  data,
  endpoint,
  method,
  lang,
}: {
  endpoint: string;
  data: unknown;
  method: HTTP_METHOD;
  lang?: Locale["locale"];
}) {
  const url = process.env.API_BASE_URL;

  const hasBody = method != "GET";

  try {
    const response = await fetch(`${url}${endpoint}`, {
      method: method,
      body: hasBody ? JSON.stringify(data) : null,
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": lang ?? "",
      },
    });

    if (response.status == 204) {
      return { success: true };
    } else {
      return await response.json();
    }
  } catch (error) {
    console.error(error);
  }
}
