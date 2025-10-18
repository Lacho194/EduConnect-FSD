// Actualización HU5: interfaz y lógica de presentación de evaluación


"use client";
import { useEffect, useState } from "react";

export default function StudentExamsPage() {
  const [exams, setExams] = useState([]);

  useEffect(() => {
    fetch("/api/student/exams")
      .then((res) => res.json())
      .then((data) => setExams(data));
  }, []);

  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-blue-600 text-center mb-6">
        🧠 Evaluaciones Disponibles
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {exams.map((exam: any) => (
          <div key={exam.id} className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-xl font-bold mb-2">{exam.title}</h2>
            <p className="text-gray-600 mb-2">Curso: {exam.course?.title}</p>
            <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
              Resolver Evaluación
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
