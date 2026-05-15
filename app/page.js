"use client";
import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Script from 'next/script';

export default function UndanganDigital() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });

  // Countdown Logic
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

  // Initialize AOS
  useEffect(() => {
    const AOS = require('aos');
    AOS.init({ duration: 1000, once: true });
  }, []);

  const startInvitation = () => {
    setIsOpen(true);
    setIsPlaying(true);
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.log("Audio play deferred"));
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
      <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet" />
      
      <main className={`relative min-h-screen overflow-x-hidden ${!isOpen ? 'h-screen overflow-hidden' : ''}`}>
        
        {/* Audio Element */}
        <audio ref={audioRef} loop src="/ssstik.io_1778816090503.mp3" />

        {/* Music Floating Button */}
        {isOpen && (
          <button 
            onClick={toggleMusic}
            className="fixed bottom-6 right-6 z-[1000] w-14 h-14 bg-[#d4af37] border-2 border-white rounded-full flex items-center justify-center shadow-xl text-white"
          >
            <i className={`fas fa-compact-disc fa-2x ${isPlaying ? 'animate-spin-slow' : ''}`}></i>
          </button>
        )}

        {/* SECTION 1: COVER */}
        <section 
          className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center text-center transition-transform duration-1000 ease-in-out bg-cover bg-center text-white
            ${isOpen ? '-translate-y-full' : 'translate-y-0'}`}
          style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1920)' }}
        >
          <div data-aos="fade-up">
            <p className="tracking-[5px] text-sm uppercase">Undangan Pernikahan</p>
            <h1 className="font-great-vibes text-6xl md:text-8xl my-4 text-[#d4af37]">Anggun & Ilham</h1>
            <p className="mb-8">Kepada Yth: <br/> <strong>Bapak/Ibu/Saudara/i</strong></p>
            <button 
              onClick={startInvitation}
              className="px-8 py-3 bg-[#d4af37] text-white rounded-full font-bold uppercase tracking-widest hover:scale-105 transition-transform"
            >
              <i className="fas fa-envelope-open mr-2"></i> Buka Undangan
            </button>
          </div>
        </section>

        {/* SECTION 2: INTRO */}
        <section className="min-h-screen bg-blue-50 flex flex-col items-center justify-center p-10 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'url(https://www.transparenttextures.com/patterns/clouds.png)' }}></div>
          <div data-aos="fade-up" className="max-w-2xl z-10">
            <p className="text-xl mb-6">بسم الله الرحمن الرحيم</p>
            <p className="italic text-lg text-slate-700 leading-relaxed">
              "Pernikahan Adalah Awal Dari Kisah Indah Yang Akan Ditulis Bersama, Dengan Setiap Hari Menjadi Bab Baru Yang Penuh Sukacita Dan Kebahagiaan"
            </p>
          </div>
        </section>

        {/* SECTION 3: MEMPELAI */}
        <section className="min-h-screen bg-white flex flex-col items-center justify-center p-10 text-center gap-10">
          <div data-aos="fade-right">
            <h2 className="font-playfair text-4xl font-bold text-slate-800">Anggun Ning Tyas S.T.</h2>
            <p className="text-slate-600">Putri dari Bapak M. Slamet Riyadi dan Ibu Sri Endah Puspitorini</p>
          </div>
          <div className="font-great-vibes text-5xl text-[#d4af37]" data-aos="zoom-in">&</div>
          <div data-aos="fade-left">
            <h2 className="font-playfair text-4xl font-bold text-slate-800">Ilham Kristuaji A.Md.P.</h2>
            <p className="text-slate-600">Putra dari Bapak Ishak Sriyono dan Ibu Ribkah Sutarmi</p>
          </div>
        </section>

        {/* SECTION 4: ADDRESS & GMAPS */}
        <section className="min-h-screen bg-blue-50 flex flex-col items-center justify-center p-10 text-center">
          <div data-aos="flip-left" className="bg-white p-10 rounded-2xl shadow-xl max-w-lg">
            <h2 className="text-[#d4af37] text-3xl font-playfair font-bold mb-4">Waktu & Tempat</h2>
            <p className="font-bold text-xl mb-2">Senin, 25 Mei 2026</p>
            <p>Akad: 07.00 WIB | Resepsi: 09.00 - Selesai</p>
            <div className="mt-8">
              <a href="https://maps.google.com/?q=Kedungadem+Bojonegoro" target="_blank" className="inline-block group">
                <i className="fas fa-map-location-dot text-5xl text-red-500 mb-3 group-hover:scale-110 transition-transform"></i>
                <p className="font-semibold">Desa Panjang RT.13/RW.5, <br/> Kedungadem, Bojonegoro</p>
                <span className="mt-4 inline-block px-6 py-2 border-2 border-[#d4af37] text-[#d4af37] rounded-full font-bold">BUKA PETA</span>
              </a>
            </div>
          </div>
        </section>

        {/* SECTION 5: BANK */}
        <section className="min-h-screen bg-white flex flex-col items-center justify-center p-10 text-center">
          <div data-aos="fade-up" className="max-w-md w-full bg-white border border-slate-100 shadow-2xl p-8 rounded-3xl">
            <h2 className="text-2xl font-playfair font-bold mb-6">Tanda Kasih</h2>
            <p className="text-sm text-slate-500 mb-6 italic">Doa restu Anda sangat berarti bagi kami. Namun jika ingin memberikan kado secara digital:</p>
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-xl">
                <p className="text-xs uppercase tracking-widest text-slate-400">Nomor Rekening</p>
                <p className="text-xl font-bold tracking-widest text-slate-800">2233 0101 8163 506</p>
                <p className="text-sm text-slate-600 mb-3 font-semibold">a.n Anggun Ning Tyas</p>
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/BRI_Logo.svg/1200px-BRI_Logo.svg.png" 
                  className="h-10 mx-auto" 
                  alt="BRI" 
                />
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: CLOSING & COUNTDOWN */}
        <section 
          className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center p-10 text-center text-white"
          style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop)' }}
        >
          <div data-aos="zoom-out">
            <p className="mb-6 max-w-md mx-auto">Suatu kehormatan bagi kami apabila Bapak/Saudara berkenan hadir memberikan doa restu.</p>
            <h1 className="font-great-vibes text-6xl md:text-8xl text-[#d4af37] mb-10">Anggun & Ilham</h1>
            
            {/* Real-time Countdown */}
            <div className="flex gap-4 justify-center">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl min-w-[70px]">
                <span className="block text-2xl font-bold text-[#d4af37]">{timeLeft.days}</span>
                <span className="text-[10px] uppercase">Hari</span>
              </div>
              <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl min-w-[70px]">
                <span className="block text-2xl font-bold text-[#d4af37]">{timeLeft.hours}</span>
                <span className="text-[10px] uppercase">Jam</span>
              </div>
              <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl min-w-[70px]">
                <span className="block text-2xl font-bold text-[#d4af37]">{timeLeft.mins}</span>
                <span className="text-[10px] uppercase">Menit</span>
              </div>
              <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl min-w-[70px]">
                <span className="block text-2xl font-bold text-[#d4af37]">{timeLeft.secs}</span>
                <span className="text-[10px] uppercase">Detik</span>
              </div>
            </div>
            <p className="mt-10 text-sm opacity-70 italic">Atas kehadiran dan doa restunya, kami ucapkan terima kasih.</p>
          </div>
        </section>

      </main>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Playfair+Display:wght@700&family=Montserrat:wght@300;400;600&display=swap');
        
        .font-great-vibes { font-family: 'Great Vibes', cursive; }
        .font-playfair { font-family: 'Playfair Display', serif; }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 4s linear infinite;
        }
      `}</style>
    </>
  );
}
