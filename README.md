This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Environment Variables Setup

1. **Create `.env.local` file** in the `portofolio-data/` directory:

```bash
cp .env.example .env.local
```

2. **Fill in your environment variables** in `.env.local`:

```properties
# Gemini API Key for AI Chatbot
# Get your key from: https://aistudio.google.com/app/apikey
GEMINI_API_KEY=your_gemini_api_key_here

# Resend API Key for email sending
# Get your key from: https://resend.com/
RESEND_API_KEY=your_resend_api_key_here

# Contact Email - where form submissions will be sent
# This is your personal email address
CONTACT_EMAIL=your_email@example.com
```

### Running Development Server

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Build & Production

### Build Production Bundle

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

### Linting

Check code quality and issues:

```bash
npm run lint
```

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new) from the creators of Next.js.

### Deployment Steps

1. **Push your code to GitHub** (or connect your repository to Vercel)

2. **Create a new project on Vercel**:
   - Import your repository
   - Select the `portofolio-data/` folder as the root directory
   - Click "Deploy"

3. **Configure Environment Variables on Vercel**:
   - Go to your project settings → Environment Variables
   - Add the following variables:
     - `GEMINI_API_KEY` - Your Google Gemini API key
     - `RESEND_API_KEY` - Your Resend email API key
     - `CONTACT_EMAIL` - Your contact email address

4. **Deploy**:
   - Vercel will automatically deploy on every push to main branch
   - Your app will be live at `https://your-project.vercel.app`

### Alternative Hosting

This is a Next.js 16+ app that can be deployed to:

- [Netlify](https://netlify.com) - requires `next export` configuration
- [AWS Amplify](https://aws.amazon.com/amplify/)
- [Railway](https://railway.app/)
- [Render](https://render.com/)
- [Self-hosted servers](https://nextjs.org/docs/app/building-your-application/deploying/self-hosted)

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Custom Feature Notes (Portofolio)

### 1) Project Detail - Informasi Tambahan

Halaman detail project (`src/app/projects/[id]/page.js`) sekarang mendukung section **Informasi Tambahan** yang dirender secara kondisional dari `additionalInfo` pada data project.

Skema yang didukung di `src/data.js`:

- `additionalInfo.links`: daftar tautan referensi/demo/repository
- `additionalInfo.videos`: daftar video (mendukung embed YouTube/Vimeo)
- `additionalInfo.notes`: catatan tambahan berbentuk array string

Contoh format:

```js
additionalInfo: {
	project_link: null, // legacy support (opsional)
	project_preview_link: null, // legacy support (opsional)
	links: [
		{
			label: "Website Program",
			url: "https://example.com",
			type: "referensi",
		},
	],
	videos: [
		{
			title: "Demo Project",
			url: "https://www.youtube.com/watch?v=VIDEO_ID",
			// embedUrl opsional, jika ingin pakai URL embed custom
		},
	],
	notes: ["Catatan penting project"],
}
```

#### Catatan video embedding

- URL YouTube (`youtube.com`, `youtu.be`, `youtube.com/shorts/...`) dan Vimeo (`vimeo.com/...`) akan diubah otomatis menjadi embed.
- Jika URL tidak dikenali untuk embed, sistem tetap menampilkan link video biasa sebagai fallback.

### 2) Placeholder Gambar untuk Project yang Belum Punya Asset

Project yang sebelumnya belum memiliki gambar kini menggunakan SVG placeholder lokal agar konsisten dengan project lain:

- `public/images/projects/website-seragam-budhi-jaya.svg`
- `public/images/projects/rohingya-sentiment-analysis.svg`
- `public/images/projects/website-profile-risfolio.svg`

Dan sudah dipetakan ke field `image` masing-masing item project di `src/data.js`.

### 3) Format Output Chatbot (Markdown Render)

Komponen chatbot (`src/components/ChatWidget.js`) sekarang merender balasan bot menggunakan markdown renderer (`react-markdown`).

Hasilnya:

- Marker seperti `**teks**` tidak tampil literal.
- Format seperti bold, list, dan link tampil rapi di UI.
- Link tetap aman dibuka via tab baru (`target="_blank"`, `rel="noopener noreferrer"`).

### 4) Sertifikasi - Thumbnail dari PDF (Auto Extraction)

Halaman `src/app/certifications/page.js` sekarang mendukung thumbnail sertifikasi dari 2 sumber:

1. `image` (gambar langsung)
2. `pdfFile` (file PDF, thumbnail akan di-generate otomatis dari halaman pertama di browser)

Prioritas sumber thumbnail:

1. `image`
2. hasil ekstraksi dari `pdfFile`
3. placeholder default

Contoh format data di `src/data.js`:

```js
{
	id: 1,
	nama: "Nama Sertifikasi",
	penerbit: "Nama Penerbit",
	tahun: "2026",
	link: "https://credential-link.com",
	image: "", // isi jika pakai gambar langsung
	pdfFile: "/file/certifications/nama-sertifikat.pdf", // opsional
	kategori: "Course & Specialization Certificate",
}
```

Catatan:

- Jika `image` terisi, sistem tidak mengekstrak dari `pdfFile`.
- Jika `image` kosong dan `pdfFile` valid, sistem akan mencoba membuat preview otomatis.
- Jika ekstraksi gagal (mis. path PDF tidak valid), kartu tetap tampil dengan fallback aman.
- Untuk URL PDF eksternal, aplikasi menggunakan endpoint internal `GET /api/pdf-proxy?url=...` agar pembacaan PDF lebih aman dari kendala CORS di browser.
