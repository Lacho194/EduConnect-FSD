"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student", // 👈 valor inicial
  });
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (res.ok) {
      setMessage("Registro exitoso, redirigiendo...");
      setTimeout(() => router.push("/login"), 1500);
    } else {
      setMessage(data.message || "Error al registrarse");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-96"
      >
        <h1 className="text-2xl font-bold text-center mb-6 text-blue-600">
          Crear Cuenta
        </h1>

        <input
          type="text"
          name="name"
          placeholder="Nombre completo"
          onChange={handleChange}
          className="border w-full p-2 mb-3 rounded"
        />

        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          onChange={handleChange}
          className="border w-full p-2 mb-3 rounded"
        />

        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          onChange={handleChange}
          className="border w-full p-2 mb-3 rounded"
        />

        {/* 👇 Selector de rol */}
        <select
          name="role"
          onChange={handleChange}
          className="border w-full p-2 mb-3 rounded"
        >
          <option value="student">Estudiante</option>
          <option value="teacher">Docente</option>
          <option value="admin">Administrador</option>
        </select>

        <button
          type="submit"
          className="bg-blue-600 text-white w-full p-2 rounded hover:bg-blue-700"
        >
          Registrarse
        </button>

        {message && (
          <p className="text-center mt-4 text-gray-700">{message}</p>
        )}
      </form>
    </div>
  );
}
