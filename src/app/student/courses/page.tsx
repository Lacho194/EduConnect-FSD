"use client";
import { useEffect, useState } from "react";

export default function CoursesPage() {
  const [courses, setCourses] = useState<any[]>([]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [userId] = useState(1); // Temporal: luego se usará el ID real del usuario

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    const params = new URLSearchParams();
    if (query) params.append("q", query);
    if (category && category !== "all") params.append("category", category);
    if (minPrice) params.append("minPrice", minPrice);
    if (maxPrice) params.append("maxPrice", maxPrice);

    const res = await fetch(`/api/courses/search?${params.toString()}`);
    const data = await res.json();
    setCourses(data);
  };

  const handleEnroll = async (courseId: number) => {
    const res = await fetch("/api/student/enroll", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, courseId }),
    });

    const data = await res.json();
    alert(data.message);

    // Actualizar la lista si se inscribe
    if (data.message.includes("exitosa")) fetchCourses();
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-700">
        Catálogo de Cursos
      </h1>

      {/* Filtros */}
      <div className="flex flex-wrap gap-3 justify-center mb-6">
        <input
          type="text"
          placeholder="Buscar..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border p-2 rounded w-60"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="all">Todas las categorías</option>
          <option value="Programación">Programación</option>
          <option value="Diseño">Diseño</option>
          <option value="Marketing">Marketing</option>
          <option value="Finanzas">Finanzas</option>
        </select>

        <input
          type="number"
          placeholder="Precio mínimo"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="border p-2 rounded w-32"
        />
        <input
          type="number"
          placeholder="Precio máximo"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="border p-2 rounded w-32"
        />

        <button
          onClick={fetchCourses}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Buscar
        </button>
      </div>

      {/* Resultados */}
      {courses.length === 0 ? (
        <p className="text-center text-gray-500">
          No se encontraron cursos con esos filtros.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="p-4 bg-white border rounded-xl shadow hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold mb-2 text-blue-700">
                {course.title}
              </h2>
              <p className="text-gray-600 mb-2">{course.description}</p>
              <p className="font-bold text-blue-600 mb-2">${course.price}</p>
              <p className="text-sm text-gray-500 mb-3">
                Categoría: {course.category}
              </p>

              <button
                onClick={() => handleEnroll(course.id)}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full"
              >
                Suscribirse
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
