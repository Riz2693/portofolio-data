// src/app/certifications/page.js
"use client";

import Link from "next/link";
import { useState } from "react";
import { profil, sertifikasi } from "../../data";
import { ArrowLeft, ExternalLink } from "lucide-react";
import ChatWidget from "../../components/ChatWidget";
import useIsMobile from "../../hooks/useIsMobile";
import CertificationThumbnail from "../../components/CertificationThumbnail";

export default function AllCertifications() {
    const isMobile = useIsMobile();

    const [activeFilter, setActiveFilter] = useState("Semua");
    const [currentPage, setCurrentPage] = useState(1);
    const certCategories = [
        "Semua",
        "Sertifikat Internasional",
        "Sertifikat Nasional",
        "Sertifikat Course & Specialization",
        "Sertifikat Kelulusan",
    ];

    const filteredCerts =
        activeFilter === "Semua"
            ? sertifikasi || []
            : (sertifikasi || []).filter((s) => s.kategori === activeFilter);

    const ITEMS_PER_PAGE = isMobile ? 6 : 9;

    // Catatan debug pagination:
    // 1) ITEMS_PER_PAGE mengontrol jumlah kartu yang dirender per halaman (9).
    // 2) Saat filter ganti, page direset ke 1 untuk menghindari halaman kosong.
    // 3) Validasi hasil turunan: totalPages, startIndex, dan hasil slice.
    // 4) Jika data tidak tampil, cek kecocokan nilai activeFilter dengan kategori data.
    const totalPages = Math.max(1, Math.ceil(filteredCerts.length / ITEMS_PER_PAGE));
    const currentPageSafe = Math.min(currentPage, totalPages);
    const startIndex = (currentPageSafe - 1) * ITEMS_PER_PAGE;
    const paginatedCerts = filteredCerts.slice(
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
                            href="/#certifications"
                            className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center gap-2 text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition font-medium text-sm md:text-base"
                        >
                            <ArrowLeft size={20} className="hidden sm:inline" />{" "}
                            <span className="hidden sm:inline">Kembali</span>
                        </Link>
                        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
                            Semua Sertifikasi
                        </h1>
                        <p className="mt-4 text-slate-600 dark:text-slate-400 text-sm md:text-base">
                            Jelajahi seluruh lisensi dan sertifikasi keahlian saya.
                        </p>
                    </div>

                    {/* Filter Kategori */}
                    <div className="flex flex-wrap justify-center gap-2 mb-8 md:mb-10 print:hidden">
                        {certCategories.map((kategori, idx) => (
                            <button
                                key={idx}
                                onClick={() => handleFilterChange(kategori)}
                                className={`px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300 ${activeFilter === kategori
                                    ? "bg-purple-600 text-white shadow-sm"
                                    : "bg-white text-slate-600 border border-slate-200 hover:border-purple-500 hover:text-purple-600 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-300 dark:hover:border-purple-400"
                                    }`}
                            >
                                {kategori === "Course & Specialization Certificate"
                                    ? "Course & Specialization Certificate"
                                    : kategori}
                            </button>
                        ))}
                    </div>

                    {/* Grid Semua Sertifikasi */}
                    {paginatedCerts && paginatedCerts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
                            {paginatedCerts.map((item) => (
                                <a
                                    key={item.id}
                                    href={item.link || "#"}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 hover:shadow-lg transition-all duration-300 print:bg-white print:border-slate-200 print:break-inside-avoid overflow-hidden flex flex-col"
                                >
                                    <div className="h-40 md:h-44 w-full bg-slate-100 dark:bg-slate-800 relative overflow-hidden flex items-center justify-center print:hidden shrink-0">
                                        <CertificationThumbnail item={item} />
                                    </div>
                                    <div className="p-4 md:p-5 flex-1 flex flex-col">
                                        <div className="mb-2 print:hidden">
                                            <span className="text-[9px] md:text-[10px] font-medium px-2 py-0.5 rounded bg-purple-50 text-purple-600 border border-purple-100 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800">
                                                {item.kategori || "Certificate"}
                                            </span>
                                        </div>
                                        <h3 className="text-base md:text-lg font-bold mb-2 text-slate-900 dark:text-white print:text-black line-clamp-2">
                                            {item.nama}
                                        </h3>
                                        <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 mb-4 flex-1">
                                            {item.penerbit} • {item.tahun}
                                        </p>
                                        <div className="text-purple-600 dark:text-purple-400 text-xs md:text-sm font-semibold flex items-center gap-1 mt-auto w-fit">
                                            Lihat Kredensial <ExternalLink size={14} />
                                        </div>
                                    </div>
                                </a>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 print:bg-transparent print:border-none print:p-0 flex items-center justify-center min-h-[250px]">
                            <p className="text-sm text-slate-500 dark:text-slate-400 italic text-center print:text-left">
                                Belum ada data {activeFilter.toLowerCase()}.
                            </p>
                        </div>
                    )}

                    {totalPages >= 1 && (
                        <div className="flex items-center justify-center gap-2 mt-8 md:mt-10 print:hidden">
                            <button
                                onClick={handlePrevPage}
                                disabled={currentPageSafe === 1}
                                className="px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 disabled:opacity-50 disabled:cursor-not-allowed hover:border-purple-500 hover:text-purple-600 dark:hover:border-purple-400"
                            >
                                Prev
                            </button>

                            {Array.from({ length: totalPages }, (_, idx) => idx + 1).map(
                                (page) => (
                                    <button
                                        key={page}
                                        onClick={() => setCurrentPage(page)}
                                        className={`w-9 h-9 md:w-10 md:h-10 rounded-full text-xs md:text-sm font-semibold transition-all ${currentPageSafe === page
                                            ? "bg-purple-600 text-white shadow-sm"
                                            : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-purple-500 hover:text-purple-600 dark:hover:border-purple-400"
                                            }`}
                                    >
                                        {page}
                                    </button>
                                ),
                            )}

                            <button
                                onClick={handleNextPage}
                                disabled={currentPageSafe === totalPages}
                                className="px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 disabled:opacity-50 disabled:cursor-not-allowed hover:border-purple-500 hover:text-purple-600 dark:hover:border-purple-400"
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
