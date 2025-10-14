// src/pages/api/teacher/create-exam.ts
import { prisma } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST")
    return res.status(405).json({ message: "Método no permitido" });

  try {
    const { title, courseId, questions } = req.body;

    if (!title || !courseId || !questions || questions.length === 0) {
      return res.status(400).json({ message: "Faltan datos para crear la evaluación" });
    }

    // Normalizar preguntas (asegúrate de que cada pregunta tenga text y correctAnswer)
    const normalized = questions.map((q: any) => ({
      text: q.text ?? q.prompt ?? "",
      correctAnswer: q.correctAnswer ?? q.correct ?? "",
      // si tu UI tiene opciones, las podrías guardar en un campo JSON (opcional)
      options: q.options ?? undefined,
    }));

    const exam = await prisma.exam.create({
      data: {
        title,
        courseId: Number(courseId),
        questions: {
          create: normalized.map((q: any) => ({
            text: q.text,
            correctAnswer: q.correctAnswer,
          })),
        },
      },
      include: { questions: true },
    });

    return res.status(201).json({ message: "✅ Evaluación creada correctamente", exam });
  } catch (error) {
    console.error("Error create-exam:", error);
    return res.status(500).json({ message: "❌ Error al crear la evaluación" });
  }
}
