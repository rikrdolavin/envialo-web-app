import { SignJWT, jwtVerify } from "jose";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function createSession(payload: { userId: string }) {
  const session = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);

  return session;
}

export async function verifySession(session: string | undefined) {
  if (!session) return null;

  try {
    const { payload } = await jwtVerify(session, encodedKey);
    return payload;
  } catch (err) {
    console.error(err);
    return null;
  }
}
