import { prisma } from "@/lib/db";

export default async function handler(req, res) {
  try {
    const enrollments = await prisma.enrollment.findMany({
      include: { course: true },
    });

    // Agrupar por curso y sumar ingresos
    const sales = {};
    for (const e of enrollments) {
      if (!e.course) continue;
      if (!sales[e.course.title]) {
        sales[e.course.title] = { count: 0, total: 0 };
      }
      sales[e.course.title].count++;
      sales[e.course.title].total += e.course.price;
    }

    const data = Object.entries(sales).map(([course, stats]) => ({
      course,
      enrollments: stats.count,
      revenue: stats.total.toFixed(2),
    }));

    return res.status(200).json(data);
  } catch (error) {
    console.error("Error al generar reporte de ventas:", error);
    return res.status(500).json({ message: "Error al generar reporte" });
  }
}
