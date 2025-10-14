import { prisma } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // ⚠️ Temporal: el docente logueado (luego se reemplazará por el ID real del usuario)
    const teacherId = 1;

    // Busca los cursos del profesor e incluye las inscripciones
    const courses = await prisma.course.findMany({
      where: { teacherId },
      include: {
        enrollments: {
          include: {
            user: true, // Incluye datos del estudiante
          },
        },
      },
    });

    return res.status(200).json(courses);
  } catch (error) {
    console.error("Error al obtener estudiantes:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
}
