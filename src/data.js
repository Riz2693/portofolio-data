// src/data.js

// --- PROFIL ---
export const profil = {
    nama: "Muhammad Faris Akbar",
    peran: "Data & AI Enthusiast",
    deskripsi:
        "Hi, Saya Muhammad Faris Akbar, lulusan Teknik Informatika dari Universitas Ahmad Dahlan dengan IPK 3.77. Memiliki minat yang besar dalam bidang data dan AI. Pengalaman saya mencakup peran sebagai Data Analyst Intern di Narasio Data, Asisten Dosen dan Asisten Penelitian di Universitas Ahmad Dahlan, serta Machine Learning Engineer Intern di Bangkit Academy. Saya juga aktif dalam berbagai project yang memanfaatkan teknologi AI dan data untuk memberikan solusi inovatif. Dengan latar belakang akademis yang kuat dan pengalaman praktis yang beragam, saya siap untuk terus berkembang dan memberikan kontribusi dalam dunia data dan AI.",
    kontak: {
        email: "mfarfaris@gmail.com",
        linkedin: "https://www.linkedin.com/in/m-faris-akbar-/",
        github: "https://github.com/Riz2693",
        whatsapp: "https://wa.me/6282125076212",
    },
    cvFile: "/file/CV_ATS_MUHAMMAD FARIS AKBAR.pdf",
};

