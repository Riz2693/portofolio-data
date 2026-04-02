// src/app/experience/[id]/page.js
"use client";

import { useRouter } from "next/navigation";
import { use } from "react";
import { profil, pengalaman } from "../../../data";
import { ArrowLeft, Briefcase, Calendar } from "lucide-react";
import ChatWidget from "../../../components/ChatWidget";

export default function ExperienceDetail({ params }) {
    const router = useRouter();
    const { id } = use(params);
    const item = pengalaman.find((p) => p.id.toString() === id);

    if (!item) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 transition-colors">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                    Pengalaman Tidak Ditemukan
                </h1>
                <button
                    onClick={() => router.back()}
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                    &larr; Kembali
                </button>
            </div>
        );
    }

    return (
        <div className="bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors text-slate-900 dark:text-slate-200 font-sans">

            <main className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-24 pb-20 px-4 transition-colors font-sans">
                <div className="max-w-7xl mx-auto bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 md:p-12 transition-colors">
                    {/* Tombol Kembali Dinamis */}
                    <button
                        onClick={() => router.back()}
                        className="inline-flex items-center text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 mb-8 transition-colors font-medium text-sm md:text-base"
                    >
                        <ArrowLeft size={20} className="mr-2" /> Kembali
                    </button>

                    <div className="mb-8 border-b border-slate-100 dark:border-slate-800 pb-8">
                        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4 leading-tight">
                            {item.peran}
                        </h1>

                        <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-base md:text-lg">
                            <div className="flex items-center text-blue-600 dark:text-blue-400 font-semibold">
                                <Briefcase size={20} className="mr-2" />
                                {item.instansi}
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-3 mt-6">
                            <span className="inline-flex items-center text-xs md:text-sm font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-4 py-1.5 rounded-full border border-slate-200 dark:border-slate-700">
                                <Calendar size={16} className="mr-2" /> {item.tahun}
                            </span>
                            <span className="inline-flex items-center text-xs md:text-sm font-bold text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-900/30 px-4 py-1.5 rounded-full border border-orange-200 dark:border-orange-800/50">
                                {item.tipe}
                            </span>
                        </div>
                    </div>

                    <div className="text-base md:text-lg leading-relaxed text-slate-700 dark:text-slate-300 space-y-6">
                        {item.detail.split("\n").map((paragraph, idx) => (
                            <p key={idx}>{paragraph}</p>
                        ))}
                    </div>
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
        </div >
    );
}
