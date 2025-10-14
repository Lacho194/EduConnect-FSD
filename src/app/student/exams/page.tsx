// src/app/student/exams/[id]/page.tsx
"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function SolveExamPage() {
  const { id } = useParams();
  const [exam, setExam] = useState<any>(null);
  const [answers, setAnswers] = useState<Record<number,string>>({});
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    (async ()=> {
      const res = await fetch(`/api/exams/${id}`);
      const data = await res.json();
      setExam(data);
    })();
  }, [id]);

  const handleChange = (qId:number, val:string) => {
    setAnswers(prev => ({...prev, [qId]: val}));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/student/submit-exam", {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({ userId: 1, examId: Number(id), answers })
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      alert("Error al enviar respuestas");
    } finally { setLoading(false); }
  };

  if (!exam) return <p className="p-8 text-center">Cargando examen...</p>;

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{exam.title}</h1>

      {!result ? (
        <>
          {exam.questions?.length ? exam.questions.map((q:any,i:number)=>(
            <div key={q.id} className="mb-4 border p-3 rounded">
              <p className="font-semibold">{i+1}. {q.text}</p>
              <input className="w-full border p-2 rounded mt-2" value={answers[q.id]||""} onChange={(e)=>handleChange(q.id, e.target.value)} placeholder="Tu respuesta..." />
            </div>
          )) : <p>No hay preguntas para este examen.</p>}

          <button disabled={loading} onClick={handleSubmit} className="bg-green-600 text-white px-4 py-2 rounded">
            {loading? "Enviando..." : "Enviar respuestas"}
          </button>
        </>
      ) : (
        <div className="text-center">
          <p className="text-2xl font-semibold">Tu calificación: <span className={result.passed ? "text-green-700" : "text-red-600"}>{Number(result.score).toFixed(2)}%</span></p>
          <p className="mt-2">{result.feedback}</p>
          {result.passed && <a className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded" href="/student/certificates">Ver certificado 🎓</a>}
        </div>
      )}
    </div>
  );
}
