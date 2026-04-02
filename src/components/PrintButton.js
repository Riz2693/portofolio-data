// src/components/PrintButton.js
"use client";

import { useReactToPrint } from "react-to-print";
import { Printer } from "lucide-react";

export default function PrintButton({ contentRef }) {
    // Hook untuk menangani proses print
    const handlePrint = useReactToPrint({
        contentRef, // Mengambil referensi konten yang mau diprint
        documentTitle: "Portofolio - Muhammad Faris Akbar",
        onAfterPrint: () => console.log("Berhasil diprint!"),
    });

    return (
        <button
            onClick={handlePrint}
            className="flex items-center gap-2 bg-slate-800 text-slate-200 border border-slate-700 px-6 py-3 rounded-full hover:bg-slate-700 hover:text-white transition font-semibold text-xs md:text-sm shadow-lg"
        >
            <Printer size={18} /> Save as PDF
        </button>
    );
}
