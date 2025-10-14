"use client";
import { useEffect, useState } from "react";

export default function SalesReport() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/api/admin/reports/sales")
      .then((res) => res.json())
      .then(setData)
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6 text-purple-700">
        💰 Reporte de Ventas
      </h1>

      {data.length === 0 ? (
        <p className="text-center text-gray-500">No hay ventas registradas.</p>
      ) : (
        <table className="min-w-full bg-white border rounded-xl shadow">
          <thead className="bg-purple-600 text-white">
            <tr>
              <th className="p-3">Curso</th>
              <th className="p-3">Inscripciones</th>
              <th className="p-3">Ingresos</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={i} className="border-b hover:bg-gray-100">
                <td className="p-3">{row.course}</td>
                <td className="p-3">{row.enrollments}</td>
                <td className="p-3">${row.revenue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
