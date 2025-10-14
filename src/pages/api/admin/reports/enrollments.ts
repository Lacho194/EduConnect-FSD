import { prisma } from "@/lib/db";

export default async function handler(req, res) {
  try {
    // Obtener todas las inscripciones con información de usuario y curso
    const enrollments = await prisma.enrollment.findMany({
      include: {
        user: true,
        course: true,
      },
      orderBy: { createdAt: "desc" },
    });

    const data = enrollments.map((e) => ({
      id: e.id,
      student: e.user.name,
      email: e.user.email,
      course: e.course.title,
      date: new Date(e.createdAt).toLocaleDateString(),
    }));

    return res.status(200).json(data);
  } catch (error) {
    console.error("Error al generar reporte de inscripciones:", error);
    return res.status(500).json({ message: "Error al generar reporte" });
  }
}
