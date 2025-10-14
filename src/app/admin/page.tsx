"use client";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();

  return (
    <div className="min-h-screen p-10 bg-gray-100">
      <h1 className="text-3xl font-bold mb-8 text-blue-700 text-center">
        ⚙️ Panel del Administrador
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <button
          onClick={() => router.push("/admin/users")}
          className="bg-blue-600 text-white py-4 rounded-xl shadow hover:bg-blue-700 transition"
        >
          👤 Gestionar Usuarios
        </button>

        <button
          onClick={() => router.push("/admin/courses")}
          className="bg-green-600 text-white py-4 rounded-xl shadow hover:bg-green-700 transition"
        >
          📘 Gestionar Cursos
        </button>

        <button
          onClick={() => router.push("/admin/reports")}
          className="bg-purple-600 text-white py-4 rounded-xl shadow hover:bg-purple-700 transition"
        >
          📊 Ver Reportes
        </button>
        <button onClick={() => router.push("/admin/reports/enrollments")} className="bg-blue-600 text-white p-3 rounded">
  📋 Reporte de Inscripciones
</button>
<button onClick={() => router.push("/admin/reports/sales")} className="bg-purple-600 text-white p-3 rounded">
  💰 Reporte de Ventas
</button>
<button onClick={() => router.push("/admin/reports/performance")} className="bg-green-600 text-white p-3 rounded">
  🎓 Desempeño Académico
</button>

      </div>
    </div>
  );
}
