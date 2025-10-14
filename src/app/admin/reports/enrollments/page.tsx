"use client";
import { useEffect, useState } from "react";

export default function EnrollmentsReport() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/api/admin/reports/enrollments")
      .then((res) => res.json())
      .then(setData)
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-700">
        📋 Reporte de Inscripciones
      </h1>

      {data.length === 0 ? (
        <p className="text-center text-gray-500">No hay inscripciones registradas.</p>
      ) : (
        <table className="min-w-full bg-white border rounded-xl shadow">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-3">Estudiante</th>
              <th className="p-3">Correo</th>
              <th className="p-3">Curso</th>
              <th className="p-3">Fecha</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.id} className="border-b hover:bg-gray-100">
                <td className="p-3">{row.student}</td>
                <td className="p-3">{row.email}</td>
                <td className="p-3">{row.course}</td>
                <td className="p-3">{row.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
