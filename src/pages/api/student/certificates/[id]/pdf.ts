import { prisma } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import PDFDocument from "pdfkit";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  try {
    const cert = await prisma.certificate.findUnique({
      where: { id: Number(id) },
      include: { user: true, course: true },
    });

    if (!cert) return res.status(404).json({ message: "Certificado no encontrado" });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename=certificado-${cert.id}.pdf`);

    const doc = new PDFDocument();
    doc.pipe(res);

    doc.fontSize(22).text("CERTIFICADO DE FINALIZACIÓN", { align: "center" });
    doc.moveDown(2);
    doc.fontSize(16).text(`Se otorga a: ${cert.user.name}`, { align: "center" });
    doc.moveDown();
    doc.text(`Por haber completado el curso: ${cert.course.title}`, { align: "center" });
    doc.moveDown();
    doc.text(`Con una nota final de: ${cert.grade.toFixed(1)}%`, { align: "center" });
    doc.moveDown(2);
    doc.text(`Fecha de emisión: ${new Date(cert.issueDate).toLocaleDateString()}`, { align: "center" });

    doc.end();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al generar certificado" });
  }
}
