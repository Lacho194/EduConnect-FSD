// src/app/teacher/exams/create/page.tsx
"use client";
import { useEffect, useState } from "react";

export default function CreateExamPage() {
  const [courses, setCourses] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [courseId, setCourseId] = useState("");
  const [questions, setQuestions] = useState([{ text: "", correctAnswer: "" }]);
  const [message, setMessage] = useState("");

  // temporal: teacherId = 1 (si tienes auth, reemplaza por ID real)
  const teacherId = 1;

  useEffect(() => {
    const fetchCourses = async () => {
      const res = await fetch(`/api/teacher/courses?teacherId=${teacherId}`);
      const data = await res.json();
      setCourses(Array.isArray(data) ? data : []);
    };
    fetchCourses();
  }, []);

  const handleQuestionChange = (i: number, field: string, val: string) => {
    const arr = [...questions];
    (arr[i] as any)[field] = val;
    setQuestions(arr);
  };

  const addQuestion = () => setQuestions([...questions, { text: "", correctAnswer: "" }]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!title || !courseId) {
      setMessage("Completa título y curso.");
      return;
    }
    if (questions.some((q) => !q.text || !q.correctAnswer)) {
      setMessage("Completa todas las preguntas y respuestas correctas.");
      return;
    }

    const res = await fetch("/api/teacher/create-exam", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, courseId: Number(courseId), questions }),
    });

    if (res.ok) {
      const body = await res.json();
      setMessage("Examen creado ✅");
      setTitle("");
      setCourseId("");
      setQuestions([{ text: "", correctAnswer: "" }]);
    } else {
      const err = await res.json();
      setMessage(`Error: ${err?.message || res.statusText}`);
    }
  };

  return (
    <div className="p-8 max-w-3xl mx-auto bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Crear Evaluación</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Título" className="w-full border p-2 rounded" />

        <select value={courseId} onChange={(e)=>setCourseId(e.target.value)} className="w-full border p-2 rounded">
          <option value="">-- Selecciona curso --</option>
          {courses.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
        </select>

        <div>
          <h3 className="font-semibold mb-2">Preguntas</h3>
          {questions.map((q, i) => (
            <div key={i} className="mb-2 border p-2 rounded">
              <input placeholder="Texto pregunta" value={q.text} onChange={(e)=>handleQuestionChange(i,'text',e.target.value)} className="w-full border p-2 rounded mb-2" />
              <input placeholder="Respuesta correcta" value={q.correctAnswer} onChange={(e)=>handleQuestionChange(i,'correctAnswer',e.target.value)} className="w-full border p-2 rounded" />
            </div>
          ))}
          <button type="button" onClick={addQuestion} className="bg-gray-200 px-3 py-1 rounded">+ Agregar</button>
        </div>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Crear examen</button>
        {message && <p className="mt-2">{message}</p>}
      </form>
    </div>
  );
}
