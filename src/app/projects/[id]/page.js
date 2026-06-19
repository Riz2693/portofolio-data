// src/app/projects/[id]/page.js
"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { profil, projects } from "../../../data";
import { ArrowLeft, ExternalLink, Link2, Video } from "lucide-react";
import ChatWidget from "../../../components/ChatWidget";
import { useI18n } from "../../../i18n";
import translations from "../../../data_en";

const normalizeAdditionalInfo = (additionalInfo = {}) => {
    const links = Array.isArray(additionalInfo.links)
        ? additionalInfo.links
            .filter((item) => item?.url)
            .map((item) => ({
                label: item.label || "Tautan",
                url: item.url,
                type: item.type || "referensi",
            }))
        : [];

    const videos = Array.isArray(additionalInfo.videos)
        ? additionalInfo.videos
            .filter((item) => item?.url || item?.embedUrl)
            .map((item) => ({
                title: item.title || "Video",
                url: item.url || null,
                embedUrl: item.embedUrl || null,
            }))
        : [];

    const notes = Array.isArray(additionalInfo.notes)
        ? additionalInfo.notes.filter(Boolean)
        : [];

    const flowcharts = Array.isArray(additionalInfo.flowcharts)
        ? additionalInfo.flowcharts
            .filter((f) => f?.image || f?.url || (Array.isArray(f?.steps) && f.steps.length > 0))
            .map((f) => ({
                title: f.title || "Flowchart",
                image: f.image || f.url || null,
                steps: Array.isArray(f.steps) ? f.steps.filter(Boolean) : [],
                description: f.description || null,
            }))
        : [];

    return {
        links: [...links],
        videos,
        notes,
        flowcharts,
    };
};

const getVideoEmbedUrl = (video) => {
    if (video?.embedUrl) return video.embedUrl;
    if (!video?.url) return null;

    try {
        const parsedUrl = new URL(video.url);
        const host = parsedUrl.hostname.replace("www.", "");

        if (host === "youtube.com" || host === "m.youtube.com") {
            const videoId = parsedUrl.searchParams.get("v");
            if (videoId) return `https://www.youtube.com/embed/${videoId}`;

            if (parsedUrl.pathname.startsWith("/shorts/")) {
                const shortId = parsedUrl.pathname.split("/")[2];
                if (shortId) return `https://www.youtube.com/embed/${shortId}`;
            }

            if (parsedUrl.pathname.startsWith("/embed/")) {
                return `https://www.youtube.com${parsedUrl.pathname}`;
            }
        }

        if (host === "youtu.be") {
            const shortId = parsedUrl.pathname.replace("/", "").trim();
            if (shortId) return `https://www.youtube.com/embed/${shortId}`;
        }

        if (host === "vimeo.com") {
            const vimeoId = parsedUrl.pathname.split("/").filter(Boolean)[0];
            if (vimeoId) return `https://player.vimeo.com/video/${vimeoId}`;
        }
    } catch {
        return null;
    }

    return null;
};

