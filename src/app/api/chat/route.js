// src/app/api/chat/route.js
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import {
    profil,
    projects,
    pengalaman,
    volunteer,
    pendidikan,
    sertifikasi,
} from "../../../data";

// Pastikan API Key terbaca
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req) {
    try {
        const { message, history } = await req.json();

        // 1. Siapkan Data
        const contextData = JSON.stringify({
            profil,
            projects,
            pengalaman,
            volunteer,
            pendidikan,
            sertifikasi,
        });

        const systemInstruction = `
      Kamu adalah asisten AI profesional untuk portofolio milik ${profil.nama}.
      Tugasmu adalah menjawab pertanyaan pengunjung berdasarkan data berikut:
      ${contextData}

      Aturan menjawab:
      1. Jawablah dengan ramah, profesional, dan antusias.
      2. Gunakan bahasa Indonesia yang baik namun santai (seperti percakapan profesional).
      3. JANGAN mengarang informasi yang tidak ada di data. Jika tidak tahu, jawab "Maaf, informasi tersebut tidak tersedia di portofolio ini, silakan hubungi ${profil.nama} secara langsung."
      4. Jika ditanya tentang kontak, arahkan ke email atau LinkedIn yang ada di data profil.
      5. Jawablah dengan ringkas (maksimal 3-4 kalimat) kecuali diminta menjelaskan detail.
    `;

        // 2. Konfigurasi Model
        // PENTING: Gunakan nama persis "gemini-2.5-flash" (tanpa -latest, tanpa -001)
        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash",
            systemInstruction: systemInstruction, // Model Flash support fitur ini
        });

        // 3. Mulai Chat
        const chat = model.startChat({
            history: history.map((msg) => ({
                role: msg.isBot ? "model" : "user",
                parts: [{ text: msg.text }],
            })),
        });

        // 4. Kirim Pesan
        const result = await chat.sendMessage(message);
        const response = await result.response;
        const text = response.text();

        return NextResponse.json({ reply: text });
    } catch (error) {
        console.error("Error AI:", error);

        // Cek spesifik jika error karena API Key
        if (error.message.includes("API key not valid")) {
            return NextResponse.json(
                { reply: "Konfigurasi API Key salah. Cek file .env.local" },
                { status: 500 },
            );
        }

        return NextResponse.json(
            { reply: "Maaf, server AI sedang sibuk. Coba lagi nanti." },
            { status: 500 },
        );
    }
}
