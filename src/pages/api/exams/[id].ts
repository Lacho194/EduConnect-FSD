import { prisma } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return res.status(405).json({ message: "Método no permitido" });

  try {
    const { id } = req.query;

    const exam = await prisma.exam.findUnique({
      where: { id: Number(id) },
      include: { questions: true },
    });

    if (!exam) {
      return res.status(404).json({ message: "Examen no encontrado" });
    }

    return res.status(200).json(exam);
  } catch (error) {
    console.error("❌ Error al obtener examen:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
}
