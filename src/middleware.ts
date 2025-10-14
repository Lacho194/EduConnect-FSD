// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Para la Épica 3 vamos a NO bloquear /student ni las rutas públicas.
 * Solo aplicaremos protección (si quieres) a /admin y /teacher más adelante.
 */

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Rutas que siempre permitimos (públicas)
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/auth") ||
    pathname === "/" ||
    pathname.startsWith("/public")
  ) {
    return NextResponse.next();
  }

  // Si quieres proteger admin y teacher solo activa la lógica siguiente.
  // Por ahora NO redirigimos al login para /student.
  return NextResponse.next();
}

// Solo aplicar middleware a /admin y /teacher si decides hacerlo en el futuro.
// Dejar matcher vacío o limitarlo si quieres controlar rutas concretas.
export const config = {
  matcher: [
    // si más adelante quieres proteger estas rutas, descomenta:
    // "/admin/:path*",
    // "/teacher/:path*",
  ],
};
s