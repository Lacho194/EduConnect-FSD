import { prisma } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Aquí teacherId = 1 es temporal, deberías usar el ID del usuario autenticado
  const courses = await prisma.course.findMany({
    where: { teacherId: 1 },
  });
  res.json(courses);
}