// --- PROJECT ---
export const projects = [
    {
        id: 1,
        judul: "Data Engineering Zoomcamp 2026",
        kategori: ["Data Engineering", "ETL/ELT", "Data Pipeline", "End-to-End Project", "Bruin", "Kestra", "Google Cloud Platform", "Big Query", "Docker", "PostgreSQL", "dlthub", "dbt", "SQL", "Python"],
        ringkasan:
            "Akumulasi project dari program Data Engineering Zoomcamp 2026.",
        detail:
            "Data Engineering Zoomcamp adalah program pelatihan intensif yang dirancang untuk membekali peserta dengan keterampilan praktis dalam bidang data engineering. Program ini mencakup berbagai topik seperti ETL/ELT, data pipeline, dan arsitektur data modern. Peserta akan belajar melalui proyek-proyek nyata dan studi kasus industri, mempersiapkan mereka untuk menghadapi tantangan dunia kerja di bidang data engineering.",
        image: "/images/projects/data-engineering-zoomcamp.svg",
        additionalInfo: {
            // field baru
            links: [
                {
                    label: "Project Repository",
                    url: "https://github.com/Riz2693/Data-Engineering-Zoomcamp",
                    type: "repository",
                },
                {
                    // label: "Live Demo",
                    // url: "https://nama-project.vercel.app",
                    // type: "demo",
                },
            ],

            videos: [
                // cukup pakai url YouTube/Vimeo, sistem akan auto-embed
                // {
                //   title: "Demo Aplikasi (YouTube)",
                //   url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                // },
                // // kalau mau kontrol penuh, isi embedUrl langsung
                // {
                //   title: "Presentasi Final (Embed URL)",
                //   embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
                //   url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                // },
            ],

            notes: [
                // "Model terbaik: XGBoost dengan AUC 0.89.",
                // "Dataset berisi 50.000 baris setelah cleaning.",
                // "Deployment awal menggunakan Vercel + API Route Next.js.",
            ],
        }
    },
    {
        id: 2,
        judul: "Growth Track",
        kategori: [
            "Mobile App",
            "ML/DL Model",
            "TensorFlow",
            "AI/LLM Integration",
            "Artificial Intelligence",
            "Python",
            "End-to-End Project",
        ],
        ringkasan:
            "Aplikasi mobile yang memanfaatkan model Deep Lerning menggunakan TensorFlow untuk memberikan rekomendasi atas pertumbuhan anak guna menghindari terjadinya stunting.",
        detail:
            "Growth Track adalah aplikasi mobile yang memanfaatkan model Deep Learning menggunakan TensorFlow untuk memberikan rekomendasi atas pertumbuhan anak guna menghindari terjadinya stunting. Aplikasi ini dirancang untuk membantu orang tua dan tenaga kesehatan dalam memantau perkembangan anak secara efektif. Dengan menggunakan data pertumbuhan anak, aplikasi ini dapat memberikan rekomendasi yang dipersonalisasi untuk memastikan pertumbuhan yang optimal dan mencegah risiko stunting.",
        image: "/images/projects/growth-track.svg",
        additionalInfo: {
            links: [
                {
                    label: "Project Repository",
                    url: "https://github.com/Growth-Track",
                    type: "repository",
                },
            ],
            videos: [],
            notes: [],
        },
    },
    {
        id: 3,
        judul:
            "K-Means Centroid Optimization with Genetic Algorithm for Clustering Micro, Small, Medium Enterprises in Yogyakarta",
        kategori: [
            "Data Science",
            "Data Analysis",
            "ML/DL Model",
            "Python",
            "Publikasi",
            "Scientific Research",
            "Sinta Indexed",
            "End-to-End Project",
        ],
        ringkasan:
            "Penelitian ini mengusulkan metode optimasi centroid K-Means menggunakan algoritma genetika untuk meningkatkan akurasi clustering pada data UMKM di Yogyakarta.",
        detail:
            "Penelitian ini mengusulkan metode optimasi centroid K-Means menggunakan algoritma genetika untuk meningkatkan akurasi clustering pada data UMKM di Yogyakarta. Metode ini bertujuan untuk mengatasi masalah inisialisasi centroid yang sering kali mempengaruhi hasil clustering. Dengan menggunakan algoritma genetika, penelitian ini berhasil menemukan posisi centroid yang lebih optimal, sehingga meningkatkan kualitas clustering dan memberikan wawasan yang lebih baik tentang segmentasi UMKM di Yogyakarta.",
        image: "/images/projects/kmeans-ga-umkm.svg",
        additionalInfo: {
            links: [
                {
                    label: "Link Publikasi Jurnal",
                    url: "https://jurnalnasional.ump.ac.id/index.php/JUITA/article/view/25480",
                    type: "publication",
                },
            ],
            videos: [],
            notes: [],
        },
    },
    {
        id: 4,
        judul:
            "Analysis of Micro, Small and Medium Enterprises (MSMEs) using the K-Prototype Method",
        kategori: [
            "Data Science",
            "Data Analysis",
            "ML/DL Model",
            "Python",
            "Publikasi",
            "Scientific Research",
            "IEEE Indexed",
            "End-to-End Project",
        ],
        ringkasan:
            "Penelitian ini menggunakan metode K-Prototype untuk menganalisis data UMKM di Yogyakarta, menggabungkan variabel numerik dan kategorikal untuk segmentasi yang lebih akurat.",
        detail:
            "Penelitian ini menggunakan metode K-Prototype untuk menganalisis data UMKM di Yogyakarta, menggabungkan variabel numerik dan kategorikal untuk segmentasi yang lebih akurat. Metode K-Prototype memungkinkan penanganan data yang heterogen, sehingga memberikan hasil clustering yang lebih representatif. Hasil penelitian ini memberikan wawasan yang berharga bagi pengembangan strategi bisnis dan kebijakan pemerintah dalam mendukung pertumbuhan UMKM di Yogyakarta.",
        image: "/images/projects/kprototype-umkm.svg",
        additionalInfo: {
            links: [
                {
                    label: "Link Publikasi Jurnal",
                    url: "https://ieeexplore.ieee.org/document/11265568",
                    type: "publication",
                },
            ],
            videos: [],
            notes: [],
        },
    },
    {
        id: 5,
        judul:
            "Shopee Playstore Sentiment Analysis using IndoBERT, BI-LSTM, RNN and Logistic Regression",
        kategori: [
            "Data Science",
            "Data Analysis",
            "ML/DL Model",
            "Python",
            "TensorFlow",
        ],
        ringkasan:
            "Project ini melakukan analisis sentimen pada ulasan aplikasi Shopee di Playstore menggunakan model IndoBERT untuk labeling dan BI-LSTM, RNN, dan Logistic Regression untuk mengklasifikasikan sentimen.",
        detail:
            "Project ini melakukan analisis sentimen pada ulasan aplikasi Shopee di Playstore menggunakan model IndoBERT untuk labeling dan BI-LSTM, RNN, dan Logistic Regression untuk mengklasifikasikan sentimen. Hasil analisis ini dapat digunakan untuk memahami persepsi pengguna terhadap aplikasi Shopee dan memberikan masukan untuk peningkatan layanan.",
        image: "/images/projects/shopee-sentiment.svg",
        additionalInfo: {
            links: [
                {
                    label: "Project Repository",
                    url: "https://github.com/Riz2693/Dicoding-Submission-FDL/tree/main/Analisis%20Sentimen",
                    type: "repository",
                },
                // {
                //   label: "Demo Aplikasi",
                //   url: "",
                //   type: "Application Demo",
                // },
            ],
            videos: [],
            notes: [],
        },
    },
    {
        id: 6,
        judul:
            "Animal 10 Image Classification using Convolutional Neural Networks and Transfer Learning",
        kategori: [
            "Data Science",
            "Data Analysis",
            "ML/DL Model",
            "Python",
            "TensorFlow",
        ],
        ringkasan:
            "Project ini melakukan klasifikasi gambar hewan menggunakan Jaringan Saraf Konvolusi dan Transfer Learning.",
        detail:
            "Project ini melakukan klasifikasi gambar hewan menggunakan Jaringan Saraf Konvolusi dan Transfer Learning. Hasil proyek ini dapat digunakan untuk memahami dan mengklasifikasikan berbagai spesies hewan berdasarkan citra yang diberikan.",
        image: "/images/projects/animal10-classification.svg",
        additionalInfo: {
            links: [
                {
                    label: "Project Repository",
                    url: "https://github.com/Riz2693/Dicoding-Submission-FDL/tree/main/Klasifikasi%20Gambar",
                    type: "repository",
                },
                // {
                //   label: "Demo Aplikasi",
                //   url: "",
                //   type: "Application Demo",
                // },
            ],
            videos: [],
            notes: [],
        },
    },
    {
        id: 7,
        judul:
            "Rakamin x IDX Partner Project: Loan Data Analysis and Default Prediction using Machine Learning",
        kategori: ["Data Science", "Data Analysis", "ML/DL Model", "Python"],
        ringkasan:
            "Project ini melakukan analisis data pinjaman dan prediksi default menggunakan Machine Learning.",
        detail:
            "Project ini melakukan analisis data pinjaman dan prediksi default menggunakan Machine Learning. Hasil proyek ini dapat digunakan untuk membantu lembaga keuangan dalam mengidentifikasi risiko kredit dan meningkatkan proses pengambilan keputusan terkait pinjaman.",
        image: "/images/projects/rakamin-idx-loan.svg",
        additionalInfo: {
            links: [
                {
                    label: "Project Repository",
                    url: "https://github.com/Riz2693/IDX-Rakamin-Data-Science",
                    type: "repository",
                },
                // {
                //   label: "Demo Aplikasi",
                //   url: "",
                //   type: "Application Demo",
                // },
            ],
            videos: [],
            notes: [],
        },
    },
    {
        id: 8,
        judul:
            "Rakamin x Home Credit Indonesia Project: Loan Data Analysis and Default Prediction using Machine Learning",
        kategori: [
            "Data Science",
            "Data Analysis",
            "ML/DL Model",
            "Python",
            "TensorFlow",
        ],
        ringkasan:
            "Project ini melakukan analisis data pinjaman dan prediksi default menggunakan Machine Learning.",
        detail:
            "Project ini melakukan analisis data pinjaman dan prediksi default menggunakan Machine Learning. Hasil proyek ini dapat digunakan untuk membantu lembaga keuangan dalam mengidentifikasi risiko kredit dan meningkatkan proses pengambilan keputusan terkait pinjaman.",
        image: "/images/projects/rakamin-homecredit-loan.svg",
        additionalInfo: {
            links: [
                {
                    label: "Project Repository",
                    url: "https://github.com/Riz2693/Home-Credit-Rakamin-Data-Science-Project",
                    type: "repository",
                },
                // {
                //   label: "Demo Aplikasi",
                //   url: "",
                //   type: "Application Demo",
                // },
            ],
            videos: [],
            notes: [],
        },
    },
    {
        id: 9,
        judul:
            "Website Toko Seragam Budhi Jaya: Website Katalog dan Penjualan Seragam Sekolah",
        kategori: ["Web Development", "E-commerce", "Web Katalog", "HTML", "CSS", "JavaScript", "PHP", "MySQL", "End-to-End Project"],
        ringkasan:
            "Project ini mengembangkan website untuk Toko Seragam Budhi Jaya, yang berfungsi sebagai katalog online dan platform penjualan seragam sekolah.",
        detail:
            "Project ini mengembangkan website untuk Toko Seragam Budhi Jaya, yang berfungsi sebagai katalog online dan platform penjualan seragam sekolah. Website ini dirancang untuk memberikan pengalaman pengguna yang mudah dan intuitif, memungkinkan pelanggan untuk melihat berbagai produk seragam sekolah yang tersedia, melakukan pemesanan, dan berinteraksi dengan toko secara online.",
        image: "/images/projects/website-seragam-budhi-jaya.svg",
        additionalInfo: {
            links: [],
            videos: [],
            notes: [],
        },
    },
    {
        id: 10,
        judul:
            "Rohingya Sentiment Analysis using Machine Learning: A Study on Social Media Data",
        kategori: ["Data Science", "Data Analysis", "ML/DL Model", "Python"],
        ringkasan:
            "Project ini melakukan analisis sentimen terhadap isu Rohingya menggunakan data dari media sosial dan model Machine Learning untuk mengklasifikasikan sentimen positif, negatif, atau netral.",
        detail:
            "Project ini melakukan analisis sentimen terhadap isu Rohingya menggunakan data dari media sosial dan model Machine Learning untuk mengklasifikasikan sentimen positif, negatif, atau netral. Hasil analisis ini dapat memberikan wawasan tentang persepsi publik terhadap isu Rohingya dan membantu dalam memahami dinamika opini di media sosial terkait topik tersebut.",
        image: "/images/projects/rohingya-sentiment-analysis.svg",
        additionalInfo: {
            links: [],
            videos: [],
            notes: [],
        },
    },
    {
        id: 11,
        judul:
            "Website Profile RisFolio: Personal Portfolio Website dengan integrasi AI Chatbot",
        kategori: [
            "Web Development",
            "AI/LLM Integration",
            "Artificial Intelligence",
            "Next.js",
            "Tailwind CSS",
        ],
        ringkasan:
            "Project ini merupakan project pengembangan website profil pribadi dengan integrasi AI Chatbot yang dibangun menggunakan Next.js dan Tailwind CSS.",
        detail:
            "Project ini merupakan project pengembangan website profil pribadi dengan integrasi AI Chatbot yang dibangun menggunakan Next.js dan Tailwind CSS. Website ini dirancang untuk menampilkan informasi tentang latar belakang, pengalaman, dan proyek yang telah dilakukan, serta menyediakan fitur chatbot yang memungkinkan pengunjung untuk berinteraksi dan mendapatkan informasi lebih lanjut secara real-time.",
        image: "/images/projects/risfolio-portfolio.svg",
        additionalInfo: {
            links: [],
            videos: [],
            notes: [],
        },
    },
    {
        id: 12,
        judul:
            "Simple Streamlit Dashboard: Analisis Data Penjualan Supermarket dengan Prediksi Penjualan Menggunakan Machine Learning",
        kategori: [
            "Data Science",
            "Data Analysis",
            "ML/DL Model",
            "Python",
            "Streamlit",
            "End-to-End Project",
            "Dashboard",
        ],
        ringkasan:
            "Project ini merupakan project tugas akhir untuk mata kuliah visualisasi data dengan fokus pada analisis data penjualan supermaket dengan prediksi penjualan menggunakan Machine Learning.",
        detail:
            "Project ini merupakan project tugas akhir untuk mata kuliah visualisasi data dengan fokus pada analisis data penjualan supermaket dengan prediksi penjualan menggunakan Machine Learning.",
        image: "/images/projects/streamlit-supermarket-sales.svg",
        additionalInfo: {
            links: [
                {
                    label: "Project Repository",
                    url: "https://github.com/Riz2693/Visualisasi_Data",
                    type: "repository",
                },
                {
                    label: "Demo Aplikasi",
                    url: "https://visdatproject1.streamlit.app/",
                    type: "Application Demo",
                },
            ],
            videos: [],
            notes: [],
        },
    },
    {
        id: 13,
        judul:
            "Simple Streamlit Dashboard: Analisis Data Air Quality",
        kategori: [
            "Data Analysis", ,
            "Python",
            "Streamlit",
            "End-to-End Project",
            "Dashboard",
        ],
        ringkasan:
            "Project ini merupakan project pertama untuk pembelajaran streamlit dengan fokus pada analisis data kualitas udara",
        detail:
            "Project ini merupakan project pertama untuk pembelajaran streamlit dengan fokus pada analisis data kualitas udara",
        image: "/images/projects/streamlit-airquality.svg",
        additionalInfo: {
            links: [
                {
                    label: "Project Repository",
                    url: "https://github.com/Riz2693/Dicoding-Analisis_Data",
                    type: "repository",
                },
                {
                    label: "Demo Aplikasi",
                    url: "https://firstdashboarddicoding.streamlit.app/",
                    type: "Application Demo",
                },
            ],
            videos: [],
            notes: [],
        },
    },
];

