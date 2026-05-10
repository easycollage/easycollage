import bcrypt from "bcryptjs";
import { SignJWT } from "jose/jwt/sign";
import { verifySession } from "./session";

export async function hashPassword(password: string) {
  return await bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string) {
  return await bcrypt.compare(password, hash);
}

export async function createSession(payload: any) {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET || "default_super_secret");
  const alg = "HS256";

  return new SignJWT(payload)
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(secret);
}

export { verifySession };
