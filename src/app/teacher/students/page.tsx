"use client";
import { useEffect, useState } from "react";

export default function TeacherStudents() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await fetch("/api/teacher/students");
        const data = await res.json();
        setCourses(data);
      } catch (error) {
        console.error("Error cargando estudiantes:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  if (loading) return <p className="text-center mt-10">Cargando...</p>;

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-indigo-700 mb-6">
        Estudiantes por Curso
      </h1>

      {courses.length === 0 ? (
        <p className="text-center text-gray-600">No tienes cursos creados aún.</p>
      ) : (
        courses.map((course) => (
          <div
            key={course.id}
            className="bg-white border rounded-xl shadow p-6 mb-6"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              {course.title}
            </h2>

            {course.enrollments.length === 0 ? (
              <p className="text-gray-500">Aún no hay estudiantes inscritos.</p>
            ) : (
              <table className="w-full border-collapse border text-left">
                <thead>
                  <tr className="bg-gray-100 text-gray-700">
                    <th className="p-2 border">ID</th>
                    <th className="p-2 border">Nombre</th>
                    <th className="p-2 border">Correo</th>
                  </tr>
                </thead>
                <tbody>
                  {course.enrollments.map((enr: any) => (
                    <tr key={enr.id}>
                      <td className="p-2 border">{enr.user.id}</td>
                      <td className="p-2 border">{enr.user.name}</td>
                      <td className="p-2 border">{enr.user.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        ))
      )}
    </div>
  );
}
