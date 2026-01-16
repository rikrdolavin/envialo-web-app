import { cookies } from "next/headers";
import { verifySession } from "@/lib/session";

export async function GET() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session")?.value;

  if (!sessionCookie) return Response.json(null);

  const payload = await verifySession(sessionCookie);

  if (!payload) {
    cookieStore.delete("session");
    cookieStore.delete("access_token");
    cookieStore.delete("refresh_token");
    return Response.json(null);
  }

  return Response.json(payload);
}
