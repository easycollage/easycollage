import { jwtVerify } from "jose/jwt/verify";

export async function verifySession(token: string) {
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || "default_super_secret");
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch {
    return null;
  }
}
