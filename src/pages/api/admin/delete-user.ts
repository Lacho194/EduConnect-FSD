import { prisma } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  await prisma.user.delete({ where: { id: Number(id) } });
  res.json({ message: "Usuario eliminado correctamente" });
}
