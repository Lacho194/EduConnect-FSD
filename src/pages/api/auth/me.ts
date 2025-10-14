import { prisma } from "@/lib/db";
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

const SECRET = process.env.JWT_SECRET || "supersecret";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const token = req.cookies.educonnect_token;
    if (!token) return res.status(401).json({ message: "No autorizado" });

    const decoded = jwt.verify(token, SECRET) as { id: number };
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });

    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    res.status(200).json({ user });
  } catch (error) {
    console.error("Error en /me:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
}
