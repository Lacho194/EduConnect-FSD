"use client";
import { useEffect, useState } from "react";

export default function StudentExamsPage() {
  const [exams, setExams] = useState<any[]>([]);

  useEffect(() => {
    const fetchExams = async () => {
      // Temporalmente usamos un ID fijo de estudiante (ajusta cuando tengas login real)
      const res = await fetch("/api/student/exams?userId=1");
      const data = await res.json();
      setExams(data);
    };
    fetchExams();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
        🧾 Evaluaciones Disponibles
      </h1>

      {exams.length === 0 ? (
        <p className="text-center text-gray-500">
          No hay evaluaciones disponibles por el momento.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {exams.map((exam) => (
            <div
              key={exam.id}
              className="p-4 bg-white shadow rounded-xl border hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold mb-2 text-blue-600">
                {exam.title}
              </h2>
              <p className="text-gray-600 mb-2">
                Curso: {exam.course.title}
              </p>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                onClick={() =>
                  window.location.href = `/student/exams/${exam.id}`
                }
              >
                Resolver Evaluación
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
