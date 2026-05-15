"use client";
import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';

export default function UndanganDigital() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [mounted, setMounted] = useState(false);
  const audioRef = useRef(null);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });

  // 1. Mencegah Hydration Error & Inisialisasi AOS
  useEffect(() => {
    setMounted(true);
    
    // Import AOS secara dinamis hanya di Client-Side
    const initAOS = async () => {
      const AOS = (await import('aos')).default;
      import('aos/dist/aos.css'); // Import CSS AOS
      AOS.init({
        duration: 1000,
        once: true,
        easing: 'ease-in-out',
      });
    };
    
    initAOS();
  }, []);

  // 2. Countdown Real-Time (25 Mei 2026)
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

  const openInvitation = () => {
    setIsOpen(true);
    setIsPlaying(true);
    if (audioRef.current) {
      audioRef.current.play().catch(() => console.log("Audio play deferred"));
    }
  };

  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Jangan render sebelum mounted untuk menghindari error build Next.js
  if (!mounted) return null;

  return (
    <main className={`relative min-h-screen ${!isOpen ? 'h-screen overflow-hidden' : 'overflow-x-hidden'}`}>
      
      {/* Font & Icon Loader */}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      <link href="https://fonts.googleapis.com/css2?family=Great+Vibes&family=Playfair+Display:wght@700&family=Montserrat:wght@300;400;600&display=swap" rel="stylesheet" />

      {/* Audio Engine */}
      <audio ref={audioRef} loop src="/ssstik.io_1778816090503.mp3" />

      {/* Music Controller */}
      {isOpen && (
        <button 
          onClick={toggleMusic}
          className="fixed bottom-6 right-6 z-[1001] w-14 h-14 bg-[#d4af37] border-2 border-white rounded-full flex items-center justify-center shadow-2xl text-white"
        >
          <i className={`fas fa-compact-disc fa-2x ${isPlaying ? 'animate-spin-slow' : ''}`}></i>
        </button>
      )}

      {/* HALAMAN 1: COVER (Background Wedding) */}
      <section 
        className={`fixed inset-0 z-[1000] flex flex-col items-center justify-center text-center transition-transform duration-[1200ms] ease-in-out bg-cover bg-center text-white
          ${isOpen ? '-translate-y-full' : 'translate-y-0'}`}
        style={{ 
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1920)' 
        }}
      >
        <div data-aos="fade-up">
          <p className="tracking-[5px] text-xs uppercase mb-4 opacity-80">Undangan Pernikahan</p>
          <h1 className="text-6xl md:text-8xl text-[#d4af37] font-vibes">Anggun & Ilham</h1>
          <div className="mt-10">
            <p className="mb-4">Kepada Yth. Bapak/Ibu/Saudara/i:</p>
            <button 
              onClick={openInvitation}
              className="px-10 py-4 bg-[#d4af37] text-white rounded-full font-bold uppercase tracking-widest hover:scale-110 transition-transform shadow-xl"
            >
              <i className="fas fa-heart mr-2"></i> Buka Undangan
            </button>
          </div>
        </div>
      </section>

      {/* KONTEN UTAMA (Background Awan) */}
      <div className={`bg-clouds ${isOpen ? 'block' : 'hidden'}`}>
        
        {/* Intro Section */}
        <section className="min-h-screen flex flex-col items-center justify-center p-10 text-center relative border-b border-white/40">
           <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'url(https://www.transparenttextures.com/patterns/clouds.png)' }}></div>
           <div data-aos="fade-up" className="z-10 max-w-2xl">
              <p className="text-2xl mb-8 font-playfair">بسم الله الرحمن الرحيم</p>
              <p className="italic text-lg text-slate-700 leading-relaxed">
                "Pernikahan Adalah Awal Dari Kisah Indah Yang Akan Ditulis Bersama, Dengan Setiap Hari Menjadi Bab Baru Yang Penuh Sukacita Dan Kebahagiaan"
              </p>
           </div>
        </section>

        {/* Mempelai Section */}
        <section className="min-h-screen flex flex-col items-center justify-center p-10 text-center gap-12 bg-white/30 backdrop-blur-sm">
          <div data-aos="fade-right">
            <h2 className="text-4xl font-playfair font-bold text-slate-800">Anggun Ning Tyas S.T.</h2>
            <p className="text-slate-500">Putri dari Bapak M. Slamet Riyadi dan Ibu Sri Endah Puspitorini</p>
          </div>
          <div className="text-6xl text-[#d4af37] font-vibes" data-aos="zoom-in">&</div>
          <div data-aos="fade-left">
            <h2 className="text-4xl font-playfair font-bold text-slate-800">Ilham Kristuaji A.Md.P.</h2>
            <p className="text-slate-500">Putra dari Bapak Ishak Sriyono dan Ibu Ribkah Sutarmi</p>
          </div>
        </section>

        {/* Alamat & Maps Section */}
        <section className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
          <div data-aos="flip-left" className="bg-white p-10 rounded-[30px] shadow-2xl w-full max-w-md border border-slate-100">
            <h2 className="text-[#d4af37] text-3xl font-playfair font-bold mb-6">Waktu & Tempat</h2>
            <p className="font-bold text-xl mb-4">Senin, 25 Mei 2026</p>
            <p className="text-sm mb-10">Desa Panjang RT.13/RW.5, <br/> Kedungadem, Bojonegoro, Jawa Timur</p>
            
            <div className="mb-6">
              <a href="http://googleusercontent.com/maps.google.com/6" target="_blank" rel="noopener noreferrer">
                <i className="fas fa-map-location-dot text-6xl text-red-500 hover:scale-110 transition-transform"></i>
              </a>
              <p className="text-[10px] mt-4 font-bold uppercase tracking-widest text-slate-400">Klik Ikon untuk Navigasi</p>
            </div>
          </div>
        </section>

        {/* Rekening Section (Ikon BRI Proporsional) */}
        <section className="min-h-screen flex flex-col items-center justify-center p-8 text-center">
          <div data-aos="fade-up" className="bg-white/80 p-8 rounded-3xl shadow-xl w-full max-w-sm">
            <h2 className="text-xl font-playfair font-bold mb-6">Tanda Kasih</h2>
            <div className="bg-[#f0f7ff] p-6 rounded-2xl">
              <p className="text-xs text-slate-400 uppercase mb-2">No. Rekening BRI</p>
              <p className="text-lg font-bold tracking-widest mb-1 text-slate-800">2233 0101 8163 506</p>
              <p className="text-sm text-slate-600 mb-6 font-semibold">a.n Anggun Ning Tyas</p>
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/BRI_Logo.svg/1200px-BRI_Logo.svg.png" 
                className="h-10 mx-auto" 
                alt="Logo BRI" 
              />
            </div>
          </div>
        </section>

        {/* HALAMAN TERAKHIR: CLOSING (Background Wedding + Countdown) */}
        <section 
          className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center p-10 text-center text-white"
          style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop)' }}
        >
          <div data-aos="zoom-out">
            <h1 className="text-6xl md:text-8xl text-[#d4af37] font-vibes mb-10">Anggun & Ilham</h1>
            
            {/* Countdown Real-Time */}
            <div className="flex gap-3 justify-center mb-12">
              {[
                { l: 'Hari', v: timeLeft.days },
                { l: 'Jam', v: timeLeft.hours },
                { l: 'Min', v: timeLeft.mins },
                { l: 'Det', v: timeLeft.secs }
              ].map((item, i) => (
                <div key={i} className="bg-white/10 backdrop-blur-md border border-white/20 p-3 rounded-lg min-w-[65px]">
                  <span className="block text-2xl font-bold text-[#d4af37]">{item.v}</span>
                  <span className="text-[10px] uppercase">{item.l}</span>
                </div>
              ))}
            </div>

            <p className="max-w-sm mx-auto text-sm opacity-80 italic">
              Merupakan suatu kehormatan bagi kami apabila Bapak/Saudara berkenan hadir memberikan doa restu.
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
          animation: spin-slow 4s linear infinite;
        }
      `}</style>
    </main>
  );
}
