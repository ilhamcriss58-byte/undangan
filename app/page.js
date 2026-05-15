"use client";

import { useEffect, useRef, useState } from "react";

export default function Home() {
  const audioRef = useRef(null);
  const fadeRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [toast, setToast] = useState("");

  const [countdown, setCountdown] = useState({ d: 0, h: 0, m: 0, s: 0 });
  const targetDate = new Date("2026-05-25T07:00:00").getTime();

  const sections = [
    { id: "intro", title: "Undangan Pernikahan", content: "Pernikahan adalah awal dari kisah indah yang akan ditulis bersama." },
    { id: "mempelai", title: "Mempelai", content: `Anggun Ning Tyas\nPutri dari Bapak M. Slamet Riyadi\nDan Ibu Sri Endah Puspitorini\n\n&\n\nIlham Kristuaji\nPutra dari Bapak Ishak Sriyono\nDan Ibu Ribkah Sutarmi` },
    { id: "acara", title: "Detail Acara", content: "Senin, 25 Mei 2026. Akad dimulai pukul 07.00 WIB dan Resepsi pukul 09.00 WIB sampai selesai." },
    { id: "lokasi", title: "Lokasi", content: "Desa Panjang RT.13/RW.5, Kedungadem, Bojonegoro, Jawa Timur." },
    { id: "doa", title: "Doa & Restu", content: "Merupakan suatu kehormatan bagi kami apabila Bapak/Ibu berkenan hadir memberikan doa restu." },
    { id: "gift", title: "Hadiah Pernikahan", content: "Doa restu Anda sudah sangat cukup sebagai hadiah terbaik bagi kami." },
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

  // ================= AUDIO LOGIC =================
  const fadeVolume = (to, duration = 1200) => {
    const audio = audioRef.current;
    if (!audio) return;
    if (fadeRef.current) clearInterval(fadeRef.current);

    const step = 50;
    const increment = (to - audio.volume) / (duration / step);

    fadeRef.current = setInterval(() => {
      let nextVol = audio.volume + increment;
      if ((increment > 0 && nextVol >= to) || (increment < 0 && nextVol <= to)) {
        audio.volume = to;
        clearInterval(fadeRef.current);
        if (to === 0) audio.pause();
      } else {
        audio.volume = Math.max(0, Math.min(1, nextVol));
      }
    }, step);
  };

  const handleStartAudio = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    try {
      setHasInteracted(true);
      audio.volume = 0;
      await audio.play();
      setIsPlaying(true);
      fadeVolume(0.7);
    } catch (err) {
      setToast("Klik ikon musik untuk memutar");
    }
  };

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      fadeVolume(0);
      setIsPlaying(false);
    } else {
      audio.play();
      setIsPlaying(true);
      fadeVolume(0.7);
    }
  };

  return (
    <main className="min-h-screen text-slate-800 font-serif overflow-x-hidden selection:bg-rose-100">
      {/* INTEGRASI AUDIO */}
      <audio 
        ref={audioRef} 
        loop 
        playsInline 
        onCanPlayThrough={() => setIsReady(true)}
        src="/ssstik.io_1778816090503.mp3" 
      />

      {/* OVERLAY AWAL (Anti-Blokir Autoplay) */}
      {!hasInteracted && (
        <div 
          onClick={handleStartAudio}
          className="fixed inset-0 z-[9999] bg-stone-900/80 backdrop-blur-md flex items-center justify-center p-6 cursor-pointer"
        >
          <div className="bg-white p-10 rounded-full w-72 h-72 flex flex-col items-center justify-center text-center shadow-2xl border-4 border-double border-stone-200 animate-in fade-in zoom-in duration-1000">
            <p className="text-stone-500 uppercase tracking-widest text-[10px] mb-2">The Wedding of</p>
            <h2 className="text-2xl mb-6">Anggun & Ilham</h2>
            <button className="bg-stone-800 text-white text-xs px-6 py-2 rounded-full hover:bg-stone-700 transition-all">
              Buka Undangan
            </button>
          </div>
        </div>
      )}

      {/* FLOATING MUSIC ICON */}
      {hasInteracted && (
        <button
          onClick={toggleMusic}
          className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-white/90 backdrop-blur shadow-lg flex items-center justify-center border border-stone-200 transition-all active:scale-90"
        >
          <span className={isPlaying ? "animate-spin-slow text-rose-500" : "grayscale opacity-50"}>
            {isPlaying ? "🎵" : "🔇"}
          </span>
        </button>
      )}

      {/* TOAST NOTIF */}
      {toast && (
        <div className="fixed top-10 left-1/2 -translate-x-1/2 z-[100] bg-white/90 px-6 py-2 rounded-full shadow-xl text-xs">
          {toast}
        </div>
      )}

      {/* HERO SECTION (Background Pernikahan) */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-[10s] hover:scale-110"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1600&auto=format&fit=crop')", opacity: 0.2 }}
        />
        <div className="relative z-10 space-y-4">
          <p className="tracking-[0.5em] text-stone-500 text-xs uppercase">Save The Date</p>
          <h1 className="text-5xl md:text-8xl font-light italic">Anggun & Ilham</h1>
          <div className="flex gap-4 justify-center mt-10">
            {Object.entries(countdown).map(([k, v]) => (
              <div key={k} className="bg-white/50 backdrop-blur-sm p-4 rounded-xl min-w-[70px] shadow-sm">
                <p className="text-2xl font-light">{v}</p>
                <p className="text-[10px] uppercase text-stone-400">{k === 'd' ? 'Hari' : k === 'h' ? 'Jam' : k === 'm' ? 'Menit' : 'Detik'}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTENT SECTIONS (Tema Awan) */}
      {sections.slice(1, -1).map((s) => (
        <section key={s.id} className="min-h-screen flex items-center justify-center px-6 py-20 relative bg-sky-50/30">
          {/* Latar Belakang Awan */}
          <div className="absolute inset-0 opacity-40 pointer-events-none overflow-hidden">
             <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-[80px]" />
             <div className="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full blur-[100px]" />
          </div>
          
          <div className="relative z-10 bg-white/70 backdrop-blur-md p-10 md:p-16 rounded-[3rem] shadow-xl max-w-2xl text-center border border-white/50 animate-in slide-in-from-bottom-10 duration-1000">
            <h2 className="text-3xl font-light mb-8 text-stone-700 tracking-wide uppercase text-sm">{s.title}</h2>
            <p className="whitespace-pre-line leading-relaxed text-stone-600 italic">{s.content}</p>

            {s.id === "gift" && (
              <div className="mt-10 flex flex-col items-center">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 w-full max-w-[280px]">
                  {/* LOGO BRI DIPERKECIL & ELEGAN */}
                  <div className="flex flex-col items-center gap-2 mb-4">
                    <img 
                      src="https://upload.wikimedia.org/wikipedia/commons/2/2e/BRI_Logo.svg" 
                      alt="BRI" 
                      className="h-4 w-auto opacity-80" 
                    />
                    <div className="h-[1px] w-12 bg-slate-200" />
                  </div>
                  <p className="text-lg tracking-[0.2em] font-light mb-1">2233 0101 8163 506</p>
                  <p className="text-[10px] text-slate-400 uppercase tracking-widest">Anggun Ning Tyas</p>
                </div>
              </div>
            )}
          </div>
        </section>
      ))}

      {/* FOOTER (Background Pernikahan) */}
      <footer className="relative py-32 text-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-bottom"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=1600&auto=format&fit=crop')", opacity: 0.15 }}
        />
        <div className="relative z-10 px-6">
          <h2 className="text-5xl font-light italic mb-6">Terima Kasih</h2>
          <p className="text-sm text-stone-500 max-w-sm mx-auto mb-10 leading-relaxed uppercase tracking-widest">
            Sampai jumpa di hari bahagia kami
          </p>
          <div className="text-2xl font-light tracking-widest uppercase">Anggun & Ilham</div>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </main>
  );
}