// --- PENGALAMAN (Kerja, Magang & Organisasi) ---
export const pengalaman = [
    {
        id: 1,
        peran: "Data Analyst Intern & Wakil Project Manager",
        instansi: "Narasio Data",
        tipe: "Magang", // Bisa 'Kerja', 'Magang', 'Organisasi'
        tahun: "Sep 2025 - Jan 2026",
        ringkasan:
            "Mengembangkan dashboard operasional dan monitoring penjualan untuk klien developer perumahan dengan menggunakan looker studio, python dan google sheets.",
        detail:
            "Jobdesk yang saya lakukan sebagai Data Analyst Intern dan Wakil Project Manager di Narasio Data meliputi: \n 1. Pengembangan dashboard operasional dan monitoring penjualan menggunakan Looker Studio untuk klien developer perumahan. \n 2. Pengolahan dan analisis data menggunakan Python serta Google Sheets untuk manajemen data, memastikan kualitas dan konsistensi data. \n 3. Membantu dalam koordinasi tim dan memastikan proyek berjalan sesuai dengan jadwal yang telah ditetapkan. \n 4. Berkomunikasi secara rutin dengan klien untuk memahami kebutuhan mereka dan memberikan solusi yang sesuai berdasarkan data yang dianalisis. \n 5. Menyusun laporan dan presentasi untuk menyampaikan temuan dan rekomendasi kepada klien secara efektif.",
        image: "",
        additionalInfo: {
            tools: ["Looker Studio", "Python", "Google Sheets"],
        },
    },
    {
        id: 2,
        peran: "Asisten Dosen & Koordinator Praktikum",
        instansi: "Universitas Ahmad Dahlan",
        tipe: "Kontrak",
        tahun: "Mar 2025 - Agu 2025",
        ringkasan:
            "Memimpin anggota tim asisten dosen untuk salah satu praktikum dan mengkoordinasikan kegiatan praktikum dengan dosen sejalan dengan jadwal pembelajaran di kelas.",
        detail:
            "Jobdesk yang saya lakukan sebagai Asisten Dosen dan Koordinator Praktikum di Universitas Ahmad Dahlan meliputi: \n 1. Memimpin anggota tim asisten dosen untuk salah satu praktikum, memastikan bahwa semua anggota tim memahami tugas dan tanggung jawab mereka. \n 2. Mengkoordinasikan kegiatan praktikum dengan dosen, termasuk penjadwalan, persiapan materi, dan pelaksanaan praktikum sesuai dengan jadwal pembelajaran di kelas. \n 3. Menyediakan dukungan kepada 200+ mahasiswa selama praktikum, menjawab pertanyaan, dan membantu mereka memahami konsep yang diajarkan. \n 4. Membantu dalam penilaian tugas praktikum, memberikan umpan balik konstruktif kepada 200+ mahasiswa untuk meningkatkan pemahaman mereka. \n 5. Berkomunikasi secara efektif dengan dosen dan anggota tim untuk memastikan bahwa kegiatan praktikum berjalan lancar dan memberikan pengalaman belajar yang optimal bagi mahasiswa.",
        image: "",
        additionalInfo: {
            tools: null,
        },
    },
    {
        id: 3,
        peran: "Asisten Penelitian",
        instansi: "Universitas Ahmad Dahlan",
        tipe: "Paruh Waktu",
        tahun: "Sep 2024 - Agu 2025",
        ringkasan:
            "Mmembantu dalam meneliti, menganalisis data menggunakan python serta membuat laporan untuk proyek penelitian yang dipimpin oleh dosen.",
        detail:
            "Jobdesk yang saya lakukan sebagai Asisten Penelitian di Universitas Ahmad Dahlan meliputi: \n 1. Membantu dalam meneliti topik yang relevan dengan proyek penelitian yang dipimpin oleh dosen, termasuk melakukan tinjauan literatur hingga penulisan draft publikasi ilmiah. \n 2. Menganalisis data menggunakan Python untuk mendukung temuan penelitian, termasuk pembersihan data, analisis statistik, dan visualisasi data. \n 3. Membantu dalam menyusun laporan penelitian yang komprehensif, menyajikan temuan dan rekomendasi berdasarkan analisis data yang dilakukan. \n 4. Berkolaborasi dengan dosen dan anggota tim penelitian lainnya untuk memastikan bahwa proyek penelitian berjalan sesuai dengan rencana dan mencapai tujuan yang ditetapkan.",
        image: "",
        additionalInfo: {
            tools: ["Python", "Google Collaboratory", "Microsoft Office", "Google Workspace"],
        },
    },
    {
        id: 4,
        peran: "Machine Learning Engineer Intern & Project Manager",
        instansi: "Bangkit Academy 2024",
        tipe: "Magang",
        tahun: "Feb 2024 - Jul 2024",
        ringkasan:
            "Memimpin tim project untuk mengembangkan model deep learning yang digunakan dalam aplikasi mobile untuk memberikan rekomendasi pertumbuhan anak guna mencegah stunting.",
        detail:
            "Jobdesk yang saya lakukan sebagai Machine Learning Engineer Intern dan Project Manager di Bangkit Academy 2024 meliputi: \n 1. Memimpin tim project untuk mengembangkan model deep learning yang digunakan dalam aplikasi mobile untuk memberikan rekomendasi pertumbuhan anak guna mencegah stunting. \n 2. Merancang dan mengimplementasikan model deep learning menggunakan TensorFlow, memastikan bahwa model tersebut efektif dan efisien dalam memberikan rekomendasi yang akurat. \n 3. Berkoordinasi dengan anggota tim lainnya, termasuk pengembang aplikasi mobile, untuk memastikan integrasi yang lancar antara model deep learning dan aplikasi. \n 4. Mengelola jadwal proyek, memastikan bahwa semua tugas diselesaikan tepat waktu dan sesuai dengan standar kualitas yang ditetapkan. \n 5. Menyusun laporan proyek yang komprehensif, menyajikan temuan dan analisis berdasarkan hasil pengembangan model deep learning.",
        image: "",
        additionalInfo: {
            tools: ["TensorFlow", "Python", "Google Collaboratory", "Microsoft Office", "Google Workspace"],
        },
    },
    {
        id: 5,
        peran: "Asisten Dosen",
        instansi: "Universitas Ahmad Dahlan",
        tipe: "Kontrak",
        tahun: "Sep 2023 - Feb 2024",
        ringkasan:
            "Membantu dosen dalam mempersiapkan materi praktikum, memberikan bimbingan kepada mahasiswa selama praktikum, dan membantu dalam penilaian tugas praktikum.",
        detail:
            "Jobdesk yang saya lakukan sebagai Asisten Dosen di Universitas Ahmad Dahlan meliputi: \n 1. Membantu dosen dalam mempersiapkan materi praktikum, termasuk menyiapkan bahan ajar, modul praktikum, dan sumber daya lainnya yang diperlukan untuk kegiatan praktikum. \n 2. Memberikan bimbingan kepada 60+ mahasiswa selama praktikum, menjawab pertanyaan, dan membantu mereka memahami konsep yang diajarkan. \n 3. Membantu dalam penilaian tugas praktikum, memberikan umpan balik konstruktif kepada 60+ mahasiswa untuk meningkatkan pemahaman mereka. \n 4. Berkomunikasi secara efektif dengan dosen dan mahasiswa untuk memastikan bahwa kegiatan praktikum berjalan lancar dan memberikan pengalaman belajar yang optimal bagi mahasiswa.",
        image: "",
        additionalInfo: {
            tools: null
        },
    },
];

