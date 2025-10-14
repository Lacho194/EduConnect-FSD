// src/pages/api/student/certificates/[id].ts
import { prisma } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET")
    return res.status(405).json({ message: "Método no permitido" });

  try {
    const { id } = req.query;
    if (!id) return res.status(400).json({ message: "Falta ID" });

    const cert = await prisma.certificate.findUnique({
      where: { id: Number(id) },
      include: { user: true, course: true },
    });

    if (!cert) return res.status(404).json({ message: "Certificado no encontrado" });

    // Crear documento PDF
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 400]);
    const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const normal = await pdfDoc.embedFont(StandardFonts.Helvetica);

    const drawText = (text: string, x: number, y: number, size = 16, bold = false) => {
      page.drawText(text, {
        x,
        y,
        size,
        font: bold ? font : normal,
        color: rgb(0, 0, 0),
      });
    };

    // Contenido del certificado
    drawText("CERTIFICADO DE FINALIZACIÓN", 150, 340, 20, true);
    drawText(`Otorgado a: ${cert.user.name}`, 60, 280, 16);
    drawText(`Por completar el curso: ${cert.course.title}`, 60, 250, 16);
    drawText(`Nota final: ${cert.grade.toFixed(2)}%`, 60, 220, 16);
    drawText(`Emitido el: ${cert.issueDate.toISOString().split("T")[0]}`, 60, 190, 14);
    drawText("Edu-Connect", 60, 150, 18, true);

    const pdfBytes = await pdfDoc.save();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename=certificado-${cert.id}.pdf`);
    res.send(Buffer.from(pdfBytes));
  } catch (err) {
    console.error("Error generar certificado:", err);
    res.status(500).json({ message: "Error al generar certificado" });
  }
}
