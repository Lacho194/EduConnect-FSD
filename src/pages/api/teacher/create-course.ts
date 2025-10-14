import { prisma } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ message: "Método no permitido" });

  try {
    const { title, description, price, category } = req.body;

    // Simulamos que el teacher con ID 1 crea el curso (puedes cambiarlo)
    const teacherId = 1;

    const course = await prisma.course.create({
      data: {
        title,
        description,
        price: parseFloat(price),
        category,
        teacherId,
      },
    });

    return res.status(201).json({ message: "Curso creado correctamente ✅", course });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al crear el curso ❌" });
  }
}
