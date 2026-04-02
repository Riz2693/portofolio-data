// src/app/layout.js
import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "../components/Navbar";
import { ThemeProvider } from "../components/ThemeProvider"; // Import provider
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Portofolio Data & AI",
  description: "Portofolio Profesional",
};

export default function RootLayout({ children }) {
  return (
    // Hapus class bg-slate-950 dari tag html jika ada
    <html lang="id" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${inter.className} bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-200 transition-colors duration-300`}
      >
        <ThemeProvider>
          <Navbar />
          {children}
        </ThemeProvider>

      </body>
    </html>
  );
}
