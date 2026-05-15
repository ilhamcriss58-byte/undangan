"use client";

import { useEffect, useRef, useState } from "react";

export default function Home() {
  const audioRef = useRef(null);
  const fadeRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isReady, setIsReady] = useState(false); // Memastikan audio siap
  const [toast, setToast] = useState("");

  const [countdown, setCountdown] = useState({ d: 0, h: 0, m: 0, s: 0 });
  const targetDate = new Date("2026-05-25T07:00:00").getTime();

  const sections = [
    { id: "intro", title: "Undangan Pernikahan", content: "Pernikahan adalah awal dari kisah indah yang akan ditulis bersama." },
    { id: "mempelai", title: "Mempelai", content: "Anggun Ning Tyas\n&\nIlham Kristuaji" },
    { id: "acara", title: "Detail Acara", content: "Akad 07.00 WIB & Resepsi 09.00 WIB" },
    { id: "lokasi", title: "Lokasi", content: "Bojonegoro, Jawa Timur" },
  ];

  // ================= COUNTDOWN =================
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const distance = targetDate - now;
      if (distance <= 0) return;
      setCountdown({
        d: Math.floor(distance / (1000 * 60 * 60 * 24)),
        h: Math.floor((distance / (1000 * 60 * 60)) % 24),
        m: Math.floor((distance / (1000 * 60)) % 60),
        s: Math.floor((distance / 1000) % 60),
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  // ================= SAFE FADE =================
  const fadeVolume = (audio, to, duration = 800) => {
    if (fadeRef.current) clearInterval(fadeRef.current);
    const step = 50;
    const diff = to - audio.volume;
    const increment = diff / (duration / step);

    fadeRef.current = setInterval(() => {
      if (!audio) return;
      let newVolume = audio.volume + increment;
      if ((increment > 0 && newVolume >= to) || (increment < 0 && newVolume <= to)) {
        audio.volume = to;
        clearInterval(fadeRef.current);
      } else {
        audio.volume = Math.min(1, Math.max(0, newVolume));
      }
    }, step);
  };

  // ================= INITIAL PLAY =================
  const handleStartAudio = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      setHasInteracted(true);
      audio.muted = false;
      audio.volume = 0;
      
      // Memulai pemutaran
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        await playPromise;
        setIsPlaying(true);
        fadeVolume(audio, 0.8);
        setToast("🎵 Musik dimulai");
      }
    } catch (err) {
      console.error("Autoplay diblokir:", err);
      setToast("⚠️ Klik icon musik untuk memutar");
    } finally {
      setTimeout(() => setToast(""), 3000);
    }
  };

  // ================= TOGGLE MUSIC =================
  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      if (isPlaying) {
        setToast("🔇 Musik dimatikan");
        fadeVolume(audio, 0, 500);
        setTimeout(() => {
          audio.pause();
          setIsPlaying(false);
        }, 500);
      } else {
        audio.volume = 0;
        await audio.play();
        setIsPlaying(true);
        fadeVolume(audio, 0.8, 800);
        setToast("🎵 Musik dinyalakan");
      }
    } catch (err) {
      setToast("❌ Gagal memutar musik");
    } finally {
      setTimeout(() => setToast(""), 2000);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-100 to-blue-50 text-slate-700 overflow-x-hidden font-sans">
      
      {/* AUDIO ELEMENT */}
      <audio 
        ref={audioRef} 
        loop 
        playsInline 
        preload="auto"
        onCanPlayThrough={() => setIsReady(true)}
      >
        <source src="/ssstik.io_1778816090503.mp3" type="audio/mpeg" />
      </audio>

      {/* TOAST */}
      {toast && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-[9999] bg-black/80 text-white px-6 py-3 rounded-full text-sm backdrop-blur-sm shadow-xl transition-all">
          {toast}
        </div>
      )}

      {/* OVERLAY AWAL */}
      {!hasInteracted && (
        <div
          onClick={handleStartAudio}
          className="fixed inset-0 z-[9998] bg-black/70 flex items-center justify-center text-white text-center px-6 backdrop-blur-sm cursor-pointer"
        >
          <div className="animate-in fade-in zoom-in duration-700">
            <p className="text-3xl font-serif mb-4">Undangan Pernikahan</p>
            <p className="text-lg mb-8 italic">Anggun & Ilham</p>
            <div className="bg-white/20 p-4 rounded-xl border border-white/30 inline-block">
               <p className="text-sm">Klik di mana saja untuk membuka</p>
            </div>
          </div>
        </div>
      )}

      {/* FLOATING MUSIC BUTTON */}
      {hasInteracted && (
        <button
          onClick={toggleMusic}
          disabled={!isReady}
          className={`fixed bottom-6 right-6 z-[9997] w-14 h-14 rounded-full bg-white shadow-2xl flex items-center justify-center border border-slate-200 transition-transform active:scale-90 ${!isReady ? 'opacity-50' : 'opacity-100'}`}
        >
          <div className={`text-2xl ${isPlaying ? "animate-spin-slow" : ""}`}>
            {isPlaying ? "🎵" : "🔇"}
          </div>
        </button>
      )}

      {/* HERO SECTION */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-5xl md:text-7xl font-serif font-light mb-8">
          Anggun & Ilham
        </h1>

        <div className="grid grid-cols-4 gap-4 bg-white/50 backdrop-blur p-6 rounded-2xl shadow-inner border border-white">
          {Object.entries(countdown).map(([label, value]) => (
            <div key={label} className="flex flex-col">
              <span className="text-2xl font-bold">{value}</span>
              <span className="text-[10px] uppercase tracking-wider">{label === 'd' ? 'Hari' : label === 'h' ? 'Jam' : label === 'm' ? 'Menit' : 'Detik'}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CONTENT SECTIONS */}
      {sections.map((s) => (
        <section key={s.id} className="min-h-[70vh] flex items-center justify-center px-6 py-20">
          <div className="bg-white/60 backdrop-blur-md p-10 rounded-[2rem] shadow-xl max-w-2xl text-center border border-white/50">
            <h2 className="text-3xl font-serif mb-6 text-slate-800">{s.title}</h2>
            <p className="whitespace-pre-line leading-relaxed text-slate-600">{s.content}</p>
          </div>
        </section>
      ))}

      <footer className="py-20 text-center bg-slate-200/30">
        <h2 className="text-3xl font-serif">Terima Kasih</h2>
        <p className="mt-2 text-slate-500 italic">Sampai jumpa di hari bahagia kami</p>
      </footer>

      <style jsx global>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 5s linear infinite;
        }
      `}</style>
    </main>
  );
}
