// src/pages/api/student/certificates.ts
import { prisma } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET")
    return res.status(405).json({ message: "Método no permitido" });

  try {
    const { userId } = req.query;
    if (!userId) return res.status(400).json({ message: "Falta userId" });

    const certs = await prisma.certificate.findMany({
      where: { userId: Number(userId) },
      include: { course: true },
      orderBy: { issueDate: "desc" },
    });

    return res.status(200).json(certs);
  } catch (err) {
    console.error("Error certificates:", err);
    return res.status(500).json({ message: "Error al obtener certificados" });
  }
}
