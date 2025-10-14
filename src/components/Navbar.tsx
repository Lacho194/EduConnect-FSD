"use client";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  return (
    <nav className="flex justify-between items-center bg-blue-600 text-white p-4 shadow-md">
      <h1
        className="text-xl font-bold cursor-pointer"
        onClick={() => router.push("/")}
      >
        EduConnect
      </h1>

      <div className="flex gap-4">
        <button
          onClick={() => router.push("/student/courses")}
          className="hover:underline"
        >
          Catálogo
        </button>

        <button
          onClick={() => router.push("/student/my-courses")}
          className="hover:underline"
        >
          Mis Cursos
        </button>

        <button
          onClick={() => router.push("/profile")}
          className="hover:underline"
        >
          Perfil
        </button>

        <button
          onClick={() => router.push("/auth/login")}
          className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
        >
          Cerrar sesión
        </button>
      </div>
    </nav>
  );
}
