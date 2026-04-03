const fs = require("fs");
const path = require("path");

const outDir = path.join(process.cwd(), "public", "images", "projects");

const covers = [
    { file: "data-engineering-zoomcamp.svg", title: "Data Engineering Zoomcamp", subtitle: "ETL • Pipeline • GCP" },
    { file: "growth-track.svg", title: "Growth Track", subtitle: "Mobile • Deep Learning" },
    { file: "kmeans-ga-umkm.svg", title: "K-Means + Genetic Algorithm", subtitle: "UMKM Clustering" },
    { file: "kprototype-umkm.svg", title: "K-Prototype Analysis", subtitle: "MSME Segmentation" },
    { file: "shopee-sentiment.svg", title: "Shopee Sentiment Analysis", subtitle: "IndoBERT • BI-LSTM • RNN" },
    { file: "animal10-classification.svg", title: "Animal-10 Classification", subtitle: "CNN • Transfer Learning" },
    { file: "rakamin-idx-loan.svg", title: "IDX Loan Default Prediction", subtitle: "Risk Modeling • ML" },
    { file: "rakamin-homecredit-loan.svg", title: "Home Credit Default Prediction", subtitle: "Credit Analytics • ML" },
    { file: "website-seragam-budhi-jaya.svg", title: "Budhi Jaya E-Commerce", subtitle: "Catalog • Sales Website" },
    { file: "rohingya-sentiment-analysis.svg", title: "Rohingya Sentiment Study", subtitle: "Social Media • NLP" },
    { file: "risfolio-portfolio.svg", title: "RisFolio Portfolio", subtitle: "Next.js • AI Chatbot" },
    { file: "streamlit-supermarket-sales.svg", title: "Supermarket Sales Dashboard", subtitle: "Streamlit • Forecasting" },
    { file: "streamlit-airquality.svg", title: "Air Quality Dashboard", subtitle: "Streamlit • Data Analysis" },
];

const palettes = [
    ["#0f172a", "#1d4ed8", "#22d3ee"],
    ["#111827", "#7c3aed", "#2dd4bf"],
    ["#0b1020", "#2563eb", "#a78bfa"],
    ["#111827", "#0ea5e9", "#34d399"],
    ["#0f172a", "#db2777", "#60a5fa"],
    ["#0b1324", "#f59e0b", "#22d3ee"],
    ["#0f172a", "#ef4444", "#f59e0b"],
    ["#0f172a", "#14b8a6", "#8b5cf6"],
];

function hash(str) {
    let h = 0;
    for (let i = 0; i < str.length; i += 1) {
        h = (h << 5) - h + str.charCodeAt(i);
        h |= 0;
    }
    return Math.abs(h);
}

function escapeXml(text) {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/\"/g, "&quot;")
        .replace(/'/g, "&apos;");
}

function buildCover({ file, title, subtitle }) {
    const h = hash(file);
    const [bgA, bgB, accent] = palettes[h % palettes.length];
    const ringX = 180 + (h % 180);
    const ringY = 120 + (h % 110);
    const cardW = 690 + (h % 80);
    const barCount = 4 + (h % 3);
    const bars = Array.from({ length: barCount }, (_, i) => {
        const w = 220 + ((h + i * 97) % 320);
        const y = 230 + i * 38;
        return `<rect x="280" y="${y}" width="${w}" height="12" rx="6" fill="#E2E8F0" fill-opacity="0.72"/>`;
    }).join("\n      ");

    return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" role="img" aria-label="${escapeXml(title)} cover">
  <defs>
    <linearGradient id="bg_${h}" x1="0" y1="0" x2="1200" y2="630" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="${bgA}"/>
      <stop offset="100%" stop-color="${bgB}"/>
    </linearGradient>
    <linearGradient id="glass_${h}" x1="250" y1="150" x2="980" y2="500" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.22"/>
      <stop offset="100%" stop-color="${accent}" stop-opacity="0.25"/>
    </linearGradient>
  </defs>

  <rect width="1200" height="630" fill="url(#bg_${h})"/>

  <circle cx="${ringX}" cy="${ringY}" r="170" fill="${accent}" fill-opacity="0.16"/>
  <circle cx="1055" cy="520" r="210" fill="#FFFFFF" fill-opacity="0.07"/>

  <rect x="250" y="150" width="${cardW}" height="340" rx="28" fill="url(#glass_${h})" stroke="#FFFFFF" stroke-opacity="0.28"/>
  <rect x="280" y="190" width="290" height="16" rx="8" fill="#FFFFFF" fill-opacity="0.86"/>
  <rect x="280" y="220" width="460" height="12" rx="6" fill="#CDE7FF" fill-opacity="0.85"/>

  ${bars}

  <rect x="280" y="410" width="220" height="38" rx="19" fill="${accent}" fill-opacity="0.92"/>
  <text x="390" y="435" text-anchor="middle" fill="#0B1220" font-family="Inter,Segoe UI,Arial,sans-serif" font-size="16" font-weight="700">PROJECT</text>

  <text x="600" y="548" text-anchor="middle" fill="#F8FAFC" font-family="Inter,Segoe UI,Arial,sans-serif" font-size="40" font-weight="700">${escapeXml(title)}</text>
  <text x="600" y="580" text-anchor="middle" fill="#CBD5E1" font-family="Inter,Segoe UI,Arial,sans-serif" font-size="22">${escapeXml(subtitle)}</text>
</svg>
`;
}

fs.mkdirSync(outDir, { recursive: true });

for (const cover of covers) {
    fs.writeFileSync(path.join(outDir, cover.file), buildCover(cover), "utf8");
}

console.log(`Generated ${covers.length} project covers in ${outDir}`);
