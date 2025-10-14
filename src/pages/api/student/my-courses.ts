import { prisma } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return res.status(405).json({ message: "Método no permitido" });

  try {
    const { userId } = req.query;
    if (!userId) return res.status(400).json({ message: "Falta userId" });

    const enrollments = await prisma.enrollment.findMany({
      where: { userId: Number(userId) },
      include: { course: true },
    });

    const courses = enrollments.map((e) => e.course);
    return res.status(200).json(courses);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al obtener cursos del estudiante" });
  }
}
