"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function SolveExamPage() {
  const { id } = useParams();
  const [exam, setExam] = useState<any>(null);
  const [answers, setAnswers] = useState<any>({});

  useEffect(() => {
    const fetchExam = async () => {
      const res = await fetch(`/api/exams/${id}`);
      const data = await res.json();
      setExam(data);
    };
    fetchExam();
  }, [id]);

  const handleChange = (qId: number, value: string) => {
    setAnswers({ ...answers, [qId]: value });
  };

  const handleSubmit = async () => {
    alert("✅ Respuestas enviadas correctamente (simulación)");
  };

  if (!exam) return <p className="text-center p-8">Cargando evaluación...</p>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4 text-blue-700">{exam.title}</h1>

      {exam.questions.map((q: any, index: number) => (
        <div key={q.id} className="mb-4">
          <p className="font-semibold">
            {index + 1}. {q.text}
          </p>
          <input
            type="text"
            placeholder="Tu respuesta..."
            className="border p-2 rounded w-full mt-2"
            value={answers[q.id] || ""}
            onChange={(e) => handleChange(q.id, e.target.value)}
          />
        </div>
      ))}

      <button
        onClick={handleSubmit}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
      >
        Enviar Respuestas
      </button>
    </div>
  );
}
