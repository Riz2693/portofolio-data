// src/app/page.js
"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  profil,
  projects,
  pengalaman,
  pendidikan,
  sertifikasi,
  volunteer,
  techStack,
  pelatihan,
} from "../data";

// Tambahan Phone untuk WhatsApp & Send untuk Form Kontak
import {
  ArrowRight,
  Briefcase,
  GraduationCap,
  Award,
  ExternalLink,
  Download,
  Mail,
  HeartHandshake,
  Code2,
  User,
  Folder,
  LayoutGrid,
  Phone,
  Send,
  MessageSquare,
} from "lucide-react";

import { FaGithub, FaLinkedinIn } from "react-icons/fa";

import ChatWidget from "../components/ChatWidget";

import PrintButton from "../components/PrintButton";
import useIsMobile from "../hooks/useIsMobile";
import CertificationThumbnail from "../components/CertificationThumbnail";

export default function Home() {
  const componentRef = useRef();
  const isMobile = useIsMobile();

  // --- LOGIC CONTACT FORM (RESEND) ---
  const [formData, setFormData] = useState({ nama: "", email: "", pesan: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' atau 'error'

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSubmitStatus("success");
        setFormData({ nama: "", email: "", pesan: "" }); // Kosongkan form
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error(error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- LOGIC SLIDESHOW HERO SECTION ---
  const [currentHeroImage, setCurrentHeroImage] = useState(0);
  const heroImages = [
    "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroImage((prev) => (prev + 1) % heroImages.length);
    }, 9000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  // --- LOGIC FILTER PROJECT ---
  const [activeProjectFilter, setActiveProjectFilter] = useState("Semua");

  const allProjectCategories = [
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
    activeProjectFilter === "Semua"
      ? projects || []
      : (projects || []).filter((p) =>
        p.kategori.includes(activeProjectFilter),
      );

  const homepageProjects = filteredProjects.slice(0, isMobile ? 4 : 6);

  // --- LOGIC FILTER TECH STACK ---
  const [activeTechFilter, setActiveTechFilter] = useState("Semua");
  const allTechCategories = [
    "Semua",
    ...(techStack || []).map((t) => t.kategori),
  ];

  const visibleDisplayedSkills =
    activeTechFilter === "Semua"
      ? (techStack || []).flatMap((t) => t.skills)
      : (techStack || []).find((t) => t.kategori === activeTechFilter)
        ?.skills || [];

  // --- LOGIC FILTER SERTIFIKASI ---
  const [activeCertFilter, setActiveCertFilter] = useState("Semua");
  const certCategories = [
    "Semua",
    "Sertifikat Internasional",
    "Sertifikat Nasional",
    "Sertifikat Course & Specialization",
    "Sertifikat Kelulusan",
  ];

  const filteredCerts =
    activeCertFilter === "Semua"
      ? sertifikasi || []
      : (sertifikasi || []).filter((s) => s.kategori === activeCertFilter);

  const homepageCerts = filteredCerts.slice(0, isMobile ? 4 : 6); // Tampilkan 3 jika mobile 6 jika desktop

  // --- MENGHITUNG LAMA PENGALAMAN (Ringkasan) ---
  const totalPengalaman = pengalaman ? pengalaman.length : 0;
  const totalProject = projects ? projects.length : 0;
  const totalSertifikat = sertifikasi ? sertifikasi.length : 0;

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors text-slate-900 dark:text-slate-200 font-sans">
      <main
        ref={componentRef}
        className="pb-8.5 selection:bg-blue-500 selection:text-white print:pb-0"
      >
        {/* ================= 0. HERO SECTION (FULL SCREEN) ================= */}
        <section className="relative flex flex-col items-center justify-center min-h-screen w-full px-4 text-center overflow-hidden print:min-h-0 print:py-10">
          <div className="absolute inset-0 w-full h-full z-0 print:hidden bg-slate-900">
            {heroImages.map((src, idx) => (
              <Image
                key={idx}
                src={src}
                alt={`Hero Background ${idx + 1}`}
                fill
                sizes="100vw"
                priority={idx === 0}
                unoptimized
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${idx === currentHeroImage ? "opacity-100" : "opacity-0"
                  }`}
              />
            ))}
            <div className="absolute inset-0 bg-slate-900/60 dark:bg-slate-950/70 backdrop-blur-[2px] z-10"></div>
          </div>

          <div className="relative z-20 flex flex-col items-center pt-16">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-4 tracking-tight text-white print:text-black drop-shadow-lg">
              Welcome To My{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 print:text-blue-700 print:bg-none">
                {/* {profil?.nama || "Nama Anda"} */} Portfolio
              </span>
            </h1>
            <p className="text-base md:text-lg lg:text-xl mb-8 text-slate-200 dark:text-slate-300 font-medium print:text-slate-600 max-w-2xl drop-shadow-md">
              /*{profil?.peran || "Peranan Anda"}*/
                Muhammad Faris Akbar
            </p>

            <div className="flex flex-wrap gap-3 md:gap-4 justify-center print:hidden">
              {profil?.cvFile && (
                <a
                  href={profil.cvFile}
                  download
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 md:py-3 rounded-full transition font-semibold text-xs md:text-sm shadow-lg"
                >
                  <Download size={18} /> Download CV
                </a>
              )}
              <PrintButton contentRef={componentRef} />
              <div className="flex gap-2">
                {profil?.kontak?.github && (
                  <a
                    href={profil.kontak.github}
                    target="_blank"
                    className="p-2.5 md:p-3 bg-white/10 border border-white/20 backdrop-blur-md rounded-full hover:bg-white/20 text-white transition shadow-lg"
                  >
                    <FaGithub size={18} />
                  </a>
                )}
                {profil?.kontak?.linkedin && (
                  <a
                    href={profil.kontak.linkedin}
                    target="_blank"
                    className="p-2.5 md:p-3 bg-white/10 border border-white/20 backdrop-blur-md rounded-full hover:bg-white/20 text-white transition shadow-lg"
                  >
                    <FaLinkedinIn size={18} />
                  </a>
                )}
                {profil?.kontak?.email && (
                  <a
                    href={`mailto:${profil.kontak.email}`}
                    className="p-2.5 md:p-3 bg-white/10 border border-white/20 backdrop-blur-md rounded-full hover:bg-white/20 text-white transition shadow-lg"
                  >
                    <Mail size={18} />
                  </a>
                )}
                {/* TOMBOL WHATSAPP BARU */}
                {profil?.kontak?.whatsapp && (
                  <a
                    href={profil.kontak.whatsapp}
                    target="_blank"
                    className="p-2.5 md:p-3 bg-white/10 border border-white/20 backdrop-blur-md rounded-full hover:bg-white/20 text-white transition shadow-lg"
                  >
                    <Phone size={18} />
                  </a>
                )}
              </div>
            </div>

            <div className="hidden print:block mt-4 text-slate-600 text-xs">
              {/* Teks kontak di print */}
              <p>
                {profil?.kontak?.email} • {profil?.kontak?.whatsapp} •{" "}
                {profil?.kontak?.linkedin}
              </p>
            </div>
          </div>
        </section>

        {/* ================= 1. ABOUT ME & SUMMARY SECTION ================= */}
        <section
          id="about"
          className="py-12 md:py-16 px-4 max-w-7xl mx-auto print:py-6"
        >
          <div className="flex items-center justify-start gap-3 mb-6 md:mb-8 print:mb-4">
            <div className="p-2.5 bg-teal-100 dark:bg-teal-900/30 rounded-xl text-teal-600 dark:text-teal-400 print:hidden">
              <User size={20} />
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white print:text-black">
              Tentang Saya
            </h2>
          </div>

          <div className="flex flex-col gap-5 md:gap-6">
            {/* ATAS: Deskripsi Diri (1 Section Penuh Persegi Panjang) */}
            <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm print:bg-transparent print:border-none print:p-0 w-full">
              {profil?.deskripsi ? (
                <p className="text-sm md:text-base text-slate-700 dark:text-slate-300 leading-relaxed text-justify print:text-black">
                  {profil.deskripsi}
                </p>
              ) : (
                <div className="flex items-center justify-center w-full min-h-[100px]">
                  <p className="text-sm text-slate-500 dark:text-slate-400 italic text-center print:text-left">
                    Belum ada data deskripsi profil.
                  </p>
                </div>
              )}
            </div>

            {/* BAWAH: Ringkasan Portofolio (Potongan Persegi Bento) */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 print:hidden">
              {/* Card Pengalaman (Lebar 2 Kolom) */}
              <div className="col-span-2 flex items-center justify-center md:col-span-2 bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-900/50 p-6 rounded-3xl flex items-center md:justify-between shadow-sm">
                <div className="flex flex-col">
                  <span className="text-3xl text-center md:text-4xl font-bold text-emerald-600 dark:text-emerald-400">
                    {/* {totalPengalaman} */}
                    1+ Tahun
                  </span>
                  <span className="text-sm md:text-base text-slate-600 dark:text-slate-400 font-medium mt-1">
                    Pengalaman Kerja/Magang
                  </span>
                </div>
                <div className="p-4 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-2xl hidden md:block">
                  <Briefcase size={28} />
                </div>
              </div>

              {/* Card Jumlah Project (Lebar 1 Kolom) */}
              <div className="col-span-1 bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/50 p-6 rounded-3xl flex flex-col items-center justify-center text-center shadow-sm">
                <span className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400">
                  {totalProject}+
                </span>
                <span className="text-xs md:text-sm text-slate-600 dark:text-slate-400 font-medium mt-2">
                  Project Berhasil
                </span>
              </div>

              {/* Card Jumlah Sertifikat (Lebar 1 Kolom) */}
              <div className="col-span-1 bg-purple-50 dark:bg-purple-900/10 border border-purple-100 dark:border-purple-900/50 p-6 rounded-3xl flex flex-col items-center justify-center text-center shadow-sm">
                <span className="text-3xl md:text-4xl font-bold text-purple-600 dark:text-purple-400">
                  {totalSertifikat}+
                </span>
                <span className="text-xs md:text-sm text-slate-600 dark:text-slate-400 font-medium mt-2">
                  Sertifikasi
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ================= 2. PENGALAMAN Formal (BENTO BOX) ================= */}
        <section
          id="resume_formal"
          className="py-12 md:py-16 px-4 max-w-7xl mx-auto border-t border-slate-200 dark:border-slate-800 print:border-none print:py-6"
        >
          <div className="flex items-center justify-start gap-3 mb-6 md:mb-8 print:mb-4">
            <div className="p-2.5 bg-blue-100 dark:bg-blue-900/30 rounded-xl text-blue-600 dark:text-blue-400 print:hidden">
              <LayoutGrid size={20} />
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white print:text-black">
              Riwayat & Pengalaman Formal
            </h2>
          </div>

          {/* Pengalaman Start */}
          <div className="flex flex-col gap-5 md:gap-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-5 md:gap-6 print:block">
              {/* KIRI: PENDIDIKAN */}
              <div className="lg:col-span-1 bg-white dark:bg-slate-900 p-5 md:p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm print:bg-transparent print:border-none print:p-0 print:mb-8 flex flex-col">
                <div className="flex items-center gap-3 mb-5 print:mb-2 border-b pb-3 border-slate-100 dark:border-slate-800 print:border-gray-300 shrink-0">
                  <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg text-green-600 dark:text-green-400 print:hidden">
                    <GraduationCap size={18} />
                  </div>
                  <h3 className="text-base md:text-lg font-bold text-slate-900 dark:text-white print:text-black w-full">
                    Pendidikan
                  </h3>
                </div>
                {pendidikan && pendidikan.length > 0 ? (
                  <div className="space-y-5 print:space-y-4">
                    {pendidikan.map((item) => (
                      <div key={item.id} className="print:break-inside-avoid">
                        <h4 className="text-sm md:text-sm font-bold text-slate-900 dark:text-white print:text-black leading-tight">
                          {item.sekolah}
                        </h4>
                        <p className="text-slate-600 dark:text-slate-400 text-[11px] md:text-xs font-medium mt-1 print:text-black">
                          {item.jurusan}
                        </p>
                        <p className="text-[10px] md:text-[11px] text-slate-500 mt-1.5 font-mono print:text-gray-600">
                          {item.tahun} • {item.nilai}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex-1 flex items-center justify-center min-h-[150px]">
                    <p className="text-sm text-slate-500 dark:text-slate-400 italic text-center print:text-left">
                      Belum ada data pendidikan.
                    </p>
                  </div>
                )}
              </div>

              {/* TENGAH: PEKERJAAN */}
              <div className="lg:col-span-3 bg-white dark:bg-slate-900 p-5 md:p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm print:bg-transparent print:border-none print:p-0 print:mb-8 flex flex-col">
                <div className="flex items-center gap-3 mb-5 print:mb-2 border-b pb-3 border-slate-100 dark:border-slate-800 print:border-gray-300 shrink-0">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400 print:hidden">
                    <Briefcase size={18} />
                  </div>
                  <h3 className="text-base md:text-lg font-bold text-slate-900 dark:text-white print:text-black w-full">
                    Pengalaman Kerja
                  </h3>
                </div>
                <div className="flex-1 max-h-[300px] overflow-y-auto pr-2 md:pr-3 print:max-h-none print:overflow-visible print:pr-0 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-slate-300 dark:[&::-webkit-scrollbar-thumb]:bg-slate-700 [&::-webkit-scrollbar-track]:bg-transparent flex flex-col">
                  {pengalaman && pengalaman.length > 0 ? (
                    <div className="relative border-l border-slate-200 dark:border-slate-700 ml-1.5 space-y-6 pb-2 print:border-gray-300 print:space-y-5">
                      {pengalaman.map((item) => (
                        <div
                          key={item.id}
                          className="relative pl-5 print:pl-4 print:break-inside-avoid"
                        >
                          <span className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full border-2 border-white dark:border-slate-900 bg-blue-500 print:bg-black print:border-none print:-left-[4px]"></span>
                          <div className="relative pt-0">
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-1 gap-1">
                              <h4 className="text-sm md:text-base font-bold text-slate-900 dark:text-white print:text-black">
                                {item.peran}
                              </h4>
                              <span className="text-[9px] md:text-[10px] font-mono text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md w-fit print:text-black print:bg-transparent print:font-bold">
                                {item.tahun}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 mb-2 print:mb-1">
                              <p className="text-blue-600 dark:text-blue-400 font-medium text-xs print:text-black print:font-semibold">
                                {item.instansi}
                              </p>
                              <span className="bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 text-[9px] px-1.5 py-0.5 rounded print:text-black print:bg-gray-100">
                                {item.tipe}
                              </span>
                            </div>
                            <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed mb-2 print:text-gray-700">
                              {item.ringkasan}
                            </p>
                            <Link
                              href={`/experience/${item.id}`}
                              className="text-[10px] md:text-[11px] font-semibold text-blue-500 hover:text-blue-600 dark:text-blue-400 flex items-center gap-1 print:hidden w-fit"
                            >
                              Detail Lengkap <ArrowRight size={10} />
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex-1 flex items-center justify-center min-h-[200px]">
                      <p className="text-sm text-slate-500 dark:text-slate-400 italic text-center print:text-left">
                        Belum ada data pengalaman kerja.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= 3. PENGALAMAN Non Formal (BENTO BOX) ================= */}
        <section
          id="resume_nonformal"
          className="py-12 md:py-16 px-4 max-w-7xl mx-auto border-t border-slate-200 dark:border-slate-800 print:border-none print:py-6"
        >
          <div className="flex items-center justify-start gap-3 mb-6 md:mb-8 print:mb-4">
            <div className="p-2.5 bg-blue-100 dark:bg-blue-900/30 rounded-xl text-blue-600 dark:text-blue-400 print:hidden">
              <LayoutGrid size={20} />
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white print:text-black">
              Riwayat & Pengalaman Non Formal
            </h2>
          </div>

          {/* Pengalaman Start */}
          <div className="flex flex-col gap-5 md:gap-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-5 md:gap-6 print:block">
              {/* KIRI: PELATIHAN */}
              <div className="lg:col-span-3 bg-white dark:bg-slate-900 p-5 md:p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm print:bg-transparent print:border-none print:p-0 print:mb-8 flex flex-col">
                <div className="flex items-center gap-3 mb-5 print:mb-2 border-b pb-3 border-slate-100 dark:border-slate-800 print:border-gray-300 shrink-0">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400 print:hidden">
                    <Briefcase size={18} />
                  </div>
                  <h3 className="text-base md:text-lg font-bold text-slate-900 dark:text-white print:text-black w-full">
                    Pelatihan
                  </h3>
                </div>
                <div className="flex-1 max-h-[300px] overflow-y-auto pr-2 md:pr-3 print:max-h-none print:overflow-visible print:pr-0 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-slate-300 dark:[&::-webkit-scrollbar-thumb]:bg-slate-700 [&::-webkit-scrollbar-track]:bg-transparent flex flex-col">
                  {pelatihan && pelatihan.length > 0 ? (
                    <div className="relative border-l border-slate-200 dark:border-slate-700 ml-1.5 space-y-6 pb-2 print:border-gray-300 print:space-y-5">
                      {pelatihan.map((item) => (
                        <div
                          key={item.id}
                          className="relative pl-5 print:pl-4 print:break-inside-avoid"
                        >
                          <span className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full border-2 border-white dark:border-slate-900 bg-blue-500 print:bg-black print:border-none print:-left-[4px]"></span>
                          <div className="relative pt-0">
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-1 gap-1">
                              <h4 className="text-sm md:text-base font-bold text-slate-900 dark:text-white print:text-black">
                                {item.nama}
                              </h4>
                              <span className="text-[9px] md:text-[10px] font-mono text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md w-fit print:text-black print:bg-transparent print:font-bold">
                                {item.tahun}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 mb-2 print:mb-1">
                              <p className="text-blue-600 dark:text-blue-400 font-medium text-xs print:text-black print:font-semibold">
                                {item.instansi}
                              </p>
                              <span className="bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 text-[9px] px-1.5 py-0.5 rounded print:text-black print:bg-gray-100">
                                {item.kategori}
                              </span>
                            </div>
                            <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed mb-2 print:text-gray-700">
                              {item.ringkasan}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex-1 flex items-center justify-center min-h-[200px]">
                      <p className="text-sm text-slate-500 dark:text-slate-400 italic text-center print:text-left">
                        Belum ada data pengalaman non formal.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* KANAN: VOLUNTEER */}
              <div className="lg:col-span-1 bg-white dark:bg-slate-900 p-5 md:p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm print:bg-transparent print:border-none print:p-0 flex flex-col">
                <div className="flex items-center gap-3 mb-5 print:mb-2 border-b pb-3 border-slate-100 dark:border-slate-800 print:border-gray-300 shrink-0">
                  <div className="p-2 bg-pink-100 dark:bg-pink-900/30 rounded-lg text-pink-600 dark:text-pink-400 print:hidden">
                    <HeartHandshake size={18} />
                  </div>
                  <h3 className="text-base md:text-lg font-bold text-slate-900 dark:text-white print:text-black w-full">
                    Volunteer
                  </h3>
                </div>
                <div className="flex-1 max-h-[320px] overflow-y-auto pr-2 print:max-h-none print:overflow-visible print:pr-0 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-slate-300 dark:[&::-webkit-scrollbar-thumb]:bg-slate-700 [&::-webkit-scrollbar-track]:bg-transparent flex flex-col">
                  {volunteer && volunteer.length > 0 ? (
                    <div className="space-y-5 print:space-y-4 mt-2">
                      {volunteer.map((item) => (
                        <div
                          key={item.id}
                          className="print:break-inside-avoid border-b border-slate-100 dark:border-slate-800 pb-3 last:border-0 last:pb-0"
                        >
                          <h4 className="text-xs md:text-sm font-bold text-slate-900 dark:text-white print:text-black leading-tight">
                            {item.peran}
                          </h4>
                          <p className="text-pink-600 dark:text-pink-400 text-[10px] md:text-[11px] font-medium mt-1 mb-1.5 print:text-black print:font-semibold">
                            {item.event}
                          </p>
                          <p className="text-[11px] md:text-xs text-slate-600 dark:text-slate-400 leading-relaxed print:text-gray-700 mb-1.5 line-clamp-2">
                            {item.deskripsi}
                          </p>
                          <span className="text-[9px] text-slate-500 font-mono bg-slate-50 dark:bg-slate-950 px-1.5 py-0.5 rounded print:bg-transparent print:text-black print:font-bold">
                            {item.tahun}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex-1 flex items-center justify-center min-h-[150px]">
                      <p className="text-sm text-slate-500 dark:text-slate-400 italic text-center print:text-left">
                        Belum ada data volunteer.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= 4. PROJECTS SECTION ================= */}
        <section
          id="projects"
          className="py-12 md:py-16 px-4 max-w-7xl mx-auto border-t border-slate-200 dark:border-slate-800 print:border-none print:py-6"
        >
          <div className="flex items-center justify-center gap-3 mb-6 md:mb-8 print:mb-4">
            <div className="p-2.5 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl text-indigo-600 dark:text-indigo-400 print:hidden">
              <Folder size={20} />
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white print:text-black">
              Project Unggulan
            </h2>
          </div>
          {projects && projects.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 mb-8 md:mb-10 print:hidden">
              {allProjectCategories.map((kategori, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveProjectFilter(kategori)}
                  className={`px-3 md:px-4 py-1.5 rounded-full text-xs md:text-sm font-medium transition-all duration-300 ${activeProjectFilter === kategori ? "bg-blue-600 text-white shadow-sm" : "bg-white text-slate-600 border border-slate-200 hover:border-blue-500 hover:text-blue-600 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-300 dark:hover:border-blue-400"}`}
                >
                  {kategori}
                </button>
              ))}
            </div>
          )}
          {homepageProjects && homepageProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6" suppressHydrationWarning>
              {homepageProjects.map((item) => (
                <div
                  key={item.id}
                  className="group bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 hover:shadow-lg transition-all duration-300 print:bg-white print:border-slate-200 print:break-inside-avoid overflow-hidden flex flex-col"
                >
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
                  <div className="p-4 md:p-5 flex-1 flex flex-col">
                    <h3 className="text-base md:text-lg font-bold mb-2 text-slate-900 dark:text-white print:text-black">
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
                Belum ada data project unggulan.
              </p>
            </div>
          )}
          {homepageProjects.length >= 0 && (
            <div className="mt-8 md:mt-10 text-end md:text-start print:hidden">
              <Link
                href="/projects"
                className="inline-flex items-center gap-1.5 px-5 py-2 md:py-2.5 rounded-full bg-slate-200 text-slate-700 text-xs md:text-sm font-semibold hover:bg-slate-300 hover:text-blue-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 transition"
              >
                Semua Project <ArrowRight size={16} />
              </Link>
            </div>
          )}
        </section>

        {/* ================= 5. TECH STACK SECTION ================= */}
        <section
          id="tech-stack"
          className="py-12 md:py-16 px-4 max-w-7xl mx-auto border-t border-slate-200 dark:border-slate-800 print:border-none print:py-6"
        >
          <div className="flex items-center justify-center gap-3 mb-6 md:mb-8 print:mb-4">
            <div className="p-2.5 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl text-emerald-600 dark:text-emerald-400 print:hidden">
              <Code2 size={20} />
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white print:text-black">
              Keahlian & Teknologi
            </h2>
          </div>
          <div className="bg-white dark:bg-slate-900 p-5 md:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm print:bg-transparent print:border-none print:p-0">
            {techStack && techStack.length > 0 && (
              <div className="flex flex-wrap justify-center md:justify-center gap-2 mb-6 md:mb-8 print:hidden">
                {allTechCategories.map((kategori, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveTechFilter(kategori)}
                    className={`px-3 md:px-4 py-1.5 rounded-full text-xs md:text-sm font-medium transition-all duration-300 ${activeTechFilter === kategori ? "bg-emerald-600 text-white shadow-sm" : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"}`}
                  >
                    {kategori}
                  </button>
                ))}
              </div>
            )}
            {visibleDisplayedSkills && visibleDisplayedSkills.length > 0 ? (
              <div className="flex flex-wrap justify-center md:justify-center gap-2 md:gap-3">
                {visibleDisplayedSkills.map((skill, idx) => {
                  const skillName =
                    typeof skill === "string" ? skill : skill.nama;
                  const skillImage =
                    typeof skill === "string" ? null : skill.image;
                  return (
                    <div
                      key={idx}
                      className="flex items-center gap-2 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 text-xs md:text-sm font-semibold px-3 py-1.5 md:py-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-emerald-500 dark:hover:border-emerald-500 transition-colors print:bg-white print:border-gray-300 print:text-black shadow-sm hover:shadow-md"
                    >
                      {skillImage && (
                        <Image
                          src={skillImage}
                          alt={skillName}
                          width={16}
                          height={16}
                          unoptimized
                          className="w-4 h-4 object-contain print:hidden"
                        />
                      )}
                      <span>{skillName}</span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex items-center justify-center w-full min-h-[150px]">
                <p className="text-sm text-slate-500 dark:text-slate-400 italic text-center print:text-left">
                  Belum ada data keahlian & teknologi.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* ================= 6. SERTIFIKASI SECTION (Dengan Filter & Button Lihat Semua) ================= */}
        <section
          id="certifications"
          className="py-12 md:py-16 px-4 max-w-7xl mx-auto border-t border-slate-200 dark:border-slate-800 print:border-none print:py-6"
        >
          <div className="flex items-center justify-center gap-3 mb-6 md:mb-8 print:mb-4">
            <div className="p-2.5 bg-purple-100 dark:bg-purple-900/30 rounded-xl text-purple-600 dark:text-purple-400 print:hidden">
              <Award size={20} />
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white print:text-black">
              Sertifikasi & Lisensi
            </h2>
          </div>

          {/* FILTER SERTIFIKAT */}
          {sertifikasi && sertifikasi.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 mb-8 md:mb-10 print:hidden">
              {certCategories.map((kategori, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveCertFilter(kategori)}
                  className={`px-3 md:px-4 py-1.5 rounded-full text-xs md:text-sm font-medium transition-all duration-300 ${activeCertFilter === kategori
                    ? "bg-purple-600 text-white shadow-sm"
                    : "bg-white text-slate-600 border border-slate-200 hover:border-purple-500 hover:text-purple-600 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-300 dark:hover:border-purple-400"
                    }`}
                >
                  {kategori === "Course and Specialization Certificate"
                    ? "Course & Specialization"
                    : kategori}
                </button>
              ))}
            </div>
          )}

          {homepageCerts && homepageCerts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 print:grid-cols-2" suppressHydrationWarning>
              {homepageCerts.map((item) => (
                <a
                  key={item.id}
                  href={item.link}
                  target="_blank"
                  className="group bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 hover:shadow-lg transition-all duration-300 print:bg-white print:border-slate-200 print:break-inside-avoid overflow-hidden flex flex-col"
                >
                  <div className="h-40 md:h-44 w-full bg-slate-100 dark:bg-slate-800 relative overflow-hidden flex items-center justify-center print:hidden shrink-0">
                    <CertificationThumbnail item={item} />
                  </div>
                  <div className="p-4 md:p-5 flex-1 flex flex-col">
                    {/* Label Kategori */}
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
                Belum ada data sertifikasi di kategori ini.
              </p>
            </div>
          )}

          {/* Tombol Lihat Semua Sertifikasi */}
          {filteredCerts.length > 0 && (
            <div className="mt-8 md:mt-10 text-end md:text-start print:hidden">
              <Link
                href="/certifications"
                className="inline-flex items-center gap-1.5 px-5 py-2 md:py-2.5 rounded-full bg-slate-200 text-slate-700 text-xs md:text-sm font-semibold hover:bg-slate-300 hover:text-purple-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 transition"
              >
                Semua Sertifikasi <ArrowRight size={16} />
              </Link>
            </div>
          )}
        </section>

        {/* ================= 7. CONTACT US SECTION (BARU) ================= */}
        <section
          id="contact"
          className="py-12 md:py-16 px-4 max-w-7xl mx-auto border-t border-slate-200 dark:border-slate-800 print:border-none print:py-6"
        >
          <div className="flex flex-col items-center mb-6 md:mb-8">
            <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-xl text-red-600 dark:text-red-400 mb-4">
              <MessageSquare size={24} />
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white text-center mb-3">
              Mari Berkolaborasi
            </h2>

            <p className="text-slate-600 dark:text-slate-400 text-center max-w-xl text-sm md:text-base">
              Apakah Anda memiliki proyek menarik atau peluang karir? Jangan
              ragu untuk menghubungi saya melalui form di bawah atau melalui
              media sosial saya.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-12 bg-white dark:bg-slate-900 p-6 md:p-10 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
            {/* Info Kontak & Sosial Media */}
            <div className="md:col-span-2 flex flex-col gap-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  Informasi Kontak
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                  Saya terbuka untuk peluang karir, kolaborasi proyek,
                  maupun pekerjaan penuh waktu.
                </p>

                <div className="space-y-4">
                  {profil?.kontak?.email && (
                    <a
                      href={`mailto:${profil.kontak.email}`}
                      className="flex items-center gap-3 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition group"
                    >
                      <div className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-lg group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 transition">
                        <Mail size={18} />
                      </div>
                      <span className="text-sm font-medium">
                        {profil.kontak.email}
                      </span>
                    </a>
                  )}
                  {profil?.kontak?.whatsapp && (
                    <a
                      href={profil.kontak.whatsapp}
                      target="_blank"
                      className="flex items-center gap-3 text-slate-700 dark:text-slate-300 hover:text-green-600 dark:hover:text-green-400 transition group"
                    >
                      <div className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-lg group-hover:bg-green-100 dark:group-hover:bg-green-900/30 transition">
                        <Phone size={18} />
                      </div>
                      <span className="text-sm font-medium">+62 821 2507 6212</span>
                    </a>
                  )}
                  {profil?.kontak?.linkedin && (
                    <a
                      href={profil.kontak.linkedin}
                      target="_blank"
                      className="flex items-center gap-3 text-slate-700 dark:text-slate-300 hover:text-blue-700 dark:hover:text-blue-500 transition group"
                    >
                      <div className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-lg group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 transition">
                        <FaLinkedinIn size={18} />
                      </div>
                      <span className="text-sm font-medium">
                        {/* {profil.kontak.linkedin} */}
                        Muhammad Faris Akbar
                      </span>
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="md:col-span-3">
              <form
                className="flex flex-col gap-4"
                onSubmit={handleContactSubmit}
              >
                {/* Pesan Notifikasi Berhasil/Gagal */}
                {submitStatus === "success" && (
                  <div className="bg-green-50 text-green-600 border border-green-200 dark:bg-green-900/20 dark:border-green-800 p-3 rounded-xl text-sm font-medium">
                    Pesan berhasil dikirim! Saya akan segera membalas email
                    Anda.
                  </div>
                )}
                {submitStatus === "error" && (
                  <div className="bg-red-50 text-red-600 border border-red-200 dark:bg-red-900/20 dark:border-red-800 p-3 rounded-xl text-sm font-medium">
                    Gagal mengirim pesan. Silakan coba lagi nanti atau hubungi
                    via WhatsApp.
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 ml-1">
                      Nama Lengkap
                    </label>
                    <input
                      type="text"
                      value={formData.nama}
                      onChange={(e) =>
                        setFormData({ ...formData, nama: e.target.value })
                      }
                      placeholder="Masukkan nama Anda"
                      disabled={isSubmitting}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition disabled:opacity-50"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 ml-1">
                      Email Anda
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="Masukkan email Anda"
                      disabled={isSubmitting}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition disabled:opacity-50"
                      required
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 ml-1">
                    Pesan
                  </label>
                  <textarea
                    rows="4"
                    value={formData.pesan}
                    onChange={(e) =>
                      setFormData({ ...formData, pesan: e.target.value })
                    }
                    placeholder="Halo, saya ingin berdiskusi tentang..."
                    disabled={isSubmitting}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none disabled:opacity-50"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-2 w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-xl font-semibold transition shadow-md shadow-blue-500/20 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Mengirim..." : "Kirim Pesan"}{" "}
                  <Send size={16} />
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-6 flex flex-col items-center justify-center border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-500 dark:text-slate-400 text-xs md:text-sm print:hidden">
        <p>
          &copy; {new Date().getFullYear()} {profil?.nama || "Nama Anda"}. Built
          with Next.js & Tailwind.
        </p>
      </footer>

      {/* Chat Widget dipanggil di sini agar tetap mengambang di pojok kanan bawah */}
      <div className="print:hidden">
        <ChatWidget />
      </div>
    </div>
  );
}