// 2. TAMBAH SECTION BARU: Volunteer / Non-Formal
export const volunteer = [
    // {
    //   id: 1,
    //   peran: "Mentor Python Dasar",
    //   event: "Bootcamp Coding Indonesia",
    //   tahun: "2023",
    //   deskripsi:
    //     "Mengajar 50+ peserta tentang dasar pemrograman Python dan Data Science.",
    // },
];

// --- PENDIDIKAN ---
export const pendidikan = [
    {
        id: 1,
        sekolah: "Universitas Ahmad Dahlan",
        jurusan: "S1 Teknik Informatika",
        tahun: "2021 - 2025",
        nilai: "IPK 3.77",
    },
    {
        id: 2,
        sekolah: "SMA Negeri 3 Karawang",
        jurusan: "MIPA",
        tahun: "2018 - 2021",
        nilai: "Rata-rata 84.73",
    },
];

// --- SERTIFIKASI ---
export const sertifikasi = [
    {
        id: 1,
        nama: "Dev Certificate for Machine Learning with TensorFlow",
        penerbit: "Dev Certificate",
        tahun: "Jan 2025 - Jan 2028",
        link: "https://dev.id/certificate/verify/R1VG225V2M",
        image: "",
        // Opsi sumber thumbnail sertifikasi (opsional):
        // - image: path gambar langsung (prioritas utama)
        // - pdfFile: path/URL PDF untuk auto-extract thumbnail halaman pertama di browser
        // Jika `image` kosong dan `pdfFile` tersedia, komponen akan membuat preview PDF otomatis.
        pdfFile: "https://www.dicoding.com/dicodingassets/certification/certificates/R1VG225V2M.pdf",
        kategori: "Sertifikat Internasional",
    },
    {
        id: 2,
        nama: "BNSP Associate Data Scientist",
        penerbit: "Kementrian Komunikasi dan Digital",
        tahun: "Oct 2025 - Oct 2028",
        link: "https://www.linkedin.com/in/m-faris-akbar-/overlay/Certifications/1312367840/treasury/?profileId=ACoAAC2WdgQBFNQvyaHEVM4pwzRNofINDz0G8dY",
        image: "/images/certifications/BNSP ADS.jpg",
        pdfFile: "",
        kategori: "Sertifikat Nasional",
    },
    {
        id: 3,
        nama: "Mathematics For Machine Learning and Data Science Specialization",
        penerbit: "Deeplearning.AI",
        tahun: "Mar 2024",
        link: "https://coursera.org/share/38d4c4e9fb7b48dfa69077c7d39e1bc2",
        image: "",
        pdfFile: "/file/certification/Coursera Mathematics For Machine Learning and Data Science.pdf",
        kategori: "Sertifikat Course & Specialization",
    },
    {
        id: 4,
        nama: "Deeplearning.AI TensorFlow Developer Specialization",
        penerbit: "Deeplearning.AI",
        tahun: "Mei 2024",
        link: "https://coursera.org/share/f63f381e5d2a0225dba36de8521fa310",
        image: "",
        pdfFile: "/file/certification/DeepLearning.AI TensorFlow Developer.pdf",
        kategori: "Sertifikat Course & Specialization",
    },
    {
        id: 5,
        nama: "Machine Learning Specialization",
        penerbit: "Deeplearning.AI, Stanford University",
        tahun: "Apr 2024",
        link: "https://coursera.org/share/7ea259153756f2cc0c236667089d49b7",
        image: "",
        pdfFile: "/file/certification/Machine Learning.pdf",
        kategori: "Sertifikat Course & Specialization",
    },
    {
        id: 6,
        nama: "TensorFlow: Data and Deployment Specialization",
        penerbit: "Deeplearning.AI",
        tahun: "Mei 2024",
        link: "https://coursera.org/share/fb1adb125b2be540fa1c8fc1bdeb0780",
        image: "",
        pdfFile: "/file/certification/TensorFlow Data and Deployment.pdf",
        kategori: "Sertifikat Course & Specialization",
    },
    {
        id: 7,
        nama: "TensorFlow: Advanced Techniques Specialization",
        penerbit: "Deeplearning.AI",
        tahun: "Mei 2025",
        link: "https://coursera.org/share/d476bb60f59e0fa8fe52eba7b1fbf579",
        image: "",
        pdfFile: "/file/certification/TensorFlow Advanced Techniques.pdf",
        kategori: "Sertifikat Course & Specialization",
    },
    {
        id: 9,
        nama: "IDCamp 2025 - AI Engineer (Intermediate)",
        penerbit: "Dicoding Academy x Indosat Ooredo",
        tahun: "Maret 2026",
        link: "https://drive.google.com/file/d/1BVOWaxBBpA8SJpQBQuts8k1_QI7EBQXV/view",
        image: "",
        pdfFile: "/file/certification/Sertifikat IDCamp 2025 Level Menengah (Muhammad Faris Akbar).pdf",
        kategori: "Sertifikat Kelulusan",
    },
];

