"use client";
import { useRouter } from "next/navigation";

export default function StudentDashboard() {
  const router = useRouter();

  return (
    <div className="min-h-screen p-10 bg-gray-100">
      <h1 className="text-3xl font-bold mb-8 text-blue-700 text-center">
        🎓 Panel del Estudiante
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <button
          onClick={() => router.push("/student/courses")}
          className="bg-blue-600 text-white py-4 rounded-xl shadow hover:bg-blue-700 transition"
        >
          📚 Ver Catálogo de Cursos
        </button>

        <button
          onClick={() => router.push("/student/my-courses")}
          className="bg-green-600 text-white py-4 rounded-xl shadow hover:bg-green-700 transition"
        >
          🧾 Mis Cursos
        </button>

        <button
          onClick={() => router.push("/student/exam")}
          className="bg-purple-600 text-white py-4 rounded-xl shadow hover:bg-purple-700 transition"
        >
          🧠 Resolver Evaluación
        </button>

        <button
          onClick={() => router.push("/student/certificates")}
          className="bg-yellow-500 text-white py-4 rounded-xl shadow hover:bg-yellow-600 transition"
        >
          🏅 Ver Certificados
        </button>
      </div>
    </div>
  );
}