export default function ProjectDetail({ params }) {
    const router = useRouter();
    const { id } = useParams();
    const project = projects.find((p) => p.id.toString() === id);

    const { t, lang } = useI18n();

    if (!project) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 transition-colors">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                    {t("projectNotFound")}
                </h1>
                <button
                    onClick={() => router.back()}
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                    &larr; <span data-i18n-key="back">{t("back")}</span>
                </button>
            </div>
        );
    }

    const additionalInfo = normalizeAdditionalInfo(project.additionalInfo);
    const hasAdditionalInfo =
        additionalInfo.links.length > 0 ||
        additionalInfo.videos.length > 0 ||
        additionalInfo.notes.length > 0 ||
        additionalInfo.flowcharts.length > 0;

    const tr = translations[project.id] || {};
    const title = lang === "en" ? tr.judul || project.judul : project.judul;
    const summary = lang === "en" ? tr.ringkasan || project.ringkasan : project.ringkasan;
    const content = lang === "en" ? tr.detail || project.detail : project.detail;
    const problem = lang === "en" ? tr.problem_statement || project.problem_statement : project.problem_statement;
    const results = lang === "en" ? tr.results || project.results : project.results;

    return (
        <div className="bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors text-slate-900 dark:text-slate-200 font-sans">

            <main className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-24 pb-20 px-4 transition-colors font-sans">
                <div className="max-w-7xl mx-auto bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 md:p-12 transition-colors">
                    {/* Tombol Kembali Dinamis */}
                    <button
                        onClick={() => router.back()}
                        className="inline-flex items-center text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 mb-8 transition-colors font-medium text-sm md:text-base"
                    >
                        <ArrowLeft size={20} className="mr-2" /> <span data-i18n-key="back">{t("back")}</span>
                    </button>

                    <div className="mb-10">
                        <div className="flex flex-wrap gap-2 mb-5">
                            {project.kategori.map((tag, idx) => (
                                <span
                                    key={idx}
                                    className="bg-blue-50 text-blue-600 border border-blue-100 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800 text-xs md:text-sm font-bold px-3 py-1 rounded-full"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <h1 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
                            {title}
                        </h1>
                        {summary && (
                          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
                            {summary}
                          </p>
                        )}
                    </div>

                    {project.image ? (
                        <div className="relative w-full h-[250px] md:h-[450px] rounded-2xl mb-12 overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm">
                            <Image
                                src={project.image}
                            alt={title}
                                fill
                                sizes="100vw"
                                unoptimized
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ) : (
                        <div className="w-full h-[250px] md:h-[450px] bg-slate-100 dark:bg-slate-800 rounded-2xl mb-12 flex items-center justify-center text-slate-400 dark:text-slate-500 border border-slate-200 dark:border-slate-800">
                            <span className="text-base font-medium">Image Placeholder</span>
                        </div>
                    )}

                    <section className="mb-12 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 md:p-7 bg-slate-50 dark:bg-slate-950/50 fade-in">
                        <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-4" data-i18n-key="projectExplanationTitle">{t("projectExplanationTitle")}</h2>
                        <div className="text-base md:text-lg leading-relaxed text-slate-700 dark:text-slate-300 space-y-6 mb-6">
                            {content.split("\n").map((paragraph, idx) => (
                                <p key={idx}>{paragraph}</p>
                            ))}
                        </div>

                        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-3" data-i18n-key="problemStatementTitle">{t("problemStatementTitle")}</h3>
                        <div className="mb-6 text-slate-700 dark:text-slate-300">
                            {problem ? (
                                problem.split("\n").map((p, i) => <p key={i}>{p}</p>)
                            ) : (
                                <p className="text-sm text-slate-600 dark:text-slate-400">{t("notAvailable") || "Belum tersedia."}</p>
                            )}
                        </div>

                        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-3" data-i18n-key="resultsTitle">{t("resultsTitle")}</h3>
                        <div className="mb-6 text-slate-700 dark:text-slate-300 space-y-4">
                            {results ? (
                                results.split("\n").map((p, i) => <p key={i}>{p}</p>)
                            ) : (
                                <>
                                    {additionalInfo.notes.length > 0 ? (
                                        <ul className="list-disc list-inside text-sm md:text-base text-slate-700 dark:text-slate-300">
                                            {additionalInfo.notes.map((n, i) => (
                                                <li key={i}>{n}</li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-sm text-slate-600 dark:text-slate-400">{t("noStructuredResults") || "Tidak ada informasi hasil yang terstruktur."}</p>
                                    )}
                                </>
                            )}

                            {/* Flowcharts */}
                            {additionalInfo.flowcharts && additionalInfo.flowcharts.length > 0 && (
                                <div className="mt-4">
                                    <h4 className="text-sm md:text-base font-semibold text-slate-700 dark:text-slate-300 mb-3" data-i18n-key="flowchartWorkflow">Flowchart / Workflow</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {additionalInfo.flowcharts.map((f, idx) => (
                                            <div key={idx} className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-3">
                                                <p className="font-medium text-slate-800 dark:text-slate-100 mb-2">{f.title}</p>
                                                {f.steps && f.steps.length > 0 ? (
                                                    <div className="space-y-2">
                                                        {f.steps.map((step, stepIdx) => (
                                                            <div key={stepIdx} className="flex items-center gap-2">
                                                                <div className="min-w-0 flex-1 rounded-lg border border-slate-200 dark:border-slate-700 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-950">
                                                                    {step}
                                                                </div>
                                                                {stepIdx < f.steps.length - 1 && <span className="text-slate-400">→</span>}
                                                            </div>
                                                        ))}
                                                    </div>
                                                ) : f.image ? (
                                                    <div className="rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800">
                                                        <img src={f.image} alt={f.title} className="w-full h-auto object-contain" />
                                                    </div>
                                                ) : (
                                                    <p className="text-sm text-slate-600 dark:text-slate-400" data-i18n-key="noFlowchart">{t("noFlowchart") || "Tidak ada gambar flowchart."}</p>
                                                )}
                                                {f.description && <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">{f.description}</p>}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                        </div>
                    </section>

                    {hasAdditionalInfo && (
                        <section className="mb-12 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 md:p-7 bg-slate-50 dark:bg-slate-950/50">
                            <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-5" data-i18n-key="additionalInfo">
                                {t("additionalInfo")}
                            </h2>

                            {additionalInfo.links.length > 0 && (
                                <div className="mb-7">
                                    <h3 className="flex items-center gap-2 text-sm md:text-base font-semibold text-slate-700 dark:text-slate-300 mb-3" data-i18n-key="links">
                                        <Link2 size={16} /> {t("links")}
                                    </h3>
                                    <div className="space-y-2">
                                        {additionalInfo.links.map((item, idx) => (
                                            <a
                                                key={`${item.url}-${idx}`}
                                                href={item.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="group flex items-center justify-between gap-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-3 hover:border-blue-300 dark:hover:border-blue-600 transition-colors"
                                            >
                                                <div>
                                                    <p className="text-sm md:text-base font-medium text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                                        {item.label}
                                                    </p>
                                                    <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 break-all">
                                                        {item.url}
                                                    </p>
                                                </div>
                                                <ExternalLink size={16} className="text-slate-400 group-hover:text-blue-500 transition-colors" />
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {additionalInfo.videos.length > 0 && (
                                <div className="mb-7">
                                    <h3 className="flex items-center gap-2 text-sm md:text-base font-semibold text-slate-700 dark:text-slate-300 mb-3" data-i18n-key="videos">
                                        <Video size={16} /> {t("videos")}
                                    </h3>
                                    <div className="space-y-4">
                                        {additionalInfo.videos.map((video, idx) => {
                                            const embedUrl = getVideoEmbedUrl(video);

                                            return (
                                                <div
                                                    key={`${video.url || video.embedUrl || video.title}-${idx}`}
                                                    className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-3 md:p-4"
                                                >
                                                    <p className="text-sm md:text-base font-medium text-slate-800 dark:text-slate-100 mb-3">
                                                        {video.title}
                                                    </p>

                                                    {embedUrl ? (
                                                        <div className="aspect-video rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700">
                                                            <iframe
                                                                src={embedUrl}
                                                                title={video.title}
                                                                className="w-full h-full"
                                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                                referrerPolicy="strict-origin-when-cross-origin"
                                                                allowFullScreen
                                                            />
                                                        </div>
                                                    ) : (
                                                        <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mb-2">
                                                            {t("videoNotEmbeddable") || "URL video belum mendukung embedding otomatis. Silakan buka lewat tautan di bawah."}
                                                        </p>
                                                    )}

                                                    {video.url && (
                                                        <a
                                                            href={video.url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="inline-flex items-center gap-2 mt-3 text-sm text-blue-600 dark:text-blue-400 font-medium hover:underline"
                                                        >
                                                            <span data-i18n-key="openVideo">{t("openVideo")}</span>
                                                            <ExternalLink size={14} />
                                                        </a>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}

                            {additionalInfo.notes.length > 0 && (
                                <div>
                                    <h3 className="text-sm md:text-base font-semibold text-slate-700 dark:text-slate-300 mb-3" data-i18n-key="notes">
                                        {t("notes")}
                                    </h3>
                                    <ul className="list-disc list-inside space-y-2 text-sm md:text-base text-slate-700 dark:text-slate-300">
                                        {additionalInfo.notes.map((note, idx) => (
                                            <li key={`${note}-${idx}`}>{note}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </section>
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
        </div >
    );
}
