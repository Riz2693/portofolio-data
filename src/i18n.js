"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";

export const translations = {
  id: {
    back: "Kembali",
    projectNotFound: "Project Tidak Ditemukan",
    additionalInfo: "Informasi Tambahan",
    links: "Tautan Referensi",
    videos: "Video",
    notes: "Catatan",
    openVideo: "Buka video",
    projectExplanationTitle: "Penjelasan Project",
    problemStatementTitle: "Rumusan Masalah",
    resultsTitle: "Hasil Project",
    flowchartWorkflow: "Flowchart / Workflow",
    openLink: "Buka tautan",
    notAvailable: "Belum tersedia",
    noStructuredResults: "Tidak ada informasi hasil yang terstruktur.",
    noFlowchart: "Tidak ada gambar flowchart.",
    videoNotEmbeddable: "URL video belum mendukung embedding otomatis. Silakan buka lewat tautan di bawah.",
    toggleLanguage: "Ganti bahasa",
    switchToEnglish: "Ganti ke bahasa Inggris",
    switchToIndonesian: "Ganti ke bahasa Indonesia",
    navAbout: "Tentang",
    navExperience: "Pengalaman",
    navProject: "Project",
    navSkills: "Keahlian",
    navCertifications: "Sertifikasi",
    navContact: "Kontak",
    all: "Semua",
    prev: "Prev",
    next: "Next",
    viewDetail: "Lihat Detail",
    allProjects: "Semua Project",
    allCertifications: "Semua Sertifikasi",
    featuredProjects: "Project Unggulan",
    featuredCertifications: "Sertifikasi Unggulan",
    downloadCv: "Download CV",
    profileSummaryMissing: "Belum ada data deskripsi profil.",
    educationMissing: "Belum ada data pendidikan.",
    experienceMissing: "Belum ada data pengalaman kerja.",
    nonFormalMissing: "Belum ada data pengalaman non formal.",
    volunteerMissing: "Belum ada data volunteer.",
    techMissing: "Belum ada data keahlian & teknologi.",
    projectMissing: "Belum ada data project unggulan.",
    certMissing: "Belum ada data sertifikasi di kategori ini.",
    contactSection: "Kontak",
    contactTitle: "Hubungi Saya",
    sendMessage: "Kirim Pesan",
    name: "Nama",
    email: "Email",
    message: "Pesan",
    namePlaceholder: "Nama Anda",
    emailPlaceholder: "Email Anda",
    messagePlaceholder: "Tulis pesan Anda",
    formSuccess: "Pesan berhasil dikirim.",
    formError: "Gagal mengirim pesan.",
    chatGreeting: "Halo! Saya AI Assistant. Tanyakan apa saja tentang portofolio ini!",
    thinking: "Sedang mengetik...",
  },
  en: {
    back: "Back",
    projectNotFound: "Project Not Found",
    additionalInfo: "Additional Information",
    links: "Reference Links",
    videos: "Videos",
    notes: "Notes",
    openVideo: "Open video",
    projectExplanationTitle: "Project Explanation",
    problemStatementTitle: "Problem Statement",
    resultsTitle: "Project Results",
    flowchartWorkflow: "Flowchart / Workflow",
    openLink: "Open link",
    notAvailable: "Not available",
    noStructuredResults: "No structured results available.",
    noFlowchart: "No flowchart image available.",
    videoNotEmbeddable: "Video URL cannot be embedded automatically. Please open the link below.",
    toggleLanguage: "Switch language",
    switchToEnglish: "Switch to English",
    switchToIndonesian: "Switch to Indonesian",
    navAbout: "About",
    navExperience: "Experience",
    navProject: "Project",
    navSkills: "Skills",
    navCertifications: "Certifications",
    navContact: "Contact",
    all: "All",
    prev: "Prev",
    next: "Next",
    viewDetail: "View Detail",
    allProjects: "All Projects",
    allCertifications: "All Certifications",
    featuredProjects: "Featured Projects",
    featuredCertifications: "Featured Certifications",
    downloadCv: "Download CV",
    profileSummaryMissing: "No profile summary available.",
    educationMissing: "No education data available.",
    experienceMissing: "No work experience data available.",
    nonFormalMissing: "No non-formal experience data available.",
    volunteerMissing: "No volunteer data available.",
    techMissing: "No skills & technology data available.",
    projectMissing: "No featured project data available.",
    certMissing: "No certification data available in this category.",
    contactSection: "Contact",
    contactTitle: "Get in Touch",
    sendMessage: "Send Message",
    name: "Name",
    email: "Email",
    message: "Message",
    namePlaceholder: "Your name",
    emailPlaceholder: "Your email",
    messagePlaceholder: "Write your message",
    formSuccess: "Message sent successfully.",
    formError: "Failed to send message.",
    chatGreeting: "Hi! I'm the AI Assistant. Ask anything about this portfolio!",
    thinking: "Typing...",
  },
};

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("id");
  const initializedRef = useRef(false);

  useEffect(() => {
    let timer = null;

    try {
      const stored = localStorage.getItem("lang");
      if (stored) {
        timer = window.setTimeout(() => {
          setLang(stored);
        }, 0);
      }
    } catch (error) {}

    initializedRef.current = true;

    return () => {
      if (timer) {
        window.clearTimeout(timer);
      }
    };
  }, []);

  useEffect(() => {
    if (!initializedRef.current) return;

    try {
      localStorage.setItem("lang", lang);
      document.documentElement.lang = lang;
    } catch (error) {}

    const root = document;
    const nodes = root.querySelectorAll("[data-i18n-key]");
    nodes.forEach((node) => {
      const key = node.getAttribute("data-i18n-key");
      if (!key) return;

      const prefix = node.getAttribute("data-i18n-prefix") || "";
      const suffix = node.getAttribute("data-i18n-suffix") || "";
      const translated = (translations[lang] && translations[lang][key]) || translations.id[key] || key;

      if (node.tagName === "INPUT" || node.tagName === "TEXTAREA") {
        node.setAttribute("placeholder", translated);
        return;
      }

      node.textContent = `${prefix}${translated}${suffix}`;
    });
  }, [lang]);

  const switchLang = useCallback((nextLang) => {
    setLang(nextLang);

    try {
      localStorage.setItem("lang", nextLang);
      document.documentElement.lang = nextLang;
    } catch (error) {}

    if (typeof window !== "undefined") {
      window.location.reload();
    }
  }, []);

  const t = useCallback(
    (key) => {
      return (translations[lang] && translations[lang][key]) || translations.id[key] || key;
    },
    [lang],
  );

  const value = useMemo(
    () => ({ lang, setLang: switchLang, switchLang, t }),
    [lang, switchLang, t],
  );

  return (
    <LanguageContext.Provider value={value}>
      <div key={lang} className="contents">
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(LanguageContext);

  if (!context) {
    return {
      lang: "id",
      switchLang: () => {},
      setLang: () => {},
      t: (key) => translations.id[key] || key,
    };
  }

  return context;
}
