import { prisma } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { Parser } from "json2csv";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const courses = await prisma.course.findMany({
      include: { enrollments: true },
    });

    const data = courses.map((c) => ({
      Curso: c.title,
      Precio: c.price,
      Inscritos: c.enrollments.length,
      Ingreso: c.price * c.enrollments.length,
    }));

    const parser = new Parser();
    const csv = parser.parse(data);

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=reporte-ventas.csv");
    res.status(200).send(csv);
  } catch (err) {
    console.error("Error exportando reporte:", err);
    res.status(500).json({ message: "Error al exportar CSV" });
  }
}
