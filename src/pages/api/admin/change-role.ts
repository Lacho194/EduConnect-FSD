import { prisma } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "PUT") return res.status(405).json({ message: "Método no permitido" });

  const { id, role } = req.body;
  await prisma.user.update({
    where: { id: Number(id) },
    data: { role },
  });

  res.json({ message: "Rol actualizado correctamente" });
}
