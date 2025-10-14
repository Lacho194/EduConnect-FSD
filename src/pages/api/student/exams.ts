import { prisma } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET")
    return res.status(405).json({ message: "Método no permitido" });

  try {
    const { userId } = req.query;

    // Buscar los cursos en los que el estudiante está inscrito
    const enrollments = await prisma.enrollment.findMany({
      where: { userId: Number(userId) },
      include: { course: true },
    });

    // Extraer los IDs de los cursos
    const courseIds = enrollments.map((e) => e.courseId);

    // Buscar las evaluaciones de esos cursos
    const exams = await prisma.exam.findMany({
      where: { courseId: { in: courseIds } },
      include: { course: true },
    });

    return res.status(200).json(exams);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al obtener evaluaciones del estudiante" });
  }
}
