"use client";
import { useRouter } from "next/navigation";

export default function TeacherDashboard() {
  const router = useRouter();

  return (
    <div className="min-h-screen p-10 bg-gray-100">
      <h1 className="text-3xl font-bold mb-8 text-blue-700 text-center">
        👩‍🏫 Panel del Profesor
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <button
          onClick={() => router.push("/teacher/create-course")}
          className="bg-blue-600 text-white py-4 rounded-xl shadow hover:bg-blue-700 transition"
        >
          📘 Crear Curso
        </button>

        <button
          onClick={() => router.push("/teacher/courses")}
          className="bg-yellow-500 text-white py-4 rounded-xl shadow hover:bg-yellow-600 transition"
        >
          📚 Mis Cursos
        </button>

        <button
          onClick={() => router.push("/teacher/students")}
          className="bg-green-600 text-white py-4 rounded-xl shadow hover:bg-green-700 transition"
        >
          👥 Ver Estudiantes
        </button>

        {/* ✅ Ruta corregida */}
        <button
          onClick={() => router.push("/teacher/exams/create")}
          className="bg-purple-600 text-white py-4 rounded-xl shadow hover:bg-purple-700 transition"
        >
          🧾 Crear Evaluación
        </button>
      </div>
    </div>
  );
}
