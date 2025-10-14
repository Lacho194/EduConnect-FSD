import { prisma } from "@/lib/db";
import { hash } from "bcryptjs";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ message: "Método no permitido" });

  const { name, email, password, role } = req.body;

  try {
    const hashedPassword = await hash(password, 10);
    await prisma.user.create({
      data: { name, email, password: hashedPassword, role },
    });

    return res.status(201).json({ message: "Usuario registrado correctamente" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al registrar usuario" });
  }
}
