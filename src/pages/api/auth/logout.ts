import { serialize } from "cookie";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const cookie = serialize("educonnect_token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    expires: new Date(0), // Expira inmediatamente
  });

  res.setHeader("Set-Cookie", cookie);
  res.status(200).json({ message: "Sesión cerrada exitosamente" });
}
