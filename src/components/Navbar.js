"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { name: "Tentang", href: "/#about" },
        { name: "Pengalaman", href: "/#resume_formal" },
        // { name: "Pengalaman Non-Formal", href: "/#resume_nonformal" },
        { name: "Project", href: "/#projects" },
        { name: "Keahlian", href: "/#tech-stack" },
        { name: "Sertifikasi", href: "/#certifications" },
        { name: "Kontak", href: "/#contact" },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-40 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-gray-200 dark:border-slate-800 h-16 transition-colors">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex justify-between items-center">
                <Link
                    href="/"
                    className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent"
                >
                    RisFolio
                </Link>

                {/* Menu Desktop */}
                <div className="hidden md:flex space-x-6 items-center">
                    {navLinks.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-white font-medium transition-colors text-sm"
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>

                {/* Tombol Hamburger Mobile */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden p-2 text-slate-600 dark:text-slate-300 focus:outline-none"
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Menu Mobile */}
            {isOpen && (
                <div className="md:hidden absolute top-16 left-0 right-0 bg-white dark:bg-slate-950 border-b border-gray-200 dark:border-slate-800 shadow-lg flex flex-col px-4 py-4 space-y-4 animate-in slide-in-from-top-2">
                    {navLinks.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            onClick={() => setIsOpen(false)}
                            className="text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-white font-medium transition-colors"
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>
            )}
        </nav>
    );
}
