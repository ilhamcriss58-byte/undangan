"use client";
import { useState, useEffect, useRef } from 'react';

export default function DigitalInvitation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const audioRef = useRef(null);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });

  // 1. Menghindari Hydration Error (Pastikan render hanya di client)
  useEffect(() => {
    setIsMounted(true);
    const initAOS = async () => {
      const AOS = (await import('aos')).default;
      AOS.init({ duration: 1000, once: true });
    };
    initAOS();
  }, []);

  // 2. Countdown Real-Time
  useEffect(() => {
    const target = new Date("May 25, 2026 07:00:00").getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const diff = target - now;
      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          mins: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
          secs: Math.floor((diff % (1000 * 60)) / 1000)
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleOpen = () => {
    setIsOpen(true);
    setIsPlaying(true);
    if (audioRef.current) {
      audioRef.current.play().catch(() => console.log("Audio deferred"));
    }
  };

  const toggleMusic = () => {
    if (isPlaying) audioRef.current.pause();
    else audioRef.current.play();
    setIsPlaying(!isPlaying);
  };

  if (!isMounted) return null;

  return (
    <main className={`relative transition-all duration-1000 ${!isOpen ? 'h-screen overflow-hidden' : 'min-h-screen'}`}>
      {/* Pre-load Google Fonts & Icons */}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      <link href="https://fonts.googleapis.com/css2?family=Great+Vibes&family=Playfair+Display:wght@700&family=Montserrat:wght@300;400;600&display=swap" rel="stylesheet" />
      <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet" />

      {/* Musik & Audio (Taruh di /public/) */}
      <audio ref={audioRef} loop src="/ssstik.io_1778816090503.mp3" />

      {/* Floating Music Icon (Elegant Compact Disc) */}
      {isOpen && (
        <button 
          onClick={toggleMusic}
          className="fixed bottom-8 right-8 z-[1001] w-14 h-14 bg-[#d4af37] border-2 border-white rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.5)] text-white"
        >
          <i className={`fas fa-compact-disc fa-2x ${isPlaying ? 'animate-spin-slow' : ''}`}></i>
        </button>
      )}

      {/* HALAMAN 1: COVER (BG PERNIKAHAN) */}
      <section 
        className={`fixed inset-0 z-[1000] flex flex-col items-center justify-center text-center transition-transform duration-[1200ms] cubic-bezier(0.7,0,0.3,1) bg-cover bg-center
          ${isOpen ? '-translate-y-full' : 'translate-y-0'}`}
        style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.65)), url(https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1920)' }}
      >
        <div data-aos="zoom-out">
          <p className="tracking-[6px] text-xs font-light text-white mb-4 uppercase">The Wedding of</p>
          <h1 className="text-7xl md:text-9xl text-[#d4af37] font-vibes drop-shadow-lg">Anggun & Ilham</h1>
          <div className="mt-10">
            <p className="text-white text-sm mb-4">Kepada Yth. Bapak/Ibu/Saudara/i:</p>
            <button 
              onClick={handleOpen}
              className="px-10 py-4 bg-[#d4af37] text-white rounded-full font-bold uppercase tracking-widest hover:scale-110 transition-transform shadow-2xl"
            >
              <i className="fas fa-heart mr-2"></i> Buka Undangan
            </button>
          </div>
        </div>
      </section>

      {/* KONTEN (HALAMAN TENGAH - BG AWAN) */}
      <div className={`bg-clouds relative ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
        
        {/* Intro */}
        <section className="min-h-screen flex items-center justify-center p-8 text-center border-b border-white/50">
          <div data-aos="fade-up" className="max-w-2xl">
            <p className="text-2xl font-serif mb-8">بسم الله الرحمن الرحيم</p>
            <p className="italic text-slate-600 leading-relaxed text-lg">
              "Pernikahan adalah ibadah terpanjang, tempat dua jiwa saling berteduh dan menuliskan cerita abadi."
            </p>
          </div>
        </section>

        {/* Mempelai */}
        <section className="min-h-screen flex flex-col items-center justify-center gap-12 p-8 text-center">
          <div data-aos="fade-right">
            <h2 className="text-4xl font-playfair font-bold text-slate-800">Anggun Ning Tyas S.T.</h2>
            <p className="text-slate-500 mt-2">Putri dari Bapak M. Slamet Riyadi & Ibu Sri Endah Puspitorini</p>
          </div>
          <h1 className="text-6xl text-[#d4af37] font-vibes" data-aos="zoom-in">&</h1>
          <div data-aos="fade-left">
            <h2 className="text-4xl font-playfair font-bold text-slate-800">Ilham Kristuaji A.Md.P.</h2>
            <p className="text-slate-500 mt-2">Putra dari Bapak Ishak Sriyono & Ibu Ribkah Sutarmi</p>
          </div>
        </section>

        {/* Alamat (Akses Langsung Gmaps via Ikon) */}
        <section className="min-h-screen flex flex-col items-center justify-center p-8 text-center bg-white/40 backdrop-blur-sm">
          <div data-aos="flip-up" className="bg-white p-12 rounded-[40px] shadow-2xl max-w-lg border border-gold/20">
            <h2 className="text-[#d4af37] text-3xl font-playfair mb-6">Lokasi Resepsi</h2>
            <p className="font-semibold mb-2">Senin, 25 Mei 2026</p>
            <p className="text-sm mb-8 text-slate-600">Desa Panjang RT.13/RW.5, Kedungadem, Bojonegoro</p>
            
            <a href="https://maps.app.goo.gl/YourMapLinkHere" target="_blank" rel="noopener noreferrer">
              <i className="fas fa-map-location-dot text-6xl text-red-500 hover:scale-110 transition-transform cursor-pointer drop-shadow-md"></i>
            </a>
            <p className="text-xs mt-4 text-slate-400 font-bold uppercase tracking-tighter">Klik Ikon Untuk Petunjuk Jalan</p>
          </div>
        </section>

        {/* Rekening (Ikon BRI di Bawah) */}
        <section className="min-h-screen flex flex-col items-center justify-center p-8 text-center">
          <div data-aos="fade-up" className="bg-white/80 p-10 rounded-3xl shadow-xl border border-slate-100 max-w-sm w-full">
            <h2 className="font-playfair text-2xl mb-8">Tanda Kasih</h2>
            <div className="bg-[#f8f9fa] p-6 rounded-2xl">
              <p className="text-xs text-slate-400 uppercase tracking-widest mb-2">No. Rekening BRI</p>
              <p className="text-xl font-bold text-slate-800 mb-1">2233 0101 8163 506</p>
              <p className="text-sm text-slate-600 mb-6 font-semibold">a.n Anggun Ning Tyas</p>
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/BRI_Logo.svg/1200px-BRI_Logo.svg.png" 
                alt="BRI" 
                className="h-10 mx-auto object-contain"
              />
            </div>
          </div>
        </section>

        {/* HALAMAN TERAKHIR: CLOSING (BG PERNIKAHAN + COUNTDOWN) */}
        <section 
          className="min-h-screen flex flex-col items-center justify-center text-center p-10 text-white bg-cover bg-center"
          style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.75)), url(https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop)' }}
        >
          <div data-aos="zoom-in">
            <h1 className="text-6xl md:text-8xl text-[#d4af37] font-vibes mb-12">Anggun & Ilham</h1>
            
            {/* Real-time Countdown */}
            <div className="flex gap-4 justify-center scale-110">
              {[
                { label: 'Hari', val: timeLeft.days },
                { label: 'Jam', val: timeLeft.hours },
                { label: 'Menit', val: timeLeft.mins },
                { label: 'Detik', val: timeLeft.secs }
              ].map((item, i) => (
                <div key={i} className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl min-w-[75px]">
                  <span className="block text-3xl font-bold text-[#d4af37]">{item.val}</span>
                  <span className="text-[10px] uppercase tracking-widest">{item.label}</span>
                </div>
              ))}
            </div>
            
            <p className="mt-16 text-sm opacity-80 italic max-w-xs mx-auto">
              Merupakan kebahagiaan bagi kami atas kehadiran dan doa restu Anda. Terima Kasih.
            </p>
          </div>
        </section>
      </div>

      <style jsx global>{`
        .font-vibes { font-family: 'Great Vibes', cursive; }
        .font-playfair { font-family: 'Playfair Display', serif; }
        .bg-clouds {
          background-color: #f0f7ff;
          background-image: url('https://www.transparenttextures.com/patterns/clouds.png');
        }
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
