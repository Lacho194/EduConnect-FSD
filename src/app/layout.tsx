import "./globals.css";
import Navbar from "@/components/Navbar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <Navbar />
        <main className="p-6 bg-gray-100 min-h-screen">{children}</main>
      </body>
    </html>
  );
}
