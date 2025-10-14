import { prisma } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET")
    return res.status(405).json({ message: "Método no permitido" });

  const { userId } = req.query;

  try {
    const certs = await prisma.certificate.findMany({
      where: { userId: Number(userId) },
      include: { course: true },
      orderBy: { issueDate: "desc" },
    });

    return res.status(200).json(certs);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al obtener certificados" });
  }
}
