import { prisma } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET")
    return res.status(405).json({ message: "Método no permitido" });

  try {
    const { q, category, minPrice, maxPrice } = req.query;

    const courses = await prisma.course.findMany({
      where: {
        AND: [
          q
            ? { title: { contains: String(q), mode: "insensitive" } }
            : {},
          category && category !== "all"
            ? { category: String(category) }
            : {},
          minPrice
            ? { price: { gte: parseFloat(String(minPrice)) } }
            : {},
          maxPrice
            ? { price: { lte: parseFloat(String(maxPrice)) } }
            : {},
        ],
      },
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al buscar cursos" });
  }
}
