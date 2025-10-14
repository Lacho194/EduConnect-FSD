// src/app/student/certificates/page.tsx
"use client";
import { useEffect, useState } from "react";

export default function CertificatesPage() {
  const [certs, setCerts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const userId = 1; // temporal

  useEffect(() => {
    (async () => {
      const res = await fetch(`/api/student/certificates?userId=${userId}`);
      const data = await res.json();
      setCerts(data);
      setLoading(false);
    })();
  }, []);

  if (loading) return <p className="p-8 text-center">Cargando certificados...</p>;

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Mis Certificados 🎓</h1>

      {certs.length === 0 && <p>No tienes certificados aún.</p>}

      <div className="space-y-4">
        {certs.map((c) => (
          <div key={c.id} className="border rounded p-4 flex justify-between items-center">
            <div>
              <p className="font-semibold">{c.course.title}</p>
              <p>Nota: {c.grade.toFixed(2)}%</p>
              <p className="text-sm text-gray-500">
                Fecha: {new Date(c.issueDate).toLocaleDateString()}
              </p>
            </div>
            <a
              href={`/api/student/certificates/${c.id}`}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Descargar PDF
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
