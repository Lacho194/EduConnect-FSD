"use client";
import { useEffect, useState } from "react";

export default function PerformanceReport() {
  const [data, setData] = useState([]);
  const [avg, setAvg] = useState(0);

  useEffect(() => {
    fetch("/api/admin/reports/performance")
      .then((res) => res.json())
      .then((d) => {
        setData(d.data);
        setAvg(d.avgScore);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6 text-green-700">
        🎓 Desempeño Académico
      </h1>

      <p className="text-center text-lg mb-4 text-gray-700">
        Promedio general:{" "}
        <span className="font-bold text-blue-700">{avg}%</span>
      </p>

      {data.length === 0 ? (
        <p className="text-center text-gray-500">
          No hay resultados de evaluaciones disponibles.
        </p>
      ) : (
        <table className="min-w-full bg-white border rounded-xl shadow">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="p-3">Estudiante</th>
              <th className="p-3">Curso</th>
              <th className="p-3">Evaluación</th>
              <th className="p-3">Puntaje</th>
              <th className="p-3">Aprobado</th>
              <th className="p-3">Retroalimentación</th>
            </tr>
          </thead>
          <tbody>
            {data.map((r, i) => (
              <tr key={i} className="border-b hover:bg-gray-100">
                <td className="p-3">{r.student}</td>
                <td className="p-3">{r.course}</td>
                <td className="p-3">{r.exam}</td>
                <td className="p-3">{r.score}</td>
                <td className="p-3">{r.passed}</td>
                <td className="p-3">{r.feedback}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
