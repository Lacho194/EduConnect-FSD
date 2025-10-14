import { prisma } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Método no permitido" });
  }

  const { title, description, price } = req.body;

  if (!title || !description || !price) {
    return res.status(400).json({ message: "Faltan datos del curso" });
  }

  try {
    // ⚠️ Temporal: hasta que implementemos login persistente, usamos un teacherId fijo
    const teacherId = 1;

    // Crear el curso
    const newCourse = await prisma.course.create({
      data: {
        title,
        description,
        price: parseFloat(price),
        teacherId,
      },
      include: {
        teacher: true, // para devolver datos del docente
      },
    });

    return res.status(200).json({
      message: "✅ Curso creado correctamente",
      course: newCourse,
    });
  } catch (error: any) {
    console.error("Error al crear curso:", error);
    return res.status(500).json({ message: "❌ Error al crear el curso" });
  }
}
