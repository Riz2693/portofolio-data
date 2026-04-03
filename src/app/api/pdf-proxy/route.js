import { NextResponse } from "next/server";

const isPrivateHostname = (hostname) => {
    if (!hostname) return true;

    const lower = hostname.toLowerCase();
    if (lower === "localhost" || lower.endsWith(".local")) return true;

    if (/^\d+\.\d+\.\d+\.\d+$/.test(lower)) {
        const [a, b] = lower.split(".").map(Number);
        if (a === 10) return true;
        if (a === 127) return true;
        if (a === 192 && b === 168) return true;
        if (a === 172 && b >= 16 && b <= 31) return true;
        if (a === 169 && b === 254) return true;
    }

    return false;
};

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const sourceUrl = searchParams.get("url");

        if (!sourceUrl) {
            return NextResponse.json(
                { error: "Parameter url wajib diisi." },
                { status: 400 },
            );
        }

        let parsed;
        try {
            parsed = new URL(sourceUrl);
        } catch {
            return NextResponse.json(
                { error: "URL PDF tidak valid." },
                { status: 400 },
            );
        }

        if (!["http:", "https:"].includes(parsed.protocol)) {
            return NextResponse.json(
                { error: "Protocol URL tidak didukung." },
                { status: 400 },
            );
        }

        if (isPrivateHostname(parsed.hostname)) {
            return NextResponse.json(
                { error: "Akses ke host private tidak diizinkan." },
                { status: 403 },
            );
        }

        const upstream = await fetch(parsed.toString(), {
            method: "GET",
            redirect: "follow",
            cache: "no-store",
            headers: {
                Accept: "application/pdf,*/*",
                "User-Agent": "Mozilla/5.0 (compatible; PortfolioPdfProxy/1.0)",
            },
        });

        if (!upstream.ok) {
            return NextResponse.json(
                {
                    error: `Gagal mengambil PDF dari sumber eksternal (${upstream.status}).`,
                },
                { status: 502 },
            );
        }

        const buffer = await upstream.arrayBuffer();

        return new NextResponse(buffer, {
            status: 200,
            headers: {
                "Content-Type": "application/pdf",
                "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800",
            },
        });
    } catch (error) {
        console.error("PDF proxy error:", error);
        return NextResponse.json(
            { error: "Terjadi kesalahan saat memproses PDF proxy." },
            { status: 500 },
        );
    }
}
