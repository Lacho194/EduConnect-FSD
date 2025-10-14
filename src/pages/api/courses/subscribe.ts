import { prisma } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ message: "Método no permitido" });

  const { courseId } = req.body;
  const userId = 2; // Estudiante logueado (temporal)

  const exists = await prisma.enrollment.findFirst({
    where: { userId, courseId },
  });

  if (exists) return res.json({ message: "Ya estás inscrito en este curso" });

  await prisma.enrollment.create({
    data: { userId, courseId },
  });

  res.json({ message: "Inscripción exitosa" });
}
