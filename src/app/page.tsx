"use client";

import { useEffect, useState } from "react";

export default function HomePage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();
        if (data.user) setUser(data.user);
      } catch (error) {
        console.error("Error al obtener usuario:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/login";
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-700 text-xl">
        Cargando...
      </div>
    );

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-blue-50">
      {user ? (
        <div className="bg-white p-10 rounded-2xl shadow-lg text-center">
          <h1 className="text-3xl font-bold text-blue-700 mb-2">
            ¡Bienvenido, {user.name}!
          </h1>
          <p className="text-gray-600 mb-6">
            Has iniciado sesión como <strong>{user.role}</strong>.
          </p>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition"
          >
            Cerrar Sesión
          </button>
        </div>
      ) : (
        <p className="text-gray-700 text-xl">No se encontró información de usuario.</p>
      )}
    </div>
  );
}
