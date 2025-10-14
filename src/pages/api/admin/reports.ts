import { prisma } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Total de cursos
    const totalCourses = await prisma.course.count();

    // Total de inscripciones
    const totalEnrollments = await prisma.enrollment.count();

    // Total de ingresos
    const totalIncomeData = await prisma.course.findMany({
      include: { enrollments: true },
    });

    const totalIncome = totalIncomeData.reduce(
      (sum, c) => sum + c.price * c.enrollments.length,
      0
    );

    // Cursos más vendidos
    const topCourses = totalIncomeData
      .map((c) => ({
        id: c.id,
        title: c.title,
        revenue: c.price * c.enrollments.length,
      }))
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5);

    // Promedio de notas
    const avgResult = await prisma.result.aggregate({
      _avg: { score: true },
    });

    const avgScore = avgResult._avg.score || 0;

    return res.status(200).json({
      totalCourses,
      totalEnrollments,
      totalIncome,
      topCourses,
      avgScore,
    });
  } catch (error) {
    console.error("Error generando reportes:", error);
    res.status(500).json({ message: "Error generando reportes" });
  }
}
