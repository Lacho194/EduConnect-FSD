"use client";
import { useEffect, useState } from "react";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);

  const loadUsers = async () => {
    const res = await fetch("/api/admin/users");
    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const changeRole = async (id: number, role: string) => {
    await fetch("/api/admin/change-role", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, role }),
    });
    loadUsers();
  };

  const deleteUser = async (id: number) => {
    await fetch(`/api/admin/delete-user?id=${id}`, { method: "DELETE" });
    loadUsers();
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-red-700 mb-6">
        Gestión de Usuarios
      </h1>

      <table className="w-full bg-white rounded shadow">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-3">ID</th>
            <th className="p-3">Nombre</th>
            <th className="p-3">Correo</th>
            <th className="p-3">Rol</th>
            <th className="p-3">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u: any) => (
            <tr key={u.id} className="border-b">
              <td className="p-3">{u.id}</td>
              <td className="p-3">{u.name}</td>
              <td className="p-3">{u.email}</td>
              <td className="p-3">{u.role}</td>
              <td className="p-3 flex gap-2">
                <button
                  onClick={() => changeRole(u.id, "teacher")}
                  className="bg-indigo-500 text-white px-2 py-1 rounded"
                >
                  Teacher
                </button>
                <button
                  onClick={() => changeRole(u.id, "student")}
                  className="bg-blue-500 text-white px-2 py-1 rounded"
                >
                  Student
                </button>
                <button
                  onClick={() => deleteUser(u.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
