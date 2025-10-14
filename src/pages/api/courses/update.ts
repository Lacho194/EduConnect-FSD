import { prisma } from "@/lib/db";
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

const SECRET = process.env.JWT_SECRET || "supersecret";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "PUT") return res.status(405).json({ message: "Método no permitido" });

  try {
    const token = req.cookies.educonnect_token;
    if (!token) return res.status(401).json({ message: "No autorizado" });

    const decoded = jwt.verify(token, SECRET) as { id: number; role: string };
    const { id, title, description, price } = req.body;

    const course = await prisma.course.findUnique({ where: { id } });
    if (!course) return res.status(404).json({ message: "Curso no encontrado" });

    // Solo el docente que lo creó o el admin puede editarlo
    if (decoded.role !== "admin" && course.teacherId !== decoded.id)
      return res.status(403).json({ message: "No tienes permisos para editar este curso" });

    const updated = await prisma.course.update({
      where: { id },
      data: { title, description, price: parseFloat(price) },
    });

    res.status(200).json({ message: "Curso actualizado correctamente", course: updated });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno al actualizar curso" });
  }
}
