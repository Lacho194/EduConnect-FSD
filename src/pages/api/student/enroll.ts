import { prisma } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST")
    return res.status(405).json({ message: "Método no permitido" });

  try {
    const { userId, courseId } = req.body;

    if (!userId || !courseId)
      return res.status(400).json({ message: "Faltan datos obligatorios" });

    // Verificar si ya está inscrito
    const existing = await prisma.enrollment.findFirst({
      where: { userId: Number(userId), courseId: Number(courseId) },
    });

    if (existing)
      return res.status(400).json({ message: "Ya estás inscrito en este curso" });

    // Crear inscripción
    await prisma.enrollment.create({
      data: {
        userId: Number(userId),
        courseId: Number(courseId),
      },
    });

    return res.status(200).json({ message: "Inscripción exitosa ✅" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al inscribirse" });
  }
}