export const techStack = [
    {
        id: 1,
        kategori: "Bahasa Pemrograman",
        skills: [
            { nama: "Python", image: "/images/tech/python.svg" },
            { nama: "SQL", image: "/images/tech/sql.svg" },
            { nama: "JavaScript", image: "/images/tech/javascript.svg" },
            { nama: "HTML", image: "/images/tech/html5.svg" },
            { nama: "CSS", image: "/images/tech/css3.svg" },
            { nama: "PHP", image: "/images/tech/php.svg" },
            { nama: "C++", image: "/images/tech/cplusplus.svg" },
        ],
    },
    {
        id: 2,
        kategori: "Data Science & Machine Learning",
        skills: [
            { nama: "Pandas", image: "/images/tech/pandas.svg" },
            { nama: "NumPy", image: "/images/tech/numpy.svg" },
            { nama: "Jupyter", image: "/images/tech/jupyter.svg" },
            { nama: "TensorFlow", image: "/images/tech/tensorflow.svg" },
            { nama: "Scikit-Learn", image: "/images/tech/scikitlearn.svg" },
            { nama: "Matplotlib", image: "/images/tech/matplotlib.svg" },
            { nama: "Seaborn", image: "/images/tech/seaborn.svg" },
            { nama: "Keras", image: "/images/tech/keras.svg" },
            { nama: "Streamlit", image: "/images/tech/streamlit.svg" },
            { nama: "AI Studio/RapidMiner", image: "/images/tech/rapidminer.svg" },
        ],
    },
    {
        id: 4,
        kategori: "BI & Analytics Tools",
        skills: [
            { nama: "Tableau", image: "/images/tech/tableau.svg" },
            { nama: "Power BI", image: "/images/tech/powerbi.svg" },
            { nama: "Looker Studio", image: "/images/tech/looker.svg" },
            { nama: "Microsoft Excel", image: "/images/tech/microsoftexcel.svg" },
        ],
    },
    {
        id: 5,
        kategori: "Data Engineering & Database",
        skills: [
            { nama: "PostgreSQL", image: "/images/tech/postgresql.svg" },
            { nama: "Docker", image: "/images/tech/docker.svg" },
            { nama: "Google Cloud Platform", image: "/images/tech/googlecloud.svg" },
            { nama: "Big Query", image: "/images/tech/bigquery.svg" },
            { nama: "Bruin", image: "/images/tech/bruin.svg" },
            { nama: "Kestra", image: "/images/tech/kestra.svg" },
            { nama: "Dbeaver", image: "/images/tech/dbeaver.svg" },
            { nama: "Microsoft SQL Server", image: "/images/tech/mssql.svg" },
        ],
    },
    {
        id: 6,
        kategori: "Tools & Collaboration",
        skills: [
            { nama: "Git", image: "/images/tech/git.svg" },
            { nama: "GitHub", image: "/images/tech/github.svg" },
        ],
    },
];

