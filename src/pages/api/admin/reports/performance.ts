import { prisma } from "@/lib/db";

export default async function handler(req, res) {
  try {
    const results = await prisma.result.findMany({
      include: { user: true, exam: { include: { course: true } } },
    });

    const data = results.map((r) => ({
      student: r.user.name,
      course: r.exam.course.title,
      exam: r.exam.title,
      score: r.score,
      passed: r.passed ? "Sí" : "No",
      feedback: r.feedback,
    }));

    const avgScore =
      results.length > 0
        ? (results.reduce((sum, r) => sum + r.score, 0) / results.length).toFixed(2)
        : "0.00";

    return res.status(200).json({ avgScore, data });
  } catch (error) {
    console.error("Error al generar reporte de desempeño:", error);
    return res.status(500).json({ message: "Error al generar reporte" });
  }
}
