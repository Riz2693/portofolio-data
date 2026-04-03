// src/components/ChatWidget.js
"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Loader2, Sun, Moon } from "lucide-react"; // Tambahan Sun & Moon
import { useTheme } from "next-themes"; // Import untuk fitur Tema
import ReactMarkdown from "react-markdown";

export default function ChatWidget() {
    // --- 1. STATE UNTUK TEMA (DARK/LIGHT) ---
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false); // Di sinilah 'mounted' dideklarasikan

    // --- 2. STATE UNTUK CHATBOT AI ---
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            text: "Halo! Saya AI Assistant. Tanyakan apa saja tentang portofolio ini!",
            isBot: true,
        },
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const messagesEndRef = useRef(null);

    // --- 3. EFFECTS ---
    // Memastikan tema sudah di-load oleh browser sebelum merender tombol (Mencegah Error)
    useEffect(() => {
        setMounted(true);
    }, []);

    // Auto scroll chat ke paling bawah
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isOpen]);

    // --- 4. FUNGSI KIRIM PESAN KE GEMINI API ---
    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage = { text: input, isBot: false };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsLoading(true);

        try {
            const historyForAI = messages.slice(1);
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    message: userMessage.text,
                    history: historyForAI,
                }),
            });
            const data = await response.json();
            setMessages((prev) => [...prev, { text: data.reply, isBot: true }]);
        } catch (error) {
            console.error(error);
            setMessages((prev) => [
                ...prev,
                { text: "Maaf, terjadi kesalahan koneksi.", isBot: true },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-4 right-3.5 z-50 flex flex-col items-end font-sans print:hidden">
            {/* --- JENDELA CHAT --- */}
            {isOpen && (
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700
                w-79 h-[486px]
                sm:w-93 sm:h-[356px]
                max-md:landscape:w-79 max-md:landscape:h-[196px] max-md:landscape:mb-1
                rounded-3xl shadow-2xl mb-4 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5">
                    {/* Header */}
                    <div className="bg-blue-600 p-4 flex justify-between items-center shadow-md">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                            <h3 className="text-white font-bold text-sm">
                                Portofolio AI Assistant
                            </h3>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-white/80 hover:text-white hover:bg-blue-700 rounded-full p-1 transition"
                        >
                            <X size={18} />
                        </button>
                    </div>

                    {/* Chat Area */}
                    <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50 dark:bg-slate-950 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-700">
                        {messages.map((msg, idx) => (
                            <div
                                key={idx}
                                className={`flex ${msg.isBot ? "justify-start" : "justify-end"}`}
                            >
                                <div
                                    className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${msg.isBot
                                        ? "bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-none border border-slate-200 dark:border-slate-700 shadow-sm"
                                        : "bg-blue-600 text-white rounded-tr-none shadow-md"
                                        }`}
                                >
                                    {msg.isBot ? (
                                        <div className="prose prose-sm dark:prose-invert max-w-none prose-p:my-2 prose-ul:my-2 prose-ol:my-2 prose-headings:my-2 prose-strong:text-slate-900 dark:prose-strong:text-slate-100">
                                            <ReactMarkdown
                                                components={{
                                                    a: ({ ...props }) => (
                                                        <a
                                                            {...props}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-blue-600 dark:text-blue-400 hover:underline"
                                                        />
                                                    ),
                                                }}
                                            >
                                                {msg.text}
                                            </ReactMarkdown>
                                        </div>
                                    ) : (
                                        <p className="whitespace-pre-wrap">{msg.text}</p>
                                    )}
                                </div>
                            </div>
                        ))}

                        {/* Loading Indicator */}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-white dark:bg-slate-800 p-3 rounded-2xl rounded-tl-none border border-slate-200 dark:border-slate-700 flex items-center gap-2 shadow-sm">
                                    <Loader2
                                        size={16}
                                        className="animate-spin text-blue-600 dark:text-blue-400"
                                    />
                                    <span className="text-xs text-slate-500 dark:text-slate-400">
                                        Sedang mengetik...
                                    </span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <form
                        onSubmit={handleSend}
                        className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex gap-2"
                    >
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Tanyakan sesuatu..."
                            disabled={isLoading}
                            className="flex-1 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-200 text-sm rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600 border border-slate-200 dark:border-slate-700 placeholder:text-slate-500"
                        />
                        <button
                            type="submit"
                            disabled={isLoading || !input.trim()}
                            className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-500 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-600/20"
                        >
                            <Send size={18} />
                        </button>
                    </form>
                </div>
            )}

            {/* --- WADAH TOMBOL TEMA & CHAT --- */}
            <div className="flex items-center gap-3">
                {/* Tombol Toggle Theme */}
                {mounted && (
                    <button
                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                        className="bg-white dark:bg-slate-800 text-slate-600 dark:text-yellow-400 p-2.5 rounded-full shadow-lg border border-slate-200 dark:border-slate-700 hover:scale-110 active:scale-95 transition-all"
                        title="Ubah Tema"
                    >
                        {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                    </button>
                )}

                {/* Tombol Bulat Chat AI */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="group bg-blue-600 hover:bg-blue-500 text-white p-3.5 rounded-full shadow-xl shadow-blue-600/30 transition-all hover:scale-110 active:scale-95 relative"
                >
                    {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
                </button>
            </div>
        </div>
    );
}
