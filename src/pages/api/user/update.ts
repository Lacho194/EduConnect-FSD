import { prisma } from "@/lib/db";
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

const SECRET = process.env.JWT_SECRET || "supersecret";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "PUT") return res.status(405).json({ message: "Método no permitido" });

  try {
    const token = req.cookies.educonnect_token;
    if (!token) return res.status(401).json({ message: "No autorizado" });

    const decoded = jwt.verify(token, SECRET) as { id: number };
    const { name, email } = req.body;

    const updatedUser = await prisma.user.update({
      where: { id: decoded.id },
      data: { name, email },
    });

    res.status(200).json({ message: "Perfil actualizado correctamente", user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar perfil" });
  }
}
