"use client";
import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';

export default function UndanganDigital() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });

  // 1. Inisialisasi AOS yang Aman untuk Build
  useEffect(() => {
    // Import secara dinamis hanya di sisi klien
    const initAOS = async () => {
      const AOS = (await import('aos')).default;
      AOS.init({
        duration: 1000,
        once: true,
        easing: 'ease-in-out',
      });
    };
    
    initAOS();
  }, []);

  // 2. Logika Countdown
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

  const startInvitation = () => {
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

  return (
    <>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      {/* Jangan lupa import CSS AOS di sini atau di layout.js */}
      <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet" />
      
      <main className={`relative min-h-screen ${!isOpen ? 'h-screen overflow-hidden' : ''}`}>
        <audio ref={audioRef} loop src="/ssstik.io_1778816090503.mp3" />

        {/* Tombol Musik Bergaya Piringan Hitam */}
        {isOpen && (
          <button 
            onClick={toggleMusic}
            className="fixed bottom-6 right-6 z-[1000] w-14 h-14 bg-[#d4af37] border-2 border-white rounded-full flex items-center justify-center shadow-2xl text-white"
          >
            <i className={`fas fa-compact-disc fa-2x ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '3s' }}></i>
          </button>
        )}

        {/* HALAMAN 1: COVER */}
        <section 
          className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center text-center transition-transform duration-1000 ease-in-out bg-cover bg-center text-white
            ${isOpen ? '-translate-y-full' : 'translate-y-0'}`}
          style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1920)' }}
        >
          <div data-aos="fade-up">
            <p className="tracking-[5px] text-xs uppercase opacity-80">Undangan Pernikahan</p>
            <h1 className="text-6xl md:text-8xl my-4 text-[#d4af37]" style={{ fontFamily: "'Great Vibes', cursive" }}>Anggun & Ilham</h1>
            <p className="mb-8">Kepada Yth: <br/> <strong>Bapak/Ibu/Saudara/i</strong></p>
            <button 
              onClick={startInvitation}
              className="px-10 py-4 bg-[#d4af37] text-white rounded-full font-bold uppercase tracking-widest hover:bg-[#b8952e] transition-all shadow-lg"
            >
              <i className="fas fa-envelope-open mr-2"></i> Buka Undangan
            </button>
          </div>
        </section>

        {/* KONTEN UTAMA (BG AWAN) */}
        <div className={isOpen ? 'block' : 'hidden'}>
          <section className="min-h-screen bg-[#f0f7ff] flex flex-col items-center justify-center p-10 text-center relative">
             <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'url(https://www.transparenttextures.com/patterns/clouds.png)' }}></div>
             <div data-aos="fade-up" className="z-10">
                <p className="text-2xl mb-6 text-[#0a192f]">بسم الله الرحمن الرحيم</p>
                <p className="italic text-lg max-w-2xl mx-auto leading-relaxed text-slate-700">
                  "Pernikahan Adalah Awal Dari Kisah Indah Yang Akan Ditulis Bersama, Dengan Setiap Hari Menjadi Bab Baru Yang Penuh Sukacita Dan Kebahagiaan"
                </p>
             </div>
          </section>

          {/* SECTION MEMPELAI */}
          <section className="min-h-screen bg-white flex flex-col items-center justify-center p-10 text-center space-y-12">
            <div data-aos="fade-right">
              <h2 className="text-4xl font-bold text-slate-800 mb-2">Anggun Ning Tyas S.T.</h2>
              <p className="text-slate-500">Putri dari Bapak M. Slamet Riyadi dan Ibu Sri Endah Puspitorini</p>
            </div>
            <div className="text-5xl text-[#d4af37]" style={{ fontFamily: "'Great Vibes', cursive" }} data-aos="zoom-in">&</div>
            <div data-aos="fade-left">
              <h2 className="text-4xl font-bold text-slate-800 mb-2">Ilham Kristuaji A.Md.P.</h2>
              <p className="text-slate-500">Putra dari Bapak Ishak Sriyono dan Ibu Ribkah Sutarmi</p>
            </div>
          </section>

          {/* SECTION REKENING & MAPS */}
          <section className="min-h-screen bg-[#f0f7ff] flex flex-col items-center justify-center p-6 text-center">
            <div data-aos="zoom-in" className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md border border-slate-100">
              <h2 className="text-[#d4af37] text-2xl font-bold mb-6">Lokasi & Tanda Kasih</h2>
              <div className="mb-8">
                <i className="fas fa-map-location-dot text-4xl text-red-500 mb-2"></i>
                <p className="text-sm font-semibold mb-4">Desa Panjang RT.13/RW.5, Kedungadem, Bojonegoro</p>
                <a href="https://maps.google.com" target="_blank" className="text-xs text-[#d4af37] font-bold border-b border-[#d4af37]">LIHAT DI GOOGLE MAPS</a>
              </div>
              <div className="pt-6 border-t border-slate-100">
                <p className="text-xs text-slate-400 uppercase mb-2">Transfer Bank BRI</p>
                <p className="text-lg font-bold tracking-widest mb-1">2233 0101 8163 506</p>
                <p className="text-sm mb-4">a.n Anggun Ning Tyas</p>
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/BRI_Logo.svg/1200px-BRI_Logo.svg.png" className="h-8 mx-auto" alt="BRI" />
              </div>
            </div>
          </section>

          {/* SECTION TERAKHIR (BG PERNIKAHAN + COUNTDOWN) */}
          <section 
            className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center p-10 text-center text-white"
            style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop)' }}
          >
            <div data-aos="fade-up">
              <h1 className="text-5xl md:text-7xl mb-10 text-[#d4af37]" style={{ fontFamily: "'Great Vibes', cursive" }}>Anggun & Ilham</h1>
              
              <div className="flex gap-3 justify-center mb-10">
                {[
                  { label: 'Hari', val: timeLeft.days },
                  { label: 'Jam', val: timeLeft.hours },
                  { label: 'Menit', val: timeLeft.mins },
                  { label: 'Detik', val: timeLeft.secs }
                ].map((item, i) => (
                  <div key={i} className="bg-white/10 backdrop-blur-md border border-white/20 p-3 rounded-lg min-w-[65px]">
                    <span className="block text-2xl font-bold text-[#d4af37]">{item.val}</span>
                    <span className="text-[9px] uppercase tracking-widest">{item.label}</span>
                  </div>
                ))}
              </div>
              
              <p className="max-w-sm mx-auto text-sm opacity-80 italic leading-relaxed">
                Merupakan suatu kehormatan bagi kami apabila Bapak/Saudara berkenan hadir memberikan doa restu.
              </p>
            </div>
          </section>
        </div>
      </main>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Montserrat:wght@300;400;700&display=swap');
      `}</style>
    </>
  );
}
