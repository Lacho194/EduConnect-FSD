"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function SolveExamPage() {
  const { id } = useParams();
  const [exam, setExam] = useState<any>(null);
  const [answers, setAnswers] = useState<any>({});
  const [result, setResult] = useState<any>(null);

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
    const res = await fetch("/api/student/submit-exam", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: 1, // temporal
        examId: Number(id),
        answers,
      }),
    });
    const data = await res.json();
    setResult(data);
  };

  if (!exam) return <p className="text-center p-8">Cargando examen...</p>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4 text-blue-700">{exam.title}</h1>

      {!result ? (
        <>
          {exam.questions?.map((q: any, i: number) => (
            <div key={q.id} className="mb-4">
              <p className="font-semibold">
                {i + 1}. {q.text}
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
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Enviar
          </button>
        </>
      ) : (
        <div className="text-center mt-6">
          <p className="text-2xl font-semibold">
            Tu calificación:{" "}
            <span className="text-blue-700">{result.score.toFixed(2)}%</span>
          </p>
          <p className="mt-3 text-gray-700">{result.feedback}</p>
          {result.passed && (
            <a
              href="/student/certificates"
              className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Ver Certificado 🎓
            </a>
          )}
        </div>
      )}
    </div>
  );
}
