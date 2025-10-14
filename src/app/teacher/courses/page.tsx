"use client";
import { useEffect, useState } from "react";

export default function TeacherCourses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchMyCourses = async () => {
      const res = await fetch("/api/courses/mycourses");
      const data = await res.json();
      setCourses(data);
    };
    fetchMyCourses();
  }, []);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-indigo-700 mb-6">
        Mis Cursos
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        {courses.map((c: any) => (
          <div key={c.id} className="border p-4 rounded-xl shadow bg-white">
            <h2 className="text-xl font-semibold">{c.title}</h2>
            <p className="text-gray-600">{c.description}</p>
            <p className="text-sm text-gray-500 mt-2">Precio: ${c.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
