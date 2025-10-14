"use client";

import { useState } from "react";

export default function CreateCoursePage() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category: "Programación",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    const res = await fetch("/api/teacher/create-course", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    setMessage(data.message);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-96"
      >
        <h1 className="text-2xl font-bold text-center mb-6 text-blue-600">
          Crear Nuevo Curso
        </h1>

        <input
          type="text"
          name="title"
          placeholder="Título del curso"
          onChange={handleChange}
          className="border w-full p-2 mb-3 rounded"
        />

        <textarea
          name="description"
          placeholder="Descripción del curso"
          onChange={handleChange}
          className="border w-full p-2 mb-3 rounded"
        />

        <input
          type="number"
          name="price"
          placeholder="Precio (USD)"
          onChange={handleChange}
          className="border w-full p-2 mb-3 rounded"
        />

        {/* 🔽 Selector de categoría */}
        <select
  name="category"
  value={form.category}
  onChange={handleChange}
  className="border p-2 rounded w-full mb-3"
>
  <option value="">Selecciona categoría</option>
  <option value="Programación">Programación</option>
  <option value="Diseño">Diseño</option>
  <option value="Marketing">Marketing</option>
  <option value="Idiomas">Idiomas</option>
  <option value="Negocios">Negocios</option>
  <option value="Ciencias">Ciencias</option>
</select>


        <button
          type="submit"
          className="bg-blue-600 text-white w-full p-2 rounded hover:bg-blue-700"
        >
          Crear Curso
        </button>

        {message && (
          <p className="text-center mt-4 text-gray-700">{message}</p>
        )}
      </form>
    </div>
  );
}
