// src/app/api/send/route.js
import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
    try {
        const { nama, email, pesan } = await request.json();

        // Validasi sederhana
        if (!nama || !email || !pesan) {
            return NextResponse.json(
                { error: "Semua kolom wajib diisi" },
                { status: 400 },
            );
        }

        const data = await resend.emails.send({
            // CATATAN PENTING: Jika kamu menggunakan akun gratis tanpa verifikasi domain sendiri,
            // kamu HANYA BISA mengirim DARI 'onboarding@resend.dev'
            from: "Portofolio Contact <onboarding@resend.dev>",
            // KEPADA email pribadimu (email dari environment variable CONTACT_EMAIL)
            to: [process.env.CONTACT_EMAIL || "mfarfaris@gmail.com"],
            subject: `Pesan Baru dari ${nama}`,
            // reply_to: email, // Jika kamu klik "Reply" di Gmail, akan otomatis membalas ke email pengirim
            text: `Nama: ${nama}\nEmail: ${email}\n\nPesan:\n${pesan}`,
        });

        return NextResponse.json({ success: true, data });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
