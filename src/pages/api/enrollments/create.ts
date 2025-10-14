import { prisma } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ message: "Método no permitido" });

  try {
    const { title, description, category, price, teacherId } = req.body;

    const course = await prisma.course.create({
      data: { title, description, category, price: Number(price), teacherId: Number(teacherId) },
    });

    return res.status(201).json(course);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al crear el curso" });
  }
}
