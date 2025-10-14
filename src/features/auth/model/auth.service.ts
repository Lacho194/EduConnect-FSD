import jwt from "jsonwebtoken";
import { serialize } from "cookie";

const SECRET_KEY = process.env.JWT_SECRET || "educonnect_secret_key";

export function generateToken(userId: number) {
  return jwt.sign({ id: userId }, SECRET_KEY, { expiresIn: "1h" });
}

export function setAuthCookie(token: string) {
  return serialize("educonnect_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 3600, // 1 hora
  });
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch {
    return null;
  }
}
