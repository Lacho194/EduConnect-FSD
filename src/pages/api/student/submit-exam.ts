// src/pages/api/student/submit-exam.ts
import { prisma } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST")
    return res.status(405).json({ message: "Método no permitido" });

  try {
    const { userId, examId, answers } = req.body;

    if (!userId || !examId || !answers) {
      return res.status(400).json({ message: "Datos incompletos" });
    }

    // Obtener examen y preguntas
    const exam = await prisma.exam.findUnique({
      where: { id: Number(examId) },
      include: { questions: true },
    });

    if (!exam) return res.status(404).json({ message: "Examen no encontrado" });

    // Calcular correctas
    let correct = 0;
    for (const q of exam.questions) {
      const given = answers[q.id];
      if (
        typeof given === "string" &&
        q.correctAnswer &&
        given.trim().toLowerCase() === q.correctAnswer.trim().toLowerCase()
      ) {
        correct++;
      }
    }

    const total = exam.questions.length || 1;
    const score = (correct / total) * 100;
    const passed = score >= 70; // umbral, ajústalo si quieres

    const feedback = passed
      ? "¡Felicidades! Has aprobado la evaluación."
      : "No alcanzaste la nota mínima. Repasa y vuelve a intentar.";

    // Guardar resultado
    const result = await prisma.result.create({
      data: {
        userId: Number(userId),
        examId: Number(examId),
        score,
        feedback,
        passed,
      },
    });

    // Si aprueba, crear certificado (si no existe)
    if (passed) {
      const existing = await prisma.certificate.findFirst({
        where: { userId: Number(userId), courseId: exam.courseId },
      });
      if (!existing) {
        await prisma.certificate.create({
          data: {
            userId: Number(userId),
            courseId: exam.courseId,
            grade: score,
          },
        });
      }
    }

    return res.status(200).json({
      score: Number(score.toFixed(2)),
      passed,
      feedback,
    });
  } catch (error) {
    console.error("Error submit-exam:", error);
    return res.status(500).json({ message: "Error al procesar la evaluación" });
  }
}
