"use client";
import { useEffect, useState } from "react";

export default function MyCourses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    async function fetchCourses() {
      const res = await fetch("/api/student/my-courses?userId=1"); // Cambia el ID según tu usuario
      const data = await res.json();
      setCourses(data);
    }
    fetchCourses();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4 text-blue-700">Mis Cursos</h1>
      {courses.length === 0 ? (
        <p>No estás inscrito en ningún curso todavía.</p>
      ) : (
        <ul className="space-y-3">
          {courses.map((course: any) => (
            <li
              key={course.id}
              className="border p-4 bg-white rounded-lg shadow-md hover:bg-blue-50 transition"
            >
              <h2 className="text-lg font-semibold">{course.title}</h2>
              <p className="text-gray-600">{course.description}</p>
              <p className="text-sm text-gray-500">
                Categoría: {course.category || "Sin categoría"}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
