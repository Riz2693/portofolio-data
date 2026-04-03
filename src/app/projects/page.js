// src/app/projects/page.js
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { profil, projects } from "../../data";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ChatWidget from "../../components/ChatWidget";
import useIsMobile from "../../hooks/useIsMobile";

export default function AllProjects() {
    const isMobile = useIsMobile();

    const [activeFilter, setActiveFilter] = useState("Semua");
    const [currentPage, setCurrentPage] = useState(1);
    const allCategories = [
        "Semua",
        "End-to-End Project",
        "Data Science",
        "Data Engineering",
        "Data Analysis",
        "Dashboard",
        "Publikasi",
        "ML/DL Model",
        "Web Development",
        "Mobile App",
        // ...new Set((projects || []).flatMap((p) => p.kategori)),
    ];

    const filteredProjects =
        activeFilter === "Semua"
            ? projects || []
            : (projects || []).filter((p) => p.kategori.includes(activeFilter));

    const ITEMS_PER_PAGE = isMobile ? 6 : 9;

    // Catatan debug pagination:
    // 1) ITEMS_PER_PAGE menentukan jumlah kartu per halaman (saat ini 9).
    // 2) Filter kategori selalu reset ke page 1 agar tidak muncul halaman kosong semu.
    // 3) totalPages + slice(start, end) adalah boundary utama data yang tampil.
    // 4) Jika UI kosong, cek: filteredProjects.length, currentPage, totalPages, startIndex.
    const totalPages = Math.max(
        1,
        Math.ceil(filteredProjects.length / ITEMS_PER_PAGE),
    );
    const currentPageSafe = Math.min(currentPage, totalPages);
    const startIndex = (currentPageSafe - 1) * ITEMS_PER_PAGE;
    const paginatedProjects = filteredProjects.slice(
        startIndex,
        startIndex + ITEMS_PER_PAGE,
    );

    const handleFilterChange = (kategori) => {
        setActiveFilter(kategori);
        setCurrentPage(1);
    };

    const handlePrevPage = () => {
        setCurrentPage((prev) => Math.max(1, prev - 1));
    };

    const handleNextPage = () => {
        setCurrentPage((prev) => Math.min(totalPages, prev + 1));
    };

    return (
        <div className="bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors text-slate-900 dark:text-slate-200 font-sans">

            <main className="min-h-screen pt-24 pb-16 px-4 bg-slate-50 dark:bg-slate-950 transition-colors font-sans">
                <div className="px-0 md:px-4 max-w-7xl mx-auto">
                    {/* Header & Back Button */}
                    <div className="mb-12 text-center relative">
                        <Link
                            href="/#projects"
                            className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center gap-2 text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition font-medium text-sm md:text-base"
                        >
                            <ArrowLeft size={20} className="hidden sm:inline" />{" "}
                            <span className="hidden sm:inline">Kembali</span>
                        </Link>
                        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
                            Semua Project
                        </h1>
                        <p className="mt-4 text-slate-600 dark:text-slate-400 text-sm md:text-base">
                            Jelajahi portofolio lengkap saya berdasarkan kategori.
                        </p>
                    </div>

                    {/* Filter Kategori */}
                    <div className="flex flex-wrap justify-center gap-2 mb-8 md:mb-10 print:hidden">
                        {allCategories.map((kategori, idx) => (
                            <button
                                key={idx}
                                onClick={() => handleFilterChange(kategori)}
                                className={`px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300 ${activeFilter === kategori
                                    ? "bg-blue-600 text-white shadow-sm"
                                    : "bg-white text-slate-600 border border-slate-200 hover:border-blue-500 hover:text-blue-600 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-300 dark:hover:border-blue-400"
                                    }`}
                            >
                                {kategori}
                            </button>
                        ))}
                    </div>

                    {/* Grid Semua Project (Diperbarui dengan Gambar & Elemen Sejajar) */}
                    {paginatedProjects && paginatedProjects.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
                            {paginatedProjects.map((item) => (
                                <div
                                    key={item.id}
                                    className="group bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 hover:shadow-lg transition-all duration-300 print:bg-white print:border-slate-200 print:break-inside-avoid overflow-hidden flex flex-col"
                                >
                                    {/* Gambar Cover Project */}
                                    <div className="h-40 md:h-44 w-full bg-slate-100 dark:bg-slate-800 relative overflow-hidden flex items-center justify-center print:hidden shrink-0">
                                        {item.image ? (
                                            <Image
                                                src={item.image}
                                                alt={item.judul}
                                                fill
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                unoptimized
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        ) : (
                                            <span className="text-xs text-slate-400 dark:text-slate-500">
                                                Image Placeholder
                                            </span>
                                        )}
                                    </div>

                                    {/* Konten Text (Sejajar Sempurna) */}
                                    <div className="p-4 md:p-5 flex-1 flex flex-col">
                                        <h3 className="text-base md:text-xl font-bold mb-3 text-slate-900 dark:text-white">
                                            {item.judul}
                                        </h3>
                                        <div className="flex flex-wrap gap-1.5 mb-3">
                                            {item.kategori.map((tag, idx) => (
                                                <span
                                                    key={idx}
                                                    className="text-[9px] md:text-[10px] font-medium px-2 py-0.5 rounded bg-blue-50 text-blue-600 border border-blue-100 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800 print:bg-blue-50 print:text-blue-800 print:border-blue-200"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                        {/* flex-1 memastikan deskripsi mendorong tombol ke paling bawah sejajar dengan kartu lain */}
                                        <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-3 print:text-slate-700 flex-1">
                                            {item.ringkasan}
                                        </p>
                                        <Link
                                            href={`/projects/${item.id}`}
                                            className="text-blue-600 dark:text-blue-400 text-[11px] md:text-xs font-semibold hover:underline flex items-center gap-1 print:hidden mt-auto w-fit"
                                        >
                                            Lihat Detail <ArrowRight size={14} />
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 print:bg-transparent print:border-none print:p-0 flex items-center justify-center min-h-[250px]">
                            <p className="text-sm text-slate-500 dark:text-slate-400 italic text-center print:text-left">
                                Belum ada data project {activeFilter.toLowerCase()}.
                            </p>
                        </div>
                    )}
                    {totalPages >= 1 && (
                        <div className="flex items-center justify-center gap-2 mt-8 md:mt-10 print:hidden">
                            <button
                                onClick={handlePrevPage}
                                disabled={currentPageSafe === 1}
                                className="px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 disabled:opacity-50 disabled:cursor-not-allowed hover:border-blue-500 hover:text-blue-600 dark:hover:border-blue-400"
                            >
                                Prev
                            </button>

                            {Array.from({ length: totalPages }, (_, idx) => idx + 1).map(
                                (page) => (
                                    <button
                                        key={page}
                                        onClick={() => setCurrentPage(page)}
                                        className={`w-9 h-9 md:w-10 md:h-10 rounded-full text-xs md:text-sm font-semibold transition-all ${currentPageSafe === page
                                            ? "bg-blue-600 text-white shadow-sm"
                                            : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-blue-500 hover:text-blue-600 dark:hover:border-blue-400"
                                            }`}
                                    >
                                        {page}
                                    </button>
                                ),
                            )}

                            <button
                                onClick={handleNextPage}
                                disabled={currentPageSafe === totalPages}
                                className="px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 disabled:opacity-50 disabled:cursor-not-allowed hover:border-blue-500 hover:text-blue-600 dark:hover:border-blue-400"
                            >
                                Next
                            </button>
                        </div>
                    )}
                </div>
            </main>

            <footer className="py-6 flex flex-col items-center justify-center border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-500 dark:text-slate-400 text-xs md:text-sm print:hidden">
                <p>
                    &copy; {new Date().getFullYear()} {profil?.nama || "Nama Anda"}. Built
                    with Next.js & Tailwind.
                </p>
            </footer>

            <div className="print:hidden">
                <ChatWidget />
            </div>
        </div>
    );
}
