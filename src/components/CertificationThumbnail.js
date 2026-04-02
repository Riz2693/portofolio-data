"use client";

import { useEffect, useMemo, useState } from "react";
import { FileText, Loader2 } from "lucide-react";
import Image from "next/image";

const getPdfSource = (item) => {
    if (item?.pdfFile && typeof item.pdfFile === "string") {
        return item.pdfFile;
    }

    if (
        item?.link &&
        typeof item.link === "string" &&
        item.link.trim().toLowerCase().endsWith(".pdf")
    ) {
        return item.link;
    }

    return null;
};

const normalizePdfSourceForBrowser = (pdfSource) => {
    if (!pdfSource || typeof pdfSource !== "string") return null;

    try {
        const parsed = new URL(pdfSource);
        if (["http:", "https:"].includes(parsed.protocol)) {
            return `/api/pdf-proxy?url=${encodeURIComponent(parsed.toString())}`;
        }
    } catch {
        // Relative/local path -> gunakan langsung
    }

    return pdfSource;
};

export default function CertificationThumbnail({ item }) {
    const [thumbnailSrc, setThumbnailSrc] = useState(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [hasPdfError, setHasPdfError] = useState(false);

    const pdfSource = useMemo(() => getPdfSource(item), [item]);
    const resolvedPdfSource = useMemo(
        () => normalizePdfSourceForBrowser(pdfSource),
        [pdfSource],
    );

    useEffect(() => {
        let isCancelled = false;

        const generatePdfThumbnail = async () => {
            if (!resolvedPdfSource || item?.image) return;

            setIsGenerating(true);
            setHasPdfError(false);

            try {
                const pdfjsLib = await import("pdfjs-dist");
                const workerUrl = new URL(
                    "pdfjs-dist/build/pdf.worker.min.mjs",
                    import.meta.url,
                ).toString();

                pdfjsLib.GlobalWorkerOptions.workerSrc = workerUrl;

                const loadingTask = pdfjsLib.getDocument(resolvedPdfSource);
                const pdf = await loadingTask.promise;
                const page = await pdf.getPage(1);

                const viewport = page.getViewport({ scale: 1 });
                const targetWidth = 960;
                const scale = targetWidth / viewport.width;
                const scaledViewport = page.getViewport({ scale });

                const canvas = document.createElement("canvas");
                const context = canvas.getContext("2d", { alpha: false });

                if (!context) {
                    throw new Error("Canvas context tidak tersedia.");
                }

                canvas.width = Math.floor(scaledViewport.width);
                canvas.height = Math.floor(scaledViewport.height);

                await page.render({
                    canvasContext: context,
                    viewport: scaledViewport,
                }).promise;

                const dataUrl = canvas.toDataURL("image/webp", 0.88);
                if (!isCancelled) {
                    setThumbnailSrc(dataUrl);
                }

                pdf.destroy();
            } catch (error) {
                console.error("Gagal membuat thumbnail PDF sertifikasi:", error);
                if (!isCancelled) {
                    setHasPdfError(true);
                }
            } finally {
                if (!isCancelled) {
                    setIsGenerating(false);
                }
            }
        };

        generatePdfThumbnail();

        return () => {
            isCancelled = true;
        };
    }, [item?.image, resolvedPdfSource]);

    if (item?.image) {
        return (
            <Image
                src={item.image}
                alt={item.nama}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
        );
    }

    if (thumbnailSrc) {
        return (
            <Image
                src={thumbnailSrc}
                alt={`Thumbnail ${item?.nama || "sertifikasi"}`}
                fill
                unoptimized
                sizes="(max-width: 768px) 100vw, 33vw"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
        );
    }

    if (isGenerating) {
        return (
            <div className="flex flex-col items-center gap-2 text-slate-500 dark:text-slate-400">
                <Loader2 size={20} className="animate-spin" />
                <span className="text-xs">Generating PDF preview...</span>
            </div>
        );
    }

    if (resolvedPdfSource) {
        return (
            <div className="flex flex-col items-center gap-2 text-slate-500 dark:text-slate-400">
                <FileText size={24} className="text-purple-500 dark:text-purple-400" />
                <span className="text-xs text-center px-3">
                    {hasPdfError ? "Preview PDF gagal dimuat" : "PDF tersedia"}
                </span>
            </div>
        );
    }

    return (
        <span className="text-xs text-slate-400 dark:text-slate-500">
            Image Placeholder
        </span>
    );
}