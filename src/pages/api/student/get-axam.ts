import { prisma } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return res.status(405).json({ message: "Método no permitido" });

  try {
    const { courseId } = req.query;

    if (!courseId) return res.status(400).json({ message: "Falta el ID del curso" });

    const exam = await prisma.exam.findFirst({
      where: { courseId: Number(courseId) },
      include: { questions: true },
    });

    if (!exam) return res.status(404).json({ message: "No hay evaluación para este curso" });

    res.status(200).json(exam);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener la evaluación" });
  }
}
