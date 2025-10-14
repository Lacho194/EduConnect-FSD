import { prisma } from "@/lib/db";
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

const SECRET = process.env.JWT_SECRET || "supersecret";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "DELETE") return res.status(405).json({ message: "Método no permitido" });

  try {
    const token = req.cookies.educonnect_token;
    if (!token) return res.status(401).json({ message: "No autorizado" });

    const decoded = jwt.verify(token, SECRET) as { id: number; role: string };
    const { id } = req.query;

    const course = await prisma.course.findUnique({ where: { id: Number(id) } });
    if (!course) return res.status(404).json({ message: "Curso no encontrado" });

    // Solo el docente que lo creó o el admin puede eliminarlo
    if (decoded.role !== "admin" && course.teacherId !== decoded.id)
      return res.status(403).json({ message: "No tienes permisos para eliminar este curso" });

    await prisma.course.delete({ where: { id: Number(id) } });

    res.status(200).json({ message: "Curso eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno al eliminar curso" });
  }
}