export const pelatihan = [
    {
        id: 1,
        nama: "Dicoding Academy: Coding Camp 2026 - Data Science",
        instansi: "Dicoding x DBS Foundation",
        tahun: "2026 - Sekarang",
        kategori: "Beasiswa Bootcamp - Online Course",
        ringkasan:
            "Program pelatihan intensif untuk membekali peserta dengan keterampilan data science, termasuk analisis data, machine learning, dan visualisasi data menggunakan berbagai tools dan bahasa pemrograman yang relevan.",
    },
    {
        id: 2,
        nama: "Dicoding Academy: Microsoft Elevate 2026",
        instansi: "Dicoding x Microsoft",
        tahun: "2026 - Sekarang",
        kategori: "Beasiswa Bootcamp - Online Course",
        ringkasan:
            "Program pelatihan intensif untuk membekali peserta dengan keterampilan data science dan ai dalam lingkungan microsoft, termasuk penggunaan Azure, Power BI, dan alat-alat Microsoft lainnya untuk analisis data dan pengembangan solusi AI.",
    },
    {
        id: 3,
        nama: "Data Engineering Zoomcamp 2026",
        instansi: "DataTalks.Club",
        tahun: "2026 - Sekarang",
        kategori: "Online Course",
        ringkasan:
            "Program pelatihan intensif untuk membekali peserta dengan keterampilan data engineering, termasuk ETL/ELT, data pipeline, dan arsitektur data modern.",
    },
    {
        id: 4,
        nama: "Dicoding Academy: IDCamp 2025 - AI Engineer",
        instansi: "Dicoding x Indosat Ooredo",
        tahun: "2025 - Sekarang",
        kategori: "Beasiswa Bootcamp - Online Course",
        ringkasan:
            "Program pelatihan intensif untuk membekali peserta dengan keterampilan AI Engineer, termasuk machine learning, deep learning, dan penerapan AI dalam berbagai industri.",
    },
    {
        id: 5,
        nama: "Digitalent Komdigi - Associate Data Scientist",
        instansi: "Kementrian Komunikasi dan Digital",
        tahun: "2025",
        kategori: "Beasiswa Bootcamp - Online Course - Sertifikasi",
        ringkasan:
            "Pelatihan intensif untuk mempersiapkan peserta menjadi Associate Data Scientist bersertifikat BNSP.",
    },
];
