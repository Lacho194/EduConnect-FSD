"use client";
import { useEffect, useState } from "react";

export default function ReportsPage() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/admin/reports");
      const data = await res.json();
      setStats(data);
      setLoading(false);
    })();
  }, []);

  // ✅ Función para exportar los datos en CSV sin librerías externas
  const exportToCSV = () => {
    if (!stats) return;
    const rows = [
      ["Reporte General EduConnect"],
      [],
      ["Total de Cursos", stats.totalCourses],
      ["Estudiantes Inscritos", stats.totalEnrollments],
      ["Ingresos Totales ($)", stats.totalIncome],
      ["Promedio de Notas (%)", stats.avgScore.toFixed(2)],
      [],
      ["Cursos más Vendidos:"],
      ["Título", "Ingresos ($)"],
      ...stats.topCourses.map((c: any) => [c.title, c.revenue]),
    ];

    const csvContent =
      "data:text/csv;charset=utf-8," +
      rows.map((r) => r.join(",")).join("\n");

    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", "reporte_educonnect.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading)
    return (
      <p className="text-center p-10 text-gray-600">Cargando estadísticas...</p>
    );

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-blue-700 text-center">
        📊 Panel de Reportes Administrativos
      </h1>

      {/* Tarjetas de resumen */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white shadow rounded-xl p-6 text-center border-t-4 border-blue-600">
          <h2 className="text-lg font-semibold text-gray-600">Total de Cursos</h2>
          <p className="text-3xl font-bold text-blue-700">{stats.totalCourses}</p>
        </div>
        <div className="bg-white shadow rounded-xl p-6 text-center border-t-4 border-green-600">
          <h2 className="text-lg font-semibold text-gray-600">
            Estudiantes Inscritos
          </h2>
          <p className="text-3xl font-bold text-green-700">
            {stats.totalEnrollments}
          </p>
        </div>
        <div className="bg-white shadow rounded-xl p-6 text-center border-t-4 border-purple-600">
          <h2 className="text-lg font-semibold text-gray-600">Ingresos Totales</h2>
          <p className="text-3xl font-bold text-purple-700">
            ${stats.totalIncome}
          </p>
        </div>
      </div>

      {/* Lista de cursos más vendidos */}
      <div className="bg-white rounded-xl shadow p-6 mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-blue-700">
          🧑‍🏫 Cursos más vendidos
        </h2>
        <table className="min-w-full border">
          <thead className="bg-blue-100">
            <tr>
              <th className="border px-4 py-2 text-left">Curso</th>
              <th className="border px-4 py-2 text-left">Ingresos ($)</th>
            </tr>
          </thead>
          <tbody>
            {stats.topCourses.map((c: any) => (
              <tr key={c.id}>
                <td className="border px-4 py-2">{c.title}</td>
                <td className="border px-4 py-2 text-green-700 font-semibold">
                  ${c.revenue}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Desempeño promedio */}
      <div className="bg-white rounded-xl shadow p-6 text-center mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-blue-700">
          📘 Desempeño Académico Promedio
        </h2>
        <p className="text-lg text-gray-700">
          Promedio general:{" "}
          <span className="text-2xl font-bold text-blue-600">
            {stats.avgScore.toFixed(2)}%
          </span>
        </p>
      </div>

      {/* Botón de exportación */}
      <div className="text-center">
        <button
          onClick={exportToCSV}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow font-semibold transition"
        >
          ⬇️ Exportar Reporte a CSV
        </button>
      </div>
    </div>
  );
}
