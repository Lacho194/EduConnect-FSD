"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
      credentials: "include",
    });

    const data = await res.json();

    if (res.ok) {
      const role = data.user.role;
      setMessage(`Inicio de sesión exitoso como ${role}`);

      // ✅ Redirección según rol
      setTimeout(() => {
        if (role === "admin") router.push("/admin");
        else if (role === "teacher") router.push("/teacher");
        else router.push("/student");
      }, 1000);
    } else {
      setMessage(data.message || "Error al iniciar sesión");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg w-96">
        <h1 className="text-2xl font-bold text-center mb-6 text-blue-600">Iniciar Sesión</h1>

        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}
          className="border w-full p-2 mb-3 rounded"
        />

        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}
          className="border w-full p-2 mb-3 rounded"
        />

        <button type="submit" className="bg-blue-600 text-white w-full p-2 rounded hover:bg-blue-700">
          Entrar
        </button>

        {message && <p className="text-center mt-4 text-gray-700">{message}</p>}
      </form>
    </div>
  );
}
