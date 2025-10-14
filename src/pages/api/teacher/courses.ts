// src/pages/api/teacher/courses.ts
import { prisma } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return res.status(405).json({ message: "Método no permitido" });

  try {
    const { teacherId } = req.query;
    if (!teacherId) return res.status(400).json({ message: "Falta teacherId" });

    const courses = await prisma.course.findMany({
      where: { teacherId: Number(teacherId) },
      select: { id: true, title: true },
    });

    return res.status(200).json(courses);
  } catch (error) {
    console.error("Error teacher/courses:", error);
    return res.status(500).json({ message: "Error al obtener cursos" });
  }
}
