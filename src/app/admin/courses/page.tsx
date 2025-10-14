"use client";
import { useEffect, useState } from "react";

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<any[]>([]);
  const [message, setMessage] = useState("");

  const fetchCourses = async () => {
    const res = await fetch("/api/courses/list");
    const data = await res.json();
    setCourses(data);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("¿Eliminar este curso?")) return;
    const res = await fetch(`/api/courses/delete?id=${id}`, { method: "DELETE" });
    const data = await res.json();
    setMessage(data.message);
    fetchCourses();
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-blue-600 mb-4">Gestión de Cursos (Admin)</h1>

      {message && <p className="text-green-600 mb-3">{message}</p>}

      {courses.length === 0 ? (
        <p>No hay cursos disponibles.</p>
      ) : (
        <table className="w-full border-collapse bg-white shadow rounded">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">ID</th>
              <th className="border p-2">Título</th>
              <th className="border p-2">Docente</th>
              <th className="border p-2">Precio</th>
              <th className="border p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((c) => (
              <tr key={c.id}>
                <td className="border p-2 text-center">{c.id}</td>
                <td className="border p-2">{c.title}</td>
                <td className="border p-2">{c.teacher.name}</td>
                <td className="border p-2 text-center">${c.price.toFixed(2)}</td>
                <td className="border p-2 text-center">
                  <button
                    onClick={() => handleDelete(c.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
