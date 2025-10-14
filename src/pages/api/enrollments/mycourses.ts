import { prisma } from "@/lib/db";
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

const SECRET = process.env.JWT_SECRET || "supersecret";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return res.status(405).json({ message: "Método no permitido" });

  try {
    const token = req.cookies.educonnect_token;
    if (!token) return res.status(401).json({ message: "No autorizado" });

    const decoded = jwt.verify(token, SECRET) as { id: number; role: string };
    if (decoded.role !== "student")
      return res.status(403).json({ message: "Solo los estudiantes pueden acceder" });

    const enrollments = await prisma.enrollment.findMany({
      where: { userId: decoded.id },
      include: { course: true },
    });

    res.status(200).json(enrollments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno al obtener inscripciones" });
  }
}
