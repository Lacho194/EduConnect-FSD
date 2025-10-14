"use client";
import { useState, useEffect } from "react";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [form, setForm] = useState({ name: "", email: "", role: "" });
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch("/api/auth/me");
      const data = await res.json();
      if (res.ok) {
        setUser(data.user);
        setForm({
          name: data.user.name,
          email: data.user.email,
          role: data.user.role,
        });
      }
    };
    fetchUser();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/user/update", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setMessage(data.message);
  };

  if (!user) return <p className="text-center mt-10">Cargando perfil...</p>;

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-8 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">
        Perfil de Usuario
      </h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <label className="block text-gray-700">Nombre:</label>
        <input
          type="text"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border w-full p-2 rounded"
        />

        <label className="block text-gray-700">Correo:</label>
        <input
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="border w-full p-2 rounded"
        />

        <label className="block text-gray-700">Rol:</label>
        <input
          type="text"
          value={form.role}
          disabled
          className="border w-full p-2 rounded bg-gray-100"
        />

        <label className="block text-gray-700">Fecha de creación:</label>
        <p className="border p-2 rounded bg-gray-50">{new Date(user.createdAt).toLocaleString()}</p>

        <button
          type="submit"
          className="bg-blue-600 text-white w-full p-2 rounded hover:bg-blue-700"
        >
          Guardar cambios
        </button>
      </form>

      {message && <p className="mt-4 text-center text-green-700">{message}</p>}
    </div>
  );
}
