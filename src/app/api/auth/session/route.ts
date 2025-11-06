import { cookies } from "next/headers";
import { verifySession } from "@/lib/session";

export async function GET() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session")?.value;

  if (!sessionCookie) return Response.json(null);

  const payload = await verifySession(sessionCookie);
  return Response.json(payload);
}
